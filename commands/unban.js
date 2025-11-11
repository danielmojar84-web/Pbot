const fs = require("fs");
const banFile = "./banlist.json";
const adminFile = "./adminlist.json";
function isAdmin(uid) {
  if (!fs.existsSync(adminFile)) return false;
  return JSON.parse(fs.readFileSync(adminFile)).includes(uid);
}
function getBans() {
  if (!fs.existsSync(banFile)) return {};
  try { return JSON.parse(fs.readFileSync(banFile)); } catch { return {}; }
}
function saveBans(obj) { fs.writeFileSync(banFile, JSON.stringify(obj)); }
module.exports = {
  name: "unban",
  description: "Unban a user (admin only).",
  usage: "unban <user_id>",
  role: 1,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    if (!isAdmin(senderId)) return sendMessage(senderId, "You are not an admin.");
    const [targetId] = args;
    if (!targetId) return sendMessage(senderId, "Usage: unban <user_id>");
    const bans = getBans();
    if (bans[targetId]) {
      delete bans[targetId];
      saveBans(bans);
      sendMessage(senderId, `User ${targetId} has been unbanned.`);
    } else {
      sendMessage(senderId, "User is not banned.");
    }
  }
};