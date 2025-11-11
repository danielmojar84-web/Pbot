const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const commands = {};
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const command = require(path.join(commandsPath, file));
    commands[command.name] = command;
  }
});

// Utility: Ban
function isBanned(senderId) {
  if (!fs.existsSync('./banlist.json')) return false;
  const bans = JSON.parse(fs.readFileSync('./banlist.json'));
  const entry = bans[senderId];
  if (!entry) return false;
  if (entry.type === "permban") return true;
  if (entry.type === "timeban" && Date.now() < entry.expires) return true;
  if (entry.type === "timeban" && Date.now() > entry.expires) {
    // Clean up expired timeban
    delete bans[senderId];
    fs.writeFileSync("./banlist.json", JSON.stringify(bans));
    return false;
  }
  return false;
}

// Facebook webhook
app.get('/webhook', (req, res) => {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === config.verifyToken
  ) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  const entries = req.body.entry || [];
  entries.forEach(entry => {
    const messagingEvents = entry.messaging || [];
    messagingEvents.forEach(event => {
      if (event.message && event.message.text && event.sender) {
        handleMessage(event.sender.id, event.message.text);
      }
    });
  });
  res.sendStatus(200);
});

function sendMessage(recipientId, messageText) {
  fetch('https://graph.facebook.com/v16.0/me/messages?access_token=' + config.token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text: messageText }
    })
  }).catch(() => { });
}

function handleMessage(senderId, text) {
  if (isBanned(senderId)) {
    sendMessage(senderId, "❌ You are banned from using this bot.");
    return;
  }
  const args = text.trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();
  const command = commands[commandName];
  if (command) {
    command.execute(senderId, args, sendMessage, commands);
  } else {
    sendMessage(senderId, "Unknown command. Try 'help' for a list of commands.");
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot is running on port ${PORT}`));