# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **@masatomakino/tweenable-color**, a TypeScript library for smooth color animations using easing functions. The library provides two animation modes:
- **RGB interpolation**: For smooth color transitions in RGB space
- **HSL interpolation**: For more natural color transitions through hue rotation

## Architecture

### Core Components

- **Color Classes** (`src/color/`): `RGBColor` and `HSLColor` for color representation and conversion
- **Tweenable Classes**: `TweenableColor` (RGB) and `TweenableHSL` (HSL) extend EventEmitter for animation lifecycle
- **Animation System**: `TweenableColorTicker` provides centralized requestAnimationFrame timing using EventEmitter

### Key Patterns

- **Event-Driven**: All components use EventEmitter for update notifications and lifecycle management
- **Centralized Timing**: Single ticker system manages all animations to avoid multiple RAF loops
- **Type Safety**: Full TypeScript with strict type checking for color values and animation parameters

## Development Commands

### Testing
```bash
npm test                    # Run all tests
npm run coverage           # Generate coverage report
npm run test:watch         # Run tests in watch mode
```

### Building
```bash
npm run build              # Build for production
npm run start:dev          # Start development server with demo
npm run typedocs           # Generate API documentation
```

### Code Quality
```bash
npx biome check            # Check formatting and linting
npx biome format           # Format code
npx biome lint             # Run linter
```

## Development Setup

- **Biome**: Recently migrated from Prettier for formatting/linting (configured in `biome.json`)
- **Vitest**: Testing framework with jsdom environment for browser APIs
- **TypeScript**: ES2021 target with ES2022 modules
- **Husky**: Git hooks for pre-commit code quality checks

## Testing Notes

Tests are located in `__test__/` and use Vitest with browser environment. The test suite covers:
- Color conversion accuracy
- Animation timing and easing
- Event emission and lifecycle
- Ticker system functionality

When writing tests, use the existing patterns for color value assertions and animation timing verification.