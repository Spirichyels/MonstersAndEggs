function test123() {
  let x = "";
  for (let i = 0; i < 10000; i++) {
    x = getNewRandomRarity(TOTAL_RARITY2).text;
    console.log(x);
    //if (x == "Легендарная") console.log(x);
  }
}

function testStandartFormulaGenbudget() {
  const koefRare = 0.09;
  let newKoeffBudget = 0;
  let newRarity = getRandomRarity();
  let newLevel = getRandomInt(1, 15);
  let newDebuff = 1;

  //newKoeffBudget = 1 + newRarity.id * koefRare;

  //console.log(newKoeffBudget);
  for (let l = 0; l < 15; l++) {
    let text = "";
    for (let i = 0; i < 7; i++) {
      newKoeffBudget = 1 + koefRare;
      text +=
        " " + Math.floor(levelGenBudgetFormula(30, l) * koeffRarityFormula(i));
    }
    console.log(l + ": " + text);
  }
  //raryUp(40, 1.03);
}

function raryUp(n, koef) {
  for (let i = 1; i <= 8; i++) {
    //console.log(n * (1 + i * koef));
    console.log(n * Math.pow(koef, i));

    //console.log(1 + i * 0.061);
  }
}

function lvlKoefStatFormula(n) {
  for (let i = 1; i <= 15; i++) {
    console.log(n * (1 + i * 0.061));
    //console.log(1 + i * 0.061);
  }
}

function clickerFormula() {
  let price = 30;
  let koeff = 1.19;

  for (let i = 1; i < 15; i++) {
    console.log(price * Math.pow(koeff, i));
  }
}

function lvlUpFormula() {
  let chance = 37; // шанс не получить уровень
  let koeff = 1.02;
  let chanceUpLvl = 50;

  for (let i = 1; i < 15; i++) {
    chanceUpLvl = Math.floor(100 - chance * Math.pow(koeff, i));
    console.log(i + " уровень: ", chanceUpLvl);
  }
}

function testRandomUpLvl(lvl) {
  let tr = 0;
  let f = 0;
  for (let i = 1; i < 15; i++) {
    if (getRandomPercent(100, getlvlUp(lvl))) tr++;
    else f++;
  }
  let result = {
    true: tr,
    false: f,
  };
  return result;
}

function sredneeTrueFalseLvlUp() {
  const PROBEG = 10000;
  let sredneeTrue = 0;
  let sredneeFalse = 0;
  let result = testRandomUpLvl(1);
  for (let i = 1; i < PROBEG; i++) {
    sredneeTrue += result.true;
    sredneeFalse += result.false;
  }
  sredneeTrue = Math.floor(sredneeTrue / PROBEG);
  sredneeFalse = Math.floor(sredneeFalse / PROBEG);

  console.log("Среднее True: ", sredneeTrue);
  console.log("Среднее False: ", sredneeFalse);
}
