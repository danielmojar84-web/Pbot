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
  name: "ban",
  description: "Ban user (permanent or timed, with reason). Admin only.",
  usage: "ban <user_id> <permban|timeban> <duration(minutes/timeban only)> <reason>",
  role: 1,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    if (!isAdmin(senderId)) return sendMessage(senderId, "You are not an admin.");
    const [targetId, type, timeOrReason, ...reasonArr] = args;
    if (!targetId || !type || (type == "timeban" && !timeOrReason) || (!reasonArr.length && type == "timeban")) {
      return sendMessage(senderId, "Usage: ban <user_id> <permban|timeban> <duration(minutes/timeban only)> <reason>");
    }
    const bans = getBans();
    if (type == "permban") {
      bans[targetId] = { type: "permban", reason: [timeOrReason, ...reasonArr].join(" "), bannedAt: Date.now() };
    } else if (type == "timeban") {
      let duration = parseInt(timeOrReason);
      if (isNaN(duration)) return sendMessage(senderId, "Duration should be a number (minutes).");
      bans[targetId] = {
        type: "timeban",
        expires: Date.now() + duration * 60000,
        reason: reasonArr.join(" "),
        bannedAt: Date.now()
      };
    } else {
      return sendMessage(senderId, "Type must be permban or timeban.");
    }
    saveBans(bans);
    sendMessage(senderId, `User ${targetId} banned (${type}).`);
  }
};