import distanceHash from "./distanceHash.js"

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

// Randomly shuffles an array using the Fisher-Yates implementation
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/31054543#31054543
const shuffle = array => {
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

// Takes in an array of Configuration objects
// Returns a Configuration object from a list based on probability
const pickOne = array => {
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

// Takes in an order array from a Configuration object
// Randomly swaps two values in the array
// Mutation rate is used for simulated annealing
const mutate = (configuration, mutationRate) => {
  const order = configuration.order
  for (let i = 0; i < order.length; i++) {
    if (Math.random() * 100 < mutationRate) {
      const randomIndex = Math.floor(Math.random() * order.length)
      const nextIndex = randomIndex + 1 >= order.length ? 0 : randomIndex + 1
      swap(order, randomIndex, nextIndex)
    }
  }
}

// Takes in an array of Configuration objects and normalizes their fitness
const normalizeFitness = array => {
  let totalFitness = 0

  for (let i = 0; i < array.length; i++) {
    totalFitness += array[i].fitness
  }

  for (let i = 0; i < array.length; i++) {
    array[i].fitness = +((array[i].fitness / totalFitness) * 100).toFixed(4)
  }
}

// Genetic Traveling Salesman Problem
const geneticTSP = points => {
  const numberOfGenerations = 1000
  const sizeOfPopulation = 500
  const generations = []
  const order = []
  const mutationRateMin = 0.125
  const coolingFactor = 0.5

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

  // Normalizing the fitness scores of each generation
  normalizeFitness(generations)

  // Populate new generations based on the fitness probabilites of the previous generations,
  // mutating them and crossing them over before assigning to a new generations
  while (currentGeneration < numberOfGenerations) {
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

  return bestConfig
}

export { shuffle, geneticTSP }
