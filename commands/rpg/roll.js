const Discord = require("discord.js")

exports.run = async (bot, message, args) => {
    
    if(!args[0]) return message.reply("**Digite o número de lados.**\n`.roll d20`");
    
    var nmr = args[0];
    nmr = nmr.substring(nmr.indexOf("d"));
    nmr = nmr.split("d")[1];
    var qtd = args[0].split("d")[0];
    
    if (qtd != "" || qtd == null) {
        
        var resposta = [];
        resposta.push("Números: \n");
        
        var i;
        for (i=0;i<qtd;i++) {
            resposta.push(" - Dado Nº " + (i+1) + ": " + getRandom(1, nmr) + "\n");
        }
        
        message.reply(resposta.join(""));
        
    } else return message.reply("Número: " + getRandom(1, nmr));
    
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.help = {
    name: "roll"
}