const fs = require('fs');
module.exports = {
  name: "withdraw",
  description: "Withdraw coins from bank.",
  usage: "withdraw <amount>",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    const ecoFile = './economy.json';
    let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
    let amount = parseInt(args[0]);
    if (isNaN(amount) || amount<=0) return sendMessage(senderId, "Usage: withdraw <amount>");
    eco[senderId] = eco[senderId] || {coins:0,bank:0,loan:0};
    if (eco[senderId].bank < amount) return sendMessage(senderId, "Not enough in bank.");
    eco[senderId].coins += amount;
    eco[senderId].bank -= amount;
    fs.writeFileSync(ecoFile, JSON.stringify(eco));
    sendMessage(senderId, `Withdrew ${amount} coins from bank.`);
  }
};