# 🧪 Shark Chat Test Guide

## Quick Test Steps:

### 1. Server Status prüfen ✅
Der Server sollte bereits laufen und folgendes anzeigen:
```
🦈 Shark Chat server running on http://localhost:8080
📡 WebSocket server ready on ws://localhost:8080
```

### 2. VS Code Extension aktivieren ✅
1. Drücke `Ctrl+Shift+P` in VS Code
2. Tippe: `🦈 Start Shark Chat Receiver`
3. Schau in die Statusleiste unten: sollte "🦈 Shark Chat: Connected" zeigen

### 3. Website testen ✅
1. Die Website ist bereits geöffnet: http://localhost:8080
2. In der linken Sidebar solltest du das "Connection Panel" sehen
3. Status sollte "Connected to VS Code" zeigen (grüner Punkt)

### 4. Live Test durchführen! 🚀

**Schritt für Schritt:**

1. **Öffne eine Datei in VS Code** (z.B. die bereits erstellte `test-output.txt`)
2. **Setze den Cursor** irgendwo in die Datei
3. **Gehe zur Website** (bereits geöffnet)
4. **Tippe eine Testnachricht** in das Eingabefeld:
   ```
   Hello from Shark Chat! 🦈
   ```
5. **Drücke Enter** oder klicke den Send-Button
6. **Überprüfe VS Code** - der Text sollte sofort an der Cursor-Position erscheinen!

### 5. Features testen:

#### File Upload Test:
1. Klicke das Büroklammer-Symbol in der Website
2. Wähle eine oder mehrere Dateien
3. Die Dateinamen sollten als Kommentare in VS Code erscheinen

#### Reconnection Test:
1. Stoppe den Server kurz: `Ctrl+C` im Terminal
2. Website sollte "Connection Lost" anzeigen
3. Starte Server neu: `npm start`
4. Website sollte automatisch reconnecten

#### Notifications Test:
1. Sende eine Nachricht von der Website
2. Du solltest eine grüne Benachrichtigung sehen: "Message sent to VS Code!"
3. In VS Code sollte eine Benachrichtigung erscheinen: "🦈 Text inserted from Shark Chat!"

## 🔍 Debugging:

### Logs überprüfen:

**Server Terminal:**
- Zeigt alle eingehenden Nachrichten
- Zeigt Verbindungsstatus von Clients

**VS Code Developer Console:**
1. `Ctrl+Shift+P` → "Developer: Toggle Developer Tools"
2. Console-Tab öffnen
3. Suche nach "🦈" Nachrichten

**Browser Console:**
1. F12 drücken
2. Console-Tab öffnen
3. Teste WebSocket-Verbindung

### Häufige Probleme:

❌ **"Connection Failed"** in Website:
- Server läuft nicht → `npm start`
- Port 8080 blockiert → anderen Port verwenden

❌ **"Disconnected"** in VS Code Statusleiste:
- Extension manuell starten → `Ctrl+Shift+P` → "🦈 Start Shark Chat Receiver"

❌ **Text erscheint nicht in VS Code:**
- Kein aktiver Editor → Datei öffnen und Cursor setzen
- Extension nicht verbunden → Statusleiste prüfen

## ✅ Erfolg-Indikatoren:

Wenn alles funktioniert, siehst du:

1. **Server Terminal:** 
   ```
   📊 Status - Web clients: 1, VS Code clients: 1
   ```

2. **VS Code Statusleiste:** 
   ```
   🦈 Shark Chat: Connected
   ```

3. **Website Connection Panel:**
   ```
   🟢 Connected to VS Code
   ```

4. **Live Text Transfer:** Text von Website erscheint sofort in VS Code!

---

**Happy Testing! 🦈🚀**
