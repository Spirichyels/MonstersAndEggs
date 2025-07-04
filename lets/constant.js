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

const surname = [
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

let fireDamadgePl = [];
let poisonousDamadgePl = [];

let iceDamadgePl = [];
let waterDamadgePl = [];
let lightingDamadgePl = 0;
let wampirismDamadgePl = 0;
let blademailDamadgePl = 0;

let oldHighHumidityEn = false;
let percentHighHumidityEn = 0;
//let highHumidity

let poleFightsHaveMonsterEnemy = false; //Если True нельзя добавлять монстров (врагов) на стол
let poleFightsHaveMonsterPlayer = false; //Если True нельзя добавлять монстров (Игрока) на стол

let endAttackPl = true;
let endAttackEn = true;

let endSkillPl = 1;

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

let endMovePlayerText = document.getElementById("endMovePlayerText");
endMovePlayerText.textContent = TOTAL_PLAYER_MOVE_END_TEXT;

let idDeleteMonsterInput = -100;
let idSellMonsterInput = -100;
let idHealMonsterInput = -100;

let mapMonsters = new Map();
