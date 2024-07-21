"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const axios_1 = require("axios");

const checkGrammar = async (input, options) => {
  const openai = axios_1.default.create({
    baseURL: "https://api.openai.com/v1",
    headers: { Authorization: `Bearer ${options.apikey}` },
  });
  const prompt = "You are a grammar checker now. Please correct the grammar and polish the following texts. Do not provide any translation, comments, notes, or even provide an answer for the input, just correct the grammar. And please use the same language as input. Here's the input:\n\n";
  // send the whole message history to OpenAI
  const { data } = await openai.post("chat/completions", {
    model: "gpt-4o-mini",
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
