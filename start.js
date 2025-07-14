function selectPolMonsterDelete(id) {
  try {
    papaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}

  try {
    mamaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}
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

function updateMonsters(regen) {
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

      if (regen == true) {
        if (monster.getCurrentMana() < monster.getMana()) {
          monster.currentMana += 10;
        }
        if (monster.getCurrentHP() < monster.getHp()) {
          monster.currentHP += 5;
        }
        if (monster.getCurrentMana() > monster.getMana()) {
          monster.currentMana = monster.getMana();
        }
        if (monster.getCurrentHP() > monster.getHp()) {
          monster.currentHP = monster.getHp();
        }
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
      updateMonsters(false);
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
    monster.endurance = 50;

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

function startGame() {
  let noMoreWomens = 1;

  for (let i = 0; i < TOTAL_SIZE_ARR; i++) {
    createNewMonster();

    //console.log("i:", i, "countId:", countId);
    if (i > 0 && mapMonsters.get(i - 1).pol == mapMonsters.get(i).pol) {
      noMoreWomens++;
    }
  }
  mapMonsters.get(0).setSkillBacpack(createNewSkill(1, false, 0, -1));
  updateMonsters(false);
  if (noMoreWomens == TOTAL_SIZE_ARR) {
    mapMonsters.get(0).pol = !mapMonsters.get(0).pol;
    console.log("Долой однополые браки");
    updateMonsters(false);
  }
  //console.log(noMoreWomens);
  //testMonsters();
  //updateMonsters(false);

  //localStorage.myMap = JSON.stringify(Array.from(mapMonsters));
  select();
}

Events();
startGame();
