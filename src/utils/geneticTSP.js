import distanceHash from "./distanceHash.js"

// const distanceHash = {
//   alcazar2museumFineArts: 13.614,
//   alcazar2plazaEspana: 6.74,
//   arenal2alcazar: 8.84,
//   arenal2catedralSevilla: 5.251,
//   arenal2macarena: 18.28,
//   arenal2mariaLuisa: 15.389,
//   arenal2museumFineArts: 6.075,
//   arenal2pilatos: 11.564,
//   arenal2plazaEspana: 14.825,
//   arenal2santaCruz: 8.312,
//   arenal2setas: 9.271,
//   catedralSevilla2alcazar: 3.996,
//   catedralSevilla2mariaLuisa: 12.007,
//   catedralSevilla2museumFineArts: 9.618,
//   catedralSevilla2plazaEspana: 10.632,
//   catedralSevilla2setas: 7.61,
//   centro2alcazar: 7.571,
//   centro2arenal: 4.163,
//   centro2catedralSevilla: 3.665,
//   centro2macarena: 14.638,
//   centro2mariaLuisa: 15.652,
//   centro2museumFineArts: 6.221,
//   centro2pilatos: 7.709,
//   centro2plazaEspana: 14.275,
//   centro2santaCruz: 6.601,
//   centro2setas: 5.25,
//   macarena2alcazar: 19.517,
//   macarena2catedralSevilla: 17.171,
//   macarena2mariaLuisa: 27.885,
//   macarena2museumFineArts: 14.768,
//   macarena2pilatos: 12.707,
//   macarena2plazaEspana: 25.454,
//   macarena2setas: 9.585,
//   mariaLuisa2alcazar: 8.532,
//   mariaLuisa2museumFineArts: 21.144,
//   mariaLuisa2plazaEspana: 3.093,
//   museumFineArts2plazaEspana: 20.169,
//   pilatos2alcazar: 7.569,
//   pilatos2catedralSevilla: 7.225,
//   pilatos2mariaLuisa: 15.4,
//   pilatos2museumFineArts: 13.063,
//   pilatos2plazaEspana: 12.804,
//   pilatos2setas: 5.687,
//   santaCruz2alcazar: 1.176,
//   santaCruz2catedralSevilla: 3.19,
//   santaCruz2macarena: 18.356,
//   santaCruz2mariaLuisa: 9.705,
//   santaCruz2museumFineArts: 12.738,
//   santaCruz2pilatos: 6.569,
//   santaCruz2plazaEspana: 7.831,
//   santaCruz2setas: 9.218,
//   setas2alcazar: 10.392,
//   setas2mariaLuisa: 18.922,
//   setas2museumFineArts: 8.251,
//   setas2plazaEspana: 16.864,
// }

// const samplePoints = [
//   "santaCruz",
//   "pilatos",
//   "catedralSevilla",
//   "setas",
//   "plazaEspana",
//   "museumFineArts",
//   "mariaLuisa",
//   "alcazar"
// ]

class Configuration {
  constructor(points, order) {
    this.points = points
    this.order = order
    this.distance = 0;
    this.fitness = this.calculateFitness()
  }

  calculateFitness() {
    let totalDistance = 0

    // Closed Loop Variety
    for (let i = 0; i < this.order.length; i++) {
      const from = this.points[this.order[i]]
      const to = (i + 1 >= this.order.length) ? this.points[this.order[0]] : this.points[this.order[i + 1]]

      const distance =
        distanceHash[from + "2" + to] || distanceHash[to + "2" + from]
      totalDistance += distance
    }

    this.distance = totalDistance.toFixed(2);

    return (1 / totalDistance) * 100
  }
}

