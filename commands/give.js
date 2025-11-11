const fs = require('fs');
module.exports = {
  name: "give",
  description: "Give coins to a user.",
  usage: "give <user_id> <amount>",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    const ecoFile = './economy.json';
    let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
    if (args.length < 2) return sendMessage(senderId, "Usage: give <user_id> <amount>");
    let target = args[0], amount = parseInt(args[1]);
    if (isNaN(amount) || amount<=0) return sendMessage(senderId, "Amount must be a positive number.");
    eco[senderId] = eco[senderId] || {coins:0,bank:0,loan:0};
    if (eco[senderId].coins < amount) return sendMessage(senderId, "Not enough coins.");
    eco[target] = eco[target] || {coins:0,bank:0,loan:0};
    eco[senderId].coins -= amount;
    eco[target].coins += amount;
    fs.writeFileSync(ecoFile, JSON.stringify(eco));
    sendMessage(senderId, `Gave ${amount} coins to ${target}.`);
  }
};