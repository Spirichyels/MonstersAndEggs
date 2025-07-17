function onSaveLocalStorage() {
  let map = mapMonsters;
  const entries = Array.from(map.entries()).map(([id, monster]) => [
    id,
    {
      name: monster.name,
      surname: monster.surname,
      id: monster.id,
      lvl: monster.lvl,
      pol: monster.pol,
      rarity: monster.rarity,
      status: monster.status,

      firstHp: monster.firstHp,
      firstMana: monster.firstMana,

      currentHP: monster.currentHP,
      currentMana: monster.currentMana,

      firstAttack: monster.firstAttack,
      firstArmor: monster.firstArmor,
      firstCrit: monster.firstCrit,
      firstDodge: monster.firstDodge,
      //
      strength: monster.strength,
      agility: monster.agility,
      intelligence: monster.intelligence,
      endurance: monster.endurance,

      //
      //gen = 1;
      highHumidity: monster.highHumidity,

      genetica: {
        firstHp: monster.genetica.firstHp,
        firstMana: monster.genetica.firstMana,

        firstAttack: monster.genetica.firstAttack,
        firstArmor: monster.genetica.firstArmor,
        firstCrit: monster.genetica.firstCrit,
        firstDodge: monster.genetica.firstDodge,

        strength: monster.genetica.strength,
        agility: monster.genetica.agility,
        intelligence: monster.genetica.intelligence,
        endurance: monster.genetica.endurance,
      },
      genskills: {
        skill0: monster.genskills.skill0,
        skill1: monster.genskills.skill1,
        skill2: monster.genskills.skill2,
      },
      skillBacpack: {
        skill0: {
          lvl: monster.skillBacpack[0] ? monster.skillBacpack[0].lvl : -1,
          duration: monster.skillBacpack[0]
            ? monster.skillBacpack[0].duration
            : -1,
          type: monster.skillBacpack[0] ? monster.skillBacpack[0].type : -1,
          text: monster.skillBacpack[0] ? monster.skillBacpack[0].text : -1,
          percent: monster.skillBacpack[0]
            ? monster.skillBacpack[0].percent
            : -1,
        },
        skill1: {
          lvl: monster.skillBacpack[1] ? monster.skillBacpack[1].lvl : -1,
          duration: monster.skillBacpack[1]
            ? monster.skillBacpack[1].duration
            : -1,
          type: monster.skillBacpack[1] ? monster.skillBacpack[1].type : -1,
          text: monster.skillBacpack[1] ? monster.skillBacpack[1].text : -1,
          percent: monster.skillBacpack[1]
            ? monster.skillBacpack[1].percent
            : -1,
        },
        skill2: {
          lvl: monster.skillBacpack[2] ? monster.skillBacpack[2].lvl : -1,
          duration: monster.skillBacpack[2]
            ? monster.skillBacpack[2].duration
            : -1,
          type: monster.skillBacpack[2] ? monster.skillBacpack[2].type : -1,
          text: monster.skillBacpack[2] ? monster.skillBacpack[2].text : -1,
          percent: monster.skillBacpack[2]
            ? monster.skillBacpack[2].percent
            : -1,
        },
      },
    },
  ]);
  localStorage.setItem("monsters", JSON.stringify(entries));

  localStorage.setItem("id_range.min", id_range.value);
  localStorage.setItem("progressLVL", JSON.stringify(progressLVL));
  localStorage.setItem("countId", countId);
  localStorage.setItem("money", money.textContent);
}

function loadHelp(data) {
  let x = new Monster();
  x.loadConstructor(
    data.name,
    data.surname,
    data.id,
    data.lvl,
    data.pol,
    data.rarity,
    data.status,
    data.firstHp,
    data.firstMana,
    data.currentHP,
    data.currentMana,
    data.firstAttack,
    data.firstArmor,
    data.firstCrit,
    data.firstDodge,
    data.strength,
    data.agility,
    data.intelligence,
    data.endurance,
    data.highHumidity,
    data.genetica,
    data.genskills,
    data.skillBacpack
  );
  return x;
}

function onLoadLocalStorage() {
  const stored = localStorage.getItem("monsters");
  if (!stored) return new Map();
  const parsed = JSON.parse(stored);

  const restoredMap = new Map(parsed.map(([id, data]) => [id, loadHelp(data)]));

  //mapMonsters = [];
  clearMonsters();

  mapMonsters = restoredMap;
  countId = localStorage.getItem("countId");
  money.textContent = localStorage.getItem("money");
  updateMonsters(false);

  id_range.value = localStorage.getItem("id_range.min");

  progressLVLLocalStor = localStorage.getItem("progressLVL");
  progressLVL = JSON.parse(progressLVLLocalStor);
  idRange();
}

function loadMonstersToStorage() {
  const stored = localStorage.getItem("monsters");
  if (!stored) return new Map();
  const parsed = JSON.parse(stored);

  const restoredMap = new Map(parsed.map(([id, data]) => [id, loadHelp(data)]));

  return restoredMap;
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
// function loadHelp2(data) {
//   let x = new Monster();
//   x.loadConstructor(data.id, data.name, data.atack, data.hp, data.gen);
//   return x;
// }
