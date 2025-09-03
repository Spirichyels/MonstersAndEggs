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
  let koeff = 1.07;

  try {
    if (!poleFightsHaveMonsterPlayer) {
      let newMoney = Math.floor(
        (mapMonsters.get(idSellMonsterInput).getCurrentHP() /
          mapMonsters.get(idSellMonsterInput).getHp()) *
          TOTAL_PRICE_SELL *
          Math.pow(koeff, mapMonsters.get(idSellMonsterInput).lvl)
      );

      if (newMoney < 10) newMoney = 10;

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

function buyBackpackButtonClick() {
  if (Math.floor(money.textContent) >= Math.floor(backpack_price.textContent)) {
    money.textContent =
      Math.floor(money.textContent) - Math.floor(backpack_price.textContent);

    backpack_price.textContent = Math.floor(
      Math.floor(backpack_price.textContent) * 1.2 -
        ((Math.floor(backpack_price.textContent) * 1.2) % 10)
    );

    maxBackpack++;
    updateMonsters(false);
  } else {
    alert("У вас не достаточно денег");
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

      updateMonsters(true);
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

function changeSelectSort() {
  TOTAL_ID_SORTING = Math.floor(sortSelect.value);
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
        colorBorderMama.classList.remove("sexMama");
      } catch (error) {}

      mamaTarget = Math.floor(selectedOptionMama.value);
      oldMamaTarget = Math.floor(mamaTarget);

      colorBorderMama = document.getElementById(
        mamaTarget + TOTAL_TEG_MONSTER_CARD
      );
      //console.log("colorBorderMama: ", colorBorderMama);
      colorBorderMama.classList.add("sexMama");
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
        colorBorderPapa.classList.remove("sexPapa");
      } catch (error) {}

      papaTarget = Math.floor(selectedOptionPapa.value);
      oldPapaTarget = Math.floor(papaTarget);

      colorBorderPapa = document.getElementById(
        papaTarget + TOTAL_TEG_MONSTER_CARD
      );
      //console.log("colorBorderMama: ", colorBorderPapa);
      colorBorderPapa.classList.add("sexPapa");
    } else {
      papaTarget = -1;
    }
    //console.log("papaTarget: ", papaTarget);

    //console.log("selectedOptionPapa.value: ", selectedOptionPapa.value);
  }

  SelectPapa.addEventListener("change", changeOptionPapa);
  //
}

function monsterMaxLvlEvolution(monster) {
  try {
    if (monster.lvl >= TOTAL_MAX_LEVEL) {
      monster.status = TOTAL_STATUS_COMPLETED;
    }
  } catch (error) {
    console.log("monsterMaxLvlEvolution: ", error);
  }
}

function skillEvents(skill) {
  skill.addEventListener("change", () => {
    useAbilityPl(skill.id, player);
  });
}

function sortEvents(isSort) {
  isSort.addEventListener("change", () => {
    if (isSorting.checked) {
      changeSelectSort();
    }
    updateMonsters(false);
  });
}
function Events() {
  //sex
  sexButton.addEventListener("click", sexButtonClick);

  //update
  //updateButton.addEventListener("click", updateMonsters);

  saveButton.addEventListener("click", onSaveLocalStorage);
  loadButton.addEventListener("click", onLoadLocalStorage);

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

  buyBackpackButton.addEventListener("click", buyBackpackButtonClick);

  //   skillButtonPl1.addEventListener("click", () => {
  //     useAbility(skillButtonPl1.id);
  //   });

  // sorting

  sortEvents(isSorting);
  sortEvents(isReverce);
  sortEvents(isWoman);
  sortEvents(isMan);

  sortEvents(isCommon);
  sortEvents(isUnusual);
  sortEvents(isRare);
  sortEvents(isVeryRare);
  //   sortEvents(isElit);
  //   sortEvents(isEpic);
  //   sortEvents(isMithic);
  //   sortEvents(isLegendary);

  sortEvents(isDissapering);
  sortEvents(isFlexible);
  sortEvents(isCompleted);

  //   isSorting.addEventListener("change", () => {
  //     if (isSorting.checked) {
  //       changeSelectSort();
  //     }
  //     updateMonsters(false);
  //   });
  //   isReverce.addEventListener("change", () => {
  //     if (isSorting.checked) {
  //       changeSelectSort();
  //     }
  //     updateMonsters(false);
  //   });

  //   isWoman.addEventListener("change", () => {
  //     if (isSorting.checked) {
  //       changeSelectSort();
  //     }
  //     updateMonsters(false);
  //   });
  //   isMan.addEventListener("change", () => {
  //     if (isSorting.checked) {
  //       changeSelectSort();
  //     }
  //     updateMonsters(false);
  //   });

  //   isCommon.addEventListener("change", () => {
  //     if (isSorting.checked) {
  //       changeSelectSort();
  //     }
  //     updateMonsters(false);
  //   });

  //   isUnusual.addEventListener("change", () => {
  //     if (isSorting.checked) {
  //       changeSelectSort();
  //     }
  //     updateMonsters(false);
  //   });

  //   isRare.addEventListener("change", () => {
  //     if (isSorting.checked) {
  //       changeSelectSort();
  //     }
  //     updateMonsters(false);
  //   });

  //   isVeryRare.addEventListener("change", () => {
  //     if (isSorting.checked) {
  //       changeSelectSort();
  //     }
  //     updateMonsters(false);
  //   });

  sortSelect.addEventListener("change", () => {
    if (isSorting.checked) {
      changeSelectSort();
      updateMonsters(false);
    }
  });
  //
}

function progressLvlMinus(id) {
  progressLVL[id] = progressLVL[id] - 1;
  if (progressLVL[id] <= 0) {
    id_range.value = Math.floor(id_range.value) + 1;
  }
  progressText.textContent = progressLVL[id_range.value];
  idRange();
}
function idRange() {
  id_Count.innerHTML = id_range.value;
  progressText.textContent = progressLVL[id_range.value];
  levelEnemy = Math.floor(id_range.value);
  //oldEnemyLevel = levelEnemy;
  //console.log("levelEnemy: ", levelEnemy);
}
