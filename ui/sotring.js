function updateMonsters(regen) {
  //try {
  if (!poleFightsHaveMonsterEnemy && !poleFightsHaveMonsterPlayer) {
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
          monster.currentMana += getRandomInt(1, 20);
        }
        if (monster.getCurrentHP() < monster.getHp()) {
          monster.currentHP += getRandomInt(1, 3);
        }
        if (monster.getCurrentMana() > monster.getMana()) {
          monster.currentMana = monster.getMana();
        }
        if (monster.getCurrentHP() > monster.getHp()) {
          monster.currentHP = monster.getHp();
        }
        monster.highHumidity = false;
      }

      if (isSorting.checked) {
      } else {
        monster.divMonster(TOTAL_MONSTERS_BACKUP);
      }

      selectPolMonster(monster);
    }
    if (isSorting.checked) {
      sort();
    }
    try {
      colorBorderMama = document.getElementById(
        mamaTarget + TOTAL_TEG_MONSTER_CARD
      );
      colorBorderMama.classList.add("sexMama");

      colorBorderPapa = document.getElementById(
        papaTarget + TOTAL_TEG_MONSTER_CARD
      );

      colorBorderPapa.classList.add("sexPapa");
    } catch (error) {}
  }
  //} catch (error) {}
}

{
  /* 
<option value="-1"></option>
<option value="0">Реверс</option>
<option value="1">Сила</option>
<option value="2">Ловкость</option>
<option value="3">Интеллект</option>
<option value="4">Вынослиовсть</option>
<option value="5">Уровень</option>
<option value="6">Пол</option>
<option value="7">Редкость</option>
<option value="8">Здоровье</option>
<option value="7">Мана</option>
<option value="9">Атака</option>
<option value="10">Броня</option>
<option value="11">Уворот</option>
<option value="12">Крит</option>
<option value="13">Способность 1</option>
<option value="14">Способность 2</option>
<option value="15">Способность 3</option> 
*/
}

let arrayMonstters = [];
let xSort;

function helpSort(monster, number) {
  xSort = new Map([
    //[-1, "none"],
    [0, monster.id],
    [1, monster.strength],
    [2, monster.agility],
    [3, monster.intelligence],
    [4, monster.endurance],
  ]);
  //console.log(number + " " + xSort.get(number));

  return xSort.get(number);
}

function sort() {
  if (!poleFightsHaveMonsterEnemy) {
    if (isSorting.checked) {
      arrayMonstters = [];
      for (let monster of mapMonsters.values()) {
        arrayMonstters.push([helpSort(monster, TOTAL_ID_SORTING), monster]);
      }
    }
    sorting();
    divArrayMonsters();
  }
}

function sorting() {
  if (isSorting.checked) {
    arrayMonstters.sort((a, b) => b[0] - a[0]);

    //arrayMonstters.reverse();
  }
}

function divArrayMonsters() {
  for (let i = 0; i < arrayMonstters.length; i++) {
    arrayMonstters[i][1].divMonster(TOTAL_MONSTERS_BACKUP);
  }
}
