const fs = require('fs');
const adminFile = './adminlist.json';

function isAdmin(uid) {
  if (!fs.existsSync(adminFile)) return false;
  return JSON.parse(fs.readFileSync(adminFile)).includes(uid);
}

module.exports = {
  name: "announce",
  description: "Send an announcement (admin only)",
  usage: "announce <message>",
  role: 1,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    if (!isAdmin(senderId)) return sendMessage(senderId, "You are not an admin.");
    const msg = args.join(" ");
    sendMessage(senderId, `Announcement: ${msg}`);
    // You could broadcast here to all known IDs if desired.
  }
};