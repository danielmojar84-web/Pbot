const fs = require('fs');
module.exports = {
  name: "slot",
  description: "Spin the slot machine to win coins.",
  usage: "slot",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    const icons = ['🍀','🍒','🍋','🔔','💎'];
    const result = Array(3).fill().map(()=> icons[Math.floor(Math.random()*icons.length)]).join(" ");
    const win = result.split(' ').every(i => i === result.split(' ')[0]);
    sendMessage(senderId, `Slots: ${result} ${win?'🎉 You win! (+50 coins)' : 'No win 😓'}`);
    if (win) {
      const ecoFile = './economy.json';
      let eco = fs.existsSync(ecoFile) ? JSON.parse(fs.readFileSync(ecoFile)) : {};
      eco[senderId] = eco[senderId] || {coins:0,bank:0,loan:0};
      eco[senderId].coins += 50;
      fs.writeFileSync(ecoFile, JSON.stringify(eco));
    }
  }
};