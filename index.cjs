 /// you need discord.js and fetch for this. / potrzebujesz discord.js i fetch
let botToken = "" // Insert your bot token here / Wrzuć tutaj token bota.

// please insert the following commands into the console: npm i discord.js // npm i node-fetch@2.6.7

const { Client, Intents, Collection, MessageEmbed} = require('discord.js')
const fetch = require('node-fetch')

const client = new Client({
    autoReconnect: true,
    partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION", "USER"],
    allowedMentions: {repliedUser: false},
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});

client.on("ready", async () => {
    console.log("Logged on with: "+client.user.tag)
    let youtubeKey = ""; // YouTube v3 API Key
    let youtubeUser = "" // YouTuber's Channel ID, e.g. UCSAi3K7TC71FJpvMGpcCmmA 

    let getSubscribers = () => {

        fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeUser}&key=${youtubeKey}`) 
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            x = data["items"][0].statistics.subscriberCount;
            client.user.setPresence({ activities: [{name: `x has ${x/1000}k subs!`}], status: 'online' });
        })

    }

    getSubscribers();
    setInterval(getSubscribers, 1800000)
})

client.login(`${botToken}`)
