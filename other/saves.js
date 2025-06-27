function onSaveLocalStorage(map) {
  const entries = Array.from(map.entries()).map(([id, monster]) => [
    id,
    {
      name: monster.name,
      surname: monster.surname,
      id: monster.id,
      lvl: monster.lvl,
      pol: monster.pol,

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
      },
      genskills: {
        skill0: monster.genskills.skill0,
        skill1: monster.genskills.skill1,
        skill2: monster.genskills.skill2,
      },
      skillBacpack: {
        skill0: monster.skillBacpack[0],
        skill1: monster.skillBacpack[1],
        skill2: monster.skillBacpack[2],
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
