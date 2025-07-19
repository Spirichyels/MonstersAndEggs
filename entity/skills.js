let TOTAL_ID_SKILLS = 0;

class Skill {
  lvl = 0;
  id = 0;
  duration = 0;
  type = "";
  text = "Просто способность";
  attribute = INTELLIGENCE;
  percent = 0;

  constructor(lvl) {
    this.lvl = lvl;
    if (this.lvl >= 10) this.lvl = 10;
    this.id = TOTAL_ID_SKILLS;
    TOTAL_ID_SKILLS += 1;
    //this.duration = getRandomInt(1, 10) + lvl;
  }

  basa() {
    let basatext = this.text + ":\n" + this.lvl + "|" + this.duration;
    return basatext;
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
    let zsebalx = this.basa();

    return zsebalx;
  }

  getText2(intelligence) {
    let zsebalx =
      this.getFullDamadge(intelligence) +
      "[" +
      this.getDamadge(intelligence) +
      "]";

    return zsebalx;
  }
}

class FireBreath extends Skill {
  duration = getRandomInt(1, this.lvl);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_FIRE_BREATH;
  text = "🔥Огненное дыхание";

  formula(intelligence, i) {
    return Math.floor(((intelligence / 1.4) * (this.lvl + 1)) / (i + 1) / 1.8);
  }
}

class PoisonousBreath extends Skill {
  duration = getRandomInt(1, this.lvl);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_POISONOUS_BREATH;
  text = "🐍Ядовитое дыхание";
  attribute = AGILITY;

  formula(agility, i) {
    return Math.floor(((agility / 1.4) * (this.lvl + 1)) / (i + 1) / 1.8);
  }
}
class IceBreath extends Skill {
  duration = Math.floor(getRandomInt(3, 3 + this.lvl) / 3);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_ICE_BREATH;
  text = "🧊Морозное дыхание";

  formula(intelligence, i) {
    return Math.floor(((intelligence / 1.5) * this.lvl) / (i + 1) / 2);
  }
}
class LightningStrike extends Skill {
  duration = 1;
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_LIGHTING_STRIKE;
  text = "⚡Удар молнии";

  formula(intelligence, i) {
    return Math.floor((intelligence / 1.4) * (this.lvl + 1));
  }
}

class WaterStrike extends Skill {
  duration = Math.floor(getRandomInt(2, this.lvl + 3));
  percent = getRandomInt(0, 10);
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_WATER_STRIKE;
  text = "🌊Водный удар";

  formula(intelligence) {
    let res = Math.floor(
      (((55 * intelligence) / 50) * this.lvl) / 10 + this.percent
    );
    if (res > 75) return 75;
    else return res;
  }

  getText2(intelligence) {
    return "[" + this.formula(intelligence) + "%]";
  }
}

class Wampirism extends Skill {
  duration = 1;
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_WAMPIRISM;
  text = "🧛Вампиризм";
  attribute = ATTACK;

  formula(attack, i) {
    return Math.floor(1 + (attack / 2) * (this.lvl / 10));
  }
  getText2(attack) {
    return "[" + this.formula(attack) + "]";
  }
}

class BladeMail extends Skill {
  duration = 1;
  fullDamadge = 0;
  type = TOTAL_TYPE_SKILL_BLADEMAIL;
  text = "🦔Отражение";
  attribute = NOTHING;
  percent = getRandomInt(10, 50);

  formula() {
    return Math.floor(this.percent + this.lvl * 10);
  }
  getText2(attack) {
    return "[" + this.formula() + "%]";
  }
}

function createNewSkill(lvl, born, type, oldDuration, oldPercent) {
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
    newSkill.duration = Math.floor(oldDuration);
    newSkill.percent = Math.floor(oldPercent);
    //alert(newSkill.duration);
  }

  return newSkill;
}
