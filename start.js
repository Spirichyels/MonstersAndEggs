const names = [
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
  "Елан",
  "Лох",
  "Ангел",
  "Вонючка",
  "Нечеловек",
  "Огрызок",
  "Огузок",
  "Огурец",
];

let surname = [
  "Аветисян",
  "Лусине",
  "Акопян",
  "Меружан",
  "Ангелов",
  "Бабайцева",
  "Бабойдо",
  "Байдиков",
  "Баран",
  "Барсук",
  "Басистый",
  "Беззаборная",
  "Благодатный",
  "Блоха",
  "Боцман",
  "Бочечка",
  "Брыкалова",
  "Брыль",
  "Бугай",
  "Бутылкин",
  "Вареник",
  "Вдовушкина",
  "Великий",
  "Великая",
  "Великородных",
  "Вернигора",
  "Вобликова",
  "Врагов",
  "Выставкина",
  "Вышкварка",
  "Гаврикова",
  "Галимова",
  "Гвоздь",
  "Гниденко",
  "Гнилюк",
  "Гнусин",
  "Гнусина",
  "Гнусова",
  "Голобля",
  "Голопуз",
  "Горбоконь",
  "Граф",
  "Грек",
  "Двухличная",
  "Девочкина",
  "Дежурный",
  "Денежкина",
  "Дериземля",
  "Дерикот",
  "Дерконос",
  "Доброскокина",
  "Добрыдень",
  "Догодайло",
  "Доля",
  "Дорогокупля",
  "Дрюкина",
  "Дуплякина",
  "Дурак",
  "Дурнева",
  "Душная",
  "Дымант",
  "Дядя",
  "Ел",
  "Хави",
  "Елисейкин",
  "Жадобин",
  "Жежеря",
  "Жерлыкин",
  "Жидконожкина",
  "Жидов",
  "Жуликов",
  "Жучков",
  "Жучкова",
  "Забейворота",
  "Задемидько",
  "Заика",
  "Зайка",
  "Замогильный",
  "Запорожец",
  "Здорова",
  "Зелепукин",
  "Земляк",
  "Земляной",
  "Злых",
  "Знов",
  "Зюзюков",
  "Зятьев",
  "Иващенко",
  "Ирискин",
  "Иродов",
  "Кадушкина",
  "Казак",
  "Кайфман",
  "Капля",
  "Кастрюлева",
  "Кастрюлев",
  "Кащеев",
  "Кеда",
  "Кикот",
  "Кисель",
  "Кислая",
  "Клёва",
  "Клюка",
  "Ковцур",
  "Габриельс",
  "Козел",
  "Козка",
  "Козюлина",
  "Колбасина",
  "Колбасюк",
  "Колоберда",
  "Коноплёв",
  "Корж",
  "Кориш",
  "Костыря",
  "Кочетышкин",
  "Кравец-Гомза",
  "Криштофик",
  "Кронштадт",
  "Крошка",
  "Кукишев",
  "Кургузкина",
  "Курочка",
  "Кустикова",
  "Лайкин",
  "Лаптиёв",
  "Ластовыря",
  "Леваненок",
  "Легеня",
  "Лентяева",
  "Липужин",
  "Лобок",
  "Лопата",
  "Лысоконь",
  "Майданюк",
  "Малоедова",
  "Мамудян",
  "Мандрыкина",
  "Масло",
  "Мерная",
  "Мишунькина",
  "Могильник",
  "Мотовиловец",
  "Мудрик",
  "Мурзикова",
  "Мымрин",
  "Мышка",
  "Мышко",
  "Мышьякова",
  "Мякиш",
  "Мясоедов",
  "Мячик",
  "Наливайко",
  "Нараускене",
  "Нахмансон",
  "Негру",
  "Недоносков",
  "Неминущий",
  "Немых",
  "Ненужный",
  "Нескладнова",
  "Несмачная",
  "Несоленый",
  "Нетудыхатко",
  "Неудачин",
  "Нечепаев",
  "Нохрина",
  "Огрызко",
  "Огуля",
  "Однокозов",
  "Окорочков",
  "Орел",
  "Остросаблина",
  "Отрыгина",
  "Падалка",
  "Пападзе",
  "Пархолуй",
  "Пахучий",
  "Пендюрина",
  "Перебейнос",
  "Перескокова",
  "Переход",
  "Пинемясов",
  "Писеукова",
  "Плаксивая",
  "Плоский",
  "Плуготыренко",
  "Повеквечных",
  "Погибельная",
  "Подвальный",
  "Подопригорин",
  "Подрез",
  "Подставкин",
  "Подъяблонская",
  "Подъяблонская",
  "Поздоровкина",
  "Покотило",
  "Полевода",
  "Полянк",
  "Пономарь",
  "Поперека",
  "Попиков",
  "Попикова",
  "Попозогло",
  "Потерпеева",
  "Потеряйко",
  "Похмелкин",
  "Похабин",
  "Почкун",
  "Попиков",
  "Пояниди",
  "Поянова",
  "Пресунько",
  "Приз",
  "Притыкин",
  "Прокопало",
  "Пузикова",
  "Пурик",
  "Пывин",
  "Пысева",
  "Пышнограев",
];

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
const TOTAL_PRICE_SEX = 30;
const TOTAL_PRICE_SELL = 20;
const TOTAL_PRICE_HEAL = 35;

