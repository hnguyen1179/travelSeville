import distanceHash from "./distanceHash.js"

const samplePoints = [
  "santaCruz",
  "pilatos",
  "catedralSevilla",
  "plazaEspana",
  "museumFineArts",
  "mariaLuisa",
]

class Configuration {
  constructor(points, order) {
    this.points = points
    this.order = order
    this.distance
    this.fitness = this.calculateFitness()
  }

  calculateFitness() {
    let totalDistance = 0

    for (let i = 0; i < this.order.length - 1; i++) {
      const from = this.points[this.order[i]]
      const to = this.points[this.order[i + 1]]
      // i + 1 === this.order.length
      //   ? this.points[this.order[0]]
      //   : this.points[this.order[i + 1]]

      const distance =
        distanceHash[from + "2" + to] || distanceHash[to + "2" + from]
      totalDistance += distance
    }

    this.distance = totalDistance

    return (1 / totalDistance) * 1000
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

  const start = Math.floor(Math.random() * (orderOne.length - 1))
  const end = Math.ceil(Math.random() * (orderOne.length - start - 1)) + start

  const newOrder = orderOne.slice(start, end)

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
      let indexOne = Math.floor(Math.random() * order.length)
      let indexTwo = Math.floor(Math.random() * order.length)
      swap(order, indexOne, indexTwo)
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

const numberOfGenerations = 2000
const sizeOfPopulation = 500
let mutationRate = 10
const coolingRate = 0

const geneticTSP = points => {
  const generations = []
  const order = []
  let totalFitness = 0
  let currentGeneration = 0
  let bestConfig
  let bestFitness = -Infinity

  // Creating the original orders array
  for (let i = 0; i < points.length; i++) order[i] = i

  // Shuffling the order array and creating a Configuration object with unnormalized fitness scores
  for (let i = 0; i < sizeOfPopulation; i++) {
    const shuffledOrder = shuffle(order.slice())
    generations.push(new Configuration(points, shuffledOrder))
    totalFitness += generations[i].fitness
  }

  normalizeFitness(generations)

  while (currentGeneration < numberOfGenerations) {
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
      mutate(randomConfiguration, mutationRate <= 2 ? 2 : mutationRate)
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
    mutationRate -= coolingRate
  }

  console.log(bestConfig)
  return generations
}

const sample = geneticTSP(samplePoints)

export { shuffle, geneticTSP }
