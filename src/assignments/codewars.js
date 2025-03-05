  // Start your coding here...
  /**
    there's 4 by 4 grid -> 16 spaces
    in each space there will be a 1 - 4 number
    no duplicate of 1 - 4 on same row or column
    so how many you can see will be given for a clue from outside
    higher skyscraper block shorters ones behind
    
    1 [4, 2, 1, 3] 2 clue
       4
      [1, x, x, x]
      [2, x, x, x]
      [3, x, x, x]
      [4, x, x, x]
       1
  */
 
//   const possibilities = {
//     1: [[4, 3, 2, 1], [4, 2, 1, 3], [4, 1, 3, 2], [4, 3, 1, 2]],
//     2: [[1, 4, 3, 2], [1, 4, 2, 3], ]
//   }

function solvePuzzle (clues, grid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]) {
  
  let keepGoing;

  for(let i = 0; i < grid.length; i++) {
    for(let y = 0; y < grid[i].length; y++) {
      if(!grid[i][y]) {
        keepGoing = true;
        break;
      }
    }

    if(keepGoing) 
        break;
  }
  
  if(!keepGoing) {
    return grid; 
  }

  // filling in rows with one null, don't have to figure out all the elements if we already have 3 of them
  const possibleHeights = [1, 2, 3, 4];
  grid.forEach((rowArray) => {
    let nullCounter = rowArray.filter((element) => element === null).length;
    if(nullCounter === 1) {
        const nullIndex = rowArray.indexOf(null);

        // Find missing number by filtering out elements that exist in rowArray
        const existingNumbers = rowArray.filter(num => num !== null);
        const missingNumber = possibleHeights.find(num => !existingNumbers.includes(num));

        // Replace the null with the missing number
        if (missingNumber !== undefined) {
            rowArray[nullIndex] = missingNumber;
        }
    }
  });

  // sort the arrays by pairs 
  const topBotArr = []; 
  const rightLeftArr = [];
  
  for(let i = 0; i < clues.length; i++) {
    let tempArr = clues[i];

    if(i % 2 == 0) { // array 0, 2
        if(topBotArr.length > 0) {
            topBotArr.push(tempArr.reverse());
        } else {
            topBotArr.push(tempArr)
        }
    } else {
        if(rightLeftArr > 0) { // array 1, 3
            rightLeftArr.push(tempArr.reverse());
        } else {
            rightLeftArr.push(tempArr)
        }
    }
  }

  // counter clockwise
  const counterClockwise = [3, 2, 1, 0];
  const oppositePosition = [11, 9, 7, 5];
  // clockwise
  const clockWise = [0, 1, 2, 3];
  
  for(let i = 0; i < clues.length; i++) {
    const clue = clues[i];

    // top looking down
    if(i < 4) {
      console.log('top looking down clues', clues[i], i);
      if(clue === 1) {
        grid[0][i] = 4;

        if(clue[oppositePosition[i] + i] === 2) {
            grid[grid.length - 1][i] = 3;
        }

        if(clue[oppositePosition[i] + i] === 4) {
            grid[grid.length - 1][i] = 1;
        }
      }

      if(clue === 2) {

      }

      if(clue === 3) {

      }

      if(clue === 4) {

      }
    } 
    
    // right side looking left
    if (i >= 4 && i < 8) {
      console.log('right side looking left clues', clues[i], i);
      if(clue === 1) {
        // grid[i - 4][grid[i - 4].length - 1] = 4;
        // we know it'll always be the last column of the array 
        grid[i - 4][3] = 4;

        if(clue[oppositePosition[i] + i] === 2) {
            grid[i - grid.length][0] = 3;
        }

        if(clue[oppositePosition[i] + i] === 4) {
            grid[i - grid.length][0] = 1;
        }
      }
    }
    
    // bottom looking up 11, 10, 9, 8
    // we know this'll always be the last row of the arrays 3
    if (i >= 8 && i < 12) {
      console.log('bottom looking up clues', clues[i], i);
      if(clue === 1) {
        // grid[grid.length - 1 ][counterClockwise[i - 8]] = 4;
        grid[3][counterClockwise[i - 8]] = 4;

        if(clue[oppositePosition[i] - i] === 2) {
            grid[0][i - 8] = 3;
        }

        if(clue[oppositePosition[i] - i] === 4) {
            grid[0][i - 8] = 1;
        }
      }
    }
    
    // left looking right
    if (i >= 12 && i < 16) {
      console.log("left looking right clues", clues[i], i);
      if(clue === 1) {
        grid[counterClockwise[i - 12]][0] = 4;

        if(clue[oppositePosition[i] - i] === 2) {
            grid[0][i - 12] = 3;
        }

        if(clue[oppositePosition[i] - i] === 4) {
            grid[0][i - 12] = 1;
        }
      }
    }
  }
  
  console.log('grid =', grid);
  
  
//   return solvePuzzle(clues, grid)
  return [];      
}