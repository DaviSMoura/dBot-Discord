const Discord = require("discord.js")

exports.run = async (bot, message, args) => {
    message.reply("Pong!");
}

exports.help = {
    name: "ping"
}