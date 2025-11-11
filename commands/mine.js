const fs = require('fs');
module.exports = {
  name: "mine",
  description: "Mine for coins (random reward).",
  usage: "mine",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    const ecoFile = './economy.json';
    let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
    const earn = Math.floor(Math.random()*35)+5;
    eco[senderId] = eco[senderId] || {coins:0,bank:0,loan:0};
    eco[senderId].coins += earn;
    fs.writeFileSync(ecoFile, JSON.stringify(eco));
    sendMessage(senderId, `You mined and found ${earn} coins!`);
  }
};