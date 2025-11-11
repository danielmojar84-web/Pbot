const fs = require('fs');
module.exports = {
  name: "deposit",
  description: "Deposit coins to your bank.",
  usage: "deposit <amount>",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    const ecoFile = './economy.json';
    let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
    let amount = parseInt(args[0]);
    if (isNaN(amount) || amount<=0) return sendMessage(senderId, "Usage: deposit <amount>");
    eco[senderId] = eco[senderId] || {coins:0,bank:0,loan:0};
    if (eco[senderId].coins < amount) return sendMessage(senderId, "Not enough coins.");
    eco[senderId].coins -= amount;
    eco[senderId].bank += amount;
    fs.writeFileSync(ecoFile, JSON.stringify(eco));
    sendMessage(senderId, `Deposited ${amount} coins to bank.`);
  }
};