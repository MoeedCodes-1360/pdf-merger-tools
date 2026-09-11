
const {default: PDFMerger} = require('pdf-merger-js');
const fs=require('fs')
var merger = new PDFMerger();

const merge= async (filepaths) => {
  const merger = new PDFMerger();
  for(const path of filepaths){
  await merger.add(path);}
  //merge pages 3 to 5 (3,4,5)

 
  await merger.save('public/merged.pdf'); //save under given name and reset the internal document
  
 
}
module.exports = merge;