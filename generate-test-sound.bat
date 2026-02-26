@echo off
REM Script to generate a simple beep sound for testing
REM This creates a basic error beep WAV file using ffmpeg

echo Generating test beep sound...

REM Check if ffmpeg is installed
where ffmpeg >nul 2>nul
if errorlevel 1 (
    echo ffmpeg is required but not installed.
    echo.
    echo Download from: https://ffmpeg.org/download.html
    echo.
    echo Or manually add a sound file:
    echo   1. Download a WAV file from freesound.org or zapsplat.com
    echo   2. Save it as assets\error.wav
    exit /b 1
)

REM Create a simple 500ms beep at 1000Hz
ffmpeg -f lavfi -i "sine=frequency=1000:duration=0.5" -q:a 9 -acodec pcm_s16le assets\error.wav 2>nul

if exist assets\error.wav (
    echo.
    echo ✓ Successfully created assets\error.wav
    echo.
    echo Test sound generation complete!
    echo You can test playback with:
    echo   powershell (New-Object Media.SoundPlayer 'assets\error.wav').PlaySync^(^)
) else (
    echo ✗ Failed to generate sound file
    exit /b 1
)
