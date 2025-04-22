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

let mamaTarget = -1;
let papaTarget = -1;
let sexButton = document.getElementById("sexButton");

let monsters = new Array();

function getRandomInt(min = 1, max) {
  return Math.floor(Math.random() * max + min);
}
let getRandomWeight = (weights) => {
  // 	let weights = new Array(
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

  console.log("weights: ", weights);
  let sumMax = 0;
  for (let i = 0; i < weights.length; i++) {
    sumMax += weights[i];
  }
  console.log("sumMax: ", sumMax);

  let result = 0;
  let x = getRandomInt(0, sumMax);
  console.log("x:", x);
  for (let i = 0; i < weights.length; i++) {
    console.log("чилос: ", weights[i], " x: ", x);
    x -= weights[i];
    if (x < 0) {
      console.log("result: ", weights[i]);
      result = weights[i];
      break;
    }
  }

  return result;
};
let newAttribute = (attribute) => {
  let result = 0;
  let resultUp = getRandomWeight([TOTAL_UP, TOTAL_NORM, TOTAL_DOWN]);
  if (resultUp == 15)
    result = Math.floor(attribute + attribute * (0.01 * getRandomInt(1, 9)));
  else if (resultUp == 13)
    result = Math.floor(attribute - attribute * (0.01 * getRandomInt(1, 9)));
  else result = attribute;

  //console.log("resultUp: ", resultUp);

  return result;
};

let dominant = (papa, mama) => {
  let finalyDominant = papa;
  let weightPapa = monsters[papa].gen;
  let weightMama = monsters[mama].gen;

  let res = getRandomWeight(weightPapa, weightMama);
  finalyDominant = res === weightPapa ? papa : mama;
  console.log("res: ", res);

  console.log("finalyDominant: ", finalyDominant);

  return finalyDominant;
};
class Monster {
  name = "noname";
  id = 0;
  pol = true;

  hp = 1;
  mana = 1;

  attack = 1;
  armor = 1;
  crit = 1;
  dodge = 1;
  //
  strength = 1;
  agility = 1;
  intelligence = 1;
  //
  gen = 1;

  constructor(name, id, sex) {
    if (sex) {
      this.name = name;
      this.id = id;
      this.pol = getRandomInt(1, 10) >= 5 ? true : false;

      this.strength = getRandomInt(1, 20);
      this.agility = getRandomInt(1, 20);
      this.intelligence = getRandomInt(1, 20);

      this.gen = getRandomInt(1, 300);

      // this.strength = 20;
      // this.agility = 50;
      // this.intelligence = 80;

      this.attack =
        getRandomInt(5, 10) +
        this.agility / 2 +
        this.strength / 2 +
        this.intelligence / 1;

      this.hp = getRandomInt(30, 300) + this.strength * 5;
      this.mana = getRandomInt(1, 150) + this.intelligence * 8;

      this.armor = Math.floor(getRandomInt(0, 10) + this.strength / 4);
      this.crit = Math.floor(
        getRandomInt(1, 10) + this.agility / 10 + this.intelligence / 7
      );

      this.dodge = Math.floor(getRandomInt(1, 5) + this.agility / 2);
    } else if (!sex) {
      this.name = name;
      this.id = id;
      this.pol = getRandomInt(1, 10) >= 5 ? true : false;
      //console.log("Ураааа");
    }
  }

  born(papa, mama) {
    //console.log(monsters);
    //console.log(papa);
    let weightPapa = monsters[papa].gen;
    let weightMama = monsters[mama].gen;

    //console.log("Гены папы:", weightPapa);
    //console.log("Гены мамы:", weightMama);

    let resultGen = getRandomWeight([weightPapa, weightMama]);
    //let resultUp = getRandomWeight([TOTAL_UP, TOTAL_NORM, TOTAL_DOWN]);
    //console.log("resultGen: ", resultGen);

    this.hp = newAttribute(monsters[dominant(papa, mama)].hp);
    //this.mana = newAttribute(monsters[dominant(papa, mama)].mana);

    //this.gen = newAttribute(monsters[dominant(papa, mama)].gen);

    //this.attack = newAttribute(monsters[dominant(papa, mama)].attack);
    //this.armor = newAttribute(monsters[dominant(papa, mama)].armor);
    //this.crit = newAttribute(monsters[dominant(papa, mama)].crit);
    //this.dodge = newAttribute(monsters[dominant(papa, mama)].dodge);

    //this.strength = newAttribute(monsters[dominant(papa, mama)].strength);
    //this.agility = newAttribute(monsters[dominant(papa, mama)].agility);
    // this.intelligence = newAttribute(
    //   monsters[dominant(papa, mama)].intelligence
    // );

    //this.hp = newAttribute(this.hp);

    //console.log("this.hp: ", this.hp);
  }

