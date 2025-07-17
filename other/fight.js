function createMessageSkill(Player, name, text) {
  let help = "moveInfostrText" + Player;
  //console.log(help);
  if (document.getElementById(help + name)) {
    document.getElementById(help + name).textContent = text;
  } else {
    let x = document.createElement("div");
    x.id = help + name;
    x.textContent = text;
    //console.log(x);
    //console.log(text);

    if (Player == "Player") {
      moveInfoPlayer.appendChild(x);
    } else if (Player == "Enemy") {
      moveInfoEnemy.appendChild(x);
    } else {
      console.log("Вы не правильно использовали функцию");
    }
  }
}

function deleteMessageSkill(Player, name) {
  let help = "moveInfostrText" + Player;
  if (document.getElementById(help + name)) {
    document.getElementById(help + name).textContent = "";
  }
}
function helpdeleteAllMessagesSkills(Player) {
  deleteMessageSkill(Player, TOTAL_TYPE_SKILL_BLADEMAIL);
  deleteMessageSkill(Player, TOTAL_TYPE_SKILL_FIRE_BREATH);
  deleteMessageSkill(Player, TOTAL_TYPE_SKILL_ICE_BREATH);
  deleteMessageSkill(Player, TOTAL_TYPE_SKILL_LIGHTING_STRIKE);
  deleteMessageSkill(Player, TOTAL_TYPE_SKILL_POISONOUS_BREATH);
  deleteMessageSkill(Player, TOTAL_TYPE_SKILL_WAMPIRISM);
  deleteMessageSkill(Player, TOTAL_TYPE_SKILL_WATER_STRIKE);
}

function attackButtonCLick() {
  skillButtonPl1.checked = false;
  skillButtonPl2.checked = false;
  skillButtonPl3.checked = false;
  endMoveButtonPl.disabled = false;
  endMovePlayerText.textContent =
    TOTAL_PLAYER_MOVE_END_TEXT + "просто атакуете";
  player.endAttack = true;

  if (skillDamadgePlayer.waterDamadge[0] == undefined) {
    enemyMonster.highHumidity = false;
    updateEnemyMonster(enemyMonster);
  }
}
function useAbilityPl(id, user) {
  let x = 0;
  //console.log("fghf");

  user.endAttack = false;
  //console.log(user);
  if (id == skillButtonPl1.id) {
    skillButtonPl2.checked = false;
    skillButtonPl3.checked = false;

    x = 0;
  } else if (id == skillButtonPl2.id) {
    skillButtonPl1.checked = false;
    skillButtonPl3.checked = false;
    x = 1;
  } else if (id == skillButtonPl3.id) {
    skillButtonPl1.checked = false;
    skillButtonPl2.checked = false;
    x = 2;
  }
  attackButtonPl.checked = false;
  endMoveButtonPl.disabled = false;
  endMovePlayerText.textContent =
    TOTAL_PLAYER_MOVE_END_TEXT + "используете " + `${x + 1}` + " способность";
  user.endSkill = x;

  if (skillDamadgePlayer.waterDamadge[0] == undefined) {
    enemyMonster.highHumidity = false;
    updateEnemyMonster(enemyMonster);
  }
}

function createEndMoveEnemy() {
  let turnEnemy = enemyMonster.skillBacpack.length + 1;

  let randomTurn = getRandomInt(1, turnEnemy);
  if (enemyMonster.intelligence > enemyMonster.getCurrentMana()) {
    randomTurn = 1;
    console.log("Мало маны у врага, randomTurn: " + randomTurn);
  }

  switch (randomTurn) {
    case 1: {
      enemy.endAttack = true;
      enemy.endSkill = -2;
      break;
    }
    case 2: {
      enemy.endAttack = false;
      enemy.endSkill = 0;
      break;
    }
    case 3: {
      enemy.endAttack = false;
      enemy.endSkill = 1;
      break;
    }
    case 4: {
      enemy.endAttack = false;
      enemy.endSkill = 2;
      break;
    }
  }
  printDebug(
    "Выбор хода врага: enemy.endAttack:" +
      enemy.endAttack +
      " enemy.endSkill:" +
      enemy.endSkill,
    "EndMoveEnemy"
  );
}

