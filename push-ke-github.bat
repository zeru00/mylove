@echo off
cd /d "%~dp0"
echo ==============================================
echo   UPLOADING WEBSITE MYLOVE KE GITHUB (zeru00)
echo ==============================================
echo.
"%LOCALAPPDATA%\Programs\Git\cmd\git.exe" push -u origin main
echo.
echo ==============================================
pause

