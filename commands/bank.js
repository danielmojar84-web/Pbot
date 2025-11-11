const fs = require('fs');
module.exports = {
  name: "bank",
  description: "See coins, bank and loan balance.",
  usage: "bank",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    const ecoFile = './economy.json';
    let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
    const data = eco[senderId] || {coins:0,bank:0,loan:0};
    sendMessage(senderId, `Coins: ${data.coins}\nBank: ${data.bank}\nLoan: ${data.loan||0}`);
  }
};