# tweenable-color

A TypeScript library for smooth color animations using easing functions. Provides RGB and HSL interpolation modes for natural color transitions.

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@masatomakino/tweenable-color.svg?style=flat)](https://www.npmjs.com/package/@masatomakino/tweenable-color)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github&style=flat)](https://github.com/MasatoMakino/tweenable-color)

## Features

- RGB Interpolation: Smooth color transitions in RGB color space
- HSL Interpolation: Natural color transitions through hue rotation
- Event-Driven: Built on EventEmitter for lifecycle management
- Easing Functions: Compatible with @tweenjs/tween.js easing functions and custom easing functions
- TypeScript Support: Full type definitions included
- Performance Optimized: Centralized ticker system using requestAnimationFrame

## Demo

[Demo Page](https://masatomakino.github.io/tweenable-color/demo/)

## Installation

```bash
npm install @masatomakino/tweenable-color
```

## Quick Start

### Basic RGB Animation

```typescript
import { TweenableColor, TweenableColorTicker } from '@masatomakino/tweenable-color';
import { Easing } from '@tweenjs/tween.js';

// Start the animation ticker
TweenableColorTicker.start();

// Create a color instance (starts at black)
const color = new TweenableColor(0, 0, 0, 1.0);

// Listen for color updates
color.on('onUpdate', (colorInstance) => {
  console.log(colorInstance.getCSSColor()); // "rgb(255, 0, 0)"
});

// Listen for animation completion
color.on('onComplete', (colorInstance) => {
  console.log('Animation finished!');
});

// Animate to red over 2 seconds with easing
color.change(255, 0, 0, 1.0, 2000, {
  easing: Easing.Cubic.Out
});
```

### HSL Animation for Natural Color Transitions

```typescript
import { TweenableHSL, TweenableColorTicker } from '@masatomakino/tweenable-color';
import { Easing } from '@tweenjs/tween.js';

TweenableColorTicker.start();

// Create HSL color instance
const hslColor = new TweenableHSL(0, 0, 0, 1.0);

hslColor.on('onUpdate', (colorInstance) => {
  // Update DOM element
  element.style.backgroundColor = colorInstance.getCSSColor();
  element.style.opacity = colorInstance.getAlpha();
});

// Animate through hue spectrum
hslColor.change(255, 128, 0, 1.0, 3000, {
  easing: Easing.Quintic.InOut
});
```

## API Reference

### TweenableColor

Main class for RGB-based color animations.

#### Constructor

```typescript
new TweenableColor(r?: number, g?: number, b?: number, alpha?: number)
```

- `r`: Red component (0-255, default: 0)
- `g`: Green component (0-255, default: 0)
- `b`: Blue component (0-255, default: 0)
- `alpha`: Alpha component (0-1, default: 1.0)

#### Methods

##### `change(toR, toG, toB, toAlpha, duration, option?)`

Animate to target color values.

- `toR`: Target red value (0-255)
- `toG`: Target green value (0-255)
- `toB`: Target blue value (0-255)
- `toAlpha`: Target alpha value (0-1)
- `duration`: Animation duration in milliseconds
- `option`: Optional configuration object

##### `getCSSColor(): string`

Returns CSS color string: `"rgb(255, 0, 0)"`

##### `getCSSStyle(): string`

Returns CSS color with alpha: `"rgba(255, 0, 0, 1)"`

##### `getAlpha(): string`

Returns alpha value as string.

##### `getAttribute(): [number, number, number, number]`

Returns normalized color values `[r/255, g/255, b/255, alpha]` for WebGL.

##### `clone(): TweenableColor`

Creates a copy of the color instance.

#### Events

- `onUpdate`: Fired during animation with updated color values
- `onComplete`: Fired when animation completes

### TweenableHSL

Extended class for HSL-based color animations. Inherits all methods from TweenableColor but uses HSL interpolation internally.

```typescript
const hslColor = new TweenableHSL(0, 0, 0, 1.0);
// Same API as TweenableColor, but smoother hue transitions
```

### TweenableColorTicker

Centralized animation ticker system.

#### Methods

##### `start(now?: number): void`

Start the global animation ticker.

##### `stop(): void`

Stop the global animation ticker.

##### `update(ms: number): void`

Manually update with timestamp.

### ChangeOption Interface

Configuration object for animations.

```typescript
interface ChangeOption {
  easing?: (amount: number) => number;  // Easing function (supports @tweenjs/tween.js or custom)
  startTime?: number;                   // Custom start time
}
```

## Color Classes

### RGBColor

Low-level RGB color representation.

```typescript
const rgb = new RGBColor(255, 0, 0, 1.0);
rgb.setRGBA(0, 255, 0, 0.5);
```

### HSLColor

Low-level HSL color representation with RGB conversion.

```typescript
const hsl = new HSLColor(120, 50, 50, 1.0);
const rgbConverted = hsl.toRGB();
```

## Usage Examples

### DOM Element Animation

```typescript
import { TweenableColor, TweenableColorTicker } from '@masatomakino/tweenable-color';
import { Easing } from '@tweenjs/tween.js';

TweenableColorTicker.start();

const element = document.getElementById('myElement');
const color = new TweenableColor(100, 150, 200, 1.0);

color.on('onUpdate', (colorInstance) => {
  element.style.backgroundColor = colorInstance.getCSSColor();
  element.style.opacity = colorInstance.getAlpha();
});

// Fade to red over 1.5 seconds
color.change(255, 50, 50, 0.8, 1500, {
  easing: Easing.Exponential.Out
});
```

### Canvas/WebGL Integration

```typescript
const color = new TweenableColor(0, 0, 0, 1.0);

color.on('onUpdate', (colorInstance) => {
  // Get normalized values for WebGL
  const [r, g, b, a] = colorInstance.getAttribute();
  gl.clearColor(r, g, b, a);
  gl.clear(gl.COLOR_BUFFER_BIT);
});

color.change(255, 255, 255, 1.0, 2000);
```

### Sequential Animations

```typescript
const color = new TweenableColor();

color.on('onComplete', () => {
  // Chain next animation
  setTimeout(() => {
    color.change(0, 255, 255, 1.0, 2000, {
      easing: Easing.Bounce.Out
    });
  }, 500);
});

// Start first animation
color.change(255, 0, 0, 1.0, 2000, {
  easing: Easing.Cubic.In
});
```

### Custom Easing Functions

```typescript
// Define custom easing function
function customEase(t: number): number {
  return t * t * (3 - 2 * t); // Smooth step function
}

const color = new TweenableColor(0, 0, 0, 1.0);

// Use custom easing
color.change(255, 100, 50, 1.0, 2000, {
  easing: customEase
});
```

## Performance Notes

- The library uses a single `requestAnimationFrame` loop for all animations
- Multiple color instances share the same ticker for optimal performance
- Remember to call `TweenableColorTicker.start()` before creating animations
- Use `TweenableColorTicker.stop()` to pause all animations when needed

## Requirements

- Node.js (ES2021+ supported environment)
- @tweenjs/tween.js (peer dependency for easing functions)

## License

MIT License
