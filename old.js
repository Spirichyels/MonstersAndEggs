// OLD

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

function old_outMonsters2(monster) {
  //console.log(mapAtributt.get("hp"));

  mapAtributtRU.forEach((value, key, map) => {
    console.log(`${key}: ${mapAtributt.get(value)} `);
  });

  let profileMonster = document.createElement("ul");

  mapAtributtRU.forEach((value, key, map) => {
    let x = document.createElement("li");
    x.textContent = `${key}: ${mapAtributt.get(value)} `;
    profileMonster.appendChild(x);
    document.body.append(profileMonster);
    //console.log(`${key}: ${mapAtributt.get(value)} `);
  });
}
function old_outMonsters(monster) {
  console.log("Имя: ", monster.name);
  console.log("Здоровье: ", monster.hp);
  console.log("Мана: ", monster.mana);
  console.log("Броня: ", monster.armor);
  console.log("Сила: ", monster.strength);
  console.log("Ловкость: ", monster.agility);
  console.log("Интеллект: ", monster.intelligence);

  let profileMonster = document.createElement("ul");
  profileMonster.id = "profileMonster1";

  let itemName = document.createElement("li");
  let itemHP = document.createElement("li");
  let itemMana = document.createElement("li");
  let itemArmor = document.createElement("li");
  let itemStrenth = document.createElement("li");
  let itemAgility = document.createElement("li");
  let itemIntelligence = document.createElement("li");

  itemName.textContent = "Имя: " + monster.name;
  itemHP.textContent = "Здоровье: " + monster.hp;
  itemMana.textContent = "Мана: " + monster.mana;
  itemArmor.textContent = "Броня: " + monster.armor;
  itemStrenth.textContent = "Сила: " + monster.strength;
  itemAgility.textContent = "Ловкость: " + monster.agility;
  itemIntelligence.textContent = "Интеллект: " + monster.intelligence;

  //profileMonster = document.getElementById("profileMonster1");
  profileMonster.appendChild(itemName);
  profileMonster.appendChild(itemHP);
  profileMonster.appendChild(itemMana);
  profileMonster.appendChild(itemArmor);
  profileMonster.appendChild(itemStrenth);
  profileMonster.appendChild(itemAgility);
  profileMonster.appendChild(itemIntelligence);

  document.body.append(profileMonster);
  //document.body.append(itemName);

  console.log(profileMonster);
  //console.log(itemName);
}

let date = document.getElementById("date");
let newDate = new Date();

date.textContent = newDate.getHours() + ":" + newDate.getMinutes();

let x = 5;
let newCard = document.createElement("div");
newCard.textContent = "Card: " + x + "\n" + "\nCard: " + x;

document.body.append(newCard);

dragonMonster = new Monster("Dragon");
createMonsters("Амеба");
createMonsters("Морфей");

//outMonsters(dragonMonster);

let test = document.getElementById("test");
console.log(test);

//musor

let mapAtributtEN = new Map([
  ["name", "Имя"],
  ["hp", "Здоровье"],
  ["mana", "Мана"],
  ["armor", "Броня"],
  ["strength", "Сила"],
  ["agility", "Ловкость"],
  ["intelligence", "Интеллект"],
]);

let arrAtributt = new Array(
  "Имя",
  "Здоровье",
  "Мана",
  "Броня",
  "Сила",
  "Ловкость",
  "Интеллект"
);

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

class xren {
  born_old(papa, mama) {
    this.firstHp = newAttributeHpMana(monsters[dominant(papa, mama)].firstHp);
    this.genetica.firstHp = getRandomInt(1, 300);

    this.firstMana = newAttributeHpMana(
      monsters[dominant(papa, mama)].firstMana
    );
    this.genetica.firstMana = getRandomInt(1, 300);

    //this.gen = newAttributeHpMana(monsters[dominant(papa, mama)].gen);

    this.attack = newAttribute(monsters[dominant(papa, mama)].attack);
    this.armor = newAttribute(monsters[dominant(papa, mama)].armor);
    this.crit = newAttribute(monsters[dominant(papa, mama)].crit);
    this.dodge = newAttribute(monsters[dominant(papa, mama)].dodge);

    this.genetica.attack = getRandomInt(1, 300);
    this.genetica.armor = getRandomInt(1, 300);
    this.genetica.crit = getRandomInt(1, 300);
    this.genetica.dodge = getRandomInt(1, 300);

    this.strength = newAttributeSAI(monsters[dominant(papa, mama)].strength);
    this.agility = newAttributeSAI(monsters[dominant(papa, mama)].agility);
    this.intelligence = newAttributeSAI(
      monsters[dominant(papa, mama)].intelligence
    );

    this.genetica.strength = getRandomInt(1, 300);
    this.genetica.agility = getRandomInt(1, 300);
    this.genetica.intelligence = getRandomInt(1, 300);
  }
}

let dominant_old = (papa, mama) => {
  let finalyDominant = papa;
  let weightPapa = monsters[papa].gen;
  let weightMama = monsters[mama].gen;

  let res = getRandomWeight([weightPapa, weightMama]);
  finalyDominant = res === weightPapa ? papa : mama;
  //console.log("res: ", res);

  console.log("finalyDominant: ", finalyDominant);

  return finalyDominant;
};
