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

function saveMonstersToStorage(map) {
  const entries = Array.from(map.entries()).map(([id, monster]) => [
    id,
    {
      id: monster.id,
      name: monster.name,
      attack: monster.attack,
      hp: monster.hp,
      gen: {
        hp: monster.gen.hp,
        attack: monster.gen.attack,
      },
    },
  ]);
  localStorage.setItem("monsters", JSON.stringify(entries));
}

function loadHelp(data) {
  let x = new Monster();
  x.xren(data.id, data.name, data.atack, data.hp, data.gen);
  return x;
}
function loadMonstersToStorage() {
  const stored = localStorage.getItem("monsters");
  if (!stored) return new Map();
  const parsed = JSON.parse(stored);

  const restoredMap = new Map(parsed.map(([id, data]) => [id, loadHelp(data)]));

  return restoredMap;
}

class Monster {
  name = "noname";
  surname = "surname";
  id = 0;
  lvl = 1;
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
  endurance = 1;
  strength = 1;
  agility = 1;
  intelligence = 1;
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

    strength: 1,
    agility: 1,
    intelligence: 1,
  };
  genskills = {
    skill0: 1,
    skill1: 1,
    skill2: 1,
  };

  skillBacpack = [];

  newSkillBackpack = [];
  newSkillBackpack2 = [];

  xren(
    name,
    surname,
    id,
    lvl,
    pol,
    firstHp,
    firstMana,
    currentHP,
    currentMana,
    firstAttack,
    firstArmor,
    firstCrit,
    firstDodge,
    strength,
    agility,
    intelligence,
    endurance,

    highHumidity,
    genetica,
    genskills,
    skillBacpack
  ) {
    this.name = name;
    this.surname = surname;
    this.id = id;
    this.lvl = lvl;
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
    this.strength = strength;
    this.agility = agility;
    this.intelligence = intelligence;
    this.endurance = endurance;
    //
    //gen = 1;
    this.highHumidity = highHumidity;

    this.genetica.firstHp = genetica.firstHp;
    this.genetica.firstMana = genetica.firstMana;

    this.genetica.firstAttack = genetica.firstAttack;
    this.genetica.firstArmor = genetica.firstArmor;
    this.genetica.firstCrit = genetica.firstCrit;
    this.genetica.firstDodge = genetica.firstDodge;

    this.genetica.strength = genetica.strength;
    this.genetica.agility = genetica.agility;
    this.genetica.intelligence = genetica.intelligence;
    this.genetica.endurance = genetica.endurance;

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
          skillBacpack.skill0.duration
        )
      );
    }

    if (skillBacpack.skill1.lvl != -1) {
      this.setSkillBacpack(
        createNewSkill(
          skillBacpack.skill1.lvl,
          skillBacpack.skill1.type,
          skillBacpack.skill1.type,
          skillBacpack.skill1.duration
        )
      );
    }

    if (skillBacpack.skill2.lvl != -1) {
      this.setSkillBacpack(
        createNewSkill(
          skillBacpack.skill2.lvl,
          skillBacpack.skill2.type,
          skillBacpack.skill2.type,
          skillBacpack.skill2.duration
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
      createNewSkill(newAttributeSkill(newSkill.lvl), true, newSkill.type, -1)
    );
  }
  removeSkillBackPack(id) {
    console.log(id);
    this.skillBacpack.splice(id, 1);
  }

  getHp() {
    let hp = Math.floor(this.firstHp + this.endurance * 10);
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

  getCurrentMana() {
    if (this.currentMana == -1) {
      return this.getMana();
    } else return this.currentMana;
  }

  upLvl() {
    this.lvl = this.lvl + getRandomInt(-1, 3);
  }
  getAttack() {
    return Math.floor(this.firstAttack + this.strength * 1.4);
  }
  getArmor() {
    return Math.floor(this.firstArmor + this.agility / 2);
  }
  getCrit() {
    return Math.floor(this.firstCrit + this.agility / 4);
  }
  getDodge() {
    let x = Math.floor(this.firstDodge + this.agility / 2);
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
      this.strength = getRandomInt(1, 20);
      this.agility = getRandomInt(1, 20);
      this.intelligence = getRandomInt(1, 20);
      this.endurance = getRandomInt(1, 20);

      this.firstHp = getRandomInt(30, 60);
      this.firstMana = getRandomInt(1, 20);

      this.firstAttack = getRandomInt(3, 10);
      this.firstArmor = Math.floor(getRandomInt(0, 10));
      this.firstCrit = Math.floor(getRandomInt(1, 10));
      this.firstDodge = Math.floor(getRandomInt(1, 5));

      //   if (getRandomPercent(100, 35)) {
      //     this.setSkillBacpack(createNewSkill(getRandomInt(1, 2), false, 0, -1));
      //     //this.setSkillBacpack(createNewSkill(7, false, 0, -1));
      //     //this.setSkillBacpack(createNewSkill(10, false, 0, -1));
      //     //this.setSkillBacpack(createNewSkill(3, false, 0, -1));
      //   }
    } else if (!create) {
      //console.log("Ураааа");
    }
  }

  bot(lvl) {
    countId--;
    //console.log("bot countId: ", countId);
    this.lvl = lvl;
    const xren = 1.3;
    let min = lvl - 10;
    if (min < 1) min = lvl;
    this.strength = getRandomInt(min, Math.floor((lvl * 10) / xren));
    this.agility = getRandomInt(min, Math.floor((lvl * 10) / xren));
    this.intelligence = getRandomInt(min, Math.floor((lvl * 10) / xren));
    this.endurance = getRandomInt(min, Math.floor((lvl * 10) / xren));

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
        createNewSkill(getRandomInt(min1, lvl), false, 0, -1)
      );
    }

    if (lvl > 3) {
      let min2 = lvl - 4;
      if (min2 < 1) min2 = 1;
      this.setSkillBacpack(
        createNewSkill(getRandomInt(min2, lvl), false, 0, -1)
      );
    }

    if (lvl > 5) {
      let min3 = lvl - 5;
      if (min3 < 1) min3 = 1;
      this.setSkillBacpack(
        createNewSkill(getRandomInt(min3, lvl), false, 0, -1)
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
        console.log(error);
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

    this.strength = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "strength")).strength
    );
    this.agility = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "agility")).agility
    );
    this.intelligence = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "intelligence")).intelligence
    );
    this.endurance = newAttributeSAI(
      mapMonsters.get(dominant(papa, mama, "endurance")).endurance
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

    console.log("Сила: ", this.strength);
    console.log("Ловкость: ", this.agility);
    console.log("Интеллект: ", this.intelligence);

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
      return this.skillBacpack[skill].getText(this.intelligence);
    }
    if (this.skillBacpack[skill].attribute == AGILITY) {
      return this.skillBacpack[skill].getText(this.agility);
    }
    if (this.skillBacpack[skill].attribute == STRENGTH) {
      return this.skillBacpack[skill].getText(this.strength);
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
      return this.skillBacpack[skill].getText2(this.intelligence);
    }
    if (this.skillBacpack[skill].attribute == AGILITY) {
      return this.skillBacpack[skill].getText2(this.agility);
    }
    if (this.skillBacpack[skill].attribute == STRENGTH) {
      return this.skillBacpack[skill].getText2(this.strength);
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
    //profileMonster.classList.add("legendary");

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

    let itempCritDodje = document.createElement("div");
    let itemCrit = document.createElement("div");
    let itemDodge = document.createElement("div");
    itempAttArm.appendChild(itemCrit);
    itempAttArm.appendChild(itemDodge);
    //itemAtPanel.appendChild(itempCritDodje);

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
    //itemName.classList.add("center");

    if (this.lvl == TOTAL_MAX_LEVEL) {
      itemRare.textContent = "🔹Редкость: Редкая";
      profileMonster.classList.add("rare");
    } else {
      itemRare.textContent = "◻️Редкость: Обычная";
    }

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

    //itemArmor.textContent = "Броня: " + this.getArmor();
    itemCrit.textContent = "💥Крит: ";
    let xcrit = document.createElement("a");
    xcrit.textContent = this.getCrit() + "%";
    xcrit.classList.add("agility");
    itemCrit.appendChild(xcrit);
    //itemDodge.textContent = "Уворот: " + this.getDodge();

    itemEndurance.textContent = "🧱Выносл.: ";
    let monsterEndurancethis = document.createElement("a");
    monsterEndurancethis.textContent = this.endurance;
    monsterEndurancethis.classList.add("endurance");
    itemEndurance.appendChild(monsterEndurancethis);

    itemStrenth.textContent = "💪Сила: ";
    let monsterStrength = document.createElement("a");
    monsterStrength.textContent = this.strength;
    monsterStrength.classList.add("strength");
    itemStrenth.appendChild(monsterStrength);

    itemAgility.textContent = "🤸‍♂️Ловк.: ";
    let monsterAgility = document.createElement("a");
    monsterAgility.textContent = this.agility;
    monsterAgility.classList.add("agility");
    itemAgility.appendChild(monsterAgility);

    itemIntelligence.textContent = "🧠Интелл.: ";
    let monsterIntelligence = document.createElement("a");
    monsterIntelligence.textContent = this.intelligence;
    monsterIntelligence.classList.add("intelligence");
    itemIntelligence.appendChild(monsterIntelligence);

    skills.textContent = "Способности:(Ур.|Длит.)";
    try {
      skill0.textContent = this.divskill1(0);
      skill00.textContent = this.divskill2(0);
      //console.log(typeof this.divskill(0));
      skill1.textContent = this.divskill1(1);
      skill11.textContent = this.divskill2(1);
      //console.log(typeof this.divskill(1));
      skill2.textContent = this.divskill1(2);
      skill22.textContent = this.divskill2(2);

      //console.log(typeof this.divskill(2));
    } catch (error) {
      //console.log("monster.div: ", error);
    }

    itemGen.textContent = "Генетика: " + JSON.stringify(this.genetica);
    profileMonster.appendChild(itemRare);
    profileMonster.appendChild(itemName);
    profileMonster.appendChild(itemPolLvl);

    profileMonster.appendChild(itemAtPanel);

    profileMonster.appendChild(itemStrenth);
    profileMonster.appendChild(itemAgility);
    profileMonster.appendChild(itemIntelligence);
    profileMonster.appendChild(itemEndurance);

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

    //profileMonster.appendChild(itemGen);

    //document.body.append(profileMonster);
    //document.querySelector("monstersDivId").appendChild(profileMonster);
    let x = document.querySelector(`${nameTeg}`);
    x.appendChild(profileMonster);

    //console.log(x);
    // } catch (error) {
    //   console.log(
    //     "Этот метод иммет параметр, скорее всего ты его забыл. \nПодробнее: ",
    //     error
    //   );
    // }

    //x.append(profileMonster);
    //document.body.append(profileMonster);
  }
}
