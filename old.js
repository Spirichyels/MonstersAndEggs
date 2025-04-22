// OLD
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