function nullSkills(Player) {
  if (Player == "Player") {
    for (var element in skillDamadgePlayer) {
      skillDamadgePlayer[element] = 0;
      //console.log(skillDamadgePlayer[element]);
    }
  } else if (Player == "Enemy") {
    for (var element in skillDamadgeEnemy) {
      skillDamadgeEnemy[element] = 0;
    }
  } else {
    console.log("Не правильно использовали функцию");
  }
}
function win(winner) {
  console.log("Победил: ", winner);
  nullSkills("Player");
  nullSkills("Enemy");

  fightButton.disabled = false;
  attackButtonPl.checked = false;
  skillButtonPl1.checked = false;
  skillButtonPl2.checked = false;
  skillButtonPl3.checked = false;

  attackButtonPl.disabled = true;
  skillButtonPl1.disabled = true;
  skillButtonPl2.disabled = true;
  skillButtonPl3.disabled = true;
  endMoveButtonPl.disabled = true;

  moveInfostrTextW.textContent = "Победил: " + winner;
}
function getRealAttackPlayer() {
  // Формирование обычной атаки
  let newAttack = mapMonsters.get(oldMonsterFightP).getAttack();
  //Использует новый подсчет атаки у сырого монстра
  if (mapMonsters.get(oldMonsterFightP).highHumidity == true) {
    newAttack = getHighHumidityAttribute(newAttack, false);
  }
  //

  let playerAttack = getRandomCrit(
    newAttack,
    mapMonsters.get(oldMonsterFightP).getCrit()
  );
  //console.log("attack:" + attack, " crit:" + newAttack);
  if (playerAttack > newAttack) {
    player.orCrit = true;
  } else {
    player.orCrit = false;
  }
  playerAttack =
    playerAttack - getHighHumidityAttribute(enemyMonster.getArmor(), true);
  if (playerAttack < 1) playerAttack = 1;
  return playerAttack;
}
function critText(atack, orCrit, playerOrEnemy) {
  let text = "";
  if (orCrit) {
    text = "Вы наносите критический удар: " + atack;
  } else {
    text = "Вы атакуете: " + atack;
  }
  let x = document.getElementById(`${`moveInfostrText` + playerOrEnemy + `A`}`);

  x.textContent = text;
  //console.log(x.textContent);
}

function getRealAttackEnemy() {
  // Формирование обычной атаки
  let newAttack = enemyMonster.getAttack();

  //Использует новый подсчет атаки у сырого монстра
  if (enemyMonster.highHumidity == true) {
    newAttack = getHighHumidityAttribute(newAttack, true);
  }
  //

  //крит
  let enemyAttack = getRandomCrit(newAttack, enemyMonster.getCrit());

  if (enemyAttack > newAttack) {
    enemy.orCrit = true;
  } else {
    enemy.orCrit = false;
  }
  enemyAttack =
    enemyAttack -
    getHighHumidityAttribute(
      mapMonsters.get(oldMonsterFightP).getArmor(),
      false
    );
  if (enemyAttack < 1) enemyAttack = 1;
  return enemyAttack;
}

