# Getting Started

## Quick Setup

1. **Install npm dependencies**:

   ```bash
   npm install
   ```

2. **Build the extension**:

   ```bash
   npm run esbuild
   ```

3. **Add a sound file**:
   - Place a WAV audio file at `assets/faahh.wav`
   - See `assets/README.md` for recommendations

## Testing the Extension

### In Development Mode

1. Press `F5` to launch the Extension Development Host
2. This opens a new VS Code window with your extension loaded
3. As you edit `.py` files in a Django project, the extension will:
   - Monitor for diagnostics/errors from Python language servers
   - Play the sound when errors or test failures are detected

### Testing with a Django Project

1. Open a Django project folder in the Development Host
2. Make sure you have Python linting enabled (pylint, flake8, or use Pylance)
3. Introduce a syntax error in a `.py` file or run failing tests
4. The extension should play the sound when the error or test failure is detected

### Testing with Tests

1. Install pytest: `pip install pytest pytest-django`
2. Create a test that fails: `assert 1 + 1 == 3`
3. Run the test: `pytest test_file.py -v`
4. When the test fails, the extension plays the sound

### Manual Testing

1. Open the VS Code Developer Console (Help → Toggle Developer Tools)
2. Watch the console for: `Django error detected: [error message]`
3. Create errors in your code or failing tests to trigger detection

## Build Commands

```bash
npm run esbuild          # Build once with source maps
npm run esbuild-watch   # Continuous build during development
npm run vscode:prepublish # Production build (minified)
npm run lint            # Check code style
```

## Extension Commands

- **Django Error Sound: Enable** - Enable sound playback
- **Django Error Sound: Disable** - Disable sound playback

Access these via:

- Command Palette (Cmd/Ctrl + Shift + P)
- Settings UI under "Django Error Sound"

## Configuration

Open Settings (⌘, or Ctrl,) and search for "django-error-sound":

```json
{
  "django-error-sound.enabled": true,
  "django-error-sound.volume": 0.5
}
```

### Settings

- **enabled**: Toggle sound playback (true/false)
- **volume**: Sound volume level (0.0 = silent, 1.0 = maximum)

## How It Works

The extension monitors VS Code's diagnostic system, which includes errors from:

- **Language servers**: Pylance, Python extension diagnostics
- **Linters**: pylint, flake8, black, isort (if configured)
- **Build tasks**: Any configured task that reports errors
- **Type checkers**: mypy, pyright

When an error diagnostic is detected matching Django/Python error patterns, the extension plays your sound file.

## Troubleshooting

### Sound doesn't play

1. **Check if sound file exists**:

   ```bash
   ls -la assets/error.wav  # macOS/Linux
   dir assets\error.wav     # Windows
   ```

2. **Verify extension is running**:
   - Check the extension is enabled in VS Code
   - Open Developer Tools (F12 in development window)
   - Look for: "Django Error Sound extension is now active!"

3. **Check settings**:
   - Verify `django-error-sound.enabled` is true
   - Run command: "Django Error Sound: Enable"

4. **Test sound file on system**:
   ```bash
   afplay assets/error.wav            # macOS
   paplay assets/error.wav            # Linux
   powershell (New-Object Media.SoundPlayer 'assets\error.wav').PlaySync()  # Windows
   ```

### Errors not being detected

1. **Ensure Python linting is configured**:
   - Install Python extension
   - Set up pylint or flake8
   - Or use Pylance language server

2. **Check error patterns**:
   - The extension looks for specific Python error patterns
   - See `src/extension.ts` for `DJANGO_ERROR_PATTERNS`

3. **Enable VS Code diagnostics**:
   - Open Problems view (Cmd/Ctrl + Shift + M)
   - Errors should appear here when detected

4. **Increase logging**:
   - Open Developer Tools (F12)
   - Check console for debug messages

## Creating a Sound File

### Option 1: Use Existing Sound

Find free audio at:

- Zapsplat.org (free, no signup needed)
- Freesound.org
- BBC Sound Effects Library

Download a short WAV file and:

1. Rename to `error.wav`
2. Place in `assets/` folder

### Option 2: Generate with ffmpeg

```bash
# From an MP3 to WAV
ffmpeg -i sound.mp3 assets/error.wav

# Create a simple beep
ffmpeg -f lavfi -i "sine=f=1000:d=0.5" -q:a 9 -acodec libmp3lame assets/error.wav
```

### Option 3: Use Online Tools

- Audacity (free, Desktop app) - Generate or convert sounds
- Online-Convert.com - Convert MP3/MOV to WAV
- EZGIF.com - Audio conversion

## Next Steps

- Customize the sound- Adjust error detection patterns for your needs
- Submit improvements as pull requests
- Distribute via VS Code Marketplace

## Publishing to Marketplace

```bash
npm run vscode:prepublish  # Build for production
vsce package               # Create .vsix file
vsce publish               # Publish to marketplace
```

See: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
