# ChatGPT Grammar Checker for PopClip

A powerful PopClip extension that uses [ChatGPT](https://openai.com/blog/chatgpt) to check and correct grammar, spelling, and style in your selected text.

## Installation

1. Download the latest release from [GitHub](https://github.com/hirakujira/ChatGPT-Grammar-Check-PopClip-Extension)
2. Double-click the `.popclipext` file to install
3. Configure your API key and preferences in PopClip settings

## Configuration

### API Key

An OpenAI API key is required to use this extension:

1. Sign up for an OpenAI account: <https://platform.openai.com/>
2. Generate an API key: <https://platform.openai.com/account/api-keys>
3. Copy the API key (starts with `sk-`) into the extension settings

### Model Selection

Enter available models from OpenAI

### GPT-5 Advanced Options

When using GPT-5 models, additional options become available:
- **Reasoning Effort**: Control thinking depth (minimal, low, medium, high)
- **Verbosity**: Adjust response detail level (low, medium, high)

### Custom API endpoint

Support for custom API endpoints:
- Configure alternative OpenAI-compatible services
- Default: `https://api.openai.com/v1`

## About

This is an extension for [PopClip](https://pilotmoon.com/popclip/).

### Author

Hiraku

### Acknowledgements

Original Extension:

- [ChatGPT by pilotmoon](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/ChatGPT.popclipext)

Icons:

- "Spell Check" by [SVG Repo](https://www.svgrepo.com/).

### Requirements

Requires PopClip 2022.12 and an OpenAI Platform account.

### Links

- [GitHub Source](https://github.com/hirakujira/ChatGPT-Grammar-Check-PopClip-Extension)

## Changelog

### 2025-08-16
- Reasoning effort and verbosity options for GPT-5

### 2025-06-13
- Support for alternative OpenAI-compatible services

### 2025-04-16
- Allow custom model configuration
- Updated to `gpt-4.1-nano` for better performance

### 2024-07-21
- Switch to `gpt-4o-mini` for improved efficiency

### 2023-03-03.1
- Better support for other languages.

### 2023-03-03
- Initial release.
