function getlvlUp(lvl) {
  let chance = 37; // шанс не получить уровень
  let koeff = 1.02;
  let chanceUpLvl = Math.floor(100 - chance * Math.pow(koeff, lvl));

  if (chanceUpLvl < 50) chanceUpLvl = 50;

  return chanceUpLvl;
}

function sredneeGenBudget(papa, mama, newLvl) {
  let papaBudget =
    papa.firstStat.firstEndurance.value +
    papa.firstStat.firstStrength.value +
    papa.firstStat.firstAgility.value +
    papa.firstStat.firstIntelligence.value;

  let mamaBudget =
    mama.firstStat.firstEndurance.value +
    mama.firstStat.firstStrength.value +
    mama.firstStat.firstAgility.value +
    mama.firstStat.firstIntelligence.value;

  let generalBudget = (papaBudget + mamaBudget) / 2;

  let finallyDominant = dominant(papa.id, mama.id, "prioritetStat");

  //console.log("y", y);

  let koeff =
    (0.004 *
      (mapMonsters.get(papaTarget).getMoreSex() +
        mapMonsters.get(mamaTarget).getMoreSex())) /
    2;

  let genBudget = {
    prioritetStat: mapMonsters.get(finallyDominant).prioritetStat,
    prioritetStatKoeff: 1.0,
    prioritetStatZna4: mapMonsters.get(finallyDominant).getProritetStat(),

    statMin: generalBudget * 0.9,
    statMax: generalBudget * (1 + newLvl * 0.061 - koeff),

    lvl: 0.061,
  };

  if (papa.prioritetStat == mama.prioritetStat) {
    genBudget.prioritetStatKoeff = 1.2;
  }

  //console.log(genBudget);
  return genBudget;
}

function sexButtonClick() {
  if (
    mapMonsters.get(papaTarget).lvl < TOTAL_MAX_LEVEL &&
    mapMonsters.get(mamaTarget).lvl < TOTAL_MAX_LEVEL &&
    !poleFightsHaveMonsterPlayer
  ) {
    if (money.textContent >= TOTAL_PRICE_SEX) {
      let newMonster = new Monster(names[getRandomInt(0, names.length)], false);

      let finallyDominant = dominant(papaTarget, mamaTarget, "prioritetStat");
      console.log(mapMonsters.get(finallyDominant).getProritetStat());

      newMonster.born(papaTarget, mamaTarget, {
        key: mapMonsters.get(finallyDominant).getProritetStat(),
        value: 123,
        prioritet: true,
      });

      mapMonsters.set(countId, newMonster);

      newMonster.lvl = Math.floor(
        (mapMonsters.get(papaTarget).lvl + mapMonsters.get(mamaTarget).lvl) / 2
      );
      newMonster.upLvl();
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

function sexButtonClick3() {
  if (mapMonsters.size < maxBackpack) {
    if (
      mapMonsters.get(papaTarget).lvl < TOTAL_MAX_LEVEL &&
      mapMonsters.get(mamaTarget).lvl < TOTAL_MAX_LEVEL &&
      !poleFightsHaveMonsterPlayer
    ) {
      if (money.textContent >= TOTAL_PRICE_SEX) {
        mapMonsters.get(papaTarget).upLvl();
        mapMonsters.get(mamaTarget).upLvl();

        mapMonsters.get(papaTarget).upMoreSex();
        mapMonsters.get(mamaTarget).upMoreSex();

        let newMonster = new Monster(
          names[getRandomInt(0, names.length)],
          false
        );

        let newLvl = Math.floor(
          (mapMonsters.get(papaTarget).lvl + mapMonsters.get(mamaTarget).lvl) /
            2 -
            getRandomInt(-1, 0)
        );

        let genBudget = sredneeGenBudget(
          mapMonsters.get(papaTarget),
          mapMonsters.get(mamaTarget),
          newLvl
        );

        console.log("genBudget: ", genBudget);

        newMonster.born(papaTarget, mamaTarget, genBudget);

        mapMonsters.set(countId, newMonster);

        newMonster.lvl = newLvl;

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
