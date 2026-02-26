import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";

let outputChannelListener: vscode.Disposable | undefined;
let terminalListener: vscode.Disposable | undefined;
let isEnabled: boolean;
let volume: number;
let lastErrorTime: number = 0;
const ERROR_DEBOUNCE_MS = 2000; // Prevent multiple sounds within 2 seconds

const DJANGO_ERROR_PATTERNS = [
  /Traceback|traceback|TRACEBACK/,
  /Error:|ERROR:/,
  /SyntaxError/,
  /AttributeError/,
  /ImportError/,
  /ModuleNotFoundError/,
  /TypeError/,
  /NameError/,
  /ValueError/,
  /KeyError/,
  /IndexError/,
  /RuntimeError/,
  /IOError/,
  /FileNotFoundError/,
  /PermissionError/,
  /OSError/,
  /Exception:/,
  /invalid|Invalid|INVALID/,
  /failed|Failed|FAILED/,
  /Unhandled exception/,
  /Internal Server Error/,
  /Bad Request/,
  /\[ERROR\]/,
  /\*\*\*.*Error/,
  // Test failure patterns
  /FAILED|Fail|fail/,
  /AssertionError/,
  /test failed|test failure/i,
  /assertion failed/i,
  /\d+\s+failed/i,
  /FAILURES|ERRORS/,
  /passed.*failed/i,
  /test session ended with.*error/i,
  /^\s*E\s+/m, // pytest error lines starting with 'E'
];

const IGNORE_PATTERNS = [/DEBUG/i, /INFO/i, /WARNING/i, /\[notice\]/i];

function playErrorSound() {
  if (!isEnabled) {
    return;
  }

  // Debounce to prevent multiple sounds
  const now = Date.now();
  if (now - lastErrorTime < ERROR_DEBOUNCE_MS) {
    return;
  }
  lastErrorTime = now;

  const soundPath = path.join(__dirname, "..", "assets", "faahh.wav");

  if (!fs.existsSync(soundPath)) {
    console.warn("Django Error Sound: Sound file not found at", soundPath);
    return;
  }

  try {
    // Play sound using system command (platform dependent)
    if (process.platform === "darwin") {
      // macOS: afplay
      const afplay = spawn("afplay", [soundPath], {
        detached: true,
        stdio: "ignore",
      });
      afplay.unref();
    } else if (process.platform === "win32") {
      // Windows: Use WScript or PowerShell
      try {
        const ps = spawn(
          "powershell.exe",
          [
            "-NoProfile",
            "-Command",
            `$player = New-Object Media.SoundPlayer '${soundPath}'; $player.PlaySync();`,
          ],
          { detached: true, stdio: "ignore" },
        );
        ps.unref();
      } catch {
        // Fallback: try using explorer if PowerShell fails
        spawn("explorer.exe", [soundPath], {
          detached: true,
          stdio: "ignore",
        }).unref();
      }
    } else if (process.platform === "linux") {
      // Linux: Try paplay first, then aplay
      const paplay = spawn("paplay", [soundPath], {
        detached: true,
        stdio: "ignore",
      });
      paplay.on("error", () => {
        spawn("aplay", [soundPath], {
          detached: true,
          stdio: "ignore",
        }).unref();
      });
      paplay.unref();
    }
  } catch (error) {
    console.error("Failed to play sound:", error);
  }
}

function isDjangoErrorMessage(text: string): boolean {
  // Skip if matches ignore patterns
  if (IGNORE_PATTERNS.some((pattern) => pattern.test(text))) {
    return false;
  }

  // Check if matches Django error patterns
  return DJANGO_ERROR_PATTERNS.some((pattern) => pattern.test(text));
}

function setupTerminalTracking(context: vscode.ExtensionContext) {
  // Monitor all terminals for error output
  const terminals = new Map<vscode.Terminal, vscode.Disposable>();

  const setupTerminal = (terminal: vscode.Terminal) => {
    // We can't directly listen to terminal output, but we can check for errors
    // when diagnostics change (which includes terminal/linter output)
  };

  // When a terminal is created
  const terminalCreated = vscode.window.onDidOpenTerminal((terminal) => {
    setupTerminal(terminal);
  });

  // Setup existing terminals
  vscode.window.terminals.forEach(setupTerminal);

  context.subscriptions.push(terminalCreated);
}

function monitorDiagnostics(context: vscode.ExtensionContext) {
  // Listen to diagnostic changes (problems from language servers, pylint, etc.)
  const diagnosticsListener = vscode.languages.onDidChangeDiagnostics(
    (event) => {
      for (const uri of event.uris) {
        const diagnostics = vscode.languages.getDiagnostics(uri);
        for (const diagnostic of diagnostics) {
          // Check if it's an error level diagnostic
          if (diagnostic.severity === vscode.DiagnosticSeverity.Error) {
            const message = diagnostic.message;
            if (isDjangoErrorMessage(message)) {
              console.log("Django error detected:", message);
              playErrorSound();
              return;
            }
          }
        }
      }
    },
  );

  context.subscriptions.push(diagnosticsListener);
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Django Error Sound extension is now active!");

  // Get initial settings
  const config = vscode.workspace.getConfiguration("django-error-sound");
  isEnabled = config.get("enabled", true);
  volume = config.get("volume", 0.5);

  // Watch for configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration("django-error-sound")) {
        const newConfig =
          vscode.workspace.getConfiguration("django-error-sound");
        isEnabled = newConfig.get("enabled", true);
        volume = newConfig.get("volume", 0.5);
      }
    }),
  );

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand("django-error-sound.enableSound", () => {
      vscode.workspace
        .getConfiguration("django-error-sound")
        .update("enabled", true, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage("Django Error Sound: Enabled");
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("django-error-sound.disableSound", () => {
      vscode.workspace
        .getConfiguration("django-error-sound")
        .update("enabled", false, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage("Django Error Sound: Disabled");
    }),
  );

  // Start monitoring diagnostics for errors
  monitorDiagnostics(context);

  // Setup terminal tracking
  setupTerminalTracking(context);

  console.log(
    "Django Error Sound extension initialized with enabled:",
    isEnabled,
  );
}

export function deactivate() {
  if (outputChannelListener) {
    outputChannelListener.dispose();
  }
  if (terminalListener) {
    terminalListener.dispose();
  }
}
