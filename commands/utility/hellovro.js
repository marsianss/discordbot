const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hellovro')
    .setDescription('Je weet voor wie dit bedoelt is.'),
  
  async execute(interaction) {
    await interaction.reply('HELLO VRO. WAT DOE JE VRO?');
  },
};
