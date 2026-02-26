# Faaaahhh

> When your code screams "Faaaahhh!" so you don't have to!

A hilariously useful VS Code extension that yells **"FAAAAHHH!"** whenever your Django/Python code fails, tests bomb, or errors appear. Because every bug deserves a dramatic response!

Get instant audio feedback without constantly checking your browser or terminal. Your code fails, the extension screams. Simple.

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/YourPublisherName.django-error-sound?style=flat-square)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/YourPublisherName.django-error-sound?style=flat-square)
![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/YourPublisherName.django-error-sound?style=flat-square)

## ✨ Features

### 🎯 Smart Error Detection

- **Automatic Detection**: Monitors VS Code diagnostics in real-time
- **Python Errors**: SyntaxError, ImportError, NameError, TypeError, ValueError, and more
- **Django-Specific**: Internal Server Error, Bad Request, template errors
- **Test Failures**: Detects pytest and unittest failures instantly
- **Exception Tracking**: Catches unhandled exceptions and assertion errors

### 🔧 Fully Configurable

- **Enable/Disable**: Toggle sound playback via command palette or settings
- **Volume Control**: Adjust audio level from 0.0 (silent) to 1.0 (maximum)
- **Custom Sounds**: Use your own WAV file as the notification
- **Smart Debouncing**: Prevents multiple sounds for the same error

### 🌍 Cross-Platform Support

- **macOS**: Native `afplay` integration
- **Windows**: PowerShell Media.SoundPlayer
- **Linux**: `paplay` or `aplay` support

### 🚀 Zero Configuration

- Works out of the box with the included "Faaaahhh!" sound
- Integrates seamlessly with existing Python/Django workflows
- No additional dependencies required

## 📋 Requirements

- VS Code 1.75.0 or higher
- Python extension (recommended for best error detection)
- Python linting tools like pylint, flake8, or Pylance (optional but recommended)

## 📦 Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Go to Extensions (Ctrl/Cmd + Shift + X)
3. Search for "Faaaahhh"
4. Click Install

### From VSIX File

1. Download the `.vsix` file from releases
2. Open VS Code
3. Extensions → "..." menu → Install from VSIX
4. Select the downloaded file

### From Source

```bash
git clone https://github.com/HassanR24/django-error-sound.git
cd django-error-sound
npm install
npm run esbuild
```

Then press `F5` to launch in development mode.

## 🎮 Usage

The extension automatically activates when you open a workspace. It monitors diagnostics from Python language servers, linters, and test runners.

### Commands

Access these via Command Palette (Ctrl/Cmd + Shift + P):

- `Django Error Sound: Enable` - Enable sound playback
- `Django Error Sound: Disable` - Disable sound playback

### Extension Settings

Configure in VS Code Settings (File → Preferences → Settings):

| Setting                      | Type    | Default | Description                   |
| ---------------------------- | ------- | ------- | ----------------------------- |
| `django-error-sound.enabled` | boolean | `true`  | Enable/disable sound playback |
| `django-error-sound.volume`  | number  | `0.5`   | Volume level (0.0 to 1.0)     |

**Example settings.json:**

```json
{
  "django-error-sound.enabled": true,
  "django-error-sound.volume": 0.7
}
```

### Typical Workflow

1. 💻 Edit your Django/Python code
2. 💾 Save the file (Ctrl/Cmd + S)
3. 🎵 Hear a sound if there's an error
4. 🔍 Check Problems panel (Ctrl/Cmd + Shift + M) for details
5. 🛠️ Fix the issue
6. 🎉 Silence means success!

## 🎵 Customizing Your Sound

The extension comes with the dramatic "Faaaahhh!" sound, but you can replace it with anything!

### Using Your Own Sound

1. Find or create a WAV audio file (0.5-2 seconds recommended)
2. Navigate to the extension installation folder
3. Replace `assets/faahh.wav` with your file (keep the filename `faahh.wav`)
4. Reload VS Code

### Free Sound Resources

- [Freesound.org](https://freesound.org) - Thousands of free sound effects
- [Zapsplat.com](https://zapsplat.com) - High-quality free sounds
- [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/) - Professional library

### Sound Recommendations

✅ **Good choices:**

- Short beeps (0.5-1 second)
- Alert tones or chimes
- Distinctive sounds different from system notifications
- Dramatic screams or funny sound effects like "Faaaahhh!"

❌ **Avoid:**

- Long sounds (>3 seconds)
- Music or complex audio
- Very loud or jarring sounds

## 🔍 How It Works

```
┌─────────────────┐
│  You Edit Code  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Save File     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  Language Servers/Linters   │
│  (Pylance, pylint, flake8)  │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────┐
│  VS Code Diagnostics    │
│  (Problems Panel)       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Extension Detects      │◄── Error patterns matched!
│  Error Patterns         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────┐
│  🔊 Sound Plays!    │
└─────────────────────┘
```

### Error Sources

The extension monitors diagnostics from:

- **Language Servers**: Pylance, Python LSP
- **Linters**: pylint, flake8, black, isort
- **Type Checkers**: mypy, pyright
- **Test Runners**: pytest, unittest outputs
- **Django**: Server error messages

### Platform Audio Implementation

- **macOS**: Native `afplay` command-line tool
- **Windows**: PowerShell Media.SoundPlayer API
- **Linux**: `paplay` (PulseAudio) or `aplay` (ALSA)

## Development

```bash
npm install
npm run esbuild-watch      # Watch mode for development
npm run esbuild            # Build once
npm run vscode:prepublish  # Build for publication
```

## Notes

- The extension detects errors via VS Code's diagnostic system
- For best results, make sure your Django project has proper linting configured (pylint, flake8, etc.)
- Uses WAV audio format for maximum cross-platform compatibility

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- 🎯 Improve error pattern detection
- 🎵 Add support for MP3, OGG and other audio formats
- 🌈 Add visual notifications alongside audio
- 🔧 Add per-project configuration
- 🌍 Localization support

### Development Setup

```bash
git clone https://github.com/HassanR24/django-error-sound.git
cd django-error-sound
npm install
npm run esbuild-watch
```

Press `F5` to launch the extension in debug mode.

### Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hassan Raza**

- GitHub: [@HassanR24](https://github.com/HassanR24)
- Extension Repository: [django-error-sound](https://github.com/HassanR24/django-error-sound)

---

<div align="center">

### ⭐ If you find this extension helpful, please star the repository!

**Made with ❤️ by Hassan Raza**

</div>
