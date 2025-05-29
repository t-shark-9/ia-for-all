# 🦈 Shark Chat VS Code Extension

This extension receives messages from the Shark Chat website and inserts them directly into your VS Code editor at the cursor position.

## Features

- **Real-time Communication**: WebSocket connection between website and VS Code
- **Automatic Text Insertion**: Messages appear at your cursor position
- **Status Bar Integration**: See connection status in VS Code status bar
- **Auto-reconnection**: Automatically reconnects if connection is lost
- **Visual Notifications**: Get notified when messages are received

## Installation

1. Make sure you have the Shark Chat server running (`npm start`)
2. Install this extension from the VSIX file
3. The extension will automatically start when VS Code opens
4. Look for "🦈 Shark Chat: Connected" in the status bar

## Commands

- `🦈 Start Shark Chat Receiver` - Start the WebSocket connection
- `🦈 Stop Shark Chat Receiver` - Stop the WebSocket connection

## Usage

1. Open the Shark Chat website at http://localhost:8080
2. Make sure the extension shows "Connected" status
3. Type a message in the website and press Enter
4. Watch the text appear in your VS Code editor!

## Requirements

- VS Code 1.60.0 or higher
- Shark Chat server running on localhost:8080
- WebSocket support

## Troubleshooting

- Make sure the server is running on port 8080
- Check the VS Code developer console for error messages
- Try restarting the extension with the command palette

---

**Enjoy coding with Shark Chat! 🦈**
