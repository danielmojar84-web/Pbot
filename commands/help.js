module.exports = {
  name: "help",
  description: "Show commands list or info.",
  usage: "help <page|command>",
  role: 0,
  cooldown: 2,
  author: "System",
  execute(senderId, args, sendMessage, commands) {
    if (!args[0]) {
      let reply = "🤖 Command List:\n";
      Object.values(commands).forEach(cmd =>
        reply += `- ${cmd.name}: ${cmd.description}\n`
      );
      sendMessage(senderId, reply);
    } else if (commands[args[0]]) {
      const cmd = commands[args[0]];
      let reply =
        `Command: ${cmd.name}\nDescription: ${cmd.description}\nUsage: ${cmd.usage}\nRole: ${cmd.role}\nCooldown: ${cmd.cooldown}s\nAuthor: ${cmd.author}`;
      sendMessage(senderId, reply);
    } else {
      sendMessage(senderId, "Command not found.");
    }
  }
};