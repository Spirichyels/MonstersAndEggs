function getHighHumidityAttribute(x) {
  if (percentHighHumidityEn != 0) {
    //console.log(percentHighHumidityEn);
    let res = Math.floor(x - (x * percentHighHumidityEn) / 100);
    //console.log("x: ", +x, "res:" + res);
    return res;
  } else return x;
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
    let hp = Math.floor(
      this.firstHp +
        this.strength * 4 +
        this.agility * 3 +
        this.intelligence * 2
    );
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

      this.firstHp = getRandomInt(30, 60);
      this.firstMana = getRandomInt(1, 20);

      this.firstAttack = getRandomInt(3, 10);
      this.firstArmor = Math.floor(getRandomInt(0, 10));
      this.firstCrit = Math.floor(getRandomInt(1, 10));
      this.firstDodge = Math.floor(getRandomInt(1, 5));

      if (getRandomPercent(100, 35)) {
        this.setSkillBacpack(createNewSkill(getRandomInt(1, 2), false, 0, -1));
        //this.setSkillBacpack(createNewSkill(7, false, 0, -1));
        //this.setSkillBacpack(createNewSkill(10, false, 0, -1));
        //this.setSkillBacpack(createNewSkill(3, false, 0, -1));
      }
    } else if (!create) {
      //console.log("Ураааа");
    }
  }

  bot(lvl) {
    countId--;
    //console.log("bot countId: ", countId);
    this.lvl = lvl;
    const xren = 1.3;
    this.strength = getRandomInt(1 + lvl, Math.floor((lvl * 10) / xren));
    this.agility = getRandomInt(1 + lvl, Math.floor((lvl * 10) / xren));
    this.intelligence = getRandomInt(1 + lvl, Math.floor((lvl * 10) / xren));

    this.firstHp = getRandomInt(30, Math.floor((lvl * 100) / xren));
    this.firstMana = getRandomInt(1, Math.floor((lvl * 100) / xren));

    this.firstAttack = getRandomInt(5, lvl * 2);
    this.firstArmor = Math.floor(getRandomInt(0, lvl));
    this.firstCrit = Math.floor(getRandomInt(1, lvl));
    this.firstDodge = Math.floor(getRandomInt(1, lvl));
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

  waterAttributeDiv(item, attribute, text) {
    let atack = String(attribute);
    item.textContent = text;

    if (this.highHumidity == true) {
      let xyz = document.createElement("del");
      xyz.textContent = atack;
      item.textContent =
        item.textContent + getHighHumidityAttribute(attribute) + String(" ");
      item.appendChild(xyz);
    } else if (this.highHumidity == false) {
      item.textContent += atack;
    }
  }

  divskill(skill) {
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

      let skills = document.createElement("li");
      let skill0 = document.createElement("li");
      let skill1 = document.createElement("li");
      let skill2 = document.createElement("li");

      let itemGen = document.createElement("li");

      itemName.textContent = "Имя: " + this.name + " " + this.surname;
      itemId.textContent = "Уровень: " + this.lvl + "  id: " + this.id;

      itemPol.textContent = "Пол: " + (this.pol ? "Мужской" : "Женский");
      itemHP.textContent =
        "Здоровье: " + this.getCurrentHP() + "/" + this.getHp();
      itemMana.textContent =
        "Мана: " + this.getCurrentMana() + "/" + this.getMana();

      this.waterAttributeDiv(itemAttack, this.getAttack(), "Атака: ");
      this.waterAttributeDiv(itemArmor, this.getArmor(), "Броня: ");
      this.waterAttributeDiv(itemDodge, this.getDodge(), "Уворот: ");

      //itemArmor.textContent = "Броня: " + this.getArmor();
      itemCrit.textContent = "Крит: " + this.getCrit();
      //itemDodge.textContent = "Уворот: " + this.getDodge();

      itemStrenth.textContent = "Сила: " + this.strength;
      itemAgility.textContent = "Ловкость: " + this.agility;
      itemIntelligence.textContent = "Интеллект: " + this.intelligence;
      skills.textContent = "Способности: ";
      try {
        skill0.textContent = this.divskill(0);
        skill1.textContent = this.divskill(1);
        skill2.textContent = this.divskill(2);
      } catch (error) {
        //console.log("monster.div: ", error);
      }

      itemGen.textContent = "Генетика: " + JSON.stringify(this.genetica);

      //profileMonster = document.getElementById("profileMonster1");
      profileMonster.appendChild(itemName);
      profileMonster.appendChild(itemId);

      profileMonster.appendChild(itemPol);
      profileMonster.appendChild(itemHP);
      profileMonster.appendChild(itemMana);

      profileMonster.appendChild(itemAttack);
      profileMonster.appendChild(itemArmor);
      profileMonster.appendChild(itemDodge);
      profileMonster.appendChild(itemCrit);

      profileMonster.appendChild(itemStrenth);
      profileMonster.appendChild(itemAgility);
      profileMonster.appendChild(itemIntelligence);

      profileMonster.appendChild(skills);
      profileMonster.appendChild(skill0);
      profileMonster.appendChild(skill1);
      profileMonster.appendChild(skill2);

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
