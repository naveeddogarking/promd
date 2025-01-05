/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : @SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 **/



const { cmd } = require('../lib');

cmd(
  {
    pattern: "recolour",
    desc: "remini image colour adder",
    filename: __filename,
    category: "AI",
  },
  async (Void, citel, text, { isCreator }) => {
    if (!citel.quoted) {
      return citel.reply('Please quote an image to enhance.');
    }

    if (citel.quoted && citel.quoted.mtype === 'imageMessage') {
      const { remini } = require('../lib');

      try {
        const imageBuffer = await citel.quoted.download();
        const enhancedImage = await remini(imageBuffer, "recolor");
        return await Void.sendMessage(
          citel.chat, 
          { 
            image: enhancedImage, 
            caption: 'Image successfully recoloured by Secktor-MD!' 
          }, 
          { quoted: citel }
        );
      } catch (error) {
        return citel.reply('An error occurred while processing the image.');
      }
    } else {
      return citel.reply('The quoted message is not an image. Please quote a valid image.');
    }
  }
);

cmd(
  {
    pattern: "remini",
    desc: "remini image enhancer",
    filename: __filename,
    category: "AI",
  },
  async (Void, citel, text, { isCreator }) => {
    if (!citel.quoted) {
      return citel.reply('Please quote an image to enhance.');
    }

    if (citel.quoted && citel.quoted.mtype === 'imageMessage') {
      const { remini } = require('../lib');

      try {
        const imageBuffer = await citel.quoted.download();
        const enhancedImage = await remini(imageBuffer, "enhance");
        return await Void.sendMessage(
          citel.chat, 
          { 
            image: enhancedImage, 
            caption: 'Image successfully enhanced by Secktor-MD!' 
          }, 
          { quoted: citel }
        );
      } catch (error) {
        return citel.reply('An error occurred while processing the image.');
      }
    } else {
      return citel.reply('The quoted message is not an image. Please quote a valid image.');
    }
  }
);

cmd(
  {
    pattern: "dehaze",
    desc: "remini image dehazer",
    filename: __filename,
    category: "AI",
  },
  async (Void, citel, text, { isCreator }) => {
    if (!citel.quoted) {
      return citel.reply('Please quote an image to enhance.');
    }

    if (citel.quoted && citel.quoted.mtype === 'imageMessage') {
      const { remini } = require('../lib');

      try {
        const imageBuffer = await citel.quoted.download();
        const enhancedImage = await remini(imageBuffer, "dehaze");
        return await Void.sendMessage(
          citel.chat, 
          { 
            image: enhancedImage, 
            caption: 'Image successfully dehazed by Secktor-MD!' 
          }, 
          { quoted: citel }
        );
      } catch (error) {
        return citel.reply('An error occurred while processing the image.');
      }
    } else {
      return citel.reply('The quoted message is not an image. Please quote a valid image.');
    }
  }
);