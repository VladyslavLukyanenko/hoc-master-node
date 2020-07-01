const Queue = require('bull');
const Discord = require("discord.js")
const webhookClient = new Discord.WebhookClient(process.env.DISCORD_WEBHOOK_ONE, process.env.DISCORD_WEBHOOK_TWO);
const WebhookQueue = new Queue('webhookhoc', {
limiter: {
    max: 5,
    duration: 3000
},
redis: process.env.REDIS
});

WebhookQueue.process(5, function(job, done) {
  const info = job.data.info;
  const embed = new Discord.MessageEmbed()
  .setTitle(`New Chargeback on ${info.node.Name}!`)
  .addField('Email', censorHalf(info.email), false)
  .addField('IP', censorHalf(info.ip), false)
  .addField('Reason', info.reason, false)
  .setColor("32CD32")
  .setFooter('HouseOfClowns', 'https://cdn.discordapp.com/icons/719236326737707029/f0fc005f1b100b892593a2196ce459b4.webp');

webhookClient.send({
  username: 'HouseOfClowns',
  avatarURL: 'https://cdn.discordapp.com/icons/719236326737707029/f0fc005f1b100b892593a2196ce459b4.webp',
  embeds: [embed],
});
done();
});
function censorHalf(string){
    const length = string.length/2;
    let half = string.split("", length).join('');
    for (let index = 0; index < length; index++) 
        half += '*'; 
    return half;
 }
module.exports = WebhookQueue;