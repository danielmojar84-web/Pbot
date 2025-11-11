module.exports = {
  name: "id",
  description: "Show your user ID",
  usage: "id",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    sendMessage(senderId, `Your Messenger user ID: ${senderId}`);
  }
};