function createDamadgeSkills(user, monster, skillDamadge, noUser) {
  //alert("");
  //console.log(user.Mana);
  if (user.Mana >= monster.intelligence) {
    let skill = monster.skillBacpack[user.endSkill];
    //console.log(skill);
    if (skill) {
      if (skill.type == TOTAL_TYPE_SKILL_FIRE_BREATH) {
        skillDamadge.fireDamadge = skill.getDamadge(monster.intelligence);
      } else if (skill.type == TOTAL_TYPE_SKILL_POISONOUS_BREATH) {
        skillDamadge.poisonousDamadge = skill.getDamadge(monster.agility);
      } else if (skill.type == TOTAL_TYPE_SKILL_ICE_BREATH) {
        skillDamadge.iceDamadge = skill.getDamadge(monster.intelligence);
      } else if (skill.type == TOTAL_TYPE_SKILL_LIGHTING_STRIKE) {
        skillDamadge.lightingDamadge = skill.formula(monster.intelligence);
        console.log("lightingDamadge", skillDamadge.lightingDamadge);
      } else if (skill.type == TOTAL_TYPE_SKILL_WAMPIRISM) {
        skillDamadge.wampirismDamadge = skill.formula(monster.getAttack());
      } else if (skill.type == TOTAL_TYPE_SKILL_BLADEMAIL) {
        skillDamadge.blademailDamadge = skill.formula();
      } else if (skill.type == TOTAL_TYPE_SKILL_WATER_STRIKE) {
        skillDamadge.waterDamadge = skill.getDamadge(monster.intelligence);
        user.firstWater = true;
      }

      user.Mana = Math.floor(user.Mana - monster.intelligence);
    }
  } else {
    console.log(`${user.text}у не хватило маны`);

    if (user.text == "Игрок") {
      moveInfostrTextPlayerA.textContent = `${user.text}у  не хватает маны: `;
    } else if (user.text == "Враг") {
      moveInfostrTextEnemyA.textContent = `${user.text}у  не хватает маны: `;
    }
  }
}

