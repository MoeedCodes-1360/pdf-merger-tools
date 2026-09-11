# PDF Merger Changes

## Server-side file validation

The upload handling in `server.js` uses these libraries and APIs:

- **Express** handles the web server, routes, and responses.
- **Multer** handles `multipart/form-data` uploads and limits the upload to 12 files with `upload.array('pdfFiles', 12)`.
- **Node.js `fs`** checks the first five bytes of every uploaded file. A valid PDF starts with the `%PDF-` signature, so files that do not have that signature are rejected even if they have a `.pdf` filename.
- **Node.js `path`** builds the file paths passed to the PDF merger.
- The existing `merge.js` module performs the actual PDF merging.

Rejected files are deleted from `uploads/`. If the user selects more than 12 files, Multer reports the limit error and the server sends the user back to the main page with a message asking them to remove some files.

## User interface

`templates/index.html` now provides a responsive upload panel with:

- A clear PDF selection area.
- A live count of selected files.
- A button to remove the selected files before submitting.
- A visible error alert for invalid PDFs and upload-limit errors.
- Responsive styling using the existing Bootstrap dependency plus local CSS.

The browser's `accept` attribute improves file selection, but the server-side signature check remains the real validation because browser filters can be bypassed.

## Beginner-friendly summary

I added three main things:

1. **A real PDF check:** The server reads only the first five bytes of each uploaded file and checks for `%PDF-`. This is the standard beginning of a PDF file. Reading five bytes is enough because we only need to identify the file type; there is no reason to load the whole file just for this check.
2. **A 12-file limit message:** Multer already limits the upload to 12 files. I added an error handler so that when the user selects more than 12, they are sent back to the page and told to remove some files.
3. **A better interface:** The page now shows how many files are selected, has a button to clear the selection, and displays validation errors in the page.

### Why not only check the filename?

Your idea, `file.originalname.slice(-3).toLowerCase() === 'pdf'`, checks whether the filename ends in `pdf`. That is useful as a quick filename check, but it does not prove that the file is actually a PDF. Someone could rename a text file or image to `document.pdf`, and that check would allow it.

The five-byte check looks inside the file instead. A file named `photo.pdf` that does not start with `%PDF-` is rejected. The browser's `accept` setting and a filename check can still help users choose files, but the server-side content check is the important security check because users can bypass browser rules.

The `fs` and `path` modules used here are built into Node.js, so no extra package was needed for the five-byte check. Multer remains responsible for receiving the uploaded files and enforcing the maximum of 12 files.

### What does `fs.promises` mean?

`fs` is Node.js's built-in file-system module. It can open, read, and delete files. The `promises` property gives us versions of those operations that return **Promises**.

A Promise represents work that will finish later. Reading an uploaded file takes time, so the program should wait for that work instead of pretending the result is available immediately. That is why the code uses `await fs.promises.open(...)`, `await handle.read(...)`, and `await handle.close()`.

The `async` keyword makes a function able to use `await`. In this project, `isPdf` is asynchronous because it reads the uploaded file, and `Promise.all(...)` waits until every selected file has been checked. `fs.promises.unlink(...)` deletes rejected uploads without blocking the rest of the server.
