# Sound Files

Add your error notification sound here:

## Current Sound

- **faahh.wav** - The dramatic "Faaaahhh!" sound (included)

## Instructions

1. Replace `faahh.wav` with your own WAV audio file
2. Keep the filename as `faahh.wav`
3. The extension will play this sound when Django/Python errors are detected

## Sound Recommendations

Choose a short, distinctive sound that:

- Is 0.5-2 seconds long
- Is a simple beep, chime, alert sound, or funny sound effect
- Stands out from normal IDE sounds
- Is in WAV format for best compatibility

## Converting to WAV

If you have an MP3 or other format:

**macOS:**

```bash
afconvert -f WAVE -d LEI16@44100 yourfile.mp3 faahh.wav
```

**With ffmpeg (if installed):**

```bash
ffmpeg -i yourfile.mp3 faahh.wav
```

## Free Sound Resources

You can find free sound effects at:

- Freesound.org
- Zapsplat.com
- BBC Sound Effects Library

Look for:

- "System alert beep"
- "Error chime"
- "Notification sound"
- "Scream sound effect"
