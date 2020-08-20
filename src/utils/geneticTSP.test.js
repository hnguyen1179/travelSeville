import { shuffle, geneticTSP } from "./geneticTSP"

const samplePoints = [
  "santaCruz",
  "pilatos",
  "catedralSevilla",
  "plazaEspana",
  "museumFineArts",
  "mariaLuisa",
]

const generations = geneticTSP(samplePoints)

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test("Shuffle [1, 2, 3, 4] to some random array", () => {
  const originalArray = [1, 2, 3, 4]
  const shuffledArray = shuffle([1, 2, 3, 4])
  expect(shuffledArray).not.toBe(originalArray)
})

test("geneticTSP should return an array of 100 Point objects", () => {
  expect(generations.length).toBe(100)
})

test("Fitness scores should be normalized to roughly equal 100", () => {
  let totalFitness = 0;

  for (let i = 0; i < generations.length; i++) {
    totalFitness += generations[i].fitness
  }

  expect(totalFitness).toBeWithinRange(99.999, 100.001)
})