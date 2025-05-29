const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🦈 Starting Shark Chat Server...');

// Create HTTP server to serve your HTML files
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    // Set content type based on file extension
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
    }

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

let connectedClients = new Set();
let vscodeClients = new Set();

wss.on('connection', (ws, req) => {
    const clientIP = req.socket.remoteAddress;
    console.log(`🔗 New connection from ${clientIP}`);
    
    // Add to connected clients
    connectedClients.add(ws);
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('📨 Received message:', data);
            
            if (data.type === 'insertText') {
                console.log('📝 Text to insert:', data.text);
                
                // Forward to all VS Code clients
                vscodeClients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(data));
                    }
                });
                
                // If no VS Code clients connected, log the text
                if (vscodeClients.size === 0) {
                    console.log('⚠️  No VS Code extension connected. Text:', data.text);
                }
            } else if (data.type === 'vscode-client') {
                // This is a VS Code extension connecting
                vscodeClients.add(ws);
                console.log('🆚 VS Code extension connected');
                
                ws.send(JSON.stringify({
                    type: 'connection-confirmed',
                    message: 'VS Code extension connected successfully'
                }));
            }
            
        } catch (error) {
            console.error('❌ Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
        console.log('🔌 Client disconnected');
        connectedClients.delete(ws);
        vscodeClients.delete(ws);
    });
    
    ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
        connectedClients.delete(ws);
        vscodeClients.delete(ws);
    });
    
    // Send welcome message
    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected to Shark Chat server'
    }));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🦈 Shark Chat server running on http://localhost:${PORT}`);
    console.log(`📡 WebSocket server ready on ws://localhost:${PORT}`);
    console.log('');
    console.log('Next steps:');
    console.log('1. Open your browser to http://localhost:8080');
    console.log('2. Install the VS Code extension (see package.json and extension.js)');
    console.log('3. Start typing in the website - text will appear in your VS Code!');
    console.log('');
    console.log('Status:');
    console.log(`📊 Connected clients: ${connectedClients.size}`);
    console.log(`🆚 VS Code clients: ${vscodeClients.size}`);
});

// Log connection status every 30 seconds
setInterval(() => {
    console.log(`📊 Status - Web clients: ${connectedClients.size}, VS Code clients: ${vscodeClients.size}`);
}, 30000);
