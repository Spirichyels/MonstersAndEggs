function selectPolMonsterDelete(id) {
  try {
    papaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}

  try {
    mamaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}
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

  if (waterDamadgePl[0] == undefined) {
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
    TOTAL_PLAYER_MOVE_END_TEXT + "используете " + x + " способность";
  endSkillPl = x;

  if (waterDamadgePl[0] == undefined) {
    enemyMonster.highHumidity = false;
    updateEnemyMonster(enemyMonster);
  }
}
function win(winner) {
  console.log("Победил: ", winner);
  fireDamadgePl = [];
  poisonousDamadgePl = [];
  iceDamadgePl = [];
  waterDamadgePl = [];

  lightingDamadgePl = 0;
  wampirismDamadgePl = 0;
  blademailDamadgePl = 0;

  fightButton.disabled = false;
  attackButtonPl.disabled = true;
  skillButtonPl1.disabled = true;
  skillButtonPl2.disabled = true;
  skillButtonPl3.disabled = true;
}
function getRealAttackPlayer() {
  let attack = getRandomCrit(
    mapMonsters.get(oldMonsterFightP).getAttack(),
    mapMonsters.get(oldMonsterFightP).getCrit()
  );
  attack = attack - enemyMonster.getArmor();
  return attack;
}

function getRealAttackEnemy() {
  let newAttack = enemyMonster.getAttack();

  if (enemyMonster.highHumidity == true) {
    newAttack = getHighHumidityAttribute(newAttack);
  }

  let enemyAttack = getRandomCrit(newAttack, enemyMonster.getCrit());
  enemyAttack = enemyAttack - mapMonsters.get(oldMonsterFightP).getArmor();
  return enemyAttack;
}
function endMove() {
  attackButtonPl.disabled = true;
  skillButtonPl1.disabled = true;
  skillButtonPl2.disabled = true;
  skillButtonPl3.disabled = true;
  endMoveButtonPl.disabled = true;

  // переменные для атаки
  let playerAttack = 0;
  let enemyAttack = 0;
  let playerDodge = false;
  let enemyDodge = false;

  // для скиллов
  let stunEnemy = false;

  if (poleFightsHaveMonsterEnemy) {
    if (playerHp >= 0 && enemyHp >= 0) {
      // шанс увернуться от урона
      playerDodge = getRandomPercent(
        100,
        mapMonsters.get(oldMonsterFightP).getDodge()
      );
      enemyDodge = getRandomPercent(100, enemyMonster.getDodge());
      //

      // Рассчет обычной атаки
      if (endAttackPl) {
        // playerAttack = getRandomCrit(
        //   mapMonsters.get(oldMonsterFightP).getAttack(),
        //   mapMonsters.get(oldMonsterFightP).getCrit()
        // );
        // playerAttack = playerAttack - enemyMonster.getArmor();

        playerAttack = getRealAttackPlayer();
        if (playerAttack <= 0) playerAttack = 1;
      } else {
        if (playerMana >= mapMonsters.get(oldMonsterFightP).intelligence) {
          let skill =
            mapMonsters.get(oldMonsterFightP).skillBacpack[endSkillPl];
          if (skill) {
            if (skill.type == TOTAL_TYPE_SKILL_FIRE_BREATH) {
              fireDamadgePl = skill.getDamadge(
                mapMonsters.get(oldMonsterFightP).intelligence
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_POISONOUS_BREATH) {
              poisonousDamadgePl = skill.getDamadge(
                mapMonsters.get(oldMonsterFightP).agility
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_ICE_BREATH) {
              iceDamadgePl = skill.getDamadge(
                mapMonsters.get(oldMonsterFightP).intelligence
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_WATER_STRIKE) {
              waterDamadgePl = skill.getDamadge(
                mapMonsters.get(oldMonsterFightP).intelligence
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_LIGHTING_STRIKE) {
              lightingDamadgePl = skill.formula(
                mapMonsters.get(oldMonsterFightP).intelligence
              );
              console.log("lightingDamadge", lightingDamadgePl);
            } else if (skill.type == TOTAL_TYPE_SKILL_WAMPIRISM) {
              wampirismDamadgePl = skill.formula(
                mapMonsters.get(oldMonsterFightP).getAttack()
              );
            } else if (skill.type == TOTAL_TYPE_SKILL_BLADEMAIL) {
              blademailDamadgePl = skill.formula();
            }

            playerMana = Math.floor(
              playerMana - mapMonsters.get(oldMonsterFightP).intelligence
            );
          }
        } else {
          console.log("Игроку не хватило маны");
        }
      }

      if (waterDamadgePl[0] != undefined) {
        percentHighHumidityEn = waterDamadgePl[0];
        //console.log("percentHighHumidityEn: ", percentHighHumidityEn);
        enemyMonster.highHumidity = true;
        updateEnemyMonster(enemyMonster);
        waterDamadgePl.shift();
      }

      if (endAttackEn) {
        if (iceDamadgePl[0] != undefined) {
          console.log("Враг заморожен");
          enemyAttack = 0;
        } else {
          enemyAttack = getRealAttackEnemy();
          if (enemyAttack <= 0) enemyAttack = 1;

          console.log("enemyAttack:", enemyAttack);
        }
      }

      if (playerDodge) {
        console.log("Игрок увернулся");
      } else if (!playerDodge) {
        if (endAttackEn) {
          playerHp = playerHp - enemyAttack;
        }
      }

      if (enemyDodge) {
        console.log("Враг увернулся");
        if (fireDamadgePl[0] != undefined) fireDamadgePl.shift();
      } else if (!enemyDodge) {
        if (endAttackPl) {
          enemyHp = enemyHp - playerAttack;
        }
        if (fireDamadgePl[0] != undefined) {
          enemyHp = enemyHp - fireDamadgePl[0];
          console.log("еще ожёг: ", fireDamadgePl[0]);
          fireDamadgePl.shift();
        }
        if (poisonousDamadgePl[0] != undefined) {
          enemyHp = enemyHp - poisonousDamadgePl[0];
          console.log("еще яд: ", poisonousDamadgePl[0]);
          poisonousDamadgePl.shift();
        }
        if (iceDamadgePl[0] != undefined) {
          enemyHp = enemyHp - iceDamadgePl[0];
          console.log("еще мороз: ", iceDamadgePl[0]);
          iceDamadgePl.shift();
        }
        if (lightingDamadgePl != 0) {
          let water = 1;
          if (enemyMonster.highHumidity == true) {
            water = 2;
          }
          enemyHp = enemyHp - lightingDamadgePl * water;
          console.log("Удар молнией ", lightingDamadgePl * water);
          lightingDamadgePl = 0;
        }
        if (wampirismDamadgePl != 0) {
          playerAttack = getRealAttackPlayer();
          enemyHp = enemyHp - playerAttack;
          console.log(
            "Исцеление вампира ",
            wampirismDamadgePl,
            "атака игрока",
            playerAttack
          );
          playerHp = playerHp + wampirismDamadgePl;
          wampirismDamadgePl = 0;
        }
        if (blademailDamadgePl != 0) {
          playerAttack = getRealAttackPlayer();
          enemyHp = enemyHp - playerAttack;

          let itog = Math.floor(
            (enemyMonster.getAttack() / 100) * blademailDamadgePl
          );
          console.log("Отражение ", itog);
          enemyHp = enemyHp - itog;
          wampirismDamadgePl = 0;
        }
      }
      HpFightPlayer.textContent = playerHp;
      ManaFightPlayer.textContent = playerMana;
      HpFightEnemy.textContent = enemyHp;
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
  if (!poleFightsHaveMonsterEnemy && poleFightsHaveMonsterPlayer) {
    oldEnemyLevel = levelEnemy;
    //если poleFightsHaveMonsterPlayer true, создает Enemy ставит poleFightsHaveMonsterEnemy true

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
    HpFightPlayer.textContent = playerHp;
    ManaFightPlayer.textContent = playerMana;
    HpFightEnemy.textContent = enemyHp;
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
  //updateMonsters();

  //localStorage.myMap = JSON.stringify(Array.from(mapMonsters));
  select();
}

Events();
startGame();
