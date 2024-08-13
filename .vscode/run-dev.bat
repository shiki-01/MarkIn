@echo off
chcp 65001 >nul
call cmd /c "npm run dev" <nul
exit /b 0