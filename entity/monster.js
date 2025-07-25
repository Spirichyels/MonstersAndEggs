function getHighHumidityAttribute(x, isBot) {
  if (isBot == true) {
    if (player.percentHighHumidity != 0) {
      //console.log(percentHighHumidityEn);
      let res = Math.floor(x - (x * player.percentHighHumidity) / 100);
      //console.log("x: ", +x, "res:" + res);
      return res;
    } else return x;
  }

  if (isBot == false) {
    if (enemy.percentHighHumidity != 0) {
      //console.log(percentHighHumidityEn);
      let res = Math.floor(x - (x * enemy.percentHighHumidity) / 100);
      //console.log("x: ", +x, "res:" + res);
      return res;
    } else return x;
  }
}

class Monster {
  name = "noname";
  surname = "surname";
  id = 0;
  lvl = 1;
  rarity = TOTAL_RARITY_COMMON;
  status = TOTAL_STATUS_FELXIBLE;

  pol = true;

  firstHp = 1;
  firstMana = 1;

  currentHP = -1;
  currentMana = -1;

  firstAttack = 1;
  firstArmor = 1;
  firstCrit = 1;
  firstDodge = 1;
  //
  firstEndurance = 1;
  firstStrength = 1;
  firstAgility = 1;
  firstIntelligence = 1;

  bonusEndurance = 0;
  bonusStrength = 0;
  bonusAgility = 0;
  bonusIntelligence = 0;
  //
  //gen = 1;
  highHumidity = false;

  genetica = {
    firstHp: 1,
    firstMana: 1,

    firstAttack: 1,
    firstArmor: 1,
    firstCrit: 1,
    firstDodge: 1,

    firstEndurance: 1,
    firstStrength: 1,
    firstAgility: 1,
    firstIntelligence: 1,
  };
  genskills = {
    skill0: 1,
    skill1: 1,
    skill2: 1,
  };

  skillBacpack = [];

  newSkillBackpack = [];
  newSkillBackpack2 = [];

  loadConstructor(
    name,
    surname,
    id,
    lvl,
    pol,
    rarity,
    status,
    firstHp,
    firstMana,
    currentHP,
    currentMana,
    firstAttack,
    firstArmor,
    firstCrit,
    firstDodge,

    firstEndurance,
    firstStrength,
    firstAgility,
    firstIntelligence,

    bonusEndurance,
    bonusStrength,
    bonusAgility,
    bonusIntelligence,

    highHumidity,
    genetica,
    genskills,
    skillBacpack
  ) {
    this.name = name;
    this.surname = surname;
    this.id = id;
    this.lvl = lvl;
    this.rarity = rarity;
    this.status = status;
    this.pol = pol;

    this.firstHp = firstHp;
    this.firstMana = firstMana;

    this.currentHP = currentHP;
    this.currentMana = currentMana;

    this.firstAttack = firstAttack;
    this.firstArmor = firstArmor;
    this.firstCrit = firstCrit;
    this.firstDodge = firstDodge;
    //
    this.firstEndurance = firstEndurance;
    this.firstStrength = firstStrength;
    this.firstAgility = firstAgility;
    this.firstIntelligence = firstIntelligence;

    this.bonusEndurance = bonusEndurance;
    this.bonusStrength = bonusStrength;
    this.bonusAgility = bonusAgility;
    this.bonusIntelligence = bonusIntelligence;

    //
    //gen = 1;
    this.highHumidity = highHumidity;

    this.genetica.firstHp = genetica.firstHp;
    this.genetica.firstMana = genetica.firstMana;

    this.genetica.firstAttack = genetica.firstAttack;
    this.genetica.firstArmor = genetica.firstArmor;
    this.genetica.firstCrit = genetica.firstCrit;
    this.genetica.firstDodge = genetica.firstDodge;

    this.genetica.firstEndurance = genetica.firstEndurance;
    this.genetica.firstStrength = genetica.firstStrength;
    this.genetica.firstAgility = genetica.firstAgility;
    this.genetica.firstIntelligence = genetica.firstIntelligence;

    this.genskills.skill0 = genskills.skill0;
    this.genskills.skill1 = genskills.skill1;
    this.genskills.skill2 = genskills.skill2;

    //console.log(skillBacpack);

    if (skillBacpack.skill0.lvl != -1) {
      this.setSkillBacpack(
        createNewSkill(
          skillBacpack.skill0.lvl,
          skillBacpack.skill0.type,
          skillBacpack.skill0.type,
          skillBacpack.skill0.duration,
          skillBacpack.skill0.percent
        )
      );
    }

    if (skillBacpack.skill1.lvl != -1) {
      this.setSkillBacpack(
        createNewSkill(
          skillBacpack.skill1.lvl,
          skillBacpack.skill1.type,
          skillBacpack.skill1.type,
          skillBacpack.skill1.duration,
          skillBacpack.skill1.percent
        )
      );
    }

    if (skillBacpack.skill2.lvl != -1) {
      this.setSkillBacpack(
        createNewSkill(
          skillBacpack.skill2.lvl,
          skillBacpack.skill2.type,
          skillBacpack.skill2.type,
          skillBacpack.skill2.duration,
          skillBacpack.skill2.percent
        )
      );
    }
  }

