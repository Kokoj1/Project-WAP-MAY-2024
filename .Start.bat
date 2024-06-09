@ECHO OFF

SET "FILE=.DONT"

SET INSTALL=0

CD BatchFiles

CHOICE /T 10 /D y /M "Open in browser?"

IF NOT EXIST %FILE% (
  SET INSTALL=1
  ECHO.>%FILE%
)

START Client.bat %INSTALL%
START Server.bat %INSTALL%

IF %ERRORLEVEL% EQU 2 GOTO:EOF

START "" http://localhost:5173/