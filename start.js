function selectPolMonsterDelete(id) {
  try {
    papaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}

  try {
    mamaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}
}

function createMessageSkill(Player, name, text) {
  let help = "moveInfostrText" + Player;
  console.log(help);
  if (document.getElementById(help + name)) {
    document.getElementById(help + name).textContent = text;
  } else {
    let x = document.createElement("div");
    x.id = help + name;
    x.textContent = text;

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
function deleteAllMessagesSkills() {
  helpdeleteAllMessagesSkills("Player");
  helpdeleteAllMessagesSkills("Enemy");
}
function delete1Monster(id) {
  try {
    if (document.getElementById(id + TOTAL_TEG_MONSTER_CARD) != undefined) {
      document.getElementById(id + TOTAL_TEG_MONSTER_CARD).remove();
      return true;
    } else return false;
  } catch (error) {
    console.log("ERROR: Я хуй знает, как ты все сломал.. \nПодробнее:", error);
  }
}

function delete1MonsterFull(id) {
  if (document.getElementById(id + TOTAL_TEG_MONSTER_CARD) != undefined) {
    document.getElementById(id + TOTAL_TEG_MONSTER_CARD).remove();
    selectPolMonsterDelete(id);
    //console.log(id);
    mapMonsters.delete(id);
    //console.log(mapMonsters);
    return true;
  } else return false;
}

function updateMonsters() {
  //try {
  if (!poleFightsHaveMonsterEnemy) {
    if (TOTAL_CHEAT) {
      createNewMonster();
      mapMonsters.get(countId).strength = 1000;
      mapMonsters.get(countId).agility = 1000;
      mapMonsters.get(countId).intelligence = 1000;
      TOTAL_CHEAT = false;
    }

    for (let monster of mapMonsters.values()) {
      //console.log(monster.id);
      if (monster.lvl <= -1) {
        console.log(
          monster.name,
          " ",
          monster.surname,
          " id: ",
          monster.id,
          "покинул наш мир"
        );
        delete1MonsterFull(monster.id);
      } else delete1Monster(monster.id);

      selectPolMonsterDelete(monster.id);
    }

    for (let monster of mapMonsters.values()) {
      //console.log(monster.id);

      if (monster.getCurrentMana() < monster.getMana()) {
        monster.currentMana += 10;
      }
      if (monster.getCurrentMana() > monster.getMana()) {
        monster.currentMana = monster.getMana();
      }
      monster.divMonster(TOTAL_MONSTERS_BACKUP);
      selectPolMonster(monster);
    }
    try {
      colorBorderMama = document.getElementById(
        mamaTarget + TOTAL_TEG_MONSTER_CARD
      );
      colorBorderMama.classList.add("mamaBorder");

      colorBorderPapa = document.getElementById(
        papaTarget + TOTAL_TEG_MONSTER_CARD
      );

      colorBorderPapa.classList.add("papaBorder");
    } catch (error) {}
  }
  //} catch (error) {}
}

function clearMonsters() {
  //try {
  if (!poleFightsHaveMonsterEnemy) {
    for (let monster of mapMonsters.values()) {
      //console.log(monster.id);
      //delete1Monster(monster.id);
      delete1MonsterFull(monster.id);

      selectPolMonsterDelete(monster.id);
    }
  }
  //} catch (error) {}
  //console.log(mapMonsters);
}

function updateEnemyMonster() {
  //let monster = enemyMonster;
  delete1Monster(enemyMonster.id);
  enemyMonster.divMonster(TOTAL_MONSTERS_FIGHT_ENEMY);
}

function getCurrentMonsterFight(currentMonsterFight) {
  //console.log("getCurrentMonsterFight: ", mapMonsters);

  if (!poleFightsHaveMonsterEnemy) {
    fightButton.disabled = false;
    if (oldMonsterFightP != -1) {
      delete1Monster(oldMonsterFightP);
      updateMonsters();
    }
    delete1Monster(currentMonsterFight);
    selectPolMonsterDelete(currentMonsterFight);
    //console.log("currentMonsterFight: ", currentMonsterFight);
    //monsters[currentMonsterFight].divMonster(TOTAL_MONSTERS_FIGHT_PLAYER);
    mapMonsters
      .get(currentMonsterFight)
      .divMonster(TOTAL_MONSTERS_FIGHT_PLAYER);

    oldMonsterFightP = currentMonsterFight;
    poleFightsHaveMonsterPlayer = true;

    //если игрок на столе то true, чтобы можно было начать бой
  }
}

function createNewMonster() {
  //console.log("createNewMonster countId", countId);
  let newMonster = null;
  newMonster = new Monster(names[getRandomInt(0, names.length)], true);
  newMonster.divMonster(TOTAL_MONSTERS_BACKUP);
  selectPolMonster(newMonster);
  mapMonsters.set(countId, newMonster);
}

function testMonsters() {
  for (let monster of mapMonsters.values()) {
    monster.strength = 50;
    monster.agility = 50;
    monster.intelligence = 50;
    monster.setSkillBacpack(createNewSkill(getRandomInt(1, 10), false, 0, -1));
    monster.setSkillBacpack(createNewSkill(getRandomInt(1, 10), false, 0, -1));
    monster.setSkillBacpack(createNewSkill(getRandomInt(1, 10), false, 0, -1));
    let minLvl = document.getElementById("id_Count");
    let minLvl2 = document.getElementById("id_range");

    minLvl.textContent = 6;
    minLvl2.value = 6;
    levelEnemy = 6;
  }
}

function attackButtonCLick() {
  attackButtonPl.disabled = true;
  skillButtonPl1.disabled = false;
  skillButtonPl2.disabled = false;
  skillButtonPl3.disabled = false;
  endMoveButtonPl.disabled = false;
  endMovePlayerText.textContent =
    TOTAL_PLAYER_MOVE_END_TEXT + "просто атакуете";
  endAttackPl = true;

  if (skillDamadgePlayer.waterDamadge[0] == undefined) {
    enemyMonster.highHumidity = false;
    updateEnemyMonster(enemyMonster);
  }
}
function useAbilityPl(id) {
  let x = 0;
  endAttackPl = false;
  if (id == skillButtonPl1.id) {
    skillButtonPl1.disabled = true;
    skillButtonPl2.disabled = false;
    skillButtonPl3.disabled = false;
    x = 0;
  } else if (id == skillButtonPl2.id) {
    skillButtonPl1.disabled = false;
    skillButtonPl2.disabled = true;
    skillButtonPl3.disabled = false;
    x = 1;
  } else if (id == skillButtonPl3.id) {
    skillButtonPl1.disabled = false;
    skillButtonPl2.disabled = false;
    skillButtonPl3.disabled = true;
    x = 2;
  }
  attackButtonPl.disabled = false;
  endMoveButtonPl.disabled = false;
  endMovePlayerText.textContent =
    TOTAL_PLAYER_MOVE_END_TEXT + "используете " + `${x + 1}` + " способность";
  endSkillPl = x;

  if (skillDamadgePlayer.waterDamadge[0] == undefined) {
    enemyMonster.highHumidity = false;
    updateEnemyMonster(enemyMonster);
  }
}

function helpnulSkills1(el) {
  el = [];
}
function helpnulSkills2(el) {
  el = 0;
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

  fightButton.disabled = false;
  attackButtonPl.disabled = true;
  skillButtonPl1.disabled = true;
  skillButtonPl2.disabled = true;
  skillButtonPl3.disabled = true;

  moveInfostrTextW.textContent = "Победил: " + winner;
}
function getRealAttackPlayer() {
  // Формирование обычной атаки
  let attack = mapMonsters.get(oldMonsterFightP).getAttack();
  //Использует новый подсчет атаки у сырого монстра
  if (mapMonsters.get(oldMonsterFightP).highHumidity == true) {
    attack = getHighHumidityAttribute(newAttack);
  }
  //

  let newAttack = getRandomCrit(
    attack,
    mapMonsters.get(oldMonsterFightP).getCrit()
  );
  //console.log("attack:" + attack, " crit:" + newAttack);
  if (newAttack > attack) {
    playerOrCrit = true;
  } else {
    playerOrCrit = false;
  }
  newAttack = newAttack - enemyMonster.getArmor();
  return newAttack;
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
    newAttack = getHighHumidityAttribute(newAttack);
  }
  //

  //крит
  let enemyAttack = getRandomCrit(newAttack, enemyMonster.getCrit());

  if (enemyAttack > newAttack) {
    enemyOrCrit = true;
  } else {
    enemyOrCrit = false;
  }
  enemyAttack = enemyAttack - mapMonsters.get(oldMonsterFightP).getArmor();
  return enemyAttack;
}
function endMove() {
  attackButtonPl.disabled = true;
  skillButtonPl1.disabled = true;
  skillButtonPl2.disabled = true;
  skillButtonPl3.disabled = true;
  endMoveButtonPl.disabled = true;

  moveInfostrTextPlayerA.textContent = "";
  moveInfostrTextEnemyA.textContent = "";
  deleteAllMessagesSkills();
  moveInfostrTextW.textContent = "";
  moveInfostrTextNM.textContent = "";

  moveInfostrTextM.textContent = "";
  moveInfostrTextD.textContent = "";

  let textPlayer = "";
  let textEnemy = "";

  // переменные для атаки
  let playerAttack = 0;
  let enemyAttack = 0;
  let playerDodge = false;
  let enemyDodge = false;

  // для скиллов
  let stunEnemy = false;

  if (poleFightsHaveMonsterEnemy) {
    if (playerHp >= 0 && enemyHp >= 0) {
      // шанс увернуться от урона игроком
      playerDodge = getRandomPercent(
        100,
        mapMonsters.get(oldMonsterFightP).getDodge()
      );
      enemyDodge = getRandomPercent(100, enemyMonster.getDodge());
      //

      // Рассчет обычной атаки игрока
      if (endAttackPl) {
        playerAttack = getRealAttackPlayer();
        if (playerAttack <= 0) playerAttack = 1;

        critText(playerAttack, playerOrCrit, "Player");
        //
      } else if (!enemyDodge) {
        // использование способности у игрока
        if (playerMana >= mapMonsters.get(oldMonsterFightP).intelligence) {
          let skill =
            mapMonsters.get(oldMonsterFightP).skillBacpack[endSkillPl];
          if (skill) {
            if (skill.type == TOTAL_TYPE_SKILL_FIRE_BREATH) {
              skillDamadgePlayer.fireDamadge = skill.getDamadge(
                mapMonsters.get(oldMonsterFightP).intelligence
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_POISONOUS_BREATH) {
              skillDamadgePlayer.poisonousDamadge = skill.getDamadge(
                mapMonsters.get(oldMonsterFightP).agility
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_ICE_BREATH) {
              skillDamadgePlayer.iceDamadge = skill.getDamadge(
                mapMonsters.get(oldMonsterFightP).intelligence
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_WATER_STRIKE) {
              skillDamadgePlayer.waterDamadge = skill.getDamadge(
                mapMonsters.get(oldMonsterFightP).intelligence
              );
              waterFirstPl = true;
            } else if (skill.type == TOTAL_TYPE_SKILL_LIGHTING_STRIKE) {
              skillDamadgePlayer.lightingDamadge = skill.formula(
                mapMonsters.get(oldMonsterFightP).intelligence
              );
              console.log(
                "lightingDamadge",
                skillDamadgePlayer.lightingDamadge
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_WAMPIRISM) {
              skillDamadgePlayer.wampirismDamadge = skill.formula(
                mapMonsters.get(oldMonsterFightP).getAttack()
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_BLADEMAIL) {
              skillDamadgePlayer.blademailDamadge = skill.formula();
            }

            playerMana = Math.floor(
              playerMana - mapMonsters.get(oldMonsterFightP).intelligence
            );
          }
        } else {
          console.log("Игроку не хватило маны");
          moveInfostrTextPlayerA.textContent = "Вам не хватает маны: ";
        }
      }
      //Уворот противника
      if (enemyDodge) {
        console.log("Враг увернулся");
        moveInfostrTextPlayerA.textContent = "Вы промахнулись ";
        deleteAllMessagesSkills();
      }

      //
      if (skillDamadgePlayer.waterDamadge[0] != undefined) {
        percentHighHumidityEn = skillDamadgePlayer.waterDamadge[0];
        if (waterFirstPl == true) {
          playerAttack =
            "[" +
            skillDamadgePlayer.waterDamadge.length +
            "]" +
            "Облили врага: " +
            percentHighHumidityEn +
            "%";
          createMessageSkill(
            "Player",
            TOTAL_TYPE_SKILL_WATER_STRIKE,
            playerAttack
          );
          waterFirstPl = false;
        } else if (waterFirstPl == false) {
          textEnemy =
            "[" +
            skillDamadgePlayer.waterDamadge.length +
            "]" +
            "Вы сырой: " +
            percentHighHumidityEn +
            "%";
          createMessageSkill("Enemy", TOTAL_TYPE_SKILL_WATER_STRIKE, textEnemy);
        }

        //console.log("percentHighHumidityEn: ", percentHighHumidityEn);
        enemyMonster.highHumidity = true;
        updateEnemyMonster(enemyMonster);
        skillDamadgePlayer.waterDamadge.shift();
      } else {
        deleteMessageSkill("Player", TOTAL_TYPE_SKILL_WATER_STRIKE);
      }

      // Рассчет обычной атаки врага
      if (endAttackEn) {
        if (skillDamadgePlayer.iceDamadge[0] != undefined) {
          console.log("Враг заморожен");
          moveInfostrTextEnemyA.textContent = "Враг заморожен ";
          enemyAttack = 0;
        } else {
          enemyAttack = getRealAttackEnemy();
          if (enemyAttack <= 0) enemyAttack = 1;
          critText(enemyAttack, enemyOrCrit, "Enemy");
          //console.log(enemyAttack);
        }
      } else {
      }

      if (playerDodge) {
        console.log("Игрок увернулся");
      } else if (!playerDodge) {
        if (endAttackEn) {
          playerHp = playerHp - enemyAttack;
        }
      }

      //здесь рассчитывается урон способностей обычно
      if (true) {
        if (endAttackPl) {
          enemyHp = enemyHp - playerAttack;
        }
        if (skillDamadgePlayer.fireDamadge[0] != undefined) {
          enemyHp = enemyHp - skillDamadgePlayer.fireDamadge[0];
          textPlayer =
            "[" +
            skillDamadgePlayer.fireDamadge.length +
            "]" +
            " Поджигаете противника: " +
            skillDamadgePlayer.fireDamadge[0];
          createMessageSkill(
            "Player",
            TOTAL_TYPE_SKILL_FIRE_BREATH,
            textPlayer
          );

          console.log("еще ожёг: ", skillDamadgePlayer.fireDamadge[0]);

          skillDamadgePlayer.fireDamadge.shift();
        } else {
          deleteMessageSkill("Player", TOTAL_TYPE_SKILL_FIRE_BREATH);
        }
        if (skillDamadgePlayer.poisonousDamadge[0] != undefined) {
          enemyHp = enemyHp - skillDamadgePlayer.poisonousDamadge[0];
          console.log("еще яд: ", skillDamadgePlayer.poisonousDamadge[0]);
          textPlayer =
            "[" +
            skillDamadgePlayer.poisonousDamadge.length +
            "]" +
            "Отравляете противника: " +
            skillDamadgePlayer.poisonousDamadge[0];
          createMessageSkill(
            "Player",
            TOTAL_TYPE_SKILL_POISONOUS_BREATH,
            textPlayer
          );

          skillDamadgePlayer.poisonousDamadge.shift();
        } else {
          deleteMessageSkill("Player", TOTAL_TYPE_SKILL_POISONOUS_BREATH);
        }
        if (skillDamadgePlayer.iceDamadge[0] != undefined) {
          enemyHp = enemyHp - skillDamadgePlayer.iceDamadge[0];
          textPlayer =
            "[" +
            skillDamadgePlayer.iceDamadge.length +
            "]" +
            "Замораживаете противника: " +
            skillDamadgePlayer.iceDamadge[0];
          createMessageSkill("Player", TOTAL_TYPE_SKILL_ICE_BREATH, textPlayer);

          console.log("еще мороз: ", skillDamadgePlayer.iceDamadge[0]);

          skillDamadgePlayer.iceDamadge.shift();
        } else {
          deleteMessageSkill("Player", TOTAL_TYPE_SKILL_ICE_BREATH);
        }
        if (skillDamadgePlayer.lightingDamadge != 0) {
          let water = 1;
          if (enemyMonster.highHumidity == true) {
            water = 2;
            textPlayer =
              "поражаете сырого противника молнией: " +
              skillDamadgePlayer.lightingDamadge * water;
          } else {
            textPlayer =
              "выстреливаете молнией: " + skillDamadgePlayer.lightingDamadge;
          }
          createMessageSkill(
            "Player",
            TOTAL_TYPE_SKILL_LIGHTING_STRIKE,
            textPlayer
          );
          enemyHp = enemyHp - skillDamadgePlayer.lightingDamadge * water;
          console.log(
            "Удар молнией ",
            skillDamadgePlayer.lightingDamadge * water
          );

          skillDamadgePlayer.lightingDamadge = 0;
        } else {
          deleteMessageSkill("Player", TOTAL_TYPE_SKILL_LIGHTING_STRIKE);
        }
        if (skillDamadgePlayer.wampirismDamadge != 0) {
          playerAttack = getRealAttackPlayer();
          enemyHp = enemyHp - playerAttack;
          console.log(
            "Исцеление вампира ",
            skillDamadgePlayer.wampirismDamadge,
            "атака игрока",
            playerAttack
          );
          //moveInfostrTextPlayerA.textContent = "Вы атакуете: " + playerAttack;

          critText(playerAttack, playerOrCrit, "Player");
          textPlayer =
            "Исцеление вампира: " + skillDamadgePlayer.wampirismDamadge;
          createMessageSkill("Player", TOTAL_TYPE_SKILL_WAMPIRISM, textPlayer);

          if (playerHp <= mapMonsters.get(oldMonsterFightP).getHp()) {
            playerHp = playerHp + skillDamadgePlayer.wampirismDamadge;
          }
          skillDamadgePlayer.wampirismDamadge = 0;
        } else {
          deleteMessageSkill("Player", TOTAL_TYPE_SKILL_WAMPIRISM);
        }
        if (skillDamadgePlayer.blademailDamadge != 0) {
          playerAttack = getRealAttackPlayer();
          enemyHp = enemyHp - playerAttack;

          let itog = Math.floor(
            (enemyMonster.getAttack() / 100) *
              skillDamadgePlayer.blademailDamadge
          );
          critText(playerAttack, playerOrCrit, "Player");
          textPlayer = "Отразили: " + itog;
          createMessageSkill("Player", TOTAL_TYPE_SKILL_BLADEMAIL, textPlayer);

          console.log("Отражение ", itog);
          enemyHp = enemyHp - itog;
          skillDamadgePlayer.blademailDamadge = 0;
        } else {
          deleteMessageSkill("Player", TOTAL_TYPE_SKILL_BLADEMAIL);
        }
      }

      // Здесь подсчитывается итог здоровья и маны после боя
      HpFightPlayer.textContent = playerHp;
      ManaFightPlayer.textContent = playerMana;
      HpFightEnemy.textContent = enemyHp;
      ManaFightEnemy.textContent = enemyMana;

      //крит обычной атаки
      playerOrCrit = false;
      enemyOrCrit = false;
    }
  }
  if (enemyHp <= 0 && playerHp > 0) {
    chacnceUpAttribute(mapMonsters.get(oldMonsterFightP), 150);
    poleFightsHaveMonsterEnemy = false;
    poleFightsHaveMonsterPlayer = false;
    mapMonsters.get(oldMonsterFightP).currentHP = playerHp;
    mapMonsters.get(oldMonsterFightP).currentMana = playerMana;

    let fightMoney = Math.floor(oldEnemyLevel * 30 + getRandomInt(0, 9));

    delete1Monster(oldMonsterFightP);
    delete1Monster(enemyMonster.id);
    updateMonsters();

    money.textContent = Math.floor(money.textContent) + fightMoney;
    console.log("Вы заработали за бой: ", fightMoney);
    moveInfostrTextM.textContent = "Вы заработали за бой: " + fightMoney;

    chacnceNewMonster(150);
    chacnceNewMonster(300);
    chacnceNewMonster(450);

    win("Player");
  } else if (playerHp <= 0) {
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

function fight() {
  //если poleFightsHaveMonsterPlayer true, создает Enemy ставит poleFightsHaveMonsterEnemy true
  if (!poleFightsHaveMonsterEnemy && poleFightsHaveMonsterPlayer) {
    oldEnemyLevel = levelEnemy;

    moveInfostrTextPlayerA.textContent = "";
    moveInfostrTextEnemyA.textContent = "";
    deleteAllMessagesSkills();
    moveInfostrTextW.textContent = "";
    moveInfostrTextM.textContent = "";
    moveInfostrTextNM.textContent = "";
    moveInfostrTextD.textContent = "";

    //console.log("oldEnemyLevel", oldEnemyLevel);

    //если poleFightsHaveMonsterEnemy false,

    let enemy = new Monster("bot", -1, false);
    //console.log("fight countId:", countId);
    enemy.bot(levelEnemy);
    enemy.divMonster(TOTAL_MONSTERS_FIGHT_ENEMY);
    poleFightsHaveMonsterEnemy = true;

    enemyMonster = enemy;

    playerHp = mapMonsters.get(oldMonsterFightP).getCurrentHP();
    playerMana = mapMonsters.get(oldMonsterFightP).getCurrentMana();

    enemyHp = enemyMonster.getHp();
    enemyMana = enemyMonster.getMana();

    HpFightPlayer.textContent = playerHp;
    ManaFightPlayer.textContent = playerMana;
    HpFightEnemy.textContent = enemyHp;
    ManaFightEnemy.textContent = enemyMana;
    fightButton.disabled = true;
    attackButtonPl.disabled = false;
    skillButtonPl1.disabled = false;
    skillButtonPl2.disabled = false;
    skillButtonPl3.disabled = false;
  }
}

function startGame() {
  let noMoreWomens = 1;

  for (let i = 0; i < TOTAL_SIZE_ARR; i++) {
    createNewMonster();

    //console.log("i:", i, "countId:", countId);
    if (i > 0 && mapMonsters.get(i - 1).pol == mapMonsters.get(i).pol) {
      noMoreWomens++;
    }
  }
  if (noMoreWomens == TOTAL_SIZE_ARR) {
    mapMonsters.get(0).pol = !mapMonsters.get(0).pol;
    console.log("Долой однополые браки");
    updateMonsters();
  }
  //console.log(noMoreWomens);
  //testMonsters();
  updateMonsters();

  //localStorage.myMap = JSON.stringify(Array.from(mapMonsters));
  select();
}

Events();
startGame();
