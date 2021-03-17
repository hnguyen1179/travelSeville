# Travel Seville
[Live link](https://travel-seville.netlify.app/)</br></br>
![Travel Seville landing page](https://user-images.githubusercontent.com/19617238/106968359-7e7fdd00-66fd-11eb-8d98-acf55ca00b3e.gif)

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Highlights](#highlights)
4. [Future Direction](#future-direction)

## Introduction

As a result of the COVID-19 travel restrictions, my trip to **Seville, Spain** was put on indefinite hold. And so, I thought why not make something positive out of a negative experience and learn some new technologies/refine my understanding of my current ones?
</br>
</br>
Travel Seville was the result of this delayed trip! In this project, I help users plan out a day trip in **Seville, Spain**. Included in this project is a brief introduction to Seville's history, followed by the user selecting from a series of iconic destinations that may interest them, finally I help plot an efficient course through these waypoints selected by the user.

## Technologies

**Frontend** <br/> 
Travel Seville is entirely built on the front end using Gatsby, which is based on React. The very little state management was done via Session Storage.


## Highlights
* **Smooth Animations** - animations were all done with either CSS transitions and keyframes ... 

![introduction](https://user-images.githubusercontent.com/19617238/106970555-fc45e780-6701-11eb-807b-3e20a2d1489c.gif)
</br>
</br>
... or with the help of the GSAP library for the SVG animations.
</br>
</br>
![explore](https://user-images.githubusercontent.com/19617238/106970542-f2bc7f80-6701-11eb-9931-2415d58de4dd.gif)
</br>

* **Google Maps API** - Helps users visually see their day trip and allows them to interact with the markers in order to quickly scroll to their destination.
<img width="1392" alt="GoogleMapsAPI" src="https://user-images.githubusercontent.com/19617238/106971043-f43a7780-6702-11eb-9763-bfbac4909a17.png">

</br>
</br>

![daytrip](https://user-images.githubusercontent.com/19617238/106971518-f2bd7f00-6703-11eb-8604-4bf022facbab.gif)


* **Pathfinding Algorithm** - finding the most efficient path across the selected waypoints was done using a genetic algorithm. Included in this genetic algorithm was the use of *simulated annealing* in order to help boost the probablity of finding the most efficient path 

  ``` javascript
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
    // mutating them and crossing them over before assigning to a new generation
    while (currentGeneration < numberOfGenerations) {
      for (let i = 0; i < generations.length; i++) {
        const randomConfigurationOne = pickOne(generations)
        const randomConfigurationTwo = pickOne(generations)

        const randomConfiguration = crossOver(
          points,
          randomConfigurationOne,
          randomConfigurationTwo
        )
        
        const nextMutationRate = mutationRate <= mutationRateMin 
          ? mutationRateMin 
          : mutationRate 
          
        generations[i] = mutate(randomConfiguration, nextMutationRate);
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
  ```

## Future Direction
* Possible mobile integration