  printMonster() {
    console.log("Имя: ", this.name);
    console.log("Ид: ", this.id);

    console.log("Пол: ", this.pol ? "Мужской" : "Женский");
    console.log("Здоровье: ", this.hp);
    console.log("Мана: ", this.mana);

    console.log("Атака: ", this.attack);
    console.log("Броня: ", this.armor);
    console.log("Крит: ", this.crit);
    console.log("Уворот: ", this.dodge);

    console.log("Сила: ", this.strength);
    console.log("Ловкость: ", this.agility);
    console.log("Интеллект: ", this.intelligence);

    console.log("Генетика: ", this.gen);
  }

  dviMonster() {
    let profileMonster = document.createElement("ul");

    let itemName = document.createElement("li");

    let itemPol = document.createElement("li");
    let itemHP = document.createElement("li");
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

    itemPol.textContent = "Пол: " + (this.pol ? "Мужской" : "Женский");
    itemHP.textContent = "Здоровье: " + this.hp;
    itemMana.textContent = "Мана: " + this.mana;

    itemAttack.textContent = "Атака: " + this.attack;
    itemArmor.textContent = "Броня: " + this.armor;
    itemCrit.textContent = "Крит: " + this.crit;
    itemDodge.textContent = "Уворот: " + this.dodge;

    itemStrenth.textContent = "Сила: " + this.strength;
    itemAgility.textContent = "Ловкость: " + this.agility;
    itemIntelligence.textContent = "Интеллект: " + this.intelligence;

    itemGen.textContent = "Генетика: " + this.gen;

    //profileMonster = document.getElementById("profileMonster1");
    profileMonster.appendChild(itemName);

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

    profileMonster.appendChild(itemGen);

    document.body.append(profileMonster);
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

  ed.value = monster.id;
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

function createMonsters(name) {
  topArr[0][2] = name;
  //let x = Math.random() * 10;
  for (let i = 1; i < lenghtTopArr; i++) {
    topArr[i][2] = getRandomInt(0, topArr[i][3]);
  }

  //   for (let i = 0; i < lenghtTopArr; i++) {
  //     console.log(topArr[i][0], topArr[i][2]);
  //   }

  let profileMonster = document.createElement("ul");

  for (let i = 0; i < lenghtTopArr; i++) {
    let x = document.createElement("li");
    x.textContent = `${topArr[i][1]}: ${topArr[i][2]}`;
    profileMonster.appendChild(x);
  }
  document.body.append(profileMonster);
}

function select() {
  //mama
  const languagesSelectMama = document.mamaForm.mamaSelect;
  const selectionMama = document.getElementById("selectionMama");
  mamaTarget = -1;

  function changeOptionMama() {
    const selectedOptionMama =
      languagesSelectMama.options[languagesSelectMama.selectedIndex];
    selectionMama.textContent = "Вы выбрали: " + selectedOptionMama.text;

    if (selectedOptionMama.value > -1) mamaTarget = selectedOptionMama.value;
    else {
      mamaTarget = -1;
    }
    //console.log("selectedOptionMama.value: ", selectedOptionMama.value);
  }

  languagesSelectMama.addEventListener("change", changeOptionMama);
  //

  //papa
  const languagesSelectPapa = document.papaForm.papaSelect;
  const selectionPapa = document.getElementById("selectionPapa");
  papaTarget = -1;

  function changeOptionPapa() {
    const selectedOptionPapa =
      languagesSelectPapa.options[languagesSelectPapa.selectedIndex];
    selectionPapa.textContent = "Вы выбрали: " + selectedOptionPapa.text;

    if (selectedOptionPapa.value > -1) papaTarget = selectedOptionPapa.value;
    else {
      papaTarget = -1;
    }
    //console.log("selectedOptionPapa.value: ", selectedOptionPapa.value);
  }

  languagesSelectPapa.addEventListener("change", changeOptionPapa);
  //
}

function startGame() {
  for (let i = 0; i < 4; i++) {
    let newMonster = new Monster(names[0], i, true);
    names.shift();

    newMonster.dviMonster();
    selectPolMonster(newMonster);
    monsters.push(newMonster);
    //x.printMonster();
  }
  select();
}

function sexButtonClick() {
  //alert("Ах Ах");
  console.log("Мама: ", mamaTarget);
  console.log("Папа: ", papaTarget);
  //console.log(monsters.length);

  let newMonster = new Monster(names[0], monsters.length, false);
  names.shift();

  //  weights.push(weight1);
  //  weights.push(weight2);

  newMonster.born(papaTarget, mamaTarget);

  monsters.push(newMonster);
  newMonster.dviMonster();

  //console.log(resultGen);
}

sexButton.addEventListener("click", sexButtonClick);

startGame();
