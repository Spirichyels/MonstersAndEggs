function getRandomInt(min = 1, max) {
  return Math.floor(Math.random() * max + min);
}
let getRandomWeight = (weights) => {
  //console.log("weights: ", weights);
  let sumMax = 0;
  for (let i = 0; i < weights.length; i++) {
    sumMax += weights[i];
  }
  //console.log("sumMax: ", sumMax);

  let result = 0;
  let x = getRandomInt(0, sumMax);
  //console.log("x:", x);
  for (let i = 0; i < weights.length; i++) {
    //console.log("чилос: ", weights[i], " x: ", x);
    x -= weights[i];
    if (x < 0) {
      //console.log("result: ", weights[i]);
      result = weights[i];
      break;
    }
  }

  return result;
};

let getRandomWeightSkill = (weights) => {
  //console.log("weights: ", weights);
  let sumMax = 0;
  for (let i = 0; i < weights.length; i++) {
    sumMax += weights[i][1];
  }
  //console.log("sumMax: ", sumMax);

  let result = 0;
  let x = getRandomInt(0, sumMax);
  //console.log("x:", x);
  for (let i = 0; i < weights.length; i++) {
    //console.log("чилос: ", weights[i], " x: ", x);
    x -= weights[i][1];
    if (x < 0) {
      //console.log("result: ", weights[i]);
      result = weights[i][0];
      break;
    }
  }

  return result;
};

let getRandomSkill = (mapSkills) => {
  getRandomWeight(mapSkills.keys());
  //console.log("mapSkills: ", mapSkills);
  let sumMax = 0;

  for (let weight of mapSkills.keys()) {
    sumMax += weight;
  }
  //console.log("sumMax: ", sumMax);

  let result = 0;
  let x = getRandomInt(0, sumMax);
  //console.log("x:", x);

  for (let weight of mapSkills.keys()) {
    x -= weight;
    if (x < 0) {
      result = weight;
      break;
    }
  }
  return result;
};
function getRandomCrit(attack, crit) {
  let x = getRandomInt(1, 100);
  //console.log("crit: ", x <= crit ? 2 : 1);
  //console.log("x: ", x);
  return Math.floor(attack * (x <= crit ? 1.5 : 1));
}

function getRandomPercent(max, chanceToWin) {
  let x = getRandomInt(1, max);
  //console.log("chanceToWin: ", x <= chanceToWin ? "yes" : "no");
  //console.log("x: ", x);
  return x <= chanceToWin ? true : false;
}

let newAttributeHpMana = (attribute) => {
  let result = 0;
  let resultUp = getRandomWeight([TOTAL_UP, TOTAL_NORM, TOTAL_DOWN]);
  if (resultUp == 15)
    result = Math.floor(attribute + attribute * (0.01 * getRandomInt(1, 9)));
  else if (resultUp == 13)
    result = Math.floor(attribute - attribute * (0.01 * getRandomInt(1, 9)));
  else result = attribute;

  //console.log("resultUp: ", resultUp);
  if (result <= 0) result = 1;
  return result;
};

let newAttributeSAI = (attribute) => {
  let result = 0;
  let resultUp = getRandomWeight([TOTAL_UP, TOTAL_NORM, TOTAL_DOWN]);
  if (resultUp == TOTAL_UP) result = Math.floor(attribute + getRandomInt(1, 3));
  else if (resultUp == TOTAL_DOWN)
    result = Math.floor(attribute - getRandomInt(1, 3));
  else result = attribute;

  //console.log("resultUp: ", resultUp);
  if (result <= 0) result = 1;

  return result;
};

let newAttributeAttack = (attribute) => {
  let result = 0;
  let resultUp = getRandomWeight([TOTAL_UP, TOTAL_NORM, TOTAL_DOWN]);
  if (resultUp == TOTAL_UP)
    result = Math.floor(attribute + getRandomInt(1, 10));
  else if (resultUp == TOTAL_DOWN)
    result = Math.floor(attribute - getRandomInt(1, 10));
  else result = attribute;

  //console.log("resultUp: ", resultUp);
  if (result <= 0) result = 1;

  return result;
};

let newAttributeSkill = (attribute) => {
  let result = 0;
  let resultUp = getRandomWeight([TOTAL_UP, TOTAL_NORM, TOTAL_DOWN]);
  if (resultUp == TOTAL_UP) result = Math.floor(attribute + 1);
  else if (resultUp == 13) result = Math.floor(attribute - 1);
  else result = attribute;

  //console.log("resultUp: ", resultUp);
  if (result <= 0) result = 1;
  else if (result >= 10) result = 10;

  return result;
};

let dominant = (papa, mama, attribute) => {
  let finalyDominant = papa;

  let weightPapa = mapMonsters.get(papa).genetica[`${attribute}`];
  let weightMama = mapMonsters.get(mama).genetica[`${attribute}`];

  let res = getRandomWeight([weightPapa, weightMama]);
  finalyDominant = res === weightPapa ? papa : mama;

  //   console.log(
  //     "res: ",
  //     res,
  //     "papa: ",
  //     papa,
  //     "mama: ",
  //     mama,
  //     "attribute: ",
  //     attribute
  //   );
  //   console.log("finalyDominant: ", finalyDominant);

  return finalyDominant;
};

function chacnceNewMonster(max) {
  let zet = getRandomPercent(max, Math.floor(oldEnemyLevel * 9));
  if (zet) {
    createNewMonster();
    console.log("Вы нашли монстра: ", mapMonsters.get(countId).name);
  }
}

function chacnceUpAttribute(monster, max) {
  let zet = getRandomPercent(max, Math.floor(oldEnemyLevel * 9));
  if (zet) {
    let x = [14, 15, 16];
    let res = getRandomWeight(x);
    if (res == 14) {
      monster.strength += 1;
      console.log("Монстер " + monster.name + "навсегда получил 1 силу");
      moveInfostrTextPlayerD.textContent =
        "Монстер " + monster.name + "навсегда получил 1 силу";
    } else if (res == 15) {
      monster.agility += 1;
      console.log("Монстер " + monster.name + "навсегда получил 1 ловкость");
      moveInfostrTextPlayerD.textContent =
        "Монстер " + monster.name + "навсегда получил 1 ловкость";
    } else if (res == 16) {
      monster.intelligence += 1;
      console.log("Монстер " + monster.name + "навсегда получил 1 интеллект");
      moveInfostrTextPlayerD.textContent =
        "Монстер " + monster.name + "навсегда получил 1 интеллект";
    }
  }
}
