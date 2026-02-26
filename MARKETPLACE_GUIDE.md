# 📦 VS Code Marketplace Publishing Guide - Faaaahhh Edition

This guide explains how the Marketplace displays your extension and how to publish it.

## 🎯 Marketplace Sections Overview

When users view your extension on the VS Code Marketplace, they see these sections:

### 1. **Details** Tab

- **Source**: Content from `README.md`
- **What it shows**: Main description, features, installation, usage instructions
- **Status**: ✅ Ready (README.md has been formatted for marketplace)

### 2. **Feature Contributions** Tab

- **Source**: Extracted from `package.json` → `contributes` section
- **What it shows**: Commands, settings, keybindings that your extension provides
- **Status**: ✅ Ready (Commands and settings already defined)

### 3. **Changelog** Tab

- **Source**: Content from `CHANGELOG.md`
- **What it shows**: Version history and changes
- **Status**: ✅ Ready (CHANGELOG.md created)

---

## 📝 Files Created for Marketplace

All files are ready to copy-paste or use as-is:

| File           | Purpose                     | Status                                 |
| -------------- | --------------------------- | -------------------------------------- |
| `README.md`    | Main extension details page | ✅ Updated with marketplace formatting |
| `CHANGELOG.md` | Version history             | ✅ Created                             |
| `LICENSE`      | MIT License                 | ✅ Created                             |
| `package.json` | Extension metadata          | ✅ Updated with author info            |

---

## 🚀 Publishing Steps

### Step 1: Create a Publisher Account

1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with your GitHub account (HassanR24)
3. Click "Create publisher"
4. Choose a publisher ID (e.g., `hassanraza`, `hassanr24`, etc.)
5. Fill in your details

### Step 2: Update package.json with Your Publisher ID

Open `package.json` and replace this line:

```json
"publisher": "YourPublisherName",
```

With your actual publisher ID:

```json
"publisher": "hassanraza",  // Use your actual publisher ID
```

### Step 3: Create a Personal Access Token

1. Go to https://dev.azure.com/
2. Click "User settings" (gear icon) → "Personal access tokens"
3. Click "New Token"
4. Settings:
   - **Name**: VS Code Extension Publishing
   - **Organization**: All accessible organizations
   - **Scopes**: Click "Show all scopes" → Check "Marketplace (Manage)"
5. Click "Create"
6. **⚠️ IMPORTANT**: Copy the token immediately (you can't see it again)

### Step 4: Install VSCE (Publishing Tool)

```bash
npm install -g @vscode/vsce
```

### Step 5: Login with Your Token

```bash
vsce login <your-publisher-id>
```

Paste your Personal Access Token when prompted.

### Step 6: Build and Package

```bash
cd /Users/digitalzone/Desktop/faah_extension

# Build the extension
npm run vscode:prepublish

# Package it (creates .vsix file)
vsce package
```

This creates: `faaaahhh-0.0.1.vsix`

### Step 7: Test the Package Locally (Optional but Recommended)

```bash
code --install-extension faaaahhh-0.0.1.vsix
```

Test it thoroughly before publishing!

### Step 8: Publish to Marketplace

```bash
vsce publish
```

Or publish the packaged file:

```bash
vsce publish --packagePath faaaahhh-0.0.1.vsix
```

---

## 🎨 Optional: Add an Icon

Create a 128x128 PNG icon and add to `package.json`:

```json
{
  "icon": "icon.png",
  ...
}
```

Place `icon.png` in the extension root folder.

**Icon Ideas:**

- 🔊 Speaker with error symbol
- 🚨 Alert/bell icon
- 🐍 Python logo with sound waves
- 🎵 Musical note with Django "D"

Free icon resources:

- https://www.flaticon.com
- https://icons8.com
- https://www.iconfinder.com

---

## 📋 Pre-Publishing Checklist

Before you publish, verify:

- [ ] Updated `package.json` with your publisher ID
- [ ] Created Azure DevOps Personal Access Token
- [ ] Installed `vsce` globally: `npm install -g @vscode/vsce`
- [ ] Logged in: `vsce login <publisher-id>`
- [ ] Built extension: `npm run vscode:prepublish`
- [ ] Tested locally with F5 or installed .vsix file
- [ ] README.md looks good (preview in VS Code)
- [ ] CHANGELOG.md is up to date
- [ ] All files committed to git
- [ ] GitHub repository created and pushed

---

## 🔄 Updating Your Extension

After the initial publish, when you make updates:

1. Update `CHANGELOG.md` with new changes
2. Bump version in `package.json`:
   ```json
   "version": "0.0.2"
   ```
3. Build and publish:
   ```bash
   npm run vscode:prepublish
   vsce publish
   ```

Or publish with auto version bump:

```bash
vsce publish minor  # 0.0.1 → 0.1.0
vsce publish patch  # 0.0.1 → 0.0.2
vsce publish major  # 0.0.1 → 1.0.0
```

---

## 🌐 After Publishing

Your extension will be available at:

```
https://marketplace.visualstudio.com/items?itemName=<publisher-id>.django-error-sound
```

Users can install it by:

1. Searching "Faaaahhh" in VS Code Extensions
2. Or: `code --install-extension <publisher-id>.django-error-sound`

### Marketplace Badges

Add these to your GitHub README for visibility:

```markdown
![Installs](https://img.shields.io/visual-studio-marketplace/i/<publisher-id>.django-error-sound)
![Rating](https://img.shields.io/visual-studio-marketplace/r/<publisher-id>.django-error-sound)
![Version](https://img.shields.io/visual-studio-marketplace/v/<publisher-id>.django-error-sound)
```

---

## 🆘 Troubleshooting

### "Error: Missing publisher name"

→ Add `"publisher": "your-publisher-id"` to `package.json`

### "Error: Authentication failed"

→ Run `vsce login <publisher-id>` again with a new token

### "Error: Extension file too large"

→ Check `.vscodeignore` is excluding `node_modules`, `src`, test files

### "README not rendering properly"

→ Use VS Code's built-in markdown preview to check formatting

---

## 📞 Support

- **Your Repository**: https://github.com/HassanR24/django-error-sound
- **VSCE Documentation**: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- **Marketplace Portal**: https://marketplace.visualstudio.com/manage

---

## 🎉 Quick Command Reference

```bash
# Install VSCE
npm install -g @vscode/vsce

# Login (first time only)
vsce login <your-publisher-id>

# Package (creates .vsix)
vsce package

# Publish
vsce publish

# Publish with version bump
vsce publish patch  # 0.0.1 → 0.0.2
vsce publish minor  # 0.0.1 → 0.1.0
vsce publish major  # 0.0.1 → 1.0.0

# Test locally
code --install-extension faaaahhh-0.0.1.vsix
```

---

**Author**: Hassan Raza ([@HassanR24](https://github.com/HassanR24))

Good luck with your extension! 🚀
