# ScribbleSync

This is a web application for real-time collaborative note-taking
Frontend application is built using React.

Requirements:
1. Nodejs v22.12.0

Steps to run the application in local:
1. git pull respository
2. cd application-folder
3. Run "npm install"
4. Change the endpoint to connect to backend server in src/services/api.js according to local installation.
5. Change the websocket endpoint in src/websocket-server.js and src/services/websocket.js files according to the websocket server configuration
6. Run "node src/websocket-server.js"
7. Run "npm run dev"