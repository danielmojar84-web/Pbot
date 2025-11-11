const fs = require("fs");
const adminFile = "./adminlist.json";
function getAdmins() {
  if (!fs.existsSync(adminFile)) return [];
  try { return JSON.parse(fs.readFileSync(adminFile)); } catch { return []; }
}
function saveAdmins(arr) {
  fs.writeFileSync(adminFile, JSON.stringify(arr));
}
module.exports = {
  name: "accessadmin",
  description: "Access admin commands via code.",
  usage: "accessadmin <code>",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    if (args[0] === "dan122012") {
      let admins = getAdmins();
      if (!admins.includes(senderId)) admins.push(senderId), saveAdmins(admins);
      sendMessage(senderId, "✅ Admin access granted.");
    } else {
      sendMessage(senderId, "Invalid code. Access denied.");
    }
  }
};