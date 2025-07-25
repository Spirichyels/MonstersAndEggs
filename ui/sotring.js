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
          monster.currentMana += 15;
        }
        if (monster.getCurrentHP() < monster.getHp()) {
          monster.currentHP += 4;
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
    [
      1,
      monster.getEndurance() +
        monster.getStrength() +
        monster.getAgility() +
        monster.getIntelligence(),
    ],
    [2, monster.getEndurance()],
    [3, monster.getStrength()],
    [4, monster.getAgility()],
    [5, monster.getIntelligence()],
    [6, monster.lvl],
  ]);
  //console.log(number + " " + xSort.get(number));

  return xSort.get(number);
}

function sort2(monster) {
  if (isCommon.checked && monster.rarity == TOTAL_RARITY_COMMON) {
    sort3(monster);
  }
  if (isUnusual.checked && monster.rarity == TOTAL_RARITY_UNUSUAL) {
    sort3(monster);
  }
  if (isRare.checked && monster.rarity == TOTAL_RARITY_RARE) {
    sort3(monster);
  }
  if (isVeryRare.checked && monster.rarity == TOTAL_RARITY_VERY_RARE) {
    sort3(monster);
  }
}

function sort3(monster) {
  if (isDissapering.checked && monster.status == TOTAL_STATUS_DISSAPERING) {
    arrayMonstters.push([helpSort(monster, TOTAL_ID_SORTING), monster]);
  }
  if (isFlexible.checked && monster.status == TOTAL_STATUS_FELXIBLE) {
    arrayMonstters.push([helpSort(monster, TOTAL_ID_SORTING), monster]);
  }
  if (isCompleted.checked && monster.status == TOTAL_STATUS_COMPLETED) {
    arrayMonstters.push([helpSort(monster, TOTAL_ID_SORTING), monster]);
  }
}

function sort() {
  if (!poleFightsHaveMonsterEnemy) {
    if (isSorting.checked) {
      arrayMonstters = [];
      for (let monster of mapMonsters.values()) {
        if (isWoman.checked && monster.pol == false) {
          //arrayMonstters.push([helpSort(monster, TOTAL_ID_SORTING), monster]);
          sort2(monster);
        }
        if (isMan.checked && monster.pol == true) {
          sort2(monster);
        }
      }
    }
    sorting();
    divArrayMonsters();
  }
}

function sorting() {
  if (isSorting.checked) {
    if (isReverce.checked) {
      arrayMonstters.sort((a, b) => a[0] - b[0]);
    } else {
      arrayMonstters.sort((a, b) => b[0] - a[0]);
    }

    //arrayMonstters.reverse();
  }
}

function divArrayMonsters() {
  for (let i = 0; i < arrayMonstters.length; i++) {
    arrayMonstters[i][1].divMonster(TOTAL_MONSTERS_BACKUP);
  }
}
