"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const axios_1 = require("axios");

const checkGrammar = async (input, options) => {
  const openai = axios_1.default.create({
    baseURL: "https://api.openai.com/v1",
    headers: { Authorization: `Bearer ${options.apikey}` },
  });
  const prompt = `You are now a grammar and style corrector. Your only task is to revise the following text by fixing grammar, punctuation, and phrasing errors while preserving the original meaning and tone. Do not add explanations, translations, notes, or additional output. Output only the corrected version in the same language as the input.

Here is the text to correct:\n\n`;

  const modal = options.modal || "gpt-4.1-nano";

  // send the whole message history to OpenAI
  const { data } = await openai.post("chat/completions", {
    model: modal,
    messages: [
      { role: "system", content: prompt }, 
      { role: "user", content: input.text }
    ],
  });
  const response = data.choices[0].message.content.trim();
  // if holding shift, copy just the response. else, paste the last input and response.
  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
};
// export the actions
exports.actions = [{
  title: "ChatGPT: Grammar Check",
  code: checkGrammar,
}];
