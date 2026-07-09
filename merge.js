
const {default: PDFMerger} = require('pdf-merger-js');
const fs=require('fs')
var merger = new PDFMerger();

const merge= async (filepaths) => {
  const merger = new PDFMerger();
  for(const path of filepaths){
  await merger.add(path);}
  //merge pages 3 to 5 (3,4,5)

  // Set metadata
//   await merger.setMetadata({
//     producer: "pdf-merger-js based script",
//     author: "John Doe",
//     creator: "John Doe",
//     title: "My live as John Doe"
//   });

  await merger.save('public/merged.pdf'); //save under given name and reset the internal document
  
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
}
module.exports = merge;