  setSkillBacpack(skill) {
    if (this.skillBacpack.length < 3) {
      this.skillBacpack.push(skill);
    }
  }
  setNewSkillBackback(x) {
    let newSkill = getRandomWeightSkill(x);
    this.setSkillBacpack(
      createNewSkill(
        newAttributeSkill(newSkill.lvl),
        true,
        newSkill.type,
        -1,
        -1
      )
    );
  }
  removeSkillBackPack(id) {
    console.log(id);
    this.skillBacpack.splice(id, 1);
  }

  getEndurance() {
    return this.firstEndurance + this.bonusEndurance;
  }

  getStrength() {
    return this.firstStrength + this.bonusStrength;
  }
  getAgility() {
    return this.firstAgility + this.bonusAgility;
  }
  getIntelligence() {
    return this.firstIntelligence + this.bonusIntelligence;
  }

  getHp() {
    let hp = Math.floor(this.firstHp + this.getEndurance() * 10);
    return hp;
  }

  getCurrentHP() {
    if (this.currentHP == -1) {
      return this.getHp();
    } else return this.currentHP;
  }

  getMana() {
    let mana = this.firstMana + this.getIntelligence() * 5;
    return mana;
  }

  getCurrentMana() {
    if (this.currentMana == -1) {
      return this.getMana();
    } else return this.currentMana;
  }

  upLvl() {
    if (this.lvl == 0) {
      this.lvl = this.lvl + getRandomInt(-1, 3);
    } else {
      this.lvl = this.lvl + getRandomInt(-1, 1);
    }
  }
  getAttack() {
    return Math.floor(this.firstAttack + this.getStrength() * 1.4);
  }
  getArmor() {
    return Math.floor(this.firstArmor + this.getAgility() / 1.6);
  }
  getCrit() {
    return Math.floor(this.firstCrit + this.getAgility() / 3.5);
  }
  getDodge() {
    let x = Math.floor(this.firstDodge + this.getAgility() / 2.2);
    if (x >= 90) return 90;
    else return x;
  }

  createGen() {
    for (var key in this.genetica) {
      this.genetica[key] = getRandomInt(1, 100);
    }
    //console.log("genetica: ", this.genetica);
  }

