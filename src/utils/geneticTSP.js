const shuffle = array => {
  // Randomly shuffles an array using the Fisher-Yates implementation
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/31054543#31054543
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const geneticTSP = points => {

}

const functions = {
  shuffle,
  geneticTSP,
}

export default functions
