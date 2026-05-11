@echo off
echo ========================================
echo   Amrutha Juice - Local Development
echo ========================================
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   Servers Starting...
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit...
pause >nul
