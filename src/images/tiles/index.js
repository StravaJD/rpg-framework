import dune from './dune.png';
import duneMountain from './duneMountain.png';
import duneOasis from './duneOasis.png';
import duneTown from './duneTown.png';

const tileImages = {
  dune,
  duneMountain,
  duneOasis,
  duneTown
};

export const tileImageElements = Object.keys(tileImages)
  .map(imageName => {
    let imageElement = new Image();
    imageElement.src = tileImages[imageName];
    return {imageElement, imageName}
  })
  .reduce((acc, image) => {
    acc[image.imageName] = image.imageElement;
    return acc;
  }, {});
  
  export default tileImages;