# Arc-it Development Setup Guide

## Live Development with Hot Reload

### Option 1: Simple Watch Mode (Recommended)
```bash
# In Arc-it directory
npm run dev:live

# This will:
# - Watch src/ directory for changes
# - Automatically rebuild when files change
# - Show build status in real-time
```

### Option 2: Fast Development Mode
```bash
# In Arc-it directory
npm run dev:fast

# This will:
# - Skip TypeScript declarations for faster builds
# - Skip minification for faster builds
# - Watch for changes and rebuild automatically
```

### Option 3: Standard Watch Mode
```bash
# In Arc-it directory
npm run dev

# Standard watch mode with full features
```

## How to Use for Live Updates

1. **Start Arc-it in watch mode:**
   ```bash
   cd Arc-it
   npm run dev:live
   ```

2. **Keep this terminal running** - it will watch for changes

3. **In another terminal, run your Lure-TechSolutions app:**
   ```bash
   cd Lure-TechSolutions/frontend
   npm run dev
   ```

4. **Make changes to DynamicSwitcher.tsx** in the Arc-it/src/ directory

5. **Arc-it will automatically rebuild** and your Lure-TechSolutions app will get the updates

## Workflow

1. **Edit** → `Arc-it/src/components/DynamicSwitcher.tsx`
2. **Save** → Arc-it automatically rebuilds
3. **Refresh** → Your Lure-TechSolutions app gets the new version
4. **Repeat** → No need to manually rebuild!

## Tips for Faster Development

- Use `npm run dev:fast` for the fastest rebuilds
- Keep both terminals open (Arc-it watch + Lure-TechSolutions dev)
- Make small changes and test frequently
- The watch mode will show you build status in real-time

## Troubleshooting

If changes aren't reflecting:
1. Check that Arc-it watch mode is running
2. Refresh your Lure-TechSolutions app
3. Check the terminal for build errors
4. Restart the watch mode if needed

## Example: Live UI Updates

1. Start Arc-it watch: `npm run dev:live`
2. Start Lure-TechSolutions: `npm run dev`
3. Edit button colors in DynamicSwitcher.tsx
4. Save the file
5. Arc-it rebuilds automatically
6. Refresh your app to see changes!

This setup gives you **live development** without rebuilding manually each time!
