const Discord = require('discord.js');

const cooldown = new Map();
const queue = new Map();

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 */
async function onMessage(client, message) {
    if (message.author.bot || message.channel.type !== "text") {
        return;
    }

    if (!message.content.startsWith(".")) {
        return;
    }
    
    const args = message.content.split(' ');
    const cmd = args.shift();

    const command = getCommand(client, cmd);
    if (command) {
        message.delete(1000).catch(err => {});
        command.run(client, message, args, queue);
    }
}

function getCommand(client, name) {
    name = name.slice(".".length);
    
    let command = client.commands.get(name);
    if (!command) {
        command = client.commands.get(client.aliases.get(name));
    }

    return command;
}

module.exports = {
    name: 'message',
    run: onMessage
};