# 🦈 Shark Chat - Real-time VS Code Integration

Eine moderne Chat-Interface, die direkt mit VS Code kommuniziert und Text in Echtzeit einfügt!

## ✨ Was ist neu in der Website:

- **Connection Panel** in der Sidebar mit VS Code Verbindungsstatus
- **Enhanced JavaScript** mit WebSocket-Kommunikation  
- **Visual Notifications** wenn Nachrichten gesendet werden
- **Automatic Reconnection** falls die Verbindung abbricht
- **Real-time Status** mit visuellen Indikatoren

## 🚀 Setup-Anleitung:

### 1. Dependencies installieren
```bash
cd /workspaces/ia-for-all
npm install
```

### 2. Server starten
```bash
npm start
```
Der Server läuft jetzt auf http://localhost:8080

### 3. VS Code Extension installieren
1. Öffne VS Code
2. Drücke `Ctrl+Shift+P`
3. Tippe "Extensions: Install from VSIX..."
4. Navigiere zu `vscode-extension/shark-chat-receiver-1.0.0.vsix`
5. Installiere die Extension

### 4. Extension starten
1. In VS Code, drücke `Ctrl+Shift+P`
2. Tippe "🦈 Start Shark Chat Receiver"
3. Du siehst "🦈 Shark Chat: Connected" in der Statusleiste

### 5. Testen! 🎉
1. Öffne http://localhost:8080 im Browser
2. Tippe eine Nachricht und drücke Enter
3. Sieh zu, wie sie in VS Code erscheint!

## 🎯 Key Features:

### Website Features:
1. Open VS Code
2. Press `Ctrl+Shift+P`
3. Type "Extensions: Install from VSIX..."
4. Navigate to `c:\Tjark\website\vscode-extension\`
5. Select the folder and install

#### Option B: Development mode
1. Open VS Code
2. Press `Ctrl+Shift+P`
3. Type "Developer: Install Extension from Location..."
4. Navigate to `c:\Tjark\website\vscode-extension\`

### 4. Start the VS Code Extension
1. Press `Ctrl+Shift+P` in VS Code
2. Type "🦈 Start Shark Chat Receiver"
3. Click the command
4. You should see "🦈 Shark Chat: Connected" in the status bar

### 5. Test the Connection
1. Open your browser to `http://localhost:8080`
2. You should see the connection status as "Connected to VS Code"
3. Type a message in the chat and press Enter
4. The text should appear in your VS Code editor!

## How It Works

1. **Website** (`index.html`) - Users type messages here
2. **WebSocket Server** (`server.js`) - Relays messages between website and VS Code
3. **VS Code Extension** (`vscode-extension/`) - Receives messages and inserts them into your editor

## Features

- ✅ Real-time text transmission from website to VS Code
- ✅ Connection status indicator
- ✅ Automatic reconnection
- ✅ File attachment support (sends file names as comments)
- ✅ Visual notifications
- ✅ Status bar integration in VS Code

## Troubleshooting

### "Connection Failed" in website
- Make sure the server is running (`npm start`)
- Check if port 8080 is available

### "VS Code not connected" 
- Make sure the VS Code extension is installed and started
- Check the VS Code status bar for connection status

### Port already in use
- Change the port in `server.js` (line: `const PORT = process.env.PORT || 8080;`)
- Update the WebSocket URL in `index.html` (line: `websocket = new WebSocket('ws://localhost:8080');`)

## Commands

### Server Commands
```powershell
npm start          # Start the server
npm run dev        # Start with auto-reload (if you installed nodemon)
```

### VS Code Commands
- `🦈 Start Shark Chat Receiver` - Connect to the server
- `🦈 Stop Shark Chat Receiver` - Disconnect from the server

## File Structure
```
c:\Tjark\website\
├── index.html              # Main website
├── server.js               # WebSocket server
├── package.json            # Server dependencies
├── vscode-extension/       # VS Code extension
│   ├── package.json        # Extension manifest
│   └── extension.js        # Extension code
└── README.md              # This file
```

## Next Steps

Once everything is working, you can:
- Customize the UI styling
- Add more message types (code snippets, commands, etc.)
- Deploy the server to a remote host
- Package the VS Code extension for distribution
- Add authentication/security features

Enjoy your Shark Chat! 🦈
