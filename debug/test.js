function test123() {
  let arr = [STRENGTH, AGILITY, ENDURANCE, INTELLIGENCE];
  let x = getRandomSkill(arr);
  console.log(arr[x]);
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
