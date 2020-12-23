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

    if (message.isMentioned(client.user)) {
        message.reply('Oi! Use meus comandos com o prefixo "." !');
    }

    if (!message.content.startsWith(".")) {
        return;
    }
    
    const args = message.content.split(' ');
    const cmd = args.shift();

    const command = getCommand(client, cmd);
    if (command) {
        message.delete(1000).catch(err => {});

        if (cooldown.has(message.author.id)) {
            const timeSinceLastCommand = Date.now() - cooldown.get(message.author.id);
            if (timeSinceLastCommand < 0) {
                message
                    .reply(`Aguarde ${((0 - timeSinceLastCommand) / 1000).toFixed(2)} segundos para executar um novo comando.`)
                    .then(msg => msg.delete(5000));
                return;
            }
        }

        if (!message.member.roles.find(role => role.name === "Administrador" || role.name === "Moderador")) {
            cooldown.set(message.author.id, Date.now());
        }

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