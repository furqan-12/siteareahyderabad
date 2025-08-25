@echo off
echo Starting local server for S.I.I.T.E Association Website...
echo.
echo This will start a simple HTTP server on port 8000
echo You can then open http://localhost:8000 in your browser
echo.
echo Press Ctrl+C to stop the server
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python server...
    python -m http.server 8000
) else (
    echo Python not found. Trying Node.js...
    npx http-server -p 8000
)

pause 