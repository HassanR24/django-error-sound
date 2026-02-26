# Change Log

All notable changes to the "Faaaahhh" extension will be documented in this file.

## [0.0.1] - 2026-02-26

### ✨ Initial Release - Goes "Faaaahhh!" 🤣

#### Features

- 😱 **Dramatic Audio Alerts**: Plays the hilarious "Faaaahhh!" sound when Django/Python errors are detected
- 🧪 **Test Failure Detection**: Automatically detect pytest and unittest failures
- ⚙️ **Configurable Settings**: Enable/disable and volume control
- 🎯 **Smart Error Detection**: Comprehensive Python error pattern matching
  - SyntaxError, ImportError, NameError, TypeError, ValueError
  - Django-specific errors (Internal Server Error, Bad Request)
  - Exception tracking and tracebacks
  - AssertionError and test failures
- 🌍 **Cross-Platform Support**: Works on macOS, Windows, and Linux
- 🎵 **Audio Format**: Uses WAV format for guaranteed compatibility across all platforms
- 🚀 **Zero Configuration**: Works out of the box with the included "Faaaahhh!" sound

#### Commands

- `Django Error Sound: Enable` - Enable sound playback
- `Django Error Sound: Disable` - Disable sound playback

#### Settings

- `django-error-sound.enabled` - Toggle sound playback (default: true)
- `django-error-sound.volume` - Adjust volume from 0.0 to 1.0 (default: 0.5)

#### Technical Details

- Built with TypeScript and esbuild
- Uses VS Code diagnostic API for error detection
- 2-second debounce to prevent duplicate sounds
- Lightweight and performant
- No external dependencies at runtime

---

### 🔮 Planned Features

Looking ahead to future releases:

- Support for MP3 and OGG audio formats
- Visual notifications alongside audio
- Per-project configuration
- Different sounds for different error types
- Custom error pattern configuration
- Integration with Django development server logs

---

**Full Changelog**: https://github.com/HassanR24/django-error-sound/commits/main
