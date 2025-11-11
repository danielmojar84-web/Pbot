const fs = require('fs');
const adminFile = './adminlist.json';
function isAdmin(uid) {
  if (!fs.existsSync(adminFile)) return false;
  return JSON.parse(fs.readFileSync(adminFile)).includes(uid);
}
module.exports = {
  name: "setcoin",
  description: "Set a user's coins (admin only).",
  usage: "setcoin <user_id> <amount>",
  role: 1,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    if (!isAdmin(senderId)) return sendMessage(senderId, "You are not an admin.");
    const ecoFile = './economy.json';
    let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
    if (args.length < 2) return sendMessage(senderId, "Usage: setcoin <user_id> <amount>");
    let target = args[0], amount = parseInt(args[1]);
    if (isNaN(amount)) return sendMessage(senderId, "Amount must be a number.");
    eco[target] = eco[target] || {coins:0,bank:0,loan:0};
    eco[target].coins = amount;
    fs.writeFileSync(ecoFile, JSON.stringify(eco));
    sendMessage(senderId, `Set ${target}'s coins to ${amount}.`);
  }
};