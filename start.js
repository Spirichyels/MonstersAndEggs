let sex_price = document.getElementById("sex_price");
let sell_price = document.getElementById("sell_price");
let heal_price = document.getElementById("heal_price");
let money = document.querySelector("#money_count");

sex_price.textContent = TOTAL_PRICE_SEX;
sell_price.textContent = TOTAL_PRICE_SELL;
heal_price.textContent = TOTAL_PRICE_HEAL;
money.textContent = TOTAL_START_MONEY;

let mamaTarget = -1;
let oldMamaTarget = -1;
let papaTarget = -1;
let oldPapaTarget = -1;

let currentMonsterFightP = -1;
let oldMonsterFightP = -1;
let countId = -1;

let levelEnemy = 1;
let oldEnemyLevel = levelEnemy;

let enemyMonster = "none";
let playerHp = 0;
let enemyHp = 0;
let fireDamadge = [];
let iceDamadge = [];

let poleFightsHaveMonsterEnemy = false; //Если True нельзя добавлять монстров (врагов) на стол
let poleFightsHaveMonsterPlayer = false; //Если True нельзя добавлять монстров (Игрока) на стол

let endAttackPl = true;
let endAttackEn = true;

let endSkillPl = 1;

let sexButton = document.getElementById("sexButton");

let sellButton = document.getElementById("sellButton");
let dellButton = document.getElementById("dellButton");
let healButton = document.getElementById("healButton");

let endMoveButtonPl = document.getElementById("endMoveButtonPl");
let attackButtonPl = document.getElementById("attackButtonPl");
let skillButtonPl1 = document.getElementById("skillButtonPl1");
let skillButtonPl2 = document.getElementById("skillButtonPl2");
let skillButtonPl3 = document.getElementById("skillButtonPl3");

let endMovePlayerText = document.getElementById("endMovePlayerText");
endMovePlayerText.textContent = TOTAL_PLAYER_MOVE_END_TEXT;

let idDeleteMonsterInput = -100;
let idSellMonsterInput = -100;
let idHealMonsterInput = -100;

let mapMonsters = new Map();

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

