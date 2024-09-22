const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('geheim')
    .setDescription('Gebruik dit NIET!'),
  
  async execute(interaction) {
    await interaction.reply('https://cdn.discordapp.com/attachments/1256275749636280462/1276086680994054174/cat-head-nodding-meme-headbutt-hit-funny-cat-silly-car.gif?ex=66f11e55&is=66efccd5&hm=68c5629baab6ad14b8dd59102e88dabd5c09c2a924e9ed1b079f9f2156783f1c&');
  },
};
