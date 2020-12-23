const Discord = require("discord.js")

exports.run = async (bot, message, args) => {
    if(!args[0]) return message.reply("**Digite o número de lados.**\n`.roll d20`");

    message.delete().catch(O_o=>{});
    

}

exports.help = {
    name: "say"
}