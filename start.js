let names = new Array(
  "Амёба",
  "Тузик",
  "Сатир",
  "Мундир",
  "Мутант",
  "Черепаха",
  "Крыса",
  "Орк",
  "Носорог",
  "Носоног",
  "РукаХер",
  "Бацыла",
  "Чмо",
  "Крысолук",
  "Еблан",
  "Лох",
  "Ангел",
  "Вонючка",
  "Нечеловек",
  "Огрызок",
  "Огузок",
  "Огурец"
);

// function createMamaMoster(monster) {
//   let edMamaLista = document.createElement("option");
//   edMamaLista.value = monster.name;
//   edMamaLista.textContent = monster.name;
//   //console.log(monster.name);
//   mamaList = document.mamaForm.mamaSelect;
//   //console.log(mamaList);
//   mamaList.appendChild(edMamaLista);
// }
let lenghtTopArr = 8;
//	0	1	  2			3			4			  5				6		7
//name имя значение максЗнач шансСвойства шансТогоже шансУвеличения шансУменьшения
let topArr = new Array(
  ["name", "Имя", "noname", -100, -100, -100, 1, 1], //0
  ["hp", "Здоровье", 1, 300, -100, 1, 1, 1], //1
  ["mana", "Мана", 1, 200, -100, 1, 1, 1], //2
  ["attack", "Атака", 1, 30, -100, 1, 1, 1], //3
  ["armor", "Броня", 1, 10, -100, 1, 1, 1], // 4
  ["strength", "Сила", 1, 20, -100, 1, 1, 1], // 5
  ["agility", "Ловкость", 1, 20, -100, 1, 1, 1], //6
  ["intelligence", "Интеллект", 1, 20, -100, 1, 1, 1] //7
);
const TOTAL_UP = 15;
const TOTAL_NORM = 14;
const TOTAL_DOWN = 13;
const TOTAL_MONSTERS_BACKUP = ".monstersDivClass";
const TOTAL_MONSTERS_FIGHT_PLAYER = ".monsterPlayerPoleFights";
const TOTAL_MONSTERS_FIGHT_ENEMY = ".monsterEnemyPoleFights";
const TOTAL_TEG_MONSTER_CARD = "monsterCard";
const TOTAL_TEG_MONSTER_PARENTS = "monsterParents";

let mamaTarget = -1;
let papaTarget = -1;
let currentMonsterFightP = -1;
let oldMonsterFightP = -1;
let countId = -1;

let enemyMonster = "none";
let playerHp = 0;
let enemyHp = 0;

let poleFightsHaveMonster = false; //Если True нельзя добавлять монстров на стол

let sexButton = document.getElementById("sexButton");

let idDeleteMonsterInput = "";

//let monsters = new Array();
let mapMonsters = new Map();

function selectPolMonsterDelete(id) {
  try {
    papaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}

  try {
    mamaList.options[`${id + TOTAL_TEG_MONSTER_PARENTS}`].remove();
  } catch (error) {}
}

