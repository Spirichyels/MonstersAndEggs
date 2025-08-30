/*



*/

function levelGenBudgetFormula(price, level) {
  let koeff = 1.17;
  return price * Math.pow(koeff, level);
}

function koeffRarityFormula(rareId) {
  let koeff = 1.09;
  return Math.pow(koeff, rareId);
}

function getGenBudget(levelMonster, idRareMonter) {
  const STANDART_BUDGET = 30;
  const MIN_BUDGET_KOEFF = 0.95;
  const MAX_BUDGET_KOEFF = 1.05;

  let normalBudget =
    levelGenBudgetFormula(STANDART_BUDGET, levelMonster) *
    koeffRarityFormula(idRareMonter);
  //console.log(getRandomFloat(MIN_BUDGET_KOEFF, MAX_BUDGET_KOEFF));

  return Math.floor(
    normalBudget * getRandomFloat(MIN_BUDGET_KOEFF, MAX_BUDGET_KOEFF)
  );
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // обмен элементов
  }
}
