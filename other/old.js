// OLD

let skillId = [
  { skillButtonPl1: 1 },
  { skillButtonPl2: 2 },
  { skillButtonPl3: 3 },
];

let mapAtributtRU = new Map([
  ["Имя", "name"],
  ["Здоровье", "hp"],
  ["Мана", "mana"],
  ["Броня", "armor"],
  ["Сила", "strength"],
  ["Ловкость", "agility"],
  ["Интеллект", "intelligence"],
]);
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

function attackButtonCLick2() {
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
        enemyHp = enemyHp - playerAttack;
      }
      HpFightPlayer.textContent = playerHp;
      HpFightEnemy.textContent = enemyHp;
    }
    if (enemyHp <= 0 && playerHp > 0) {
      poleFightsHaveMonsterEnemy = false;
      poleFightsHaveMonsterPlayer = false;
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
}
