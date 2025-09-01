// itemIntelligence.textContent = "🧠Интелл.: ";
// let monsterIntelligence = document.createElement("a");
// monsterIntelligence.textContent = this.firstStat.firstIntelligence.value;
// monsterIntelligence.classList.add("intelligence");
// let bonusMonsterIntelligence = document.createElement("a");
// bonusMonsterIntelligence.textContent = " + " + this.bonusIntelligence;
// itemIntelligence.appendChild(monsterIntelligence);
// if (this.bonusIntelligence != 0) {
//   itemIntelligence.appendChild(bonusMonsterIntelligence);
// }

// for (let [key, value] of Object.entries(this.firstStat)) {
//   if (value.prioritet == true) {
//     itemEndurance.classList.add("prioritet", key);
//   }
// }

function newItemStatCss(text, value, css, bonusValue, prioritet) {
  let mewItem = document.createElement("div");
  mewItem.textContent = text;
  let podItem = document.createElement("a");
  podItem.textContent = value;
  podItem.classList.add(css);
  let bonusPodItem = document.createElement("a");
  bonusPodItem.textContent = " + " + bonusValue;
  mewItem.appendChild(podItem);
  if (bonusPodItem != 0) {
    mewItem.appendChild(bonusPodItem);
  }
  if (prioritet) {
    mewItem.classList.add("prioritet", css);
  }
  return mewItem;
}
