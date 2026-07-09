# PDF Merger

A simple Node.js web app for uploading and merging multiple PDF files into a single merged PDF.

## Features

- Upload multiple PDF files from the browser
- Merge uploaded PDFs using `pdf-merger-js`
- Serve a merged PDF file at `http://localhost:3000/merged.pdf`
- Simple Bootstrap-based front-end UI

## Project Structure

- `server.js` - Express server and file upload route
- `merge.js` - PDF merging utility module
- `public/` - Static files served by Express, including the merged output (`merged.pdf`)
- `templates/index.html` - Front-end form for uploading PDF files
- `uploads/` - Temporary storage for uploaded PDF files
- `package.json` - Project metadata and dependencies

## Requirements

- Node.js 18+ (or compatible)
- npm

## Installation

1. Clone or download the project.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

## Usage

1. Start the server:

```bash
npm start
```

2. Open your browser and visit:

```text
http://localhost:3000/
```

3. Select the PDF files you want to merge and submit the form.
4. The merged file will be available at:

```text
http://localhost:3000/merged.pdf
```

## Notes

- Uploaded files are stored in the `uploads/` directory.
- The merged PDF is saved to `public/merged.pdf`.
- This project is intended for local use and demonstration purposes.

## Dependencies

- `express` - Fast, unopinionated web framework for Node.js
- `multer` - Middleware for handling `multipart/form-data`, especially file uploads
- `pdf-merger-js` - PDF merge utility

## License

This project is provided as-is under the ISC license.
