module.exports = {
  name: "gemini",
  description: "Ask Gemini for a fun response.",
  usage: "gemini <question>",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage) {
    // Replace with actual api/ai call if needed
    sendMessage(senderId, `Gemini answers: "${args.join(" ")}" is a great question!`);
  }
};