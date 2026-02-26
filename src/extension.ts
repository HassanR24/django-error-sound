import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";
import { exec } from "child_process";

let outputChannelListener: vscode.Disposable | undefined;
let terminalListener: vscode.Disposable | undefined;
let isEnabled: boolean;
let volume: number;
let lastErrorTime: number = 0;
const ERROR_DEBOUNCE_MS = 2000; // Prevent multiple sounds within 2 seconds

const DJANGO_ERROR_PATTERNS = [
  // Python Exception Types
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
  /AssertionError/,
  /Exception/,

  // Python error messages (case insensitive)
  /error/i,
  /failed/i,
  /exception/i,
  /traceback/i,
  /invalid/i,

  // Django-specific
  /Internal Server Error/,
  /Bad Request/,
  /Django/,

  // Test output
  /FAILED/,
  /FAILURES/,
  /ERRORS/,
  /\d+\s+failed/i,
  /assertion failed/i,

  // Generic error indicators
  /Expected/, // "Expected ':'" from syntax errors
  /Unexpected/,
  /\[ERROR\]/,
  /\*\*\*.*Error/,
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
  // Monitor all terminals for pytest output
  // VS Code doesn't expose direct terminal output monitoring, so we monitor terminal lifecycle

  const terminalMap = new Map<vscode.Terminal, string>();

  // When a new terminal is opened
  const terminalOpened = vscode.window.onDidOpenTerminal((terminal) => {
    console.log(`[Faaaahhh] Terminal opened: ${terminal.name}`);
    terminalMap.set(terminal, "");
  });

  // When a terminal is closed, check if it had failure output
  const terminalClosed = vscode.window.onDidCloseTerminal((terminal) => {
    terminalMap.delete(terminal);
  });

  // Setup existing terminals
  vscode.window.terminals.forEach((terminal) => {
    terminalMap.set(terminal, "");
  });

  context.subscriptions.push(terminalOpened, terminalClosed);
}

function monitorDiagnostics(context: vscode.ExtensionContext) {
  // Listen to diagnostic changes (problems from language servers, pylint, etc.)
  const diagnosticsListener = vscode.languages.onDidChangeDiagnostics(
    (event) => {
      for (const uri of event.uris) {
        const diagnostics = vscode.languages.getDiagnostics(uri);
        console.log(
          `[Faaaahhh] Detected ${diagnostics.length} diagnostic(s) in ${uri.fsPath}`,
        );

        for (const diagnostic of diagnostics) {
          const message = diagnostic.message;
          const severity = ["Hint", "Warning", "Error", "Unset"][
            diagnostic.severity
          ];

          // Log all errors
          if (diagnostic.severity === vscode.DiagnosticSeverity.Error) {
            console.log(`[Faaaahhh] ERROR: "${message}"`);

            // Check if it matches our patterns
            if (isDjangoErrorMessage(message)) {
              console.log("[Faaaahhh] ✓ Pattern matched! Playing sound...");
              playErrorSound();
              return;
            } else {
              console.log(
                "[Faaaahhh] ✗ No pattern match. Check message format.",
              );
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

  // Register command to run pytest with sound monitoring
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "django-error-sound.runPytest",
      async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
          vscode.window.showErrorMessage("No workspace folder open");
          return;
        }

        const pytestPath = await vscode.window.showInputBox({
          prompt: "Enter pytest path (e.g., test.py, tests/, or . for all)",
          value: ".",
        });

        if (!pytestPath) {
          return;
        }

        // Show running status
        const statusBar = vscode.window.setStatusBarMessage(
          "🧪 Running pytest...",
        );

        // Run pytest and capture output
        exec(
          `python -m pytest ${pytestPath} -v`,
          { cwd: workspaceFolder.uri.fsPath },
          (error, stdout, stderr) => {
            statusBar.dispose();

            const output = stdout + stderr;
            console.log(`[Faaaahhh] Pytest output:\n${output}`);

            // Show output in a new document
            vscode.workspace
              .openTextDocument({
                language: "python",
                content: output,
              })
              .then((doc) => {
                vscode.window.showTextDocument(doc);
              });

            // Check for failures
            const hasFailed =
              /FAILED|FAILURES|\d+ failed|failed to collect|ERROR|error/i.test(
                output,
              );

            if (hasFailed) {
              console.log("[Faaaahhh] Pytest failure detected!");
              playErrorSound();
              vscode.window.showErrorMessage(
                "❌ Tests failed! Playing error sound...",
              );
            } else if (error) {
              console.log("[Faaaahhh] Pytest execution error");
              playErrorSound();
              vscode.window.showErrorMessage(
                "❌ Pytest error! Playing error sound...",
              );
            } else {
              console.log("[Faaaahhh] All tests passed!");
              vscode.window.showInformationMessage("✅ All tests passed!");
            }
          },
        );
      },
    ),
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