function damadgeSkills(user, noUser, monster, noMonster, skillDamadge) {
  if (skillDamadge.fireDamadge[0] != undefined) {
    noUser.HP = noUser.HP - skillDamadge.fireDamadge[0];
    text =
      "[" +
      skillDamadge.fireDamadge.length +
      "]" +
      " Поджигаете противника: " +
      skillDamadge.fireDamadge[0];
    createMessageSkill(user.text2, TOTAL_TYPE_SKILL_FIRE_BREATH, text);
    console.log(user.text2, " еще ожёг: ", skillDamadge.fireDamadge[0]);

    skillDamadge.fireDamadge.shift();
  } else {
    deleteMessageSkill(user.text2, TOTAL_TYPE_SKILL_FIRE_BREATH);
  }
  if (skillDamadge.poisonousDamadge[0] != undefined) {
    noUser.HP = noUser.HP - skillDamadge.poisonousDamadge[0];
    console.log(user.text2, " еще яд: ", skillDamadge.poisonousDamadge[0]);
    text =
      "[" +
      skillDamadge.poisonousDamadge.length +
      "]" +
      "Отравляете противника: " +
      skillDamadge.poisonousDamadge[0];
    createMessageSkill(user.text2, TOTAL_TYPE_SKILL_POISONOUS_BREATH, text);

    skillDamadge.poisonousDamadge.shift();
  } else {
    deleteMessageSkill(user.text2, TOTAL_TYPE_SKILL_POISONOUS_BREATH);
  }
  //console.log("test:" + skillDamadge.iceDamadge[0]);
  if (skillDamadge.iceDamadge[0] != undefined) {
    noUser.HP = noUser.HP - skillDamadge.iceDamadge[0];
    text =
      "[" +
      skillDamadge.iceDamadge.length +
      "]" +
      "Замораживаете противника: " +
      skillDamadge.iceDamadge[0];
    createMessageSkill(user.text2, TOTAL_TYPE_SKILL_ICE_BREATH, text);
    noUser.frozen = true;

    console.log(user.text2, " еще мороз: ", skillDamadge.iceDamadge[0]);

    skillDamadge.iceDamadge.shift();
  } else {
    //console.log("lol");
    //noUser.frozen = false;
    deleteMessageSkill(user.text2, TOTAL_TYPE_SKILL_ICE_BREATH);
  }
  if (skillDamadge.lightingDamadge != 0) {
    let water = 1;
    if (noMonster.highHumidity == true) {
      water = 2;
      text =
        "поражаете сырого противника молнией: " +
        skillDamadge.lightingDamadge * water;
    } else {
      text = "выстреливаете молнией: " + skillDamadge.lightingDamadge;
    }
    createMessageSkill(user.text2, TOTAL_TYPE_SKILL_LIGHTING_STRIKE, text);
    noUser.HP = noUser.HP - skillDamadge.lightingDamadge * water;
    console.log(
      user.text2,
      " Удар молнией ",
      skillDamadge.lightingDamadge * water
    );
    skillDamadge.lightingDamadge = 0;
  } else {
    deleteMessageSkill(user.text2, TOTAL_TYPE_SKILL_LIGHTING_STRIKE);
  }
  if (skillDamadge.wampirismDamadge != 0) {
    if (user.text2 == "Player") {
      user.attack = getRealAttackPlayer();
    } else if (user.text2 == "Enemy") {
      user.attack = getRealAttackEnemy();
    }

    noUser.HP = noUser.HP - user.attack;
    console.log(
      "Исцеление вампира ",
      skillDamadge.wampirismDamadge,
      "атака " + user.text2,
      user.attack
    );
    //moveInfostrTextPlayerA.textContent = "Вы атакуете: " + playerAttack;

    critText(user.attack, user.orCrit, user.text2);
    text = "Исцеление вампира: " + skillDamadge.wampirismDamadge;
    createMessageSkill(user.text2, TOTAL_TYPE_SKILL_WAMPIRISM, text);

    if (user.HP <= monster.getHp()) {
      user.HP = user.HP + skillDamadge.wampirismDamadge;
    }
    skillDamadge.wampirismDamadge = 0;
  } else {
    deleteMessageSkill(user.text2, TOTAL_TYPE_SKILL_WAMPIRISM);
  }
  if (skillDamadge.blademailDamadge != 0) {
    user.attack = getRealAttackPlayer();
    noUser.HP = noUser.HP - user.attack;

    let itog = Math.floor(
      (enemyMonster.getAttack() / 100) * skillDamadge.blademailDamadge
    );
    critText(user.attack, user.orCrit, user.text2);
    text = "Отразили: " + itog;
    createMessageSkill(user.text2, TOTAL_TYPE_SKILL_BLADEMAIL, text);

    console.log(user.text2, " Отражение ", itog);
    noUser.HP = noUser.HP - itog;
    skillDamadge.blademailDamadge = 0;
  } else {
    deleteMessageSkill(user.text2, TOTAL_TYPE_SKILL_BLADEMAIL);
  }
  if (skillDamadge.waterDamadge[0] != undefined) {
    user.percentHighHumidity = skillDamadge.waterDamadge[0];
    text =
      "[" +
      skillDamadge.waterDamadge.length +
      "]" +
      "Облили врага: " +
      user.percentHighHumidity +
      "%";
    createMessageSkill(user.text2, TOTAL_TYPE_SKILL_WATER_STRIKE, text);
    noMonster.highHumidity = true;
    user.firstWater = false;
    skillDamadge.waterDamadge.shift();
    updateEnemyMonster();
    updateFightMonster();
  } else {
    deleteMessageSkill(user.text2, TOTAL_TYPE_SKILL_WATER_STRIKE);
    user.percentHighHumidity = 0;
    noMonster.highHumidity = false;
  }

  printDebug(
    "damadgeSkillsInfo: user:" +
      user.text2 +
      " noUser:" +
      noUser.text2 +
      " monster: " +
      monster.name +
      " noMonster:" +
      noMonster.name +
      " skillDamadge:" +
      skillDamadge,
    "damadgeSkillsInfo"
  );
}

