'use strict';

const boundingBoxes = {
  '0':
    [ -32.99047851563364,
      -47.08120743260383,
      67.90795898435852,
      41.72638107989897 ],
  '1':
    [ -128.9670410156471,
      -57.359018263521115,
      -5.217041015634948,
      67.04395625933893 ],
  '2':
    [ 41.79077148435678,
      -52.73284329018176,
      200.69702148436096,
      61.91060766937113 ],
  '3':
    [ -27.66226811933268,
      16.635693975568614,
      49.79104043156599,
      63.5750514523651 ],
  '4':
    [ -29.826416015646174,
      10.082644243860557,
      72.20141321303817,
      52.44608914954304 ]
};

export function getRegionBoundingBox (regionId) {
  return boundingBoxes[regionId.toString()] || [0, 0, 0, 0];
}

export default boundingBoxes;
