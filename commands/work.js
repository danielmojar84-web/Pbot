const fs = require('fs');
module.exports = {
  name: "work",
  description: "Work to earn coins.",
  usage: "work",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    const ecoFile = './economy.json';
    let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
    const earn = Math.floor(Math.random()*50)+10;
    eco[senderId] = eco[senderId] || {coins:0,bank:0,loan:0};
    eco[senderId].coins += earn;
    fs.writeFileSync(ecoFile, JSON.stringify(eco));
    sendMessage(senderId, `You worked and earned ${earn} coins!`);
  }
};