const fs = require('fs');
module.exports = {
  name: "gamble",
  description: "Gamble your coins (50/50 win-lose).",
  usage: "gamble <amount>",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    const ecoFile = './economy.json';
    let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
    let amount = parseInt(args[0]);
    if (isNaN(amount) || amount<=0) return sendMessage(senderId, "Usage: gamble <amount>");
    eco[senderId] = eco[senderId] || {coins:0,bank:0,loan:0};
    if (eco[senderId].coins < amount) return sendMessage(senderId, "Not enough coins.");
    if (Math.random()>0.5) {
      eco[senderId].coins += amount;
      sendMessage(senderId, `🎉 You WON! (+${amount} coins)`);
    } else {
      eco[senderId].coins -= amount;
      sendMessage(senderId, `😓 You LOST! (-${amount} coins)`);
    }
    fs.writeFileSync(ecoFile, JSON.stringify(eco));
  }
};