function getlvlUp(lvl) {
  let chance = 37; // шанс не получить уровень
  let koeff = 1.02;
  let chanceUpLvl = Math.floor(100 - chance * Math.pow(koeff, lvl));

  if (chanceUpLvl < 50) chanceUpLvl = 50;

  return chanceUpLvl;
}

function sexButtonClick() {
  if (mapMonsters.size < maxBackpack) {
    if (
      mapMonsters.get(papaTarget).lvl < TOTAL_MAX_LEVEL &&
      mapMonsters.get(mamaTarget).lvl < TOTAL_MAX_LEVEL &&
      !poleFightsHaveMonsterPlayer
    ) {
      if (money.textContent >= TOTAL_PRICE_SEX) {
        mapMonsters.get(papaTarget).upLvl();
        mapMonsters.get(mamaTarget).upLvl();

        let newMonster = new Monster(
          names[getRandomInt(0, names.length)],
          false
        );

        //mapMonsters.get(papaTarget).printMonster();
        //mapMonsters.get(mamaTarget).printMonster();

        newMonster.born(papaTarget, mamaTarget);
        //newMonster.printGeneticaMonster();

        mapMonsters.set(countId, newMonster);

        newMonster.lvl = Math.floor(
          (mapMonsters.get(papaTarget).lvl + mapMonsters.get(mamaTarget).lvl) /
            2 -
            getRandomInt(-1, 0)
        );
        monsterMaxLvlEvolution(mapMonsters.get(papaTarget));
        monsterMaxLvlEvolution(mapMonsters.get(mamaTarget));

        //newMonster.surname = mapMonsters.get(papaTarget).surname;
        newMonster.divMonster(TOTAL_MONSTERS_BACKUP);

        selectPolMonster(newMonster);
        money.textContent = Math.floor(money.textContent - TOTAL_PRICE_SEX);
        monsterMaxLvlEvolution(newMonster);
        updateMonsters(true);
      } else console.log("НУЖНО БОЛЬШЕ ЗОЛОТА!");
    } else
      console.log(
        `Один из ваших монстров находится в бою или больше не может размножаться (после ${TOTAL_MAX_LEVEL} лвл нельзя) `
      );

    //console.log(resultGen);
  }
}

//
//
//
function sexButtonClick2() {
  if (
    mapMonsters.get(papaTarget).lvl < TOTAL_MAX_LEVEL &&
    mapMonsters.get(mamaTarget).lvl < TOTAL_MAX_LEVEL &&
    !poleFightsHaveMonsterPlayer
  ) {
    if (money.textContent >= TOTAL_PRICE_SEX) {
      mapMonsters.get(papaTarget).upLvl();
      mapMonsters.get(mamaTarget).upLvl();

      let newMonster = new Monster(names[getRandomInt(0, names.length)], false);

      //mapMonsters.get(papaTarget).printMonster();
      //mapMonsters.get(mamaTarget).printMonster();

      newMonster.born(papaTarget, mamaTarget);
      //newMonster.printGeneticaMonster();

      mapMonsters.set(countId, newMonster);

      newMonster.lvl = Math.floor(
        (mapMonsters.get(papaTarget).lvl + mapMonsters.get(mamaTarget).lvl) /
          2 -
          getRandomInt(-1, 0)
      );
      monsterMaxLvlEvolution(mapMonsters.get(papaTarget));
      monsterMaxLvlEvolution(mapMonsters.get(mamaTarget));

      //newMonster.surname = mapMonsters.get(papaTarget).surname;
      newMonster.divMonster(TOTAL_MONSTERS_BACKUP);

      selectPolMonster(newMonster);
      money.textContent = Math.floor(money.textContent - TOTAL_PRICE_SEX);
      monsterMaxLvlEvolution(newMonster);
      updateMonsters(true);
    } else console.log("НУЖНО БОЛЬШЕ ЗОЛОТА!");
  } else
    console.log(
      `Один из ваших монстров находится в бою или больше не может размножаться (после ${TOTAL_MAX_LEVEL} лвл нельзя) `
    );

  //console.log(resultGen);
}
