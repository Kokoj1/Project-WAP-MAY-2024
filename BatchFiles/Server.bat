@ECHO OFF

CD ../server

IF 1 EQU %1 (
  CALL npm install
)

WHERE /q nodemon

IF %ERRORLEVEL% EQU 0 (
  npm start
)

node app.js