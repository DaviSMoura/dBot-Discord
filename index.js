const Discord = require("discord.js");
const config = require("./config.js");

const client = new Discord.Client();

function iniciar() {
    console.log("Conectando...");
    client.login(config);
}

iniciar();