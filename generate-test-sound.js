#!/usr/bin/env node

/**
 * Generate a simple beep WAV file for testing the extension
 * This script generates a 500ms sine wave beep without external dependencies
 */

const fs = require("fs");
const path = require("path");

const SAMPLE_RATE = 44100;
const DURATION = 0.5; // 500ms
const FREQUENCY = 1000; // 1000Hz tone
const CHANNELS = 1; // Mono
const BITS_PER_SAMPLE = 16;

function writeWAV(filename) {
  const samples = Math.round(SAMPLE_RATE * DURATION);
  const buffer = Buffer.alloc(44 + samples * 2);

  // PCM audio data
  let offset = 0;

  // WAV header
  // "RIFF" chunk descriptor
  buffer.write("RIFF", 0);
  offset = 4;
  buffer.writeUInt32LE(36 + samples * 2, offset); // File size - 8
  offset += 4;

  buffer.write("WAVE", offset);
  offset += 4;

  // "fmt " sub-chunk
  buffer.write("fmt ", offset);
  offset += 4;

  buffer.writeUInt32LE(16, offset); // Subchunk1Size
  offset += 4;

  buffer.writeUInt16LE(1, offset); // AudioFormat (1 = PCM)
  offset += 2;

  buffer.writeUInt16LE(CHANNELS, offset); // NumChannels
  offset += 2;

  buffer.writeUInt32LE(SAMPLE_RATE, offset); // SampleRate
  offset += 4;

  buffer.writeUInt32LE((SAMPLE_RATE * CHANNELS * BITS_PER_SAMPLE) / 8, offset); // ByteRate
  offset += 4;

  buffer.writeUInt16LE((CHANNELS * BITS_PER_SAMPLE) / 8, offset); // BlockAlign
  offset += 2;

  buffer.writeUInt16LE(BITS_PER_SAMPLE, offset); // BitsPerSample
  offset += 2;

  // "data" sub-chunk
  buffer.write("data", offset);
  offset += 4;

  buffer.writeUInt32LE(samples * 2, offset); // Subchunk2Size
  offset += 4;

  // Generate sine wave samples
  const MAX_SAMPLE_VALUE = 32767; // 2^15 - 1 for 16-bit signed

  for (let i = 0; i < samples; i++) {
    const t = i / SAMPLE_RATE;
    const sample =
      Math.sin(2 * Math.PI * FREQUENCY * t) * MAX_SAMPLE_VALUE * 0.8;
    buffer.writeInt16LE(Math.floor(sample), offset);
    offset += 2;
  }

  // Create assets directory if it doesn't exist
  const assetsDir = path.join(__dirname, "assets");
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Write the file
  const outputPath = path.join(assetsDir, "error.wav");
  fs.writeFileSync(outputPath, buffer);
  return outputPath;
}

try {
  const outputPath = writeWAV("error.wav");
  console.log("✓ Successfully created", outputPath);
  console.log("");
  console.log("File details:");
  console.log("  - Tone: 1000 Hz sine wave");
  console.log("  - Duration: 500ms");
  console.log("  - Sample rate: 44100 Hz");
  console.log("  - Bits: 16-bit mono");
  console.log("");
  console.log(
    "The extension will now play this sound when Django errors are detected.",
  );
  console.log("");
  console.log("To use a different sound:");
  console.log("  1. Download a WAV file from freesound.org or zapsplat.com");
  console.log("  2. Replace assets/error.wav with your file");
} catch (error) {
  console.error("✗ Failed to generate sound file:", error.message);
  process.exit(1);
}
