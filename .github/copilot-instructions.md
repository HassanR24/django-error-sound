# Django Error Sound - VS Code Extension

A VS Code extension that plays a sound whenever Django compilation fails, tests fail, or errors are detected.

## Project Overview

This extension monitors VS Code's diagnostic system and plays an audio alert when Python/Django errors or test failures are detected. Perfect for developers who want immediate audio feedback when their code has issues or tests fail.

### Key Features
- Automatic error detection and sound playback
- Test failure detection (pytest, unittest)
- Configurable volume and enable/disable controls
- Detects various Python error types (syntax, runtime, exceptions, test failures)
- Works with Django, Flask, and pure Python projects
- Platform support: macOS, Windows, Linux

## Project Structure

```
faah_extension/
├── src/extension.ts           # Main extension code
├── assets/error.wav          # Default error sound (configurable)
├── dist/                     # Compiled extension (generated)
├── package.json              # Dependencies and metadata
├── tsconfig.json             # TypeScript configuration
├── .vscode/launch.json       # Debugging configuration
├── .eslintrc.json            # Code style rules
├── QUICK_START.md            # Start here - one minute setup
├── GETTING_STARTED.md        # Detailed setup guide
├── TESTING_DJANGO.md         # Django-specific testing
└── README.md                 # Full documentation
```

## Setup Status

### Completed
- ✅ Project scaffolding
- ✅ TypeScript configuration
- ✅ Extension core functionality
- ✅ Sound playback implementation
- ✅ Error pattern detection
- ✅ Configuration settings
- ✅ NPM dependencies installed
- ✅ Extension compiled (dist/extension.js)
- ✅ Default test sound generated
- ✅ Comprehensive documentation

### To Use the Extension
1. See [QUICK_START.md](../QUICK_START.md) for one-minute setup
2. Press F5 to launch the extension in development mode
3. Test with Python files in the dev window

### To Customize
- Replace `assets/error.wav` with your own sound (WAV format)
- Edit `src/extension.ts` to change error detection patterns
- Adjust settings in VS Code (search "django-error-sound")

## Development

### Build Commands
```bash
npm install              # Install dependencies (done)
npm run esbuild         # Build once with source maps
npm run esbuild-watch   # Continuous build for development
npm run vscode:prepublish  # Production build (minified)
```

### Testing
1. Press F5 to open Extension Development Host
2. Introduce a syntax error in a Python file
3. Save the file
4. Listen for the error sound

See [TESTING_DJANGO.md](../TESTING_DJANGO.md) for detailed testing procedures.

### Debug
1. F12 in the extension development window opens Developer Tools
2. Console shows extension logs and errors
3. Check "Django Error Sound: " messages in Debug Console

## Architecture

### How It Works
1. **Activation**: Extension activates on any workspace
2. **Monitoring**: Listens to diagnostic changes from language servers
3. **Detection**: Checks messages against Django/Python error patterns
4. **Sound**: Plays `assets/error.wav` using system audio
5. **Debouncing**: Prevents multiple sounds within 2 seconds

### Platform Support
- **macOS**: Uses `afplay` command
- **Windows**: Uses PowerShell Media.SoundPlayer
- **Linux**: Uses `paplay` or `aplay`

## Configuration

Users can configure via VS Code Settings:
```json
{
  "django-error-sound.enabled": true,
  "django-error-sound.volume": 0.5
}
```

## Publishing

When ready to publish to VS Code Marketplace:
```bash
npm run vscode:prepublish
vsce package
vsce publish
```

Requires VS Code Extension CLI (`npm install -g vsce`)

## Notes

- The extension requires a WAV sound file at `assets/error.wav`
- Default 1000Hz beep is included for immediate use
- Users can replace with any WAV file
- The extension doesn't modify user's code, only monitors errors

## Future Enhancements

Potential improvements:
- Different sounds for different error types
- Visual notifications alongside audio
- Sound patterns/sequences
- Integration with task completion sounds
- Customizable debounce timing
- Error severity levels

---

**Status**: Complete and ready for testing with Django projects
**Next**: Run `node generate-test-sound.js` if sound is missing, then press F5 to test
