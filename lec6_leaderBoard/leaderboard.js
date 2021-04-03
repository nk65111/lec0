const fs=require("fs");
let leaderboarddata =JSON.parse(fs.readFileSync("./leaderbord.json"));
console.table(leaderboarddata);