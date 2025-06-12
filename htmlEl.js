function delete1MonsterClick() {
  //   console.log(
  //     "delete1MonsterClick idDeleteMonsterInput: ",
  //     idDeleteMonsterInput
  //   );
  try {
    document
      .getElementById(idDeleteMonsterInput + TOTAL_TEG_MONSTER_CARD)
      .remove();
  } catch (error) {
    console.log(
      "ERROR: Введите id монстра в формате числа от 0-99.  Ну и вот инфа где ты накосячил:\n",
      error
    );
  }
}

function sell1MonsterClick() {
  //console.log("delete1MonsterClick idDeleteMonsterInput: ", idSellMonsterInput);

  try {
    if (!poleFightsHaveMonsterPlayer) {
      let newMoney = Math.floor(
        (mapMonsters.get(idSellMonsterInput).getCurrentHP() /
          mapMonsters.get(idSellMonsterInput).getHp()) *
          TOTAL_PRICE_SELL
      );

      let orDel = delete1MonsterFull(idSellMonsterInput);
      //console.log(orDel);
      if (orDel) {
        //console.log("newMoney: ", newMoney);
        money.textContent = Math.floor(money.textContent) + newMoney;
        console.log("Монст продан за: ", newMoney);
      }
    }
  } catch (error) {
    console.log("Введите существующий id вашего монстра в формате от 0-99.");
  }
}

function heal1MonsterClick() {
  //console.log("delete1MonsterClick idDeleteMonsterInput: ", idSellMonsterInput);

  try {
    if (
      Math.floor(money.textContent) >= TOTAL_PRICE_HEAL &&
      !poleFightsHaveMonsterPlayer
    ) {
      money.textContent = Math.floor(money.textContent) - TOTAL_PRICE_HEAL;

      mapMonsters.get(idHealMonsterInput).currentHP = mapMonsters
        .get(idHealMonsterInput)
        .getHp();

      updateMonsters();
    }
  } catch (error) {
    console.log("Введите существующий id вашего монстра в формате от 0-99.");
  }
}

function selectPolMonster(monster) {
  let ed = document.createElement("option");

  ed.id = monster.id + TOTAL_TEG_MONSTER_PARENTS;
  ed.value = monster.id;
  ed.textContent = monster.name + " " + monster.surname + " id:" + monster.id;

  //console.log(monster.pol);
  if (monster.pol == true) {
    papaList = document.papaForm.papaSelect;
    papaList.appendChild(ed);
  } else if (monster.pol == false) {
    mamaList = document.mamaForm.mamaSelect;
    mamaList.appendChild(ed);
  }
}

function select() {
  //mama
  const SelectMama = document.mamaForm.mamaSelect;
  const selectionMama = document.getElementById("selectionMama");
  mamaTarget = -1;

  function changeOptionMama() {
    const selectedOptionMama = SelectMama.options[SelectMama.selectedIndex];
    selectionMama.textContent = "Вы выбрали: " + selectedOptionMama.text;

    if (selectedOptionMama.value != -1) {
      let colorBorderMama = document.getElementById(
        oldMamaTarget + TOTAL_TEG_MONSTER_CARD
      );
      //console.log(colorBorderMama);
      try {
        colorBorderMama.classList.remove("mamaBorder");
      } catch (error) {}

      mamaTarget = Math.floor(selectedOptionMama.value);
      oldMamaTarget = Math.floor(mamaTarget);

      colorBorderMama = document.getElementById(
        mamaTarget + TOTAL_TEG_MONSTER_CARD
      );
      //console.log("colorBorderMama: ", colorBorderMama);
      colorBorderMama.classList.add("mamaBorder");
    } else {
      mamaTarget = -1;
    }
    //console.log("mamaTarget: ", mamaTarget);
    //console.log("selectedOptionMama.value: ", selectedOptionMama.value);
  }

  SelectMama.addEventListener("change", changeOptionMama);
  //

  //papa
  const SelectPapa = document.papaForm.papaSelect;
  const selectionPapa = document.getElementById("selectionPapa");
  papaTarget = -1;

  function changeOptionPapa() {
    const selectedOptionPapa = SelectPapa.options[SelectPapa.selectedIndex];
    selectionPapa.textContent = "Вы выбрали: " + selectedOptionPapa.text;

    if (selectedOptionPapa.value != -1) {
      let colorBorderPapa = document.getElementById(
        oldPapaTarget + TOTAL_TEG_MONSTER_CARD
      );
      //console.log(colorBorderPapa);
      try {
        colorBorderPapa.classList.remove("papaBorder");
      } catch (error) {}

      papaTarget = Math.floor(selectedOptionPapa.value);
      oldPapaTarget = Math.floor(papaTarget);

      colorBorderPapa = document.getElementById(
        papaTarget + TOTAL_TEG_MONSTER_CARD
      );
      //console.log("colorBorderMama: ", colorBorderPapa);
      colorBorderPapa.classList.add("papaBorder");
    } else {
      papaTarget = -1;
    }
    //console.log("papaTarget: ", papaTarget);

    //console.log("selectedOptionPapa.value: ", selectedOptionPapa.value);
  }

  SelectPapa.addEventListener("change", changeOptionPapa);
  //
}

function sexButtonClick() {
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
      newMonster.surname = mapMonsters.get(papaTarget).surname;
      newMonster.divMonster(TOTAL_MONSTERS_BACKUP);

      selectPolMonster(newMonster);
      money.textContent = Math.floor(money.textContent - TOTAL_PRICE_SEX);
      updateMonsters();
    } else console.log("НУЖНО БОЛЬШЕ ЗОЛОТА!");
  } else
    console.log(
      `Один из ваших монстров находится в бою или больше не может размножаться (после ${TOTAL_MAX_LEVEL} лвл нельзя) `
    );

  //console.log(resultGen);
}

function skillEvents(skill) {
  skill.addEventListener("click", () => {
    useAbilityPl(skill.id);
  });
}
function Events() {
  //sex
  sexButton.addEventListener("click", sexButtonClick);

  //update
  updateButton.addEventListener("click", updateMonsters);

  //deleteMonster
  document
    .querySelector("#idDeleteMonster")
    .addEventListener("input", function (event) {
      idDeleteMonsterInput = Math.floor(event.target.value);
    });
  dellButton.addEventListener("click", delete1MonsterClick);

  //sell продать

  document
    .querySelector("#idSellMonster")
    .addEventListener("input", function (event) {
      idSellMonsterInput = Math.floor(event.target.value);
    });
  sellButton.addEventListener("click", sell1MonsterClick);

  document
    .querySelector("#idHealMonster")
    .addEventListener("input", function (event) {
      idHealMonsterInput = Math.floor(event.target.value);
    });
  healButton.addEventListener("click", heal1MonsterClick);

  //fight
  fightButton.addEventListener("click", fight);
  attackButtonPl.addEventListener("click", attackButtonCLick);
  endMoveButtonPl.addEventListener("click", endMove);

  skillEvents(skillButtonPl1);
  skillEvents(skillButtonPl2);
  skillEvents(skillButtonPl3);

  //   skillButtonPl1.addEventListener("click", () => {
  //     useAbility(skillButtonPl1.id);
  //   });
}

function idRange() {
  id_Count.innerHTML = id_range.value;
  levelEnemy = Math.floor(id_range.value);
  //oldEnemyLevel = levelEnemy;
  console.log("levelEnemy: ", levelEnemy);
}
