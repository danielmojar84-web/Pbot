const fs = require('fs');
module.exports = {
  name: "loan",
  description: "Take or repay loan.",
  usage: "loan <take|repay> <amount>",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    const ecoFile = './economy.json';
    let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
    let type = args[0], amount = parseInt(args[1]);
    eco[senderId] = eco[senderId] || {coins:0,bank:0,loan:0};
    if (!["take","repay"].includes(type)||isNaN(amount)||amount<=0)
      return sendMessage(senderId, "Usage: loan <take|repay> <amount>");
    if (type==="take") {
      eco[senderId].loan = (eco[senderId].loan||0)+amount;
      eco[senderId].coins += amount;
      sendMessage(senderId, `Took loan of ${amount} coins.`);
    } else {
      if ((eco[senderId].loan||0)<amount) return sendMessage(senderId, "You don't owe that much.");
      if (eco[senderId].coins<amount) return sendMessage(senderId, "Not enough coins to repay.");
      eco[senderId].loan -= amount;
      eco[senderId].coins -= amount;
      sendMessage(senderId, `Loan repaid by ${amount} coins.`);
    }
    fs.writeFileSync(ecoFile, JSON.stringify(eco));
  }
};