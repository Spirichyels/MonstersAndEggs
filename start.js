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

function updateFightMonster() {
  //let monster = enemyMonster;
  delete1Monster(mapMonsters.get(oldMonsterFightP).id);
  mapMonsters.get(oldMonsterFightP).divMonster(TOTAL_MONSTERS_FIGHT_PLAYER);
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
    monster.firstEndurance = 50;
    monster.firstStrength = 50;
    monster.firstAgility = 50;
    monster.firstIntelligence = 50;

    monster.setSkillBacpack(createNewSkill(getRandomInt(1, 10), false, 0, -1));
    monster.setSkillBacpack(createNewSkill(getRandomInt(1, 10), false, 0, -1));
    monster.setSkillBacpack(createNewSkill(getRandomInt(1, 10), false, 0, -1));
    let minLvl = document.getElementById("id_Count");
    let minLvl2 = document.getElementById("id_range");

    progressLVL = {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
    };

    //minLvl.textContent = 6;
    //minLvl2.value = 6;
    //levelEnemy = 6;
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
    //console.log("Долой однополые браки");
    updateMonsters(false);
  }
  test123();
  //console.log(noMoreWomens);
  //testMonsters();
  //updateMonsters(false);

  //localStorage.myMap = JSON.stringify(Array.from(mapMonsters));
  select();
}

Events();
startGame();