function endMove() {
  printDebug("Конец хода", "endMove");
  if (poleFightsHaveMonsterEnemy) {
    attackButtonPl.disabled = true;
    skillButtonPl1.disabled = true;
    skillButtonPl2.disabled = true;
    skillButtonPl3.disabled = true;

    moveInfostrTextPlayerA.textContent = "";
    moveInfostrTextEnemyA.textContent = "";

    moveInfostrTextW.textContent = "";
    moveInfostrTextNM.textContent = "";

    moveInfostrTextM.textContent = "";
    moveInfostrTextD.textContent = "";

    createEndMoveEnemy(); // Ход врага

    let textPlayer = "";
    let textEnemy = "";

    // переменные для атаки

    let playerDodge = false;
    let enemyDodge = false;

    // для скиллов
    let stunEnemy = false;

    if (player.HP >= 0 && enemy.HP >= 0) {
      //ice________________________________________________________
      if (skillDamadgePlayer.iceDamadge[0] != undefined) {
      } else {
        enemy.frozen = false;
        //moveInfostrTextEnemyA.textContent = "";
      }
      if (skillDamadgeEnemy.iceDamadge[0] != undefined) {
      } else {
        player.frozen = false;
        //moveInfostrTextPlayerA.textContent = "";
      }
      //_____________________________________________________________________

      // Рассчет уворота_________________________________________________
      if (player.frozen == true) {
        // расчет шанса увернуться от урона
        playerDodge = false;
        //moveInfostrTextPlayerA.textContent = "Игрок заморожен";
      } else {
        let newPlayerDodge = getHighHumidityAttribute(
          mapMonsters.get(oldMonsterFightP).getDodge(),
          false
        );
        playerDodge = getRandomPercent(100, newPlayerDodge);
        //console.log("newPlayerDodge: " + newPlayerDodge);
      }
      if (enemy.frozen == true) {
        enemyDodge = false;
        //moveInfostrTextEnemyA.textContent = "Враг заморожен";
      } else {
        let newEnemyDodge = getHighHumidityAttribute(
          enemyMonster.getDodge(),
          true
        );
        enemyDodge = getRandomPercent(100, newEnemyDodge);
        //console.log("newEnemyDodge: " + newEnemyDodge);
      }
      //_____________________________________________________________________

      //

      // Рассчет обычной атаки игрока
      if (player.frozen == true) {
        moveInfostrTextPlayerA.textContent = "Игрок заморожен";
      } else if (player.frozen == false) {
        if (player.endAttack == true) {
          player.attack = getRealAttackPlayer();
          if (player.attack <= 0) player.attack = 1;

          critText(player.attack, player.orCrit, "Player");
        } else if (enemyDodge) {
          //уворот врага
          console.log("Враг увернулся");
          moveInfostrTextPlayerA.textContent = "Игрок промахнулся ";
          player.attack = 0;
        } else if (!enemyDodge) {
          // использование способности у игрока
          createDamadgeSkills(
            player,
            mapMonsters.get(oldMonsterFightP),
            skillDamadgePlayer,
            enemy
          );
        }
      }
      //

      // Рассчет обычной атаки врага
      if (enemy.frozen == true) {
        moveInfostrTextEnemyA.textContent = "Враг заморожен";
        console.log("test3");
      } else if (enemy.frozen == false) {
        if (enemy.endAttack) {
          enemy.attack = getRealAttackEnemy();
          if (enemy.attack <= 0) enemy.attack = 1;
          critText(enemy.attack, enemy.orCrit, "Enemy");
        } else if (playerDodge) {
          //уворот игрока
          console.log("Игрок увернулся");
          moveInfostrTextEnemyA.textContent = "Враг промахнулся ";
          enemy.attack = 0;
        } else if (!playerDodge) {
          // использование способности у врага

          createDamadgeSkills(enemy, enemyMonster, skillDamadgeEnemy, player);
        }
      }

      //здесь рассчитывается урон способностей от игрока обычно

      if (player.endAttack) {
        enemy.HP = enemy.HP - player.attack;
      }
      damadgeSkills(
        player,
        enemy,
        mapMonsters.get(oldMonsterFightP),
        enemyMonster,
        skillDamadgePlayer
      );

      //здесь рассчитывается урон способностей от врага обычно

      if (enemy.endAttack) {
        player.HP = player.HP - enemy.attack;
      }
      damadgeSkills(
        enemy,
        player,
        enemyMonster,
        mapMonsters.get(oldMonsterFightP),
        skillDamadgeEnemy
      );

      // Здесь подсчитывается итог здоровья и маны после боя
      HpFightPlayer.textContent = player.HP;
      ManaFightPlayer.textContent = player.Mana;
      HpFightEnemy.textContent = enemy.HP;
      ManaFightEnemy.textContent = enemy.Mana;

      //крит обычной атаки
      player.orCrit = false;
      enemy.orCrit = false;
    }
    if (enemy.HP <= 0 && player.HP > 0) {
      progressLvlMinus(oldEnemyLevel);
      player.percentHighHumidity = 0;
      mapMonsters.get(oldMonsterFightP).highHumidity = false;
      enemy.percentHighHumidity = 0;
      enemyMonster.highHumidity = false;

      chacnceUpAttribute(mapMonsters.get(oldMonsterFightP), 150);
      poleFightsHaveMonsterEnemy = false;
      poleFightsHaveMonsterPlayer = false;
      mapMonsters.get(oldMonsterFightP).currentHP = player.HP;
      mapMonsters.get(oldMonsterFightP).currentMana = player.Mana;

      let fightMoney = Math.floor(oldEnemyLevel * 30 + getRandomInt(0, 9));

      delete1Monster(oldMonsterFightP);
      delete1Monster(enemyMonster.id);
      updateMonsters(true);

      money.textContent = Math.floor(money.textContent) + fightMoney;
      console.log("Вы заработали за бой: ", fightMoney);
      moveInfostrTextM.textContent = "Вы заработали за бой: " + fightMoney;

      //chacnceNewMonster(150);
      //chacnceNewMonster(300);
      //chacnceNewMonster(450);

      win("Player");
    } else if (player.HP <= 0) {
      poleFightsHaveMonsterEnemy = false;
      poleFightsHaveMonsterPlayer = false;
      delete1MonsterFull(oldMonsterFightP);
      delete1Monster(enemyMonster.id);

      win("enemy");
    } else {
      attackButtonPl.disabled = false;
      skillButtonPl1.disabled = false;
      skillButtonPl2.disabled = false;
      skillButtonPl3.disabled = false;
    }
  }
}

