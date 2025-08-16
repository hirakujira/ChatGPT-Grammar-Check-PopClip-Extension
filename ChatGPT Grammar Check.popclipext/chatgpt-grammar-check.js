"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const axios_1 = require("axios");


const isGPT5 = (model) => {
  return model.startsWith("gpt-5");
}

/**
 * Check and correct grammar using ChatGPT API
 * @param {Object} input - Input object containing text to check
 * @param {Object} options - Configuration options
 * @returns {Promise<null>}
 */
const checkGrammar = async (input, options) => {
  try {
    // Validate inputs
    if (!input?.text?.trim()) {
      popclip.showText("No text selected", { preview: false });
      return null;
    }

    if (!options?.apikey) {
      popclip.showText("API key not configured", { preview: false });
      return null;
    }

    const baseURL = options.apiBaseURL || "https://api.openai.com/v1";
    const openai = axios_1.default.create({
      baseURL,
      headers: { 
        Authorization: `Bearer ${options.apikey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    const prompt = `You are now a grammar and style corrector. Your only task is to revise the following text by fixing grammar, punctuation, and phrasing errors while preserving the original meaning and tone. Do not add explanations, translations, notes, or additional output. Output only the corrected version in the same language as the input.

Here is the text to correct:\n\n`;

    const model = options.model || "gpt-4.1-nano";

    // Send request to OpenAI API
    let requestBody = {
      model: model,
      messages: [
        { role: "system", content: prompt }, 
        { role: "user", content: input.text }
      ]
    }

    if (isGPT5(model)) {
      requestBody.reasoning_effort = options.reasoningEffort || "medium";
      requestBody.verbosity = options.verbosity || "medium";
    }

    const { data } = await openai.post("chat/completions", requestBody);

    if (!data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response from API");
    }

    const response = data.choices[0].message.content.trim();
    
    // If holding shift, copy the response. Otherwise, paste it.
    if (popclip.modifiers.shift) {
      popclip.copyText(response);
    } else {
      popclip.pasteText(response);
    }
    
    return null;
  } catch (error) {
    console.error("Grammar check error:", error);
    
    let errorMessage = "Grammar check failed";
    if (error.response?.status === 401) {
      errorMessage = "Invalid API key";
    } else if (error.response?.status === 429) {
      errorMessage = "Rate limit exceeded";
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorMessage = "Network connection failed";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    popclip.showText(errorMessage, { preview: false });
    return null;
  }
};
// export the actions
exports.actions = [{
  title: "ChatGPT: Grammar Check",
  code: checkGrammar,
}];
