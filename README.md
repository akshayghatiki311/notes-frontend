# ScribbleSync

This is a web application for real-time collaborative note-taking
Frontend application is built using React.

Requirements:
1. Nodejs v22.12.0
2. Git 2.39.5
3. npm 10.9.0

Steps to run the application in local:
1. git pull respository
2. cd application-folder
3. Run "npm install"
4. Use env variables according to backend application endpoints and websocket endpoint
5. Change the endpoint to connect to backend server in src/services/api.js according to local installation.
6. Change the websocket endpoint in src/websocket-server.js and src/services/websocket.js files according to the websocket server configuration
7. Run "node src/websocket-server.js"
8. Run "npm run dev"