function delete1MonsterClick() {
  console.log(
    "delete1MonsterClick idDeleteMonsterInput: ",
    idDeleteMonsterInput
  );
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

function delete1Monster(id) {
  try {
    if (document.getElementById(id + TOTAL_TEG_MONSTER_CARD) != undefined) {
      document.getElementById(id + TOTAL_TEG_MONSTER_CARD).remove();
    }
  } catch (error) {
    console.log("ERROR: Я хуй знает, как ты все сломал.. \nПодробнее:", error);
  }
}

function delete1MonsterFull(id) {
  try {
    if (document.getElementById(id + TOTAL_TEG_MONSTER_CARD) != undefined) {
      document.getElementById(id + TOTAL_TEG_MONSTER_CARD).remove();
      selectPolMonsterDelete(id);
      console.log(id);
      mapMonsters.delete(id);
    }
  } catch (error) {
    console.log("ERROR: Я хуй знает, как ты все сломал.. \nПодробнее:", error);
  }
}

function getRandomInt(min = 1, max) {
  return Math.floor(Math.random() * max + min);
}

function getRandomCrit(attack, crit) {
  let x = getRandomInt(1, 100);
  console.log("crit: ", x <= crit ? 2 : 1);
  console.log("x: ", x);
  return Math.floor(attack * (x <= crit ? 1.5 : 1));
}
let getRandomWeight = (weights) => {
  //   let weights = new Array(
  //     1,
  //     2,
  //     3,
  //     4,
  //     5,
  //     6,
  //     7,
  //     8,
  //     9,
  //     10,
  //     11,
  //     12,
  //     13,
  //     14,
  //     15,
  //     16,
  //     17,
  //     18,
  //     19,
  //     20,
  //     21,
  //     22,
  //     23,
  //     24,
  //     25,
  //     500
  //   );

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
  if (resultUp == 15) result = Math.floor(attribute + getRandomInt(1, 3));
  else if (resultUp == 13) result = Math.floor(attribute - getRandomInt(1, 3));
  else result = attribute;

  //console.log("resultUp: ", resultUp);
  if (result <= 0) result = 1;

  return result;
};

let newAttributeAttack = (attribute) => {
  let result = 0;
  let resultUp = getRandomWeight([TOTAL_UP, TOTAL_NORM, TOTAL_DOWN]);
  if (resultUp == 15) result = Math.floor(attribute + getRandomInt(1, 6));
  else if (resultUp == 13) result = Math.floor(attribute - getRandomInt(1, 6));
  else result = attribute;

  //console.log("resultUp: ", resultUp);
  if (result <= 0) result = 1;

  return result;
};

let dominant = (papa, mama, attribute) => {
  let finalyDominant = papa;
  //let weightPapa = monsters[papa].genetica[`${attribute}`];
  //let weightMama = monsters[mama].genetica[`${attribute}`];

  let weightPapa = mapMonsters.get(papa).genetica[`${attribute}`];
  let weightMama = mapMonsters.get(mama).genetica[`${attribute}`];

  let res = getRandomWeight([weightPapa, weightMama]);
  finalyDominant = res === weightPapa ? papa : mama;
  //console.log("res: ", res);

  //console.log("papa: ", papa);
  //console.log("mama: ", mama);

  console.log("finalyDominant: ", finalyDominant);

  return finalyDominant;
};

class Monster {
  name = "noname";
  id = 0;
  pol = true;

  firstHp = 1;
  firstMana = 1;

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
  };

  getHp() {
    let hp = this.firstHp + this.strength * 5;
    return hp;
  }

  getMana() {
    let mana = this.firstMana + this.intelligence * 5;
    return mana;
  }
  getAttack() {
    return Math.floor(
      this.firstAttack +
        this.agility / 2 +
        this.strength / 2 +
        this.intelligence / 1
    );
  }
  getArmor() {
    return Math.floor(this.firstArmor + this.strength / 4);
  }
  getCrit() {
    return Math.floor(
      this.firstCrit + this.agility / 10 + this.intelligence / 7
    );
  }
  getDodge() {
    return Math.floor(this.firstDodge + this.agility / 2);
  }

  constructor(name, id, create) {
    this.name = name;
    this.id = id;
    this.pol = getRandomInt(1, 10) > 5 ? true : false;
    if (create) {
      countId++;
      this.strength = getRandomInt(1, 20);
      this.agility = getRandomInt(1, 20);
      this.intelligence = getRandomInt(1, 20);

      this.genetica.strength = getRandomInt(1, 300);
      this.genetica.agility = getRandomInt(1, 300);
      this.genetica.intelligence = getRandomInt(1, 300);

      this.firstHp = getRandomInt(30, 300);
      this.firstMana = getRandomInt(1, 150);

      this.genetica.firstHp = getRandomInt(1, 300);
      this.genetica.firstMana = getRandomInt(1, 300);

      this.firstAttack = getRandomInt(5, 10);
      this.firstArmor = Math.floor(getRandomInt(0, 10));
      this.firstCrit = Math.floor(getRandomInt(1, 10));
      this.firstDodge = Math.floor(getRandomInt(1, 5));

      this.genetica.firstAttack = getRandomInt(1, 300);
      this.genetica.firstArmor = getRandomInt(1, 300);
      this.genetica.firstCrit = getRandomInt(1, 300);
      this.genetica.firstDodge = getRandomInt(1, 300);

      //
    } else if (!create) {
      //console.log("Ураааа");
    }
  }

  bot(lvl) {
    countId++;
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
      //monsters[dominant(papa, mama, "firstHp")].firstHp
      mapMonsters.get(dominant(papa, mama, "firstHp")).firstHp
    );
    this.genetica.firstHp = getRandomInt(1, 300);

    this.firstMana = newAttributeHpMana(
      //monsters[dominant(papa, mama, "firstMana")].firstMana
      mapMonsters.get(dominant(papa, mama, "firstMana")).firstMana
    );
    this.genetica.firstMana = getRandomInt(1, 300);

    //this.gen = newAttributeHpMana(monsters[dominant(papa, mama)].gen);

    this.firstAttack = newAttributeAttack(
      //monsters[dominant(papa, mama, "firstAttack")].firstAttack
      mapMonsters.get(dominant(papa, mama, "firstAttack")).firstAttack
    );
    this.firstArmor = newAttributeSAI(
      //monsters[dominant(papa, mama, "firstArmor")].firstArmor
      mapMonsters.get(dominant(papa, mama, "firstArmor")).firstArmor
    );
    this.firstCrit = newAttributeSAI(
      //monsters[dominant(papa, mama, "firstCrit")].firstCrit

      mapMonsters.get(dominant(papa, mama, "firstCrit")).firstCrit
    );
    this.firstDodge = newAttributeSAI(
      //monsters[dominant(papa, mama, "firstDodge")].firstDodge
      mapMonsters.get(dominant(papa, mama, "firstDodge")).firstDodge
    );

    this.genetica.attack = getRandomInt(1, 300);
    this.genetica.armor = getRandomInt(1, 300);
    this.genetica.crit = getRandomInt(1, 300);
    this.genetica.dodge = getRandomInt(1, 300);

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

    this.genetica.strength = getRandomInt(1, 300);
    this.genetica.agility = getRandomInt(1, 300);
    this.genetica.intelligence = getRandomInt(1, 300);
  }

  printMonster() {
    console.log("Имя: ", this.name);
    console.log("Ид: ", this.id);

    console.log("Пол: ", this.pol ? "Мужской" : "Женский");
    console.log("Здоровье: ", this.getHp());
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

  divMonster(nameTeg) {
    try {
      let profileMonster = document.createElement("ul");
      profileMonster.id = this.id + TOTAL_TEG_MONSTER_CARD;
      profileMonster.value = this.id;

      profileMonster.onclick = function () {
        getCurrentMonsterFight(this.value);
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

      let itemGen = document.createElement("li");

      itemName.textContent = "Имя: " + this.name;
      itemId.textContent = "id: " + this.id;

      itemPol.textContent = "Пол: " + (this.pol ? "Мужской" : "Женский");
      itemHP.textContent = "Здоровье: " + this.getHp();
      itemMana.textContent = "Мана: " + this.getMana();

      itemAttack.textContent = "Атака: " + this.getAttack();
      itemArmor.textContent = "Броня: " + this.getArmor();
      itemCrit.textContent = "Крит: " + this.getCrit();
      itemDodge.textContent = "Уворот: " + this.getDodge();

      itemStrenth.textContent = "Сила: " + this.strength;
      itemAgility.textContent = "Ловкость: " + this.agility;
      itemIntelligence.textContent = "Интеллект: " + this.intelligence;

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

function getCurrentMonsterFight(currentMonsterFight) {
  if (!poleFightsHaveMonster) {
    if (oldMonsterFightP != -1) {
      delete1Monster(oldMonsterFightP);
      updateMonsters();
    }
    delete1Monster(currentMonsterFight);
    selectPolMonsterDelete(currentMonsterFight);
    console.log(currentMonsterFight);
    //monsters[currentMonsterFight].divMonster(TOTAL_MONSTERS_FIGHT_PLAYER);
    mapMonsters
      .get(currentMonsterFight)
      .divMonster(TOTAL_MONSTERS_FIGHT_PLAYER);

    oldMonsterFightP = currentMonsterFight;
  }
}
let mapAtributtRU = new Map([
  ["Имя", "name"],
  ["Здоровье", "hp"],
  ["Мана", "mana"],
  ["Броня", "armor"],
  ["Сила", "strength"],
  ["Ловкость", "agility"],
  ["Интеллект", "intelligence"],
]);

let mapAtributt = new Map([
  ["name", "noname"],
  ["hp", -1],
  ["mana", -2],
  ["armor", -3],
  ["strength", -4],
  ["agility", -5],
  ["intelligence", -6],
]);

function selectPolMonster(monster) {
  let ed = document.createElement("option");

  ed.id = monster.id + TOTAL_TEG_MONSTER_PARENTS;
  ed.textContent = monster.name;

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

    if (selectedOptionMama.value > -1) mamaTarget = selectedOptionMama.value;
    else {
      mamaTarget = -1;
    }
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

    if (selectedOptionPapa.value > -1) papaTarget = selectedOptionPapa.value;
    else {
      papaTarget = -1;
    }
    //console.log("selectedOptionPapa.value: ", selectedOptionPapa.value);
  }

  SelectPapa.addEventListener("change", changeOptionPapa);
  //
}

function sexButtonClick() {
  let newMonster = new Monster(
    names[0],
    /*monsters.length*/ mapMonsters.size,
    false
  );
  names.shift();

  console.log("papa");
  //monsters[papaTarget].printMonster();
  mapMonsters.get(papaTarget).printMonster();

  console.log("mama");
  //monsters[mamaTarget].printMonster();
  mapMonsters.get(mamaTarget).printMonster();

  newMonster.born(papaTarget, mamaTarget);

  monsters.push(newMonster); //
  mapMonsters.set(countId, newMonster);
  newMonster.divMonster(TOTAL_MONSTERS_BACKUP);
  //newMonster.printMonster();
  selectPolMonster(newMonster);

  //console.log(resultGen);
}

function attackButtonCLick() {
  //если бой true, работает кнопка атаки

  let playerAttack = 0;
  console.log(enemyMonster);
  console.log(mapMonsters.get(3));

  let enemyAttack = 0;

  if (poleFightsHaveMonster) {
    if (playerHp >= 0 && enemyHp >= 0) {
      console.log("attackButtonCLick", oldMonsterFightP);
      playerAttack = getRandomCrit(
        mapMonsters.get(oldMonsterFightP).getAttack(),
        mapMonsters.get(oldMonsterFightP).getCrit()
      );
      console.log("playerAtack: ", playerAttack);
      playerAttack = playerAttack - enemyMonster.getArmor();

      console.log("playerAtack: ", playerAttack);

      enemyAttack = getRandomCrit(
        enemyMonster.getAttack(),
        enemyMonster.getCrit()
      );
      console.log("enemyAttack: ", enemyAttack);
      //enemyAttack = enemyAttack - monsters[oldMonsterFightP].getArmor();
      enemyAttack = enemyAttack - mapMonsters.get(oldMonsterFightP).getArmor();

      console.log("enemyAttack: ", enemyAttack);

      playerHp = playerHp - enemyAttack;
      enemyHp = enemyHp - playerAttack;

      HpFightPlayer.textContent = playerHp;
      HpFightEnemy.textContent = enemyHp;
    }
    if (enemyHp <= 0) {
      console.log("Победил: ", playerHp > enemyHp ? "Player" : "enemy");

      delete1Monster(oldMonsterFightP);
      delete1Monster(enemyMonster.id);
      updateMonsters();
      poleFightsHaveMonster = false;
    } else if (playerHp <= 0) {
      console.log("Победил: ", playerHp > enemyHp ? "Player" : "enemy");

      delete1MonsterFull(oldMonsterFightP);
      delete1Monster(enemyMonster.id);
      poleFightsHaveMonster = false;
    }
  }
}

function fight() {
  if (!poleFightsHaveMonster) {
    //если бой false, создает Enemy ставит true
    enemy = new Monster("bot", -1, false);
    console.log("fight countId:", countId);
    enemy.bot(getRandomInt(1, 10));
    enemy.divMonster(TOTAL_MONSTERS_FIGHT_ENEMY);
    poleFightsHaveMonster = true;

    enemyMonster = enemy;
    //playerHp = monsters[oldMonsterFightP].getHp();
    playerHp = mapMonsters.get(oldMonsterFightP).getHp();

    enemyHp = enemyMonster.getHp();
    HpFightPlayer.textContent = playerHp;
    HpFightEnemy.textContent = enemyHp;
  }
}
function updateMonsters() {
  console.log(mapMonsters);

  for (let monster of mapMonsters.values()) {
    //console.log(monster.id);
    delete1Monster(monster.id);
    selectPolMonsterDelete(monster.id);
  }

  for (let monster of mapMonsters.values()) {
    console.log(monster.id);

    monster.divMonster(TOTAL_MONSTERS_BACKUP);
    selectPolMonster(monster);
  }
  //   for (let i = 0; i < /*monsters.length*/ mapMonster.size; i++) {
  //     //delete1Monster(monsters[i].id);
  //     delete1Monster(mapMonsters.get(i).id);

  //     //selectPolMonsterDelete(monsters[i].id);
  //     selectPolMonsterDelete(mapMonsters.get(i).id);
  //   }

  //   for (let i = 0; i < monsters.length; i++) {
  //     //monsters[i].divMonster(TOTAL_MONSTERS_BACKUP);
  //     mapMonsters.get(i).divMonster(TOTAL_MONSTERS_BACKUP);

  //     //selectPolMonster(monsters[i]);
  //     selectPolMonster(mapMonsters.get(i));
  //   }
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
      idDeleteMonsterInput = event.target.value;
    });
  delButton.addEventListener("click", delete1MonsterClick);

  fightButton.addEventListener("click", fight);
  attackButtonPl.addEventListener("click", attackButtonCLick);
}

function startGame() {
  //console.log("getRandomWeight: ", getRandomWeight([120, 130]));
  let newMonster = null;
  for (let i = 0; i < 4; i++) {
    newMonster = new Monster(names[0], i, true);

    names.shift();

    newMonster.divMonster(TOTAL_MONSTERS_BACKUP);
    selectPolMonster(newMonster);
    //monsters.push(newMonster);

    mapMonsters.set(countId, newMonster);

    //newMonster.printMonster();
    //console.log("");
  }
  console.log("startGame: ", mapMonsters);
  select();
}

Events();
startGame();
