const vscode = require('vscode');
const WebSocket = require('ws');

let ws = null;
let statusBarItem = null;
let isActive = false;

function activate(context) {
    console.log('🦈 Shark Chat extension is now active!');
    
    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.text = '🦈 Shark Chat: Disconnected';
    statusBarItem.command = 'shark-chat.start';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
    
    // Register commands
    let startCommand = vscode.commands.registerCommand('shark-chat.start', () => {
        if (!isActive) {
            startSharkChat();
        } else {
            vscode.window.showInformationMessage('🦈 Shark Chat is already running!');
        }
    });
    
    let stopCommand = vscode.commands.registerCommand('shark-chat.stop', () => {
        if (isActive) {
            stopSharkChat();
        } else {
            vscode.window.showInformationMessage('🦈 Shark Chat is not running!');
        }
    });
    
    context.subscriptions.push(startCommand);
    context.subscriptions.push(stopCommand);
    
    // Auto-start
    startSharkChat();
}

function startSharkChat() {
    try {
        console.log('🦈 Starting Shark Chat WebSocket connection...');
        
        // Connect to WebSocket server
        ws = new WebSocket('ws://localhost:8080');
        
        ws.on('open', function() {
            console.log('🦈 Connected to Shark Chat server');
            isActive = true;
            statusBarItem.text = '🦈 Shark Chat: Connected';
            statusBarItem.command = 'shark-chat.stop';
            
            // Identify as VS Code client
            ws.send(JSON.stringify({
                type: 'vscode-client',
                message: 'VS Code extension connected'
            }));
            
            vscode.window.showInformationMessage('🦈 Shark Chat: Connected to server!');
        });
        
        ws.on('message', function(data) {
            try {
                const message = JSON.parse(data);
                console.log('📨 Received message:', message);
                
                if (message.type === 'insertText') {
                    insertTextAtCursor(message.text);
                } else if (message.type === 'connection-confirmed') {
                    console.log('✅ Connection confirmed by server');
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });
        
        ws.on('close', function() {
            console.log('🔌 Disconnected from Shark Chat server');
            isActive = false;
            statusBarItem.text = '🦈 Shark Chat: Disconnected';
            statusBarItem.command = 'shark-chat.start';
            
            vscode.window.showWarningMessage('🦈 Shark Chat: Connection lost. Click to reconnect.');
            
            // Auto-reconnect after 5 seconds
            setTimeout(() => {
                if (!isActive) {
                    console.log('🔄 Attempting to reconnect...');
                    startSharkChat();
                }
            }, 5000);
        });
        
        ws.on('error', function(error) {
            console.error('❌ WebSocket error:', error);
            isActive = false;
            statusBarItem.text = '🦈 Shark Chat: Error';
            statusBarItem.command = 'shark-chat.start';
            
            vscode.window.showErrorMessage('🦈 Shark Chat: Connection failed. Make sure the server is running on localhost:8080');
        });
        
    } catch (error) {
        console.error('Failed to start Shark Chat:', error);
        vscode.window.showErrorMessage('🦈 Shark Chat: Failed to start. ' + error.message);
    }
}

function stopSharkChat() {
    if (ws) {
        ws.close();
    }
    isActive = false;
    statusBarItem.text = '🦈 Shark Chat: Disconnected';
    statusBarItem.command = 'shark-chat.start';
    
    vscode.window.showInformationMessage('🦈 Shark Chat: Stopped');
}

function insertTextAtCursor(text) {
    const editor = vscode.window.activeTextEditor;
    
    if (editor) {
        const position = editor.selection.active;
        
        editor.edit(editBuilder => {
            editBuilder.insert(position, text);
        }).then(() => {
            console.log('📝 Inserted text at cursor:', text);
            
            // Show notification
            vscode.window.showInformationMessage('🦈 Text inserted from Shark Chat!');
        });
    } else {
        // No active editor, show the text in a new untitled document
        vscode.workspace.openTextDocument({
            content: text,
            language: 'plaintext'
        }).then(doc => {
            vscode.window.showTextDocument(doc);
            vscode.window.showInformationMessage('🦈 Text from Shark Chat opened in new document!');
        });
    }
}

function deactivate() {
    if (ws) {
        ws.close();
    }
    console.log('🦈 Shark Chat extension deactivated');
}

module.exports = {
    activate,
    deactivate
};