let getRandomSkill = (mapSkills) => {
  getRandomWeight(mapSkills.keys());
  //console.log("weights: ", weights);
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

function selectPolMonsterDelete(id) {
  try {
    papaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}

  try {
    mamaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}
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
  r;
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

function updateMonsters() {
  try {
    if (!poleFightsHaveMonsterEnemy) {
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
          delete1MonsterFull(monster.id);
          console.log(
            monster.name,
            " ",
            monster.surname,
            " id: ",
            id,
            "покинул наш мир"
          );
        } else delete1Monster(monster.id);

        selectPolMonsterDelete(monster.id);
      }

      for (let monster of mapMonsters.values()) {
        //console.log(monster.id);

        monster.divMonster(TOTAL_MONSTERS_BACKUP);
        selectPolMonster(monster);
      }
    }
  } catch (error) {}
  //console.log(mapMonsters);
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
function getCurrentMonsterFight(currentMonsterFight) {
  //console.log("getCurrentMonsterFight: ", mapMonsters);

  if (!poleFightsHaveMonsterEnemy) {
    fightButton.disabled = false;
    if (oldMonsterFightP != -1) {
      delete1Monster(oldMonsterFightP);
      updateMonsters();
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

class Skill {
  lvl = 0;
  duration = 0;
  type = "";

  constructor(lvl) {
    this.lvl = lvl;
    //this.duration = getRandomInt(1, 10) + lvl;
  }
}

class FireBreath extends Skill {
  duration = getRandomInt(1, this.lvl + 3);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_FIRE_BREATH;

  formula(intelligence, i) {
    return Math.floor(((intelligence / 1.4) * (this.lvl + 1)) / (i + 1) / 1.8);
  }

  getDamadge(intelligence) {
    let damadge = [];
    for (let i = 0; i < this.duration; i++) {
      let x = this.formula(intelligence, i);
      damadge.push(x);
    }
    return damadge;
  }

  getFullDamadge(intelligence) {
    let fullDamadge = 0;
    for (let i = 0; i < this.duration; i++) {
      let x = this.formula(intelligence, i);
      fullDamadge = fullDamadge + x;
    }
    return fullDamadge;
  }

  getText(intelligence) {
    return (
      "Огненное дыхание:\n" +
      "ур: " +
      this.lvl +
      " длит: " +
      this.duration +
      " урон: " +
      this.getFullDamadge(intelligence) +
      "[" +
      this.getDamadge(intelligence) +
      "]"
    );
  }
}
class IceBreath extends Skill {
  duration = Math.floor(getRandomInt(3, this.lvl) / 3);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_ICE_BREATH;

  formula(intelligence, i) {
    return Math.floor(((intelligence / 1.5) * this.lvl) / (i + 1) / 2);
  }

  getDamadge(intelligence) {
    let damadge = [];
    for (let i = 0; i < this.duration; i++) {
      let x = this.formula(intelligence, i);
      damadge.push(x);
    }
    return damadge;
  }

  getFullDamadge(intelligence) {
    let fullDamadge = 0;
    for (let i = 0; i < this.duration; i++) {
      let x = this.formula(intelligence, i);
      fullDamadge = fullDamadge + x;
    }
    return fullDamadge;
  }
  getText(intelligence) {
    return (
      "Морозное дыхание:\n" +
      "ур: " +
      this.lvl +
      " длит: " +
      this.duration +
      " урон: " +
      this.getFullDamadge(intelligence) +
      "[" +
      this.getDamadge(intelligence) +
      "]"
    );
  }
}

function createNewSkill(lvl) {
  let weightSkills = new Map([
    [21, new FireBreath(lvl)],
    [20, new IceBreath(lvl)],
    //
  ]);

  let resWeight = getRandomSkill(weightSkills);

  newSkill = weightSkills.get(resWeight);

  return newSkill;
}

class Monster {
  name = "noname";
  surname = "surname";
  id = 0;
  lvl = 1;
  pol = true;

  firstHp = 1;
  firstMana = 1;

  currentHP = -1;

  firstAttack = 1;
  firstArmor = 1;
  firstCrit = 1;
  firstDodge = 1;
  //
  strength = 1;
  agility = 1;
  intelligence = 1;
  //
  //gen = 1;

  genetica = {
    firstHp: 1,
    firstMana: 1,

    firstAttack: 1,
    firstArmor: 1,
    firstCrit: 1,
    firstDodge: 1,

    strength: 1,
    agility: 1,
    intelligence: 1,
    skill0: 1,
    skill1: 1,
    skill2: 1,
  };

  skillBacpack = [];

  setSkillBacpack(skill) {
    if (this.skillBacpack.length < 3) {
      this.skillBacpack.push(skill);
    }
  }
  removeSkillBackPack(id) {
    console.log(id);
    this.skillBacpack.splice(id, 1);
  }

  getHp() {
    let hp = Math.floor(
      this.firstHp +
        this.strength * 4 +
        this.agility * 3 +
        this.intelligence * 2
    );
    return hp;
  }

  getCurrentHP() {
    if (this.currentHP == -1) {
      return this.getHp();
    } else return this.currentHP;
  }

  getMana() {
    let mana = this.firstMana + this.intelligence * 5;
    return mana;
  }
  upLvl() {
    this.lvl = this.lvl + getRandomInt(-1, 3);
  }
  getAttack() {
    return Math.floor(this.firstAttack + this.strength * 1.6);
  }
  getArmor() {
    return Math.floor(this.firstArmor + this.agility / 1.3);
  }
  getCrit() {
    return Math.floor(this.firstCrit + this.agility / 4);
  }
  getDodge() {
    let x = Math.floor(this.firstDodge + this.agility / 2);
    if (x >= 90) return 90;
    else return x;
  }
  createGen() {
    for (var key in this.genetica) {
      this.genetica[key] = getRandomInt(1, 100);
    }
    //console.log("genetica: ", this.genetica);
  }
  constructor(name, create) {
    countId++;
    //console.log("constructor countId: ", countId);
    this.name = name;
    this.surname = surname[getRandomInt(0, names.length)];
    this.id = countId;
    this.pol = getRandomInt(1, 10) > 5 ? true : false;
    this.createGen();
    if (create) {
      this.strength = getRandomInt(1, 20);
      this.agility = getRandomInt(1, 20);
      this.intelligence = getRandomInt(1, 20);

      this.firstHp = getRandomInt(30, 60);
      this.firstMana = getRandomInt(1, 20);

      this.firstAttack = getRandomInt(3, 10);
      this.firstArmor = Math.floor(getRandomInt(0, 10));
      this.firstCrit = Math.floor(getRandomInt(1, 10));
      this.firstDodge = Math.floor(getRandomInt(1, 5));

      if (getRandomPercent(100, 20))
        this.setSkillBacpack(createNewSkill(getRandomInt(1, 2)));

      //if (true) this.setSkillBacpack(createNewSkill(10));

      //console.log("start: ", this.skillBacpack);

      //   let x = false;
      //   let y = false;
      //   try {
      //     x = this.skillBacpack[0].type == this.skillBacpack[1].type;
      //     y = this.skillBacpack[0].type == this.skillBacpack[2].type;
      //   } catch (error) {}

      //   if (y) {
      //     this.removeSkillBackPack(2);
      //     //console.log("y: ", this.skillBacpack);
      //   }

      //   if (x) {
      //     //console.log("this.skillBacpack[0].type: ", this.skillBacpack[0].type);
      //     //console.log(this.skillBacpack);
      //     this.removeSkillBackPack(1);
      //     //console.log("x: ", this.skillBacpack);
      //   }

      //
    } else if (!create) {
      //console.log("Ураааа");
    }
  }

  bot(lvl) {
    countId--;
    //console.log("bot countId: ", countId);
    this.lvl = lvl;
    this.strength = getRandomInt(1, lvl * 15);
    this.agility = getRandomInt(1, lvl * 15);
    this.intelligence = getRandomInt(1, lvl * 15);

    this.firstHp = getRandomInt(30, lvl * 100);
    this.firstMana = getRandomInt(1, lvl * 100);

    this.firstAttack = getRandomInt(5, lvl * 2);
    this.firstArmor = Math.floor(getRandomInt(0, lvl * 2));
    this.firstCrit = Math.floor(getRandomInt(1, lvl * 2));
    this.firstDodge = Math.floor(getRandomInt(1, lvl * 2));
  }

  born(papa, mama) {
    this.firstHp = newAttributeHpMana(
      mapMonsters.get(dominant(papa, mama, "firstHp")).firstHp
    );
    //this.genetica.firstHp = getRandomInt(1, 300);

    this.firstMana = newAttributeHpMana(
      mapMonsters.get(dominant(papa, mama, "firstMana")).firstMana
    );
    //this.genetica.firstMana = getRandomInt(1, 300);

    this.firstAttack = newAttributeAttack(
      mapMonsters.get(dominant(papa, mama, "firstAttack")).firstAttack
    );
    this.firstArmor = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "firstArmor")).firstArmor
    );
    this.firstCrit = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "firstCrit")).firstCrit
    );
    this.firstDodge = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "firstDodge")).firstDodge
    );

    this.strength = newAttributeSAI(
      //monsters[dominant(papa, mama, "strength")].strength
      mapMonsters.get(dominant(papa, mama, "strength")).strength
    );
    this.agility = newAttributeSAI(
      //monsters[dominant(papa, mama, "agility")].agility
      mapMonsters.get(dominant(papa, mama, "agility")).agility
    );
    this.intelligence = newAttributeSAI(
      //monsters[dominant(papa, mama, "intelligence")].intelligence
      mapMonsters.get(dominant(papa, mama, "intelligence")).intelligence
    );

    try {
      let x = mapMonsters.get(dominant(papa, mama, "skill0")).skillBacpack[0];
      //console.log("skill0 x:", x);
      this.skillBacpack[0] = createNewSkill(newAttributeSkill(x.lvl));

      x = mapMonsters.get(dominant(papa, mama, "skill1")).skillBacpack[1];
      //console.log("skill1 x:", x);
      this.skillBacpack[1] = createNewSkill(newAttributeSkill(x.lvl));

      x = mapMonsters.get(dominant(papa, mama, "skill2")).skillBacpack[2];
      //console.log("skill2 x:", x);
      this.skillBacpack[2] = createNewSkill(newAttributeSkill(x.lvl));
    } catch (error) {}
  }

  printMonster() {
    console.log("Имя: ", this.name, " ", this.surname);
    console.log("Ид: ", this.id, "	lvl: ", this.lvl);

    console.log("Пол: ", this.pol ? "Мужской" : "Женский");
    console.log("Здоровье: ", this.getCurrentHP(), "/", this.getHp());
    console.log("ЗдоровьеFirst: ", this.firstHp);

    console.log("Мана: ", this.getMana());
    console.log("Манаfirst: ", this.mana);

    console.log("Атака: ", this.getAttack());
    console.log("Атакаfirst: ", this.firstAttack);
    console.log("Броня: ", this.getArmor());
    console.log("Броняfirst: ", this.firstArmor);
    console.log("Крит: ", this.getCrit());
    console.log("Критfirst: ", this.firstCrit);
    console.log("Уворот: ", this.getDodge());
    console.log("Уворотfirst: ", this.firstDodge);

    console.log("Сила: ", this.strength);
    console.log("Ловкость: ", this.agility);
    console.log("Интеллект: ", this.intelligence);

    console.log("Генетика: ", this.genetica);
  }
  printGeneticaMonster() {
    console.log("Имя: ", this.name, "Ид: ", this.id);
    console.log("Генетика: ", this.genetica);
  }

  divMonster(nameTeg) {
    try {
      let profileMonster = document.createElement("ul");
      profileMonster.id = this.id + TOTAL_TEG_MONSTER_CARD;
      profileMonster.value = Math.floor(this.id);

      profileMonster.onclick = function () {
        //console.log("this.value: ", this.value);
        getCurrentMonsterFight(Math.floor(this.value));
      };

      let itemName = document.createElement("li");

      let itemPol = document.createElement("li");
      let itemHP = document.createElement("li");
      let itemId = document.createElement("li");
      let itemMana = document.createElement("li");

      let itemAttack = document.createElement("li");
      let itemArmor = document.createElement("li");
      let itemCrit = document.createElement("li");
      let itemDodge = document.createElement("li");

      let itemStrenth = document.createElement("li");
      let itemAgility = document.createElement("li");
      let itemIntelligence = document.createElement("li");

      let skills = document.createElement("li");
      let skill0 = document.createElement("li");
      let skill1 = document.createElement("li");
      let skill2 = document.createElement("li");

      let itemGen = document.createElement("li");

      itemName.textContent = "Имя: " + this.name + " " + this.surname;
      itemId.textContent = "Уровень: " + this.lvl + "  id: " + this.id;

      itemPol.textContent = "Пол: " + (this.pol ? "Мужской" : "Женский");
      itemHP.textContent =
        "Здоровье: " + this.getCurrentHP() + "/" + this.getHp();
      itemMana.textContent = "Мана: " + this.getMana();

      itemAttack.textContent = "Атака: " + this.getAttack();
      itemArmor.textContent = "Броня: " + this.getArmor();
      itemCrit.textContent = "Крит: " + this.getCrit();
      itemDodge.textContent = "Уворот: " + this.getDodge();

      itemStrenth.textContent = "Сила: " + this.strength;
      itemAgility.textContent = "Ловкость: " + this.agility;
      itemIntelligence.textContent = "Интеллект: " + this.intelligence;
      skills.textContent = "Способности: ";
      try {
        // this.skillBacpack[0].getText();
        skill0.textContent = this.skillBacpack[0].getText(this.intelligence);
        skill1.textContent = this.skillBacpack[1].getText(this.intelligence);
        skill2.textContent = this.skillBacpack[2].getText(this.intelligence);

        //skill1.textContent = this.skillBacpack[1].getText();
        //skill2.textContent = this.skillBacpack[2].getText();
      } catch (error) {}

      itemGen.textContent = "Генетика: " + JSON.stringify(this.genetica);

      //profileMonster = document.getElementById("profileMonster1");
      profileMonster.appendChild(itemName);
      profileMonster.appendChild(itemId);

      profileMonster.appendChild(itemPol);
      profileMonster.appendChild(itemHP);
      profileMonster.appendChild(itemMana);

      profileMonster.appendChild(itemAttack);
      profileMonster.appendChild(itemArmor);
      profileMonster.appendChild(itemCrit);
      profileMonster.appendChild(itemDodge);

      profileMonster.appendChild(itemStrenth);
      profileMonster.appendChild(itemAgility);
      profileMonster.appendChild(itemIntelligence);

      profileMonster.appendChild(skills);
      profileMonster.appendChild(skill0);
      profileMonster.appendChild(skill1);
      profileMonster.appendChild(skill2);

      //profileMonster.appendChild(itemGen);

      //document.body.append(profileMonster);
      //document.querySelector("monstersDivId").appendChild(profileMonster);
      let x = document.querySelector(`${nameTeg}`);
      x.appendChild(profileMonster);

      //console.log(x);
    } catch (error) {
      console.log(
        "Этот метод иммет параметр, скорее всего ты его забыл. \nПодробнее: ",
        error
      );
    }

    //x.append(profileMonster);
    //document.body.append(profileMonster);
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
    monster.strength = 50;
    monster.agility = 50;
    monster.intelligence = 50;
  }
}
function chacnceNewMonster(max) {
  let zet = getRandomPercent(max, Math.floor(oldEnemyLevel * 9));
  if (zet) {
    createNewMonster();
    console.log("Вы нашли монстра: ", mapMonsters.get(countId).name);
  }
}

