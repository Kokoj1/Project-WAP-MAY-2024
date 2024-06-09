@ECHO OFF

CD ../client

if 1 EQU %1 (
  CALL npm install
)

npm run dev