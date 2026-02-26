#!/bin/bash

# Script to generate a simple beep sound for testing
# This creates a basic error beep WAV file

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg is required but not installed."
    echo ""
    echo "Install ffmpeg:"
    echo "  macOS: brew install ffmpeg"
    echo "  Ubuntu/Debian: sudo apt-get install ffmpeg"
    echo "  CentOS: sudo yum install ffmpeg"
    echo "  Windows: Download from https://ffmpeg.org/download.html"
    echo ""
    echo "Or manually add a sound file:"
    echo "  1. Download a WAV file from freesound.org or zapsplat.com"
    echo "  2. Save it as assets/error.wav"
    exit 1
fi

# Create a simple 500ms beep at 1000Hz
echo "Generating test beep sound..."
ffmpeg -f lavfi -i "sine=frequency=1000:duration=0.5" -q:a 9 -acodec pcm_s16le assets/error.wav 2>/dev/null

if [ -f assets/error.wav ]; then
    echo "✓ Successfully created assets/error.wav"
    echo ""
    echo "Testing sound playback..."
    if [ "$(uname)" == "Darwin" ]; then
        afplay assets/error.wav
    elif command -v paplay &> /dev/null; then
        paplay assets/error.wav
    else
        echo "Note: Could not test playback on this system"
    fi
else
    echo "✗ Failed to generate sound file"
    exit 1
fi
