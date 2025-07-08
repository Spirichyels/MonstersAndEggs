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
const ATTACK = "attack";
const LVL = "lvl";
const NOTHING = "lvl";

const TOTAL_TYPE_SKILL_FIRE_BREATH = 200;
const TOTAL_TYPE_SKILL_ICE_BREATH = 140;
const TOTAL_TYPE_SKILL_LIGHTING_STRIKE = 180;
const TOTAL_TYPE_SKILL_WATER_STRIKE = 160; // взаиводействует с другими
const TOTAL_TYPE_SKILL_POISONOUS_BREATH = 90;

const TOTAL_TYPE_SKILL_WAMPIRISM = 70;
const TOTAL_TYPE_SKILL_BLADEMAIL = 80;

const TOTAL_TYPE_SKILL_PHISICAL = "PHISICAL";

const TOTAL_SIZE_ARR = 4;

//переменные
let TOTAL_CHEAT = false; //let чтобы можно было менять

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

let playerOrCrit = false;
let enemyOrCrit = false;

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
let oldHighHumidityEn = false;
let percentHighHumidityEn = 0;
//let highHumidity

let poleFightsHaveMonsterEnemy = false; //Если True нельзя добавлять монстров (врагов) на стол
let poleFightsHaveMonsterPlayer = false; //Если True нельзя добавлять монстров (Игрока) на стол

let endAttackPl = true;
let endAttackEn = true;

let endSkillPl = 1;
let endSkillEn = 1;

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

let moveInfoPlayer = document.getElementById("moveInfoPlayer");

let moveInfostrTextPlayerA = document.getElementById("moveInfostrTextPlayerA");
let moveInfostrTextEnemyA = document.getElementById("moveInfostrTextEnemyA");

let moveInfostrTextW = document.getElementById("moveInfostrTextW");
let moveInfostrTextM = document.getElementById("moveInfostrTextM");
let moveInfostrTextNM = document.getElementById("moveInfostrTextNM");

let moveInfostrTextD = document.getElementById("moveInfostrTextD");

let endMovePlayerText = document.getElementById("endMovePlayerText");
endMovePlayerText.textContent = TOTAL_PLAYER_MOVE_END_TEXT;

let idDeleteMonsterInput = -100;
let idSellMonsterInput = -100;
let idHealMonsterInput = -100;

let mapMonsters = new Map();
