const TOTAL_UP = 17;
const TOTAL_NORM = 16;
const TOTAL_DOWN = 14;
const TOTAL_MONSTERS_BACKUP = ".monstersDivClass";
const TOTAL_MONSTERS_FIGHT_PLAYER = ".monsterPlayerPoleFights";
const TOTAL_MONSTERS_FIGHT_ENEMY = ".monsterEnemyPoleFights";
const TOTAL_TEG_MONSTER_CARD = "monsterCard";
const TOTAL_TEG_MONSTER_PARENTS = "monsterParents";
const TOTAL_MAX_LEVEL = 15;
const TOTAL_PLAYER_MOVE_END_TEXT = "В этот ход вы: ";

const TOTAL_PRICE_SEX = 70;
const TOTAL_PRICE_SELL = 25;
const TOTAL_PRICE_SELL2 = 5;

const TOTAL_PRICE_HEAL = 100;
const TOTAL_START_MONEY = 500;

const STRENGTH = "strength";
const AGILITY = "agility";
const INTELLIGENCE = "intelligence";
const ENDURANCE = "endurance";

const ATTACK = "attack";
const LVL = "lvl";
const NOTHING = "lvl";

const TOTAL_RARITY_COMMON = "Обычная";
const TOTAL_RARITY_UNUSUAL = "Необычная";
const TOTAL_RARITY_RARE = "Редкая";
const TOTAL_RARITY_VERY_RARE = "Очень Редкая";

const TOTAL_RARITY_ELITE = [5, "Элитная", 10, "+", 4];
const TOTAL_RARITY_EPIC = [6, "Эпическая", 1.5, "*", 1];
const TOTAL_RARITY_LEGENDARY = [7, "Легендарная", 2, "*", 1];
const TOTAL_RARITY_UNIQUE = [8, "Уникальная", 2, "*", 4];

const TOTAL_STATUS_DISSAPERING = "Исчезающая";
const TOTAL_STATUS_FELXIBLE = "Гибкая";
const TOTAL_STATUS_BOSS = "БОСС";
const TOTAL_STATUS_COMPLETED = "Завершенная";

const TOTAL_STATUS_REFORGED = [3, "Перекованная"];
const TOTAL_STATUS_BLOODY = [4, "Кровавая"];
const TOTAL_STATUS_TRINITY = [5, "Триединство"];

const TOTAL_TYPE_SKILL_FIRE_BREATH = 200;
const TOTAL_TYPE_SKILL_ICE_BREATH = 140;
const TOTAL_TYPE_SKILL_LIGHTING_STRIKE = 180;
const TOTAL_TYPE_SKILL_WATER_STRIKE = 160; // взаиводействует с другими
const TOTAL_TYPE_SKILL_POISONOUS_BREATH = 90;

const TOTAL_TYPE_SKILL_WAMPIRISM = 70;
const TOTAL_TYPE_SKILL_BLADEMAIL = 80;

const TOTAL_TYPE_SKILL_PHISICAL = "PHISICAL";

const TOTAL_SIZE_ARR = 4;

const TOTAL_DEBUG = true;

//Math.pow(koeff, i) * price; формула красивого распределения

//переменные
let TOTAL_CHEAT = false; //let чтобы можно было менять
let TOTAL_ID_SORTING = -1;

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

let player = {
  text: "Игрок",
  text2: "Player",

  attack: 0,
  orCrit: false,

  HP: 0,
  Mana: 0,
  endAttack: true,
  endSkill: 1,
  frozen: false,
  water: false,
  firstWater: true,
  percentHighHumidity: 0,
};

let enemy = {
  text: "Враг",
  text2: "Enemy",

  attack: 0,
  orCrit: false,

  HP: 0,
  Mana: 0,
  endAttack: true,
  endSkill: 1,
  frozen: false,
  water: false,
  firstWater: true,
  percentHighHumidity: 0,
};

let fix = 30;