let TOTAL_CHEAT = false;

let mamaTarget = -1;
let oldMamaTarget = -1;
let papaTarget = -1;
let oldPapaTarget = -1;

let currentMonsterFightP = -1;
let oldMonsterFightP = -1;
let countId = -1;

let levelEnemy = 1;
let oldEnemyLevel = levelEnemy;
let money = document.querySelector("#money_count");

let enemyMonster = "none";
let playerHp = 0;
let enemyHp = 0;

let poleFightsHaveMonsterEnemy = false; //Если True нельзя добавлять монстров (врагов) на стол
let poleFightsHaveMonsterPlayer = false; //Если True нельзя добавлять монстров (Игрока) на стол

let sexButton = document.getElementById("sexButton");
let attackButtonPl = document.getElementById("attackButtonPl");
let sellButton = document.getElementById("sellButton");
let dellButton = document.getElementById("dellButton");
let healButton = document.getElementById("healButton");

let idDeleteMonsterInput = -100;
let idSellMonsterInput = -100;
let idHealMonsterInput = -100;

//let monsters = new Array();
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
    let newMoney = Math.floor(
      (mapMonsters.get(idSellMonsterInput).getCurrentHP() /
        mapMonsters.get(idSellMonsterInput).getHp()) *
        10
    );

    let orDel = delete1MonsterFull(idSellMonsterInput);
    //console.log(orDel);
    if (orDel) {
      //console.log("newMoney: ", newMoney);
      money.textContent = Math.floor(money.textContent) + newMoney;
      console.log("Монст продан за: ", newMoney);
    }
  } catch (error) {
    console.log("Введите существующий id вашего монстра в формате от 0-99.");
  }
}

