function test123() {
  let price = 30;
  let koeff = 1.19;

  for (let i = 1; i < 15; i++) {
    console.log(price * Math.pow(koeff, i));
  }
}
