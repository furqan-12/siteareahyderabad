# S.I.T.E Association Website

## Why Your Website Wasn't Running in Chrome

The main issues that prevented your website from running properly were:

### 1. **Directory Name Inconsistency**
- Your HTML files were referencing both `assets/` and `assests/` directories
- This caused broken image links and missing resources

### 2. **Missing Image Files**
- Several image files referenced in the HTML were missing from the `assests/` directory
- Files like `logo.png`, `ssss-logo.png`, `person1.jpg`, `person2.jpg`, `person3.jpg`, `person4.jpg`, `event1.jpg`, `event2.jpg`, `event3.jpg`

### 3. **Broken Image Links**
- When images fail to load, it can cause layout issues and poor user experience

## How to Fix and Run Your Website

### Step 1: Generate Missing Images
1. Open `create_placeholders.html` in your browser
2. Click the download buttons to generate placeholder images
3. Save all downloaded images to your `assests/` folder

### Step 2: Test Your Website
1. Open `test.html` in your browser
2. Click "Run All Tests" to check if everything is working
3. Fix any issues that the test identifies

### Step 3: Run Your Website
1. **Method 1 (Simple):** Double-click `index.html` to open it directly in Chrome
2. **Method 2 (Recommended):** Use a local server:
   - Install a simple HTTP server like Python's built-in server
   - Open command prompt/terminal in your project folder
   - Run: `python -m http.server 8000` (if you have Python)
   - Or run: `npx http-server` (if you have Node.js)
   - Open `http://localhost:8000` in Chrome

### Step 4: Verify Everything Works
- Check that all images load properly
- Test the slider functionality
- Verify that all links work
- Test on different screen sizes

## Files Fixed

✅ **Fixed Issues:**
- Corrected all image paths to use `assests/` directory consistently
- Added error handling for broken images
- Created placeholder image generator
- Created website compatibility test

## Browser Compatibility

Your website should now work in:
- ✅ Google Chrome
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari

## Troubleshooting

If you still have issues:

1. **Check Console Errors:**
   - Press F12 in Chrome to open Developer Tools
   - Look at the Console tab for error messages

2. **Check Network Tab:**
   - In Developer Tools, go to Network tab
   - Refresh the page and look for failed requests (red entries)

3. **Common Issues:**
   - **CORS Errors:** Use a local server instead of opening files directly
   - **Missing Images:** Generate placeholder images using the provided tool
   - **CSS Not Loading:** Check that `style.css` is in the same folder as `index.html`

## File Structure

```
your-project/
├── index.html          # Main website
├── style.css           # Styles
├── test.html           # Website test tool
├── create_placeholders.html  # Image generator
├── assests/            # Images folder
│   ├── logo.png
│   ├── ssss-logo.png
│   ├── person1.jpg
│   ├── person2.jpg
│   ├── person3.jpg
│   ├── person4.jpg
│   ├── event1.jpg
│   ├── event2.jpg
│   ├── event3.jpg
│   └── ... (other images)
└── README.md           # This file
```

## Support

If you continue to have issues, check:
1. All files are in the correct locations
2. Image files are properly named and in the `assests/` folder
3. You're using a modern browser (Chrome, Firefox, Edge, Safari)
4. Try using a local server instead of opening files directly 