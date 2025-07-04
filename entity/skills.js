let TOTAL_ID_SKILLS = 0;

const STRENGTH = "strength";
const AGILITY = "agility";
const INTELLIGENCE = "intelligence";
const ATTACK = "attack";
const LVL = "lvl";
const NOTHING = "lvl";

class Skill {
  lvl = 0;
  id = 0;
  duration = 0;
  type = "";
  text = "Просто способность";
  attribute = INTELLIGENCE;

  constructor(lvl) {
    this.lvl = lvl;
    this.id = TOTAL_ID_SKILLS;
    TOTAL_ID_SKILLS += 1;
    //this.duration = getRandomInt(1, 10) + lvl;
  }

  formula(intelligence, i) {
    return Math.floor(0);
  }

  getDamadge(intelligence) {
    let damadge = [];
    for (let i = 0; i < this.duration; i++) {
      let x = this.formula(intelligence, i);
      damadge.push(x);
    }
    return damadge;
  }

  getFullDamadge(intelligence) {
    let fullDamadge = 0;
    for (let i = 0; i < this.duration; i++) {
      let x = this.formula(intelligence, i);
      fullDamadge = fullDamadge + x;
    }
    return fullDamadge;
  }

  getText(intelligence) {
    return (
      this.text +
      ":\n" +
      "ур: " +
      this.lvl +
      " длит: " +
      this.duration +
      " урон: " +
      this.getFullDamadge(intelligence) +
      "[" +
      this.getDamadge(intelligence) +
      "]"
    );
  }
}

class FireBreath extends Skill {
  duration = getRandomInt(1, this.lvl + 3);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_FIRE_BREATH;
  text = "Огненное дыхание";

  formula(intelligence, i) {
    //console.log("формула огня");

    return Math.floor(((intelligence / 1.4) * (this.lvl + 1)) / (i + 1) / 1.8);
  }
}

class PoisonousBreath extends Skill {
  duration = getRandomInt(1, this.lvl + 3);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_POISONOUS_BREATH;
  text = "Ядовитое дыхание";
  attribute = AGILITY;

  formula(agility, i) {
    //console.log("формула огня");

    return Math.floor(((agility / 1.4) * (this.lvl + 1)) / (i + 1) / 1.8);
  }

  getText(agility) {
    return (
      this.text +
      ":\n" +
      "ур: " +
      this.lvl +
      " длит: " +
      this.duration +
      " урон: " +
      this.getFullDamadge(agility) +
      "[" +
      this.getDamadge(agility) +
      "]"
    );
  }
}
class IceBreath extends Skill {
  duration = Math.floor(getRandomInt(3, this.lvl) / 3);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_ICE_BREATH;
  text = "Морозное дыхание";

  formula(intelligence, i) {
    //console.log("формула мороза");
    return Math.floor(((intelligence / 1.5) * this.lvl) / (i + 1) / 2);
  }
}
class LightningStrike extends Skill {
  duration = 1;
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_LIGHTING_STRIKE;
  text = "Удар молнии";

  formula(intelligence, i) {
    return Math.floor((intelligence / 1.4) * (this.lvl + 1));
  }
}

class WaterStrike extends Skill {
  duration = Math.floor(getRandomInt(2, this.lvl + 3));
  randomDop2 = getRandomInt(0, 10);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_WATER_STRIKE;
  text = "Водный удар";

  formula(intelligence) {
    let res = Math.floor(
      (((55 * intelligence) / 50) * this.lvl) / 10 + this.randomDop2
    );
    if (res > 75) return 75;
    else return res;
  }

  getText(intelligence) {
    return (
      this.text +
      ":\n" +
      "ур: " +
      this.lvl +
      " длит: " +
      this.duration +
      " урон: " +
      "[" +
      this.formula(intelligence) +
      "%]"
    );
  }
}

class Wampirism extends Skill {
  duration = 1;
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_WAMPIRISM;
  text = "Вампиризм";
  attribute = ATTACK;

  formula(attack, i) {
    return Math.floor(1 + (attack / 2) * (this.lvl / 10));
  }
  getText(attack) {
    return (
      this.text +
      ":\n" +
      "ур: " +
      this.lvl +
      " длит: " +
      this.duration +
      " урон: " +
      "[" +
      this.formula(attack) +
      "]"
    );
  }
}

class BladeMail extends Skill {
  duration = 1;
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_BLADEMAIL;
  text = "Отражение";
  attribute = NOTHING;
  percent = getRandomInt(10, 50);

  formula() {
    return Math.floor(this.percent + this.lvl * 10);
  }
  getText(attack) {
    return (
      this.text +
      ":\n" +
      "ур: " +
      this.lvl +
      " длит: " +
      this.duration +
      " урон: " +
      "[" +
      this.formula() +
      "%]"
    );
  }
}

function createNewSkill(lvl, born, type, oldDuration) {
  let weightSkills = new Map([
    [TOTAL_TYPE_SKILL_WATER_STRIKE, new WaterStrike(lvl)],
    [TOTAL_TYPE_SKILL_ICE_BREATH, new IceBreath(lvl)],
    [TOTAL_TYPE_SKILL_LIGHTING_STRIKE, new LightningStrike(lvl)],
    [TOTAL_TYPE_SKILL_FIRE_BREATH, new FireBreath(lvl)],
    [TOTAL_TYPE_SKILL_POISONOUS_BREATH, new PoisonousBreath(lvl)],
    [TOTAL_TYPE_SKILL_WAMPIRISM, new Wampirism(lvl)],
    [TOTAL_TYPE_SKILL_BLADEMAIL, new BladeMail(lvl)],

    //
  ]);

  if (born == false) {
    type = getRandomSkill(weightSkills);
  }
  newSkill = weightSkills.get(type);

  if (oldDuration != -1) {
    newSkill.duration = oldDuration;
    //alert(newSkill.duration);
  }

  return newSkill;
}
