  let raiderPosistions = {
      row1: {
          topPosition: 50,
          numberOfRaiders: 0
      },
      row2: {
          topPosition: 160,
          numberOfRaiders: 0
      },
      row3: {
          topPosition: 270,
          numberOfRaiders: 0
      },
      row4: {
          topPosition: 380,
          numberOfRaiders: 0
      },
      row5: {
          topPosition: 490,
          numberOfRaiders: 0
      },
      row6: {
          topPosition: 600,
          numberOfRaiders: 0
      }
  };

let maxRowsPerLevel = {
    1: 3,
    2: 3,
    3: 4,
    4: 4,
    5: 4,
    6: 5,
    7: 5,
    8: 5,
};

function generateRaiders() {
  let maxRows = 0;
  let startRowArray = [];
  if (levelCount < 9) {
      maxRows = maxRowsPerLevel[levelCount];
  } else {
      maxRows = 6;
  }
  
};