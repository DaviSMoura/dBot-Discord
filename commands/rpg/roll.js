const Discord = require("discord.js")

exports.run = async (bot, message, args) => {
    if(!args[0]) return message.reply("**Digite o número de lados.**\n`.roll d20`");
    
    var nmr = args[0];
    nmr = nmr.substring(nmr.indexOf("d"));
    nmr = nmr.split("d")[1];
    var qtd = args[0].split("d")[0];
    
    if (qtd != "" || qtd == null) {
        
    } else return message.reply("Número: " + getRandom(1,nmr));
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.help = {
    name: "say"
}