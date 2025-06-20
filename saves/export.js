var fs = require("fs");
var file = fs.createWriteStream("array.txt");
file.on("error", function (err) {
  /* error handling */
});
arr.forEach(function (v) {
  file.write(v.join(", ") + "\n");
});
file.end();
