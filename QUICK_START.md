# Django Error Sound - Quick Start Guide

Welcome! This extension plays a sound whenever Django compilation fails, tests fail, or errors are detected in VS Code.

## 🚀 One-Minute Setup

```bash
# 1. Install dependencies
npm install

# 2. Build the extension
npm run esbuild

# 3. Test the sound (optional)
node generate-test-sound.js

# 4. Launch!
# Press F5 in VS Code to open the extension development window
```

## ✅ What You Get

- 🔊 **Automatic error sounds** when Python/Django errors are detected
- ⚙️ **Full control** - enable/disable and adjust volume
- 🎯 **Smart detection** - recognizes syntax errors, exceptions, and Django-specific errors
- 💾 **Easy customization** - replace the error.wav file with any sound

## 🎵 Getting Sound

The extension comes with a default 1000Hz beep. To use it immediately, that's it—you're done!

To use a different sound:

```bash
# Option 1: Use ffmpeg to convert
ffmpeg -i your_sound.mp3 assets/error.wav

# Option 2: Download a free sound
# Visit: freesound.org, zapsplat.com, or BBC Sound Effects Library
# Download a WAV alarm/alert sound
# Save as: assets/error.wav
```

## 🧪 Testing It Works

### In Development Mode

1. Press **F5** to open Extension Development Host
2. Open a Python file in the dev window
3. Create a syntax error (e.g., missing colon)
4. Save the file
5. **You should hear a beep!** 🔊

### With Your Django Project

1. Open your Django project in the development window
2. Make sure you have Python linting (pylint/flake8) installed
3. Edit a Python file and save with an error
4. The sound plays when VS Code detects the error

## 📋 Available Commands

Run these via Command Palette (Cmd/Ctrl + Shift + P):

- `Django Error Sound: Enable` - Turn on sound playback
- `Django Error Sound: Disable` - Turn off sound playback

## ⚙️ Settings

Open VS Code Settings (Cmd/Ctrl + ,) and search for "django-error-sound":

```json
{
  "django-error-sound.enabled": true,
  "django-error-sound.volume": 0.5
}
```

- **enabled**: true/false - Toggle sound on/off
- **volume**: 0.0 to 1.0 - Sound volume level

## 📁 Project Structure

```
faah_extension/
├── src/
│   └── extension.ts          # Main extension code
├── assets/
│   └── error.wav             # Sound file (replaceable)
├── dist/
│   └── extension.js          # Compiled code
├── package.json              # Dependencies & config
├── tsconfig.json             # TypeScript config
├── GETTING_STARTED.md        # Detailed setup guide
├── TESTING_DJANGO.md         # Django-specific testing
└── README.md                 # Full documentation
```

## 🔧 Development Commands

```bash
npm run esbuild              # Build once (with source maps)
npm run esbuild-watch       # Continuous build (recommended for dev)
npm run npm:prepublish      # Production build (minified)
npm run lint                # Check code style
```

## 🐛 Not Hearing Sounds?

**Checklist:**

- [ ] Extension is enabled: Run "Django Error Sound: Enable"
- [ ] Sound file exists: `ls assets/error.wav`
- [ ] Linting is installed: `pip install pylint flake8`
- [ ] Python extension is running in VS Code
- [ ] Problems view shows errors (Cmd/Ctrl + Shift + M)
- [ ] Check Developer Tools console (F12)

## 📚 More Information

- **Setup & Detailed Guide**: See [GETTING_STARTED.md](GETTING_STARTED.md)
- **Django Testing**: See [TESTING_DJANGO.md](TESTING_DJANGO.md)
- **Full Documentation**: See [README.md](README.md)

## 🎓 How It Works

The extension monitors VS Code's diagnostic system, which receives error reports from:

- **Language Servers** (Pylance, Python extension)
- **Linters** (pylint, flake8)
- **Type Checkers** (mypy, pyright)

When an error matching Django/Python patterns is detected → **Sound plays** 🔊

```
You edit file → Save → Linter runs → Error detected → Sound plays
                                      ↓
                              Extension hears it!
```

## 🚀 Next Steps

1. ✅ Run the setup above
2. ✅ Test with a syntax error in a Python file
3. ✅ Customize the sound (if desired)
4. ✅ Use in your Django projects
5. 📝 (Optional) Submit improvements!

## 📦 Publishing (Optional)

Want to share your extension?

```bash
npm run vscode:prepublish    # Production build
vsce package                 # Create .vsix file
vsce publish                 # Upload to VS Code Marketplace
```

## 💡 Tips

- **Best practice**: Keep sound short (< 1 second) and distinctive
- **Volume**: Start at 0.5, adjust to your preference
- **Debouncing**: Multiple errors within 2 seconds play only one sound
- **Customization**: Edit error patterns in `src/extension.ts`

## ❓ FAQ

**Q: Does it work with other Python projects (not Django)?**
A: Yes! It detects any Python errors reported by VS Code.

**Q: Can I disable it for certain files?**
A: You can toggle it on/off via the command palette or settings.

**Q: What if I don't like the default sound?**
A: Replace `assets/error.wav` with any WAV file you prefer.

**Q: Will this slow down VS Code?**
A: No, the extension uses minimal resources and debounces sounds.

**Q: Can I play different sounds for different error types?**
A: Currently plays the same sound. You can extend the code in `src/extension.ts` to support this.

## 🤝 Contributing

Found a bug or have an idea? Feel free to:

- Report issues
- Submit pull requests with improvements
- Suggest new error patterns to detect

---

**Enjoy! Happy coding with automatic error notifications!** 🚀