function attackButtonCLick() {
  attackButtonPl.disabled = true;
  skillButtonPl1.disabled = false;
  skillButtonPl2.disabled = false;
  skillButtonPl3.disabled = false;
  endMoveButtonPl.disabled = false;
  endMovePlayerText.textContent =
    TOTAL_PLAYER_MOVE_END_TEXT + "просто атакуете";
  endAttackPl = true;
}
function useAbilityPl(id) {
  let x = 0;
  endAttackPl = false;
  if (id == skillButtonPl1.id) {
    skillButtonPl1.disabled = true;
    skillButtonPl2.disabled = false;
    skillButtonPl3.disabled = false;
    x = 0;
  } else if (id == skillButtonPl2.id) {
    skillButtonPl1.disabled = false;

    skillButtonPl2.disabled = true;
    skillButtonPl3.disabled = false;
    x = 1;
  } else if (id == skillButtonPl3.id) {
    skillButtonPl1.disabled = false;
    skillButtonPl2.disabled = false;
    skillButtonPl3.disabled = true;
    x = 2;
  }

  attackButtonPl.disabled = false;
  endMoveButtonPl.disabled = false;
  endMovePlayerText.textContent =
    TOTAL_PLAYER_MOVE_END_TEXT + "используете " + x + " способность";
  endSkillPl = x;
}
function endMove() {
  attackButtonPl.disabled = true;
  skillButtonPl1.disabled = true;
  skillButtonPl2.disabled = true;
  skillButtonPl3.disabled = true;
  endMoveButtonPl.disabled = true;

  // переменные для атаки
  let playerAttack = 0;
  let enemyAttack = 0;
  let playerDodge = false;
  let enemyDodge = false;

  // для скиллов
  let stunEnemy = false;

  if (poleFightsHaveMonsterEnemy) {
    if (playerHp >= 0 && enemyHp >= 0) {
      // шанс увернуться от урона
      playerDodge = getRandomPercent(
        100,
        mapMonsters.get(oldMonsterFightP).getDodge()
      );
      enemyDodge = getRandomPercent(100, enemyMonster.getDodge());
      //

      // Рассчет обычной атаки
      if (endAttackPl) {
        playerAttack = playerAttack - enemyMonster.getArmor();
        playerAttack = getRandomCrit(
          mapMonsters.get(oldMonsterFightP).getAttack(),
          mapMonsters.get(oldMonsterFightP).getCrit()
        );
      } else {
        let skill = mapMonsters.get(oldMonsterFightP).skillBacpack[endSkillPl];
        if (skill) {
          if (skill.type == TOTAL_TYPE_SKILL_FIRE_BREATH) {
            fireDamadge = skill.getDamadge(
              mapMonsters.get(oldMonsterFightP).intelligence
            );
          } else if (skill.type == TOTAL_TYPE_SKILL_ICE_BREATH) {
            iceDamadge = skill.getDamadge(
              mapMonsters.get(oldMonsterFightP).intelligence
            );
          }
        }

        console.log(
          "0 skill: ",
          mapMonsters
            .get(oldMonsterFightP)
            .skillBacpack[endSkillPl].getDamadge(
              mapMonsters.get(oldMonsterFightP).intelligence
            )
        );

        // if (fireDamadge[0]) {
        //   enemyHp = enemyHp - fireDamadge[0];
        //   console.log("еще ожёг: ", fireDamadge[0]);
        //   fireDamadge.shift();
        // }
      }

      if (endAttackEn) {
        if (iceDamadge[0] != undefined) {
          console.log("Враг заморожен");
          enemyAttack = 0;
        } else {
          enemyAttack =
            enemyAttack - mapMonsters.get(oldMonsterFightP).getArmor();
          enemyAttack = getRandomCrit(
            enemyMonster.getAttack(),
            enemyMonster.getCrit()
          );
        }
      }

      if (playerDodge) {
        console.log("Игрок увернулся");
      } else if (!playerDodge) {
        if (endAttackEn) {
          playerHp = playerHp - enemyAttack;
        }
      }

      if (enemyDodge) {
        console.log("Враг увернулся");
        if (fireDamadge[0] != undefined) fireDamadge.shift();
      } else if (!enemyDodge) {
        if (endAttackPl) {
          enemyHp = enemyHp - playerAttack;
        }
        if (fireDamadge[0] != undefined) {
          enemyHp = enemyHp - fireDamadge[0];
          console.log("еще ожёг: ", fireDamadge[0]);
          fireDamadge.shift();
        }
        if (iceDamadge[0] != undefined) {
          enemyHp = enemyHp - iceDamadge[0];
          console.log("еще мороз: ", iceDamadge[0]);
          iceDamadge.shift();
        }
      }
      HpFightPlayer.textContent = playerHp;
      HpFightEnemy.textContent = enemyHp;
    }
  }
  if (enemyHp <= 0 && playerHp > 0) {
    poleFightsHaveMonsterEnemy = false;
    poleFightsHaveMonsterPlayer = false;
    mapMonsters.get(oldMonsterFightP).currentHP = playerHp;
    let fightMoney = Math.floor(oldEnemyLevel * 30 + getRandomInt(0, 9));

    delete1Monster(oldMonsterFightP);
    delete1Monster(enemyMonster.id);
    updateMonsters();

    money.textContent = Math.floor(money.textContent) + fightMoney;
    console.log("Вы заработали за бой: ", fightMoney);

    chacnceNewMonster(100);
    chacnceNewMonster(200);
    chacnceNewMonster(400);

    console.log("Победил: ", "Player");
    fireDamadge = [];
    fightButton.disabled = false;
    attackButtonPl.disabled = true;
    skillButtonPl1.disabled = true;
    skillButtonPl2.disabled = true;
    skillButtonPl3.disabled = true;
  } else if (playerHp <= 0) {
    poleFightsHaveMonsterEnemy = false;
    poleFightsHaveMonsterPlayer = false;
    delete1MonsterFull(oldMonsterFightP);
    delete1Monster(enemyMonster.id);

    console.log("Победил: ", "enemy");
    fireDamadge = [];
    fightButton.disabled = false;
    attackButtonPl.disabled = true;
    skillButtonPl1.disabled = true;
    skillButtonPl2.disabled = true;
    skillButtonPl3.disabled = true;
  } else {
    attackButtonPl.disabled = false;
    skillButtonPl1.disabled = false;
    skillButtonPl2.disabled = false;
    skillButtonPl3.disabled = false;
  }
}