function heal1MonsterClick() {
  //console.log("delete1MonsterClick idDeleteMonsterInput: ", idSellMonsterInput);

  try {
    if (Math.floor(money.textContent) >= TOTAL_PRICE_HEAL) {
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
  //console.log(mapMonsters);
  if (TOTAL_CHEAT) {
    createNewMonster();
    mapMonsters.get(countId).strength = 1000;
    mapMonsters.get(countId).agility = 1000;
    mapMonsters.get(countId).intelligence = 1000;
    TOTAL_CHEAT = false;
  }

  for (let monster of mapMonsters.values()) {
    //console.log(monster.id);
    delete1Monster(monster.id);
    selectPolMonsterDelete(monster.id);
  }

  for (let monster of mapMonsters.values()) {
    //console.log(monster.id);

    monster.divMonster(TOTAL_MONSTERS_BACKUP);
    selectPolMonster(monster);
  }
}

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
  if (resultUp == 15) result = Math.floor(attribute + getRandomInt(1, 10));
  else if (resultUp == 13) result = Math.floor(attribute - getRandomInt(1, 10));
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
  //console.log("res: ", res);

  //console.log("papa: ", papa);
  //console.log("mama: ", mama);

  //console.log("finalyDominant: ", finalyDominant);

  return finalyDominant;
};
function getCurrentMonsterFight(currentMonsterFight) {
  //console.log("getCurrentMonsterFight: ", mapMonsters);
  if (!poleFightsHaveMonsterEnemy) {
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

class Monster {
  name = "noname";
  surname = "surname";
  id = 0;
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
  };

  getHp() {
    let hp = this.firstHp + this.strength * 4;
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
  getAttack() {
    return Math.floor(this.firstAttack + this.strength / 2);
  }
  getArmor() {
    return Math.floor(this.firstArmor + this.agility / 3);
  }
  getCrit() {
    return Math.floor(this.firstCrit + this.intelligence / 5);
  }
  getDodge() {
    return Math.floor(this.firstDodge + this.agility / 2);
  }
  createGen() {
    // console.log("genetica: ", this.genetica);
    // //let x = Array.from(Object.entries(this.genetica));
    // let x = Object.keys(this.genetica).map((key) => ({
    //   key: key,
    //   value: getRandomInt(1, 100),
    // }));
    // console.log("gen map: ", x);

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

      this.firstHp = getRandomInt(30, 300);
      this.firstMana = getRandomInt(1, 150);

      this.firstAttack = getRandomInt(5, 15);
      this.firstArmor = Math.floor(getRandomInt(0, 10));
      this.firstCrit = Math.floor(getRandomInt(1, 10));
      this.firstDodge = Math.floor(getRandomInt(1, 5));

      //
    } else if (!create) {
      //console.log("Ураааа");
    }
  }

  bot(lvl) {
    countId--;
    //console.log("bot countId: ", countId);
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

    //this.genetica.attack = getRandomInt(1, 300);
    //this.genetica.armor = getRandomInt(1, 300);
    //this.genetica.crit = getRandomInt(1, 300);
    //this.genetica.dodge = getRandomInt(1, 300);

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

    //this.genetica.strength = getRandomInt(1, 300);
    //this.genetica.agility = getRandomInt(1, 300);
    //this.genetica.intelligence = getRandomInt(1, 300);
  }

  printMonster() {
    console.log("Имя: ", this.name, " ", this.surname);
    console.log("Ид: ", this.id);

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

      let itemGen = document.createElement("li");

      itemName.textContent = "Имя: " + this.name + " " + this.surname;
      itemId.textContent = "id: " + this.id;

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
  if (money.textContent >= TOTAL_PRICE_SEX) {
    let newMonster = new Monster(names[getRandomInt(0, names.length)], false);

    //mapMonsters.get(papaTarget).printMonster();
    //mapMonsters.get(mamaTarget).printMonster();

    newMonster.born(papaTarget, mamaTarget);
    //newMonster.printGeneticaMonster();

    mapMonsters.set(countId, newMonster);
    newMonster.divMonster(TOTAL_MONSTERS_BACKUP);

    selectPolMonster(newMonster);
    money.textContent = Math.floor(money.textContent - TOTAL_PRICE_SEX);
  } else console.log("НУЖНО БОЛЬШЕ ЗОЛОТА!");

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
function chacnceNewMonster(max) {
  let zet = getRandomPercent(max, Math.floor(oldEnemyLevel * 9));
  if (zet) {
    createNewMonster();
    console.log("Вы нашли монстра: ", mapMonsters.get(countId).name);
  }
}
function attackButtonCLick() {
  //если бой true, работает кнопка атаки

  let playerAttack = 0;
  //console.log(enemyMonster);

  let enemyAttack = 0;
  let playerDodge = false;
  let enemyDodge = false;

  if (poleFightsHaveMonsterEnemy) {
    if (playerHp >= 0 && enemyHp >= 0) {
      //console.log("attackButtonCLick", oldMonsterFightP);

      playerDodge = getRandomPercent(
        100,
        mapMonsters.get(oldMonsterFightP).getDodge()
      );
      enemyDodge = getRandomPercent(100, enemyMonster.getDodge());

      playerAttack = playerAttack - enemyMonster.getArmor();
      playerAttack = getRandomCrit(
        mapMonsters.get(oldMonsterFightP).getAttack(),
        mapMonsters.get(oldMonsterFightP).getCrit()
      );

      enemyAttack = enemyAttack - mapMonsters.get(oldMonsterFightP).getArmor();
      enemyAttack = getRandomCrit(
        enemyMonster.getAttack(),
        enemyMonster.getCrit()
      );

      if (playerDodge) {
        console.log("Игрок увернулся");
      } else if (!playerDodge) {
        //console.log("playerAtack: ", playerAttack);

        playerHp = playerHp - enemyAttack;
        //console.log("playerAtack: ", playerAttack);
      }

      if (enemyDodge) {
        console.log("Враг увернулся");
      } else if (!enemyDodge) {
        //console.log("enemyAttack: ", enemyAttack);

        enemyHp = enemyHp - playerAttack;
        //console.log("enemyAttack: ", enemyAttack);
      }
      //console.log("PlsyerHp: ", playerHp);
      //console.log("enemyHp: ", enemyHp);

      HpFightPlayer.textContent = playerHp;
      HpFightEnemy.textContent = enemyHp;
    }
    if (enemyHp <= 0 && playerHp > 0) {
      //oldMonsterFightP.currentHP = playerHp;
      mapMonsters.get(oldMonsterFightP).currentHP = playerHp;
      delete1Monster(oldMonsterFightP);
      delete1Monster(enemyMonster.id);
      updateMonsters();
      let fightMoney = Math.floor(oldEnemyLevel * 15 + getRandomInt(0, 40));
      money.textContent = Math.floor(money.textContent) + fightMoney;
      console.log("Вы заработали за бой: ", fightMoney);

      chacnceNewMonster(100);
      chacnceNewMonster(200);
      chacnceNewMonster(400);

      console.log("Победил: ", "Player");
      //console.log("oldEnemyLevel", oldEnemyLevel);

      poleFightsHaveMonsterEnemy = false;
    } else if (playerHp <= 0) {
      delete1MonsterFull(oldMonsterFightP);
      delete1Monster(enemyMonster.id);
      poleFightsHaveMonsterEnemy = false;
      console.log("Победил: ", "enemy");
    }
  }
}

function fight() {
  if (!poleFightsHaveMonsterEnemy && poleFightsHaveMonsterPlayer) {
    oldEnemyLevel = levelEnemy;

    //console.log("oldEnemyLevel", oldEnemyLevel);

    //если poleFightsHaveMonsterEnemy false,
    //если poleFightsHaveMonsterPlayer true, создает Enemy ставит poleFightsHaveMonsterEnemy true

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
  }
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
}

function idRange() {
  id_Count.innerHTML = id_range.value;
  levelEnemy = Math.floor(id_range.value);
  //oldEnemyLevel = levelEnemy;
  console.log("levelEnemy: ", levelEnemy);
}

function startGame() {
  let TOTAL_SIZE_ARR = 4;
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
  select();

  //createNewMonster();
  //createNewMonster();
  //createNewMonster();
}

Events();
startGame();
