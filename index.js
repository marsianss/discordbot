const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,          // Intent for interacting with guild (server) features
    GatewayIntentBits.GuildMessages,   // Intent for reading and responding to messages in the guild
    GatewayIntentBits.MessageContent   // Intent required to read the content of messages
  ]
});

// Load commands into the client's collection
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

// Event handler for when the bot is ready
client.once('ready', () => {
  console.log('Bot is online!');
});

// Event handler for slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const triggers = ['.', 'dorus', 'kiril douche stream', 'maysar', 'mijn klas', 'gpo ps', 'deepwoken', 'rogue lineage'];
  if (triggers.some(trigger => message.content.toLowerCase().includes(trigger))) {
    const gifUrl = 'https://media.discordapp.net/attachments/827277603353788427/966007590880419911/ezgif-2-5c8025bf76-1.gif?ex=66f0e9ed&is=66ef986d&hm=123265c36c340aa4e8229cd44144786b6923b0d17fcbab8f6aad85f2f76d14a2&=&width=210&height=210';
      for (let i = 0; i < 1; i++) {
        await message.channel.send({ content: 'Pimpampet ik vlieg recht in je flat <a:brianshaw:1287413160562659360>', files: [gifUrl] });
    }
  }
});

// Log in to Discord
client.login(token);
