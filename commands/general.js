/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : @SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 **/

 const { tlang, botpic, cmd, prefix, runtime, Config } = require("../lib");
 const axios = require("axios");
 const fetch = require("node-fetch");
 
 cmd({
   pattern: "chat",
   alias: ["gpt"],
   desc: "chat with an AI(GPT)",
   category: "AI",
   use: "<Hii,Secktor>",
   filename: __filename
 }, async (Void, citel, text) => {
   if (!text) {
     return citel.reply(`Hey there! ${citel.pushName}. How are you doing these days?`);
   }
   if (text.length < 8) {
     let { data } = await axios.get(`http://api.brainshop.ai/get?bid=167991&key=aozpOoNOy3dfLgmB&uid=[${citel.sender.split("@")[0]}]&msg=[${text}]`);
     return citel.reply(data.cnt);
   }
 
   const response = await fetch("https://api.openai.com/v1/chat/completions", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${Config.OPENAI_API_KEY}`
     },
     body: JSON.stringify({
       model: "gpt-3.5-turbo",
       messages: [
         { role: "system", content: "You" },
         { role: "user", content: text }
       ]
     })
   });
   const data = await response.json();
   if (!data.choices || data.choices.length === 0) {
     return citel.reply("*Invalid ChatGPT API Key, Please Put New Key*");
   }
   return citel.reply(data.choices[0].message.content);
 });
 
 cmd({
   pattern: "dalle",
   alias: ["dall", "dall-e"],
   desc: "Create Image by AI",
   category: "AI",
   use: "<an astronaut in mud.>",
   filename: __filename
 }, async (Void, citel, text) => {
   if (Config.OPENAI_API_KEY == "") {
     return citel.reply("You Don't Have OPENAI_API_KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys");
   }
   if (!text) {
     return citel.reply("*Give Me A Query To Get Dall-E Response*");
   }
 
   const imageSize = "256x256";
   const response = await fetch("https://api.openai.com/v1/images/generations", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${Config.OPENAI_API_KEY}`
     },
     body: JSON.stringify({
       model: "image-alpha-001",
       prompt: text,
       size: imageSize,
       response_format: "url"
     })
   });
   const data = await response.json();
   return Void.sendMessage(citel.chat, {
     image: { url: data.data[0].url }
   });
 });
 
 cmd({
   pattern: "repo",
   alias: ["git", "sc", "script"],
   desc: "Sends info about repo.",
   category: "general",
   filename: __filename
 }, async (Void, citel) => {
   let { data } = await axios.get("https://api.github.com/repos/SamPandey001/Secktor-Md");
   let cap = `Hey ${citel.pushName}\n
   *⭐ Total Stars:* ${data.stargazers_count} stars
   *🍽️ Forks:* ${data.forks_count} forks
   *🍁 Repo:* citel-x.herokuapp.com/repo
   *Group:* citel-x.herokuapp.com/support
   *Deploy Your Own:* citel-x.herokuapp.com`;
   let buttonMessage = {
     image: { url: await botpic() },
     caption: cap,
     footer: tlang().footer,
     headerType: 4
   };
   return await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel });
 });
 
 cmd({
   pattern: "status",
   alias: ["about"],
   desc: "To check bot status",
   category: "general",
   filename: __filename
 }, async (Void, citel) => {
   const uptime = process.uptime();
   var inital = new Date().getTime();
        var final = new Date().getTime();
   let ter = `
   🔰 *${tlang().title}* 🔰
   *🌟Description:* A WhatsApp bot with rich features, built in NodeJs.
   *⚡Speed:* ${final - inital} ms
   *🚦Uptime:* ${runtime(process.uptime())}
   *🕸Version:* 0.0.8
   *👤Owner:* ${Config.ownername}
   *Powered by ${tlang().title}*`;
   let buttonMessage = {
     image: { url: await botpic() },
     caption: ter,
     footer: tlang().footer,
     headerType: 4
   };
   return await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel });
 });
 
 cmd({
   pattern: "theme",
   desc: "To find all themes",
   category: "general",
   filename: __filename
 }, async (Void, citel, text, { isCreator }) => {
   if (!isCreator) {
     return citel.reply(tlang().owner);
   }
   let str = "*All available themes in Secktor*\n";
   str += `1. SECKTOR\n2. ADAM\n3. AYANOKOJI\n4. EDITH\n5. FRIDAY\n6. GENOS\n7. GIDEON\n8. GOKU\n9. LUFFY\n10. NARUTO\n11. NEZUKO\n12. PARKER\n13. ZEROTWO\n14. Eren Jeager(Coming Soon)\n\nReply ${prefix}setvar THEME:ZEROTWO`;
   return citel.reply(str);
 });
 