const shuffle = array => {
  // Randomly shuffles an array using the Fisher-Yates implementation
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/31054543#31054543
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const swap = (array, indexOne, indexTwo) => {
  const temporary = array[indexOne]
  array[indexOne] = array[indexTwo]
  array[indexTwo] = temporary
}

const pickOne = array => {
  // Takes in an array of Configuration objects
  // Returns a Configuration object from a list based on probability

  const randomNumber = Math.random() * 100
  let cumulativeProbability = 0

  for (let i = 0; i < array.length; i++) {
    cumulativeProbability += array[i].fitness

    if (randomNumber <= cumulativeProbability) {
      return array[i]
    }
  }
}

const crossOver = (points, configurationOne, configurationTwo) => {
  const orderOne = configurationOne.order
  const orderTwo = configurationTwo.order

  const indexOne = Math.floor(Math.random() * orderOne.length)
  const indexTwo = Math.floor(Math.random() * orderOne.length)
  let newOrder; 
  
  if (indexOne > indexTwo) {
    newOrder = orderOne.slice(indexTwo, indexOne + 1)
  } else {
    newOrder = orderOne.slice(indexOne, indexTwo + 1)
  }

  for (let i = 0; i < orderTwo.length; i++) {
    if (!newOrder.includes(orderTwo[i])) {
      newOrder.push(orderTwo[i])
    }
  }

  return new Configuration(points, newOrder)
}

const mutate = (configuration, mutationRate) => {
  // Takes in an order array from a Configuration object
  // Randomly swaps two values in the array
  // Mutation rate is used for simulated annealing
  const order = configuration.order
  for (let i = 0; i < order.length; i++) {
    if (Math.random() * 100 < mutationRate) {
      const randomIndex = Math.floor(Math.random() * order.length)
      const nextIndex = randomIndex + 1 >= order.length ? 0 : randomIndex + 1
      swap(order, randomIndex, nextIndex)
    }
  }
}

const normalizeFitness = array => {
  // Takes in an array of Configuration objects and normalizes their fitness
  let totalFitness = 0

  for (let i = 0; i < array.length; i++) {
    totalFitness += array[i].fitness
  }

  for (let i = 0; i < array.length; i++) {
    array[i].fitness = +((array[i].fitness / totalFitness) * 100).toFixed(4)
  }
}


const geneticTSP = points => {
  const numberOfGenerations = 1000
  const sizeOfPopulation = 500
  const generations = []
  const order = []
  const mutationRateMin = 0.125
  const coolingFactor = 0.6

  let currentGeneration = 0
  let mutationRate = 100
  let bestConfig
  let bestFitness = -Infinity

  // Creating the original orders array
  for (let i = 0; i < points.length; i++) order[i] = i

  // Shuffling the order array and creating a Configuration object with unnormalized fitness scores
  for (let i = 0; i < sizeOfPopulation; i++) {
    const shuffledOrder = shuffle(order.slice())
    generations.push(new Configuration(points, shuffledOrder))
  }

  normalizeFitness(generations)

  while (currentGeneration < numberOfGenerations) {
    // console.log(mutationRate < mutationRateMin ? `<${mutationRateMin}` : mutationRate)
    // Populate a new generations based on the probabilites of the previous generations,
    // mutating them and crossing them over before assigning to a new generations
    for (let i = 0; i < generations.length; i++) {
      const randomConfigurationOne = pickOne(generations)
      const randomConfigurationTwo = pickOne(generations)

      const randomConfiguration = crossOver(
        points,
        randomConfigurationOne,
        randomConfigurationTwo
      )
      mutate(randomConfiguration, mutationRate <= mutationRateMin ? mutationRateMin : mutationRate)
      generations[i] = randomConfiguration
    }

    normalizeFitness(generations)

    for (let i = 0; i < generations.length; i++) {
      if (bestFitness < generations[i].fitness) {
        bestFitness = generations[i].fitness
        bestConfig = generations[i]
      }
    }
    currentGeneration++
    mutationRate = 100 * (coolingFactor ** currentGeneration)
  }

  console.log("genetic algorithm ran")
  return bestConfig
}

export { shuffle, geneticTSP }