  createGenSkills() {
    for (var key in this.genskills) {
      this.genskills[key] = getRandomInt(1, 100);
    }
    //console.log("genetica: ", this.genetica);
  }
  helpBonusAtribute(atributeText, bonus) {
    if (atributeText == ENDURANCE) {
      this.bonusEndurance = bonus;
    } else if (atributeText == STRENGTH) {
      this.bonusStrength = bonus;
    } else if (atributeText == AGILITY) {
      this.bonusAgility = bonus;
    } else if (atributeText == INTELLIGENCE) {
      this.bonusIntelligence = bonus;
    }
  }
  againBonusAttribute(bonuses, min, max) {
    let bonusId = getRandomSkill(bonuses);
    this.helpBonusAtribute(bonuses.get(bonusId), getRandomInt(min, max));
    bonuses.delete(bonusId);
    //console.log(bonusId);

    //console.log(bonuses);
  }
  constructor(name, create) {
    countId++;
    //console.log("constructor countId: ", countId);
    this.name = name;
    this.surname = surname[getRandomInt(0, surname.length)];
    this.id = countId;
    this.pol = getRandomInt(1, 10) > 5 ? true : false;
    this.createGen();
    this.createGenSkills();
    if (create) {
      this.firstStrength = getRandomInt(1, 20);
      this.firstAgility = getRandomInt(1, 20);
      this.firstIntelligence = getRandomInt(1, 20);
      this.firstEndurance = getRandomInt(1, 20);

      this.firstHp = getRandomInt(1, 60);
      this.firstMana = getRandomInt(1, 20);

      this.firstAttack = getRandomInt(1, 20);
      this.firstArmor = Math.floor(getRandomInt(0, 20));
      this.firstCrit = Math.floor(getRandomInt(1, 15));
      this.firstDodge = Math.floor(getRandomInt(1, 15));
    } else if (!create) {
    }
    this.rarity = getRandomWeightSkill([
      [TOTAL_RARITY_COMMON, 10000],
      [TOTAL_RARITY_UNUSUAL, 200],
      [TOTAL_RARITY_RARE, 20],
      [TOTAL_RARITY_VERY_RARE, 5],
    ]);

    let bonuses = new Map([
      [2, ENDURANCE],
      [3, STRENGTH],
      [4, AGILITY],
      [5, INTELLIGENCE],
    ]);

    if (this.rarity == TOTAL_RARITY_UNUSUAL) {
      let min = 1;
      let max = 5;
      this.againBonusAttribute(bonuses, min, max);
      if (getRandomPercent(100, 20))
        this.againBonusAttribute(bonuses, min, max);
    }

    if (this.rarity == TOTAL_RARITY_RARE) {
      let min = 6;
      let max = 10;
      this.againBonusAttribute(bonuses, min, max);
      if (getRandomPercent(100, 20))
        this.againBonusAttribute(bonuses, min, max);
      if (getRandomPercent(100, 10))
        this.againBonusAttribute(bonuses, min, max);
    }

    if (this.rarity == TOTAL_RARITY_VERY_RARE) {
      let min = 10;
      let max = 20;
      this.againBonusAttribute(bonuses, min, max);
      if (getRandomPercent(100, 20))
        this.againBonusAttribute(bonuses, min, max);
      if (getRandomPercent(100, 10))
        this.againBonusAttribute(bonuses, min, max);
      if (getRandomPercent(100, 5)) this.againBonusAttribute(bonuses, min, max);
    }
  }