function fight() {
  if (!poleFightsHaveMonsterEnemy && poleFightsHaveMonsterPlayer) {
    oldEnemyLevel = levelEnemy;
    //если poleFightsHaveMonsterPlayer true, создает Enemy ставит poleFightsHaveMonsterEnemy true

    //console.log("oldEnemyLevel", oldEnemyLevel);

    //если poleFightsHaveMonsterEnemy false,

    let enemy = new Monster("bot", -1, false);
    //console.log("fight countId:", countId);
    enemy.bot(levelEnemy);
    enemy.divMonster(TOTAL_MONSTERS_FIGHT_ENEMY);
    poleFightsHaveMonsterEnemy = true;

    enemyMonster = enemy;

    playerHp = mapMonsters.get(oldMonsterFightP).getCurrentHP();

    enemyHp = enemyMonster.getHp();
    HpFightPlayer.textContent = playerHp;
    HpFightEnemy.textContent = enemyHp;
    fightButton.disabled = true;
    attackButtonPl.disabled = false;
    skillButtonPl1.disabled = false;
    skillButtonPl2.disabled = false;
    skillButtonPl3.disabled = false;
  }
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

function startGame() {
  let noMoreWomens = 1;

  for (let i = 0; i < TOTAL_SIZE_ARR; i++) {
    createNewMonster();

    //console.log("i:", i, "countId:", countId);
    if (i > 0 && mapMonsters.get(i - 1).pol == mapMonsters.get(i).pol) {
      noMoreWomens++;
    }
  }
  if (noMoreWomens == TOTAL_SIZE_ARR) {
    mapMonsters.get(0).pol = !mapMonsters.get(0).pol;
    console.log("Долой однополые браки");
    updateMonsters();
  }
  //console.log(noMoreWomens);
  //testMonsters();
  //updateMonsters();
  select();
}

Events();
startGame();
