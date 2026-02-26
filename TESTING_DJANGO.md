# Testing with Django

This guide explains how to test the Django Error Sound extension with an actual Django project.

## Prerequisites

- Django project installed and working
- Python linting tool (pylint, flake8, etc.) configured
- VS Code with Python extension installed
- The extension built and running in development mode

## Setup Django Testing

### 1. Install Python Linting (if not already installed)

```bash
pip install pylint flake8 black isort
```

### 2. Configure VS Code for the Django Project

In your Django project root, create `.vscode/settings.json`:

```json
{
  "python.linting.pylintEnabled": true,
  "python.linting.pylintArgs": ["--errors-only"],
  "python.linting.flake8Enabled": true,
  "[python]": {
    "editor.defaultFormatter": "ms-python.python",
    "editor.formatOnSave": true
  }
}
```

### 3. Run the Extension in Development Mode

In the extension folder:

```bash
npm run esbuild-watch  # Or press F5
```

### 4. Test with Sample Error

1. Open your Django project in the development VS Code window
2. Open a Python file (e.g., `views.py`)
3. Introduce a syntax error:

```python
def my_view(request):
    # Missing colon
    if request.method == 'GET'
        return HttpResponse("Hello")
```

4. When you save the file, you should hear the error sound!

### 5. Test Different Error Types

Try these to trigger different error patterns:

```python
# NameError
def test_name_error():
    print(undefined_variable)  # NameError

# ImportError
from non_existent_module import something  # ImportError

# SyntaxError
def broken_syntax(
    pass  # SyntaxError

# TypeError
def type_error():
    result = "string" + 123  # TypeError (depends on linter)

# Django-specific: Missing import
def view_without_import(request):
    return HttpResponse("test")  # HttpResponse not imported

# Indentation Error
def indentation_test():
print("bad indent")  # IndentationError
```

### 6. Test Django Runserver Monitoring

For real-time Django server errors:

1. Start Django development server in terminal:

   ```bash
   python manage.py runserver
   ```

2. Keep the terminal visible in VS Code

3. Edit a file and save it - Django will reload and any errors will trigger the sound

### 7. Test with Failing Tests

The extension also detects test failures from pytest and unittest:

```bash
# Install pytest if you don't have it
pip install pytest pytest-django

# Run tests in watch mode or let VS Code run them
pytest tests/ -v
```

Test failure patterns detected:

- `FAILED` or `FAIL` in test output
- `AssertionError` exceptions
- Test assertion failures
- `X failed` summary lines
- pytest error markers

Create a simple failing test:

```python
# tests/test_example.py
def test_addition():
    assert 1 + 1 == 3  # This will fail!

def test_string_equality():
    assert "hello" == "world"  # This will fail too!
```

When you run these tests, the extension will play the sound when failures are detected!

## Monitoring Error Detection

To see which errors are being detected:

### Check VS Code Problems View

- Press: `Cmd/Ctrl + Shift + M`
- You should see errors listed here
- The extension listens to this

### Check Extension Debug Output

- Press: `Cmd/Ctrl + Shift + P` → "Developer: Show Logs"
- Select "Django Error Sound" from the channel dropdown
- You'll see console messages like: `Django error detected: [error message]`

## Troubleshooting

### Sound doesn't play

1. Check that `assets/error.wav` exists and is valid
2. Test the file directly: `afplay assets/error.wav` (macOS)
3. Verify extension is enabled: "Django Error Sound: Enable"
4. Check Developer Tools console for errors

### Errors aren't detected

1. Ensure linter is installed: `pip install pylint flake8`
2. Make sure Python extension is running
3. Check Problems view shows errors (Cmd/Ctrl + Shift + M)
4. Verify file is saved (some linters run on save)

### Only some errors trigger sound

The extension detects specific error patterns (see `DJANGO_ERROR_PATTERNS` in `src/extension.ts`). Some linters only show certain error types. Try:

- Using pylint: `python -m pylint yourfile.py`
- Using flake8: `python -m flake8 yourfile.py`

## Test Coverage

The extension currently detects:

- **Python Errors**: SyntaxError, ImportError, NameError, ValueError, TypeError, etc.
- **Exception Messages**: "Traceback", "Error:", "failed", "invalid"
- **Django-specific**: "Internal Server Error", "Bad Request"
- **File Errors**: FileNotFoundError, PermissionError, IOError
- **Test Failures**: FAILED, AssertionError, test failures from pytest/unittest, "X failed" summaries

See `DJANGO_ERROR_PATTERNS` in `src/extension.ts` for the complete list.

## Performance Notes

- The extension uses debouncing (2 second minimum between sounds)
- Only processes Error severity diagnostics
- Minimal CPU/memory usage
- Runs in extension host process (no separate threads)

## Next Steps

1. Test with your actual Django workflow
2. Customize the sound if needed (replace `assets/error.wav`)
3. Adjust configuration:
   ```json
   {
     "django-error-sound.enabled": true,
     "django-error-sound.volume": 0.7
   }
   ```
4. Submit feedback or improvements!

## Real Django Development Scenario

Here's a typical workflow:

1. Start development in terminal:

   ```bash
   python manage.py runserver
   ```

2. Load your app: http://localhost:8000

3. Edit `views.py` and introduce an error

4. Save the file

5. Django auto-reloads and displays an error page

6. VS Code Problems view shows the error diagnostic

7. **Extension plays the beep sound** 🔊

8. You know immediately there's an issue without checking the browser

This saves you from the cycle of:

- Save file → Check browser → Is it broken?

Instead:

- Save file → Hear the beep → Check browser (if sound played)