  bot(lvl) {
    countId--;
    //console.log("bot countId: ", countId);
    this.surname = "";
    this.lvl = lvl;
    const xren = 1.3;
    let min = lvl - 10;
    if (min < 1) min = lvl;
    this.firstStrength = getRandomInt(min, Math.floor((lvl * 10) / xren));
    this.firstAgility = getRandomInt(min, Math.floor((lvl * 10) / xren));
    this.firstIntelligence = getRandomInt(min, Math.floor((lvl * 10) / xren));
    this.firstEndurance = getRandomInt(min, Math.floor((lvl * 10) / xren));

    this.firstHp = getRandomInt(30, Math.floor((lvl * 100) / xren));
    this.firstMana = getRandomInt(1, Math.floor((lvl * 100) / xren));

    this.firstAttack = getRandomInt(5, lvl * 2);
    this.firstArmor = Math.floor(getRandomInt(0, lvl));
    this.firstCrit = Math.floor(getRandomInt(1, lvl));
    this.firstDodge = Math.floor(getRandomInt(1, lvl));

    if (lvl > 1) {
      let min1 = lvl - 2;
      if (min1 < 1) min1 = 1;
      this.setSkillBacpack(
        createNewSkill(getRandomInt(min1, lvl), false, 0, -1, -1)
      );
    }

    if (lvl > 3) {
      let min2 = lvl - 4;
      if (min2 < 1) min2 = 1;
      this.setSkillBacpack(
        createNewSkill(getRandomInt(min2, lvl), false, 0, -1, -1)
      );
    }

    if (lvl > 5) {
      let min3 = lvl - 5;
      if (min3 < 1) min3 = 1;
      this.setSkillBacpack(
        createNewSkill(getRandomInt(min3, lvl), false, 0, -1, -1)
      );
    }
  }
  printSkillsBackpack(backpack) {
    try {
      let s = "";
      for (let x of backpack) {
        s += String(x[0].text + ":" + x[1] + " ");
      }
      //console.log(s);
    } catch (error) {}
  }
  helpFunc(monster) {
    let x = monster.skillBacpack;
    let gen = [];

    for (var key in monster.genskills) {
      gen.push(monster.genskills[key]);
    }

    for (let i = 0; i < x.length; i++) {
      if (x[i] != undefined) {
        this.newSkillBackpack.push([x[i], gen[i]]);
      }
    }
    //console.log(this.newSkillBackpack);
  }
  bornSkills(mama, papa) {
    try {
      this.helpFunc(mama);
      this.helpFunc(papa);

      //this.printSkillsBackpack(this.newSkillBackpack);

      this.newSkillBackpack.sort((b, a) =>
        a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]
      );
      this.printSkillsBackpack(this.newSkillBackpack);

      let x1 = [];

      try {
        x1.push([this.newSkillBackpack[0][0], this.newSkillBackpack[0][1]]);
      } catch (error) {
        //console.log(error);
      }

      let x2 = [];
      let x3 = [];

      for (let i = 1; i < this.newSkillBackpack.length; i++) {
        //console.log("i: ", i);

        if (this.newSkillBackpack[i][0].type == x1[0][0].type) {
          //console.log(this.newSkillBackpack);
          x1.push([this.newSkillBackpack[i][0], this.newSkillBackpack[i][1]]);
          //this.newSkillBackpack.shift();
        } else {
          if (x2 === undefined || x2.length == 0) {
            x2.push([this.newSkillBackpack[i][0], this.newSkillBackpack[i][1]]);
            //this.newSkillBackpack.shift();
          } else if (this.newSkillBackpack[i][0].type == x2[0][0].type) {
            x2.push([this.newSkillBackpack[i][0], this.newSkillBackpack[i][1]]);
            //this.newSkillBackpack.shift();
          } else {
            if (x3 === undefined || x3.length == 0) {
              x3.push([
                this.newSkillBackpack[i][0],
                this.newSkillBackpack[i][1],
              ]);
              //this.newSkillBackpack.shift();
            } else if (this.newSkillBackpack[i][0].type == x3[0][0].type) {
              x3.push([
                this.newSkillBackpack[i][0],
                this.newSkillBackpack[i][1],
              ]);
              //this.newSkillBackpack.shift();
            }
          }
        }
      }

      // console.log("x1:", x1);
      //console.log("x2:", x2);
      //console.log("x3:", x3);

      if (getRandomPercent(100, 60)) {
        this.setNewSkillBackback(x1);
      }
      if (getRandomPercent(100, 60)) {
        this.setNewSkillBackback(x2);
      }
      if (getRandomPercent(100, 60)) {
        this.setNewSkillBackback(x3);
      }
    } catch (error) {
      console.log(error);
    }
  }

  born(papa, mama) {
    this.firstHp = newAttributeHpMana(
      mapMonsters.get(dominant(papa, mama, "firstHp")).firstHp
    );

    this.firstMana = newAttributeHpMana(
      mapMonsters.get(dominant(papa, mama, "firstMana")).firstMana
    );

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

    this.firstEndurance = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "firstEndurance")).firstEndurance
    );
    this.firstStrength = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "firstStrength")).firstStrength
    );
    this.firstAgility = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "firstAgility")).firstAgility
    );
    this.firstIntelligence = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "firstIntelligence"))
        .firstIntelligence
    );

    this.bornSkills(mapMonsters.get(mama), mapMonsters.get(papa));
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

    console.log("Сила: ", this.firstStrength);
    console.log("Ловкость: ", this.firstAgility);
    console.log("Интеллект: ", this.firstIntelligence);

    console.log("Генетика: ", this.genetica);
  }
  printGeneticaMonster() {
    console.log("Имя: ", this.name, "Ид: ", this.id);
    console.log("Генетика: ", this.genetica);
  }

  waterAttributeDiv(item, attribute, text, textEnd, css, isBot) {
    let xyz = document.createElement("del");
    let a = document.createElement("a");

    let atack = String(attribute);
    item.textContent = text;

    if (this.highHumidity == true) {
      //let xyz = document.createElement("del");
      xyz.textContent = atack;

      //a.textContent = atack + textEnd;
      xyz.classList.add(css);
      item.textContent =
        item.textContent +
        getHighHumidityAttribute(attribute, isBot) +
        textEnd +
        String(" ");
      item.appendChild(xyz);
    } else if (this.highHumidity == false) {
      a.textContent = atack + textEnd;
      a.classList.add(css);
      item.appendChild(a);
    }
  }

  divskill1(skill) {
    if (this.skillBacpack[skill].attribute == INTELLIGENCE) {
      return this.skillBacpack[skill].getText(this.getIntelligence());
    }
    if (this.skillBacpack[skill].attribute == AGILITY) {
      return this.skillBacpack[skill].getText(this.getAgility());
    }
    if (this.skillBacpack[skill].attribute == STRENGTH) {
      return this.skillBacpack[skill].getText(this.getStrength());
    }
    if (this.skillBacpack[skill].attribute == ATTACK) {
      return this.skillBacpack[skill].getText(this.getAttack());
    }
    if (this.skillBacpack[skill].attribute == LVL) {
      return this.skillBacpack[skill].getText(this.lvl);
    }
    if (this.skillBacpack[skill].attribute == NOTHING) {
      return this.skillBacpack[skill].getText();
    }
  }

  divskill2(skill) {
    if (this.skillBacpack[skill].attribute == INTELLIGENCE) {
      return this.skillBacpack[skill].getText2(this.getIntelligence());
    }
    if (this.skillBacpack[skill].attribute == AGILITY) {
      return this.skillBacpack[skill].getText2(this.getAgility());
    }
    if (this.skillBacpack[skill].attribute == STRENGTH) {
      return this.skillBacpack[skill].getText2(this.getStrength());
    }
    if (this.skillBacpack[skill].attribute == ATTACK) {
      return this.skillBacpack[skill].getText2(this.getAttack());
    }
    if (this.skillBacpack[skill].attribute == LVL) {
      return this.skillBacpack[skill].getText2(this.lvl);
    }
    if (this.skillBacpack[skill].attribute == NOTHING) {
      return this.skillBacpack[skill].getText2();
    }
  }

  divMonster(nameTeg) {
    //try {
    let profileMonster = document.createElement("div");
    profileMonster.classList.add("monsterCard");
    profileMonster.classList.add("card");

    if (this.rarity == TOTAL_RARITY_UNUSUAL) {
      profileMonster.classList.add("unusual");
    } else if (this.rarity == TOTAL_RARITY_RARE) {
      profileMonster.classList.add("rare");
    } else if (this.rarity == TOTAL_RARITY_VERY_RARE) {
      profileMonster.classList.add("veryRare");
    }

    if (this.name == "bot") {
      if (progressLVL[enemyMonster.lvl] == 1) {
        this.surname = "БОСС";
        profileMonster.classList.add("boss");
      }
    }

    if (this.status == TOTAL_STATUS_COMPLETED) {
      profileMonster.classList.add("completed");
    }

    profileMonster.id = this.id + TOTAL_TEG_MONSTER_CARD;
    profileMonster.value = Math.floor(this.id);

    profileMonster.onclick = function () {
      //console.log("this.value: ", this.value);
      getCurrentMonsterFight(Math.floor(this.value));
    };

    let itemName = document.createElement("div");
    itemName.classList.add("monsterCardName");
    itemName.classList.add("center");

    let itemRare = document.createElement("div");
    itemRare.classList.add("center");
    let itemStatus = document.createElement("div");
    itemStatus.classList.add("center");

    let itemPolLvl = document.createElement("div");
    itemPolLvl.classList.add("monsterCardPolLvl");
    let itemLvl = document.createElement("div");
    let itemPol = document.createElement("div");
    itemPolLvl.appendChild(itemLvl);
    itemPolLvl.appendChild(itemPol);
    itemPolLvl.classList.add("center");

    let itemAtPanel = document.createElement("div");
    itemAtPanel.classList.add("atPanel");

    let itempHPMP = document.createElement("div");
    let itemHP = document.createElement("div");
    //itemHP.classList.add("monsterHP");
    let itemMana = document.createElement("div");
    itempHPMP.appendChild(itemHP);
    itempHPMP.appendChild(itemMana);
    itemAtPanel.appendChild(itempHPMP);

    let itempAttArm = document.createElement("div");
    let itemAttack = document.createElement("div");
    let itemArmor = document.createElement("div");
    itempAttArm.appendChild(itemAttack);
    itempAttArm.appendChild(itemArmor);
    itemAtPanel.appendChild(itempAttArm);

    let itemCrit = document.createElement("div");
    let itemDodge = document.createElement("div");
    itempAttArm.appendChild(itemCrit);
    itempAttArm.appendChild(itemDodge);

    let itemEndurance = document.createElement("div");
    let itemStrenth = document.createElement("div");
    let itemAgility = document.createElement("div");
    let itemIntelligence = document.createElement("div");

    let skills = document.createElement("div");
    let skill0 = document.createElement("div");
    let skill1 = document.createElement("div");
    let skill2 = document.createElement("div");
    let skill00 = document.createElement("div");
    let skill11 = document.createElement("div");
    let skill22 = document.createElement("div");
    let itemGen = document.createElement("div");

    itemName.textContent =
      //"Имя: " +
      this.name + " " + this.surname + " id: " + this.id;

    itemRare.textContent = "◻️Редкость: " + this.rarity;
    itemStatus.textContent = "Статус: " + this.status;

    itemLvl.textContent = "Уровень: " + this.lvl;

    itemPol.textContent = "" + (this.pol ? "♂️Муж." : "♀️Жен.");

    itemHP.textContent = "❤️HP: ";
    let aHP = document.createElement("a");
    aHP.textContent = this.getCurrentHP() + "/" + this.getHp();
    aHP.classList.add("monsterHP");
    itemHP.appendChild(aHP);

    itemMana.textContent = " 💧MP: ";
    let aMP = document.createElement("a");
    aMP.textContent = this.getCurrentMana() + "/" + this.getMana();
    aMP.classList.add("monsterMP");
    itemMana.appendChild(aMP);

    let isBot = true;

    if (this.name == "bot") {
      isBot = true;
    } else {
      isBot = false;
    }

    this.waterAttributeDiv(
      itemAttack,
      this.getAttack(),
      "⚔️Атака: ",
      "",
      "strength",
      isBot
    );
    this.waterAttributeDiv(
      itemArmor,
      this.getArmor(),
      " 🛡️Броня: ",
      "",
      "agility",
      isBot
    );
    this.waterAttributeDiv(
      itemDodge,
      this.getDodge(),
      "🌀Уворот: ",
      "%",
      "agility",
      isBot
    );

    itemCrit.textContent = "💥Крит: ";
    let xcrit = document.createElement("a");
    xcrit.textContent = this.getCrit() + "%";
    xcrit.classList.add("agility");
    itemCrit.appendChild(xcrit);

    itemEndurance.textContent = "🧱Вын.: ";
    let monsterEndurancethis = document.createElement("a");
    monsterEndurancethis.textContent = this.firstEndurance;
    monsterEndurancethis.classList.add("endurance");
    let bonusMonsterEndurancethis = document.createElement("a");
    bonusMonsterEndurancethis.textContent = " + " + this.bonusEndurance;
    itemEndurance.appendChild(monsterEndurancethis);
    if (this.bonusEndurance != 0) {
      itemEndurance.appendChild(bonusMonsterEndurancethis);
    }

    itemStrenth.textContent = "💪Сила: ";
    let monsterStrength = document.createElement("a");
    monsterStrength.textContent = this.firstStrength;
    monsterStrength.classList.add("strength");
    let bonusMonsterStrength = document.createElement("a");
    bonusMonsterStrength.textContent = " + " + this.bonusStrength;
    itemStrenth.appendChild(monsterStrength);
    if (this.bonusStrength != 0) {
      itemStrenth.appendChild(bonusMonsterStrength);
    }

    itemAgility.textContent = "🤸‍♂️Ловк.: ";
    let monsterAgility = document.createElement("a");
    monsterAgility.textContent = this.firstAgility;
    monsterAgility.classList.add("agility");
    let bonusMonsterAgility = document.createElement("a");
    bonusMonsterAgility.textContent = " + " + this.bonusAgility;
    itemAgility.appendChild(monsterAgility);
    if (this.bonusAgility != 0) {
      itemAgility.appendChild(bonusMonsterAgility);
    }

    itemIntelligence.textContent = "🧠Интелл.: ";
    let monsterIntelligence = document.createElement("a");
    monsterIntelligence.textContent = this.firstIntelligence;
    monsterIntelligence.classList.add("intelligence");
    let bonusMonsterIntelligence = document.createElement("a");
    bonusMonsterIntelligence.textContent = " + " + this.bonusIntelligence;
    itemIntelligence.appendChild(monsterIntelligence);
    if (this.bonusIntelligence != 0) {
      itemIntelligence.appendChild(bonusMonsterIntelligence);
    }

    skills.textContent = "Способности:(Ур.|Длит.)";
    try {
      skill0.textContent = this.divskill1(0);
      skill00.textContent = this.divskill2(0);

      skill1.textContent = this.divskill1(1);
      skill11.textContent = this.divskill2(1);

      skill2.textContent = this.divskill1(2);
      skill22.textContent = this.divskill2(2);
    } catch (error) {
      //console.log("monster.div: ", error);
    }

    itemGen.textContent = "Генетика: " + JSON.stringify(this.genetica);
    profileMonster.appendChild(itemRare);
    profileMonster.appendChild(itemStatus);

    profileMonster.appendChild(itemName);
    profileMonster.appendChild(itemPolLvl);

    profileMonster.appendChild(itemAtPanel);

    profileMonster.appendChild(itemEndurance);
    profileMonster.appendChild(itemStrenth);
    profileMonster.appendChild(itemAgility);
    profileMonster.appendChild(itemIntelligence);

    let itemNull = document.createElement("div");
    itemNull.textContent = "__________________________";
    profileMonster.appendChild(itemNull);

    profileMonster.appendChild(skills);
    profileMonster.appendChild(skill0);
    profileMonster.appendChild(skill00);
    profileMonster.appendChild(skill1);
    profileMonster.appendChild(skill11);
    profileMonster.appendChild(skill2);
    profileMonster.appendChild(skill22);

    let x = document.querySelector(`${nameTeg}`);
    x.appendChild(profileMonster);
  }
}