let progressLVL = {
  1: 30,
  2: 60,
  3: 90,
  4: 120,
  5: 150,
  6: 180,
  7: 210,
  8: 240,
  9: 270,
  10: 300,
  11: 330,
  12: 360,
  13: 390,
  14: 420,
  15: 450,
};

// let progressLVL = {
//   1: 1,
//   2: 1,
//   3: 1,
//   4: 1,
//   5: 1,
//   6: 1,
//   7: 1,
//   8: 1,
//   9: 1,
//   10: 1,
//   11: 1,
//   12: 1,
//   13: 1,
//   14: 1,
//   15: 1,
// };

progressText = document.getElementById("progress");

let skillDamadgePlayer = {
  fireDamadge: [],
  poisonousDamadge: [],
  iceDamadge: [],
  waterDamadge: [],
  lightingDamadge: 0,
  wampirismDamadge: 0,
  blademailDamadge: 0,
};

let skillDamadgeEnemy = {
  fireDamadge: [],
  poisonousDamadge: [],
  iceDamadge: [],
  waterDamadge: [],
  lightingDamadge: 0,
  wampirismDamadge: 0,
  blademailDamadge: 0,
};

let waterFirstPl = true;
let waterFirstEn = true;

let oldHighHumidityEn = false;
let oldHighHumidityPl = false;

let poleFightsHaveMonsterEnemy = false; //Если True нельзя добавлять монстров (врагов) на стол
let poleFightsHaveMonsterPlayer = false; //Если True нельзя добавлять монстров (Игрока) на стол

//let endAttackPl = true;
//let endAttackEn = true;

//let endSkillPl = 1;
//let endSkillEn = 1;

let sexButton = document.getElementById("sexButton");

let sellButton = document.getElementById("sellButton");
let dellButton = document.getElementById("dellButton");
let healButton = document.getElementById("healButton");

let saveButton = document.getElementById("saveButton");
let loadButton = document.getElementById("loadButton");

let endMoveButtonPl = document.getElementById("endMoveButtonPl");
let attackButtonPl = document.getElementById("attackButtonPl");
let skillButtonPl1 = document.getElementById("skillButtonPl1");
let skillButtonPl2 = document.getElementById("skillButtonPl2");
let skillButtonPl3 = document.getElementById("skillButtonPl3");

skillNamePl0 = document.getElementById("skillNamePl0");
skillNamePl1 = document.getElementById("skillNamePl1");
skillNamePl2 = document.getElementById("skillNamePl2");

let moveInfoPlayer = document.getElementById("moveInfoPlayer");

let moveInfostrTextPlayerA = document.getElementById("moveInfostrTextPlayerA");
let moveInfostrTextEnemyA = document.getElementById("moveInfostrTextEnemyA");

let moveInfostrTextW = document.getElementById("moveInfostrTextW");
let moveInfostrTextM = document.getElementById("moveInfostrTextM");
let moveInfostrTextNM = document.getElementById("moveInfostrTextNM");

let moveInfostrTextD = document.getElementById("moveInfostrTextD");

let endMovePlayerText = document.getElementById("endMovePlayerText");

let isSorting = document.getElementById("isSorting");
let isReverce = document.getElementById("isReverce");
let isWoman = document.getElementById("isWoman");
let isMan = document.getElementById("isMan");

let isCommon = document.getElementById("isCommon");
let isUnusual = document.getElementById("isUnusual");
let isRare = document.getElementById("isRare");
let isVeryRare = document.getElementById("isVeryRare");

let isDissapering = document.getElementById("isDissapering");
let isFlexible = document.getElementById("isFlexible");
let isCompleted = document.getElementById("isCompleted");

//let isMan = document.getElementById("isMan");

sortSelect = document.selectForm.sortingAttribute;

endMovePlayerText.textContent = TOTAL_PLAYER_MOVE_END_TEXT;

let idDeleteMonsterInput = -100;
let idSellMonsterInput = -100;
let idHealMonsterInput = -100;

let mapMonsters = new Map();
