const fs = require('fs');

// Array containing all the image paths that need to be decoded
const afroheadPaths = [
  "../../assets/stickers/afrohead/question.png",
  "../../assets/stickers/afrohead/ctrlz.png",
  "../../assets/stickers/afrohead/done.png",
  "../../assets/stickers/afrohead/edithere.png",
  "../../assets/stickers/afrohead/help.png",
  "../../assets/stickers/afrohead/hmm.png",
  "../../assets/stickers/afrohead/idea.png",
  "../../assets/stickers/afrohead/like.png",
  "../../assets/stickers/afrohead/no.png",
  "../../assets/stickers/afrohead/shipit.png",
  "../../assets/stickers/afrohead/pleasefixit.png",
  "../../assets/stickers/afrohead/starthere.png",
  "../../assets/stickers/afrohead/thanks.png",
  "../../assets/stickers/afrohead/thisway.png",
  "../../assets/stickers/afrohead/wow.png",
  "../../assets/stickers/afrohead/yes.png"
];

// Function to decode and save images
function decodeAndSaveImages(imagePaths, folderName) {
  imagePaths.forEach((path, index) => {
    // Read the binary data of the image file
    const imageData = fs.readFileSync(path);

    // Determine the file name
    const fileName = `${folderName}/image_${index}.png`;

    // Save the image data into a new file
    fs.writeFileSync(fileName, imageData);
    console.log(`Saved image ${fileName}`);
  });
}

// Create a new folder to save the decoded images
const decodedImagesFolder = 'decoded_images';
if (!fs.existsSync(decodedImagesFolder)) {
  fs.mkdirSync(decodedImagesFolder);
}

// Decode and save images from the `afroheadPaths` array
decodeAndSaveImages(afroheadPaths, decodedImagesFolder);