function fight() {
  //если poleFightsHaveMonsterPlayer true, создает Enemy ставит poleFightsHaveMonsterEnemy true
  if (!poleFightsHaveMonsterEnemy && poleFightsHaveMonsterPlayer) {
    oldEnemyLevel = levelEnemy;

    moveInfostrTextPlayerA.textContent = "";
    moveInfostrTextEnemyA.textContent = "";

    moveInfostrTextW.textContent = "";
    moveInfostrTextM.textContent = "";
    moveInfostrTextNM.textContent = "";
    moveInfostrTextD.textContent = "";

    //console.log("oldEnemyLevel", oldEnemyLevel);

    //если poleFightsHaveMonsterEnemy false,

    let enemyM = new Monster("bot", -1, false);
    //console.log("fight countId:", countId);

    enemyM.bot(levelEnemy);

    enemyM.divMonster(TOTAL_MONSTERS_FIGHT_ENEMY);
    poleFightsHaveMonsterEnemy = true;

    enemyMonster = enemyM;

    player.HP = mapMonsters.get(oldMonsterFightP).getCurrentHP();
    player.Mana = mapMonsters.get(oldMonsterFightP).getCurrentMana();

    enemy.HP = enemyMonster.getHp();
    //console.log(enemy.HP);
    enemy.Mana = enemyMonster.getMana();

    HpFightPlayer.textContent = player.HP;
    ManaFightPlayer.textContent = player.Mana;
    HpFightEnemy.textContent = enemy.HP;
    ManaFightEnemy.textContent = enemy.Mana;

    try {
      skillNamePl0.textContent =
        mapMonsters.get(oldMonsterFightP).skillBacpack[0].text;
      skillNamePl1.textContent =
        mapMonsters.get(oldMonsterFightP).skillBacpack[1].text;
      skillNamePl2.textContent =
        mapMonsters.get(oldMonsterFightP).skillBacpack[2].text;
    } catch (error) {}

    fightButton.disabled = true;
    attackButtonPl.disabled = false;
    skillButtonPl1.disabled = false;
    skillButtonPl2.disabled = false;
    skillButtonPl3.disabled = false;
  }
}
