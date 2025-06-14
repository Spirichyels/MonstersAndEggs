function getHighHumidityAttribute(x) {
  if (percentHighHumidityEn != 0) {
    //console.log(percentHighHumidityEn);
    let res = Math.floor(x - (x * percentHighHumidityEn) / 100);
    //console.log("x: ", +x, "res:" + res);
    return res;
  } else return x;
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

  setSkillBacpack(skill) {
    if (this.skillBacpack.length < 3) {
      this.skillBacpack.push(skill);
    }
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
  upLvl() {
    this.lvl = this.lvl + getRandomInt(-1, 3);
  }
  getAttack() {
    return Math.floor(this.firstAttack + this.strength * 1.6);
  }
  getArmor() {
    return Math.floor(this.firstArmor + this.agility / 1.3);
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
    this.surname = surname[getRandomInt(0, names.length)];
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

      if (getRandomPercent(100, 99))
        this.setSkillBacpack(createNewSkill(getRandomInt(1, 2), false, 0));
      if (getRandomPercent(100, 99))
        this.setSkillBacpack(createNewSkill(getRandomInt(1, 2), false, 0));
      if (getRandomPercent(100, 99))
        this.setSkillBacpack(createNewSkill(getRandomInt(1, 2), false, 0));

      //if (true) this.setSkillBacpack(createNewSkill(5));
      //if (true) this.setSkillBacpack(createNewSkill(10));

      //console.log("start: ", this.skillBacpack);

      //   let x = false;
      //   let y = false;
      //   try {
      //     x = this.skillBacpack[0].type == this.skillBacpack[1].type;
      //     y = this.skillBacpack[0].type == this.skillBacpack[2].type;
      //   } catch (error) {}

      //   if (y) {
      //     this.removeSkillBackPack(2);
      //     //console.log("y: ", this.skillBacpack);
      //   }

      //   if (x) {
      //     //console.log("this.skillBacpack[0].type: ", this.skillBacpack[0].type);
      //     //console.log(this.skillBacpack);
      //     this.removeSkillBackPack(1);
      //     //console.log("x: ", this.skillBacpack);
      //   }

      //
    } else if (!create) {
      //console.log("Ураааа");
    }
  }

  bot(lvl) {
    countId--;
    //console.log("bot countId: ", countId);
    this.lvl = lvl;
    this.strength = getRandomInt(1, lvl * 15);
    this.agility = getRandomInt(1, lvl * 15);
    this.intelligence = getRandomInt(1, lvl * 15);

    this.firstHp = getRandomInt(30, lvl * 100);
    this.firstMana = getRandomInt(1, lvl * 100);

    this.firstAttack = getRandomInt(5, lvl * 2);
    this.firstArmor = Math.floor(getRandomInt(0, lvl * 2));
    this.firstCrit = Math.floor(getRandomInt(1, lvl * 2));
    this.firstDodge = Math.floor(getRandomInt(1, lvl * 2));
  }
  printSkillsBackpack(backpack) {
    let s = "";
    for (let x of backpack) {
      s += String(x[0] + ":" + x[1].text + " ");
    }
    console.log(s);
  }
  helpFunc(monster) {
    let x = monster.skillBacpack;
    let gen = [];

    for (var key in monster.genskills) {
      gen.push(monster.genskills[key]);
    }

    for (let i = 0; i < x.length; i++) {
      this.newSkillBackpack.push([gen[i], x[i]]);
    }
  }
  bornSkills(mama, papa) {
    this.helpFunc(mama);
    this.helpFunc(papa);

    this.printSkillsBackpack(this.newSkillBackpack);

    this.newSkillBackpack.sort((b, a) =>
      a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]
    );
    this.printSkillsBackpack(this.newSkillBackpack);

    let weightsArray = [];
    {
    }
  }

  born(papa, mama) {
    this.firstHp = newAttributeHpMana(
      mapMonsters.get(dominant(papa, mama, "firstHp")).firstHp
    );
    //this.genetica.firstHp = getRandomInt(1, 300);

    this.firstMana = newAttributeHpMana(
      mapMonsters.get(dominant(papa, mama, "firstMana")).firstMana
    );
    //this.genetica.firstMana = getRandomInt(1, 300);

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
      //monsters[dominant(papa, mama, "strength")].strength
      mapMonsters.get(dominant(papa, mama, "strength")).strength
    );
    this.agility = newAttributeSAI(
      //monsters[dominant(papa, mama, "agility")].agility
      mapMonsters.get(dominant(papa, mama, "agility")).agility
    );
    this.intelligence = newAttributeSAI(
      //monsters[dominant(papa, mama, "intelligence")].intelligence
      mapMonsters.get(dominant(papa, mama, "intelligence")).intelligence
    );

    this.bornSkills(mapMonsters.get(mama), mapMonsters.get(papa));

    // let newArray = [];
    // let res = 0;
    // for (let a = 0; a < 1; a++) {
    //   for (let b = 1; b < this.newSkillBackpack.length; b++) {
    //     if (this.newSkillBackpack[a][0] == this.newSkillBackpack[b][0])
    //       console.log(
    //         `this.newSkillBackpack[${a}][0]: `,
    //         this.newSkillBackpack[a][0]
    //       );
    //     console.log(
    //       `this.newSkillBackpack[${b}][0]: `,
    //       this.newSkillBackpack[b][0]
    //     );

    //     newArray.push([
    //       this.newSkillBackpack[b][0],
    //       this.newSkillBackpack[b][1],
    //       this.newSkillBackpack[b][2],
    //     ]);
    //     this.newSkillBackpack.splice(b, 1);
    //     b--;
    //   }
    //   newArray.push([
    //     this.newSkillBackpack[a][0],
    //     this.newSkillBackpack[a][1],
    //     this.newSkillBackpack[a][2],
    //   ]);
    //   this.newSkillBackpack.splice(a, 1);

    //   let zaebal = [];
    //   for (let i = 0; i < newArray.length; i++) {
    //     zaebal.push(newArray[i][2]);
    //   }

    //   res = getRandomWeight(zaebal);
    //   for (let i = 0; i < newArray.length; i++) {
    //     if (newArray[i][2] == res) {
    //       this.newSkillBackpack2.push([
    //         newArray[i][0],
    //         newArray[i][1],
    //         newArray[i][2],
    //       ]);
    //     }
    //   }
    //   console.log(newArray);
    //   console.log(res);
    // }
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
      itemMana.textContent = "Мана: " + this.getMana();

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
        // this.skillBacpack[0].getText();
        skill0.textContent = this.skillBacpack[0].getText(this.intelligence);
        skill1.textContent = this.skillBacpack[1].getText(this.intelligence);
        skill2.textContent = this.skillBacpack[2].getText(this.intelligence);

        //skill1.textContent = this.skillBacpack[1].getText();
        //skill2.textContent = this.skillBacpack[2].getText();
      } catch (error) {}

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
