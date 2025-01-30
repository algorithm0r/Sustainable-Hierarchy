var PARAMS = {
    // sim
    updatesPerDraw: 1,

    // automata
    pixelDimension: 800,
    numRows: 8,
    numCols: 8,

    // population
    numOrganisms: 100,
    initialVariation: .17,
    maxOffspring: 5,
    targetValue: 0,
    targetVariance: 5,
    reproductionVariance: 2,
    populationSoftCap: 100, // make softer slope bro

    // organism
    numLocii: 100,
    mutationRate: 0.5,
    mutationRange: 0.035,
    targetObservationalNoise: 0.1,
    adaptiveStepSize: 0.5,
    deathChancePerGeneration: 0.2,
    offspringMigrationChance: 0.0001, // offspring migration
    adultMigrationChance: 0.0001,

    // pond
    minFish: 10,
    pondCapacity: 600,
    initialFish: 300,
    fishGrowth: .05,
    fishEnergy: 36,
    fishingDifficulty: 1,
    fullPondThreshold: .5,


    // humans
    initialHumans: 20,
    initialEnergy: 50,
    deathThreshold: 0,
    maxEnergy: 100,
    reproductionThreshold: 85,
    energyEatThreshold: 90,
    supplyEatThreshold: 1,
    ratioEnergyToOffspring: .4,
    basicEnergyDepletion: .01,
    hungerThreshold: 20,
    metabolismDiminishingReturns: 20,
    epsilonDecay: 0.9998,
    generationalEpsDecay: .993,
    preventHumanExtinction: false,
    minHumans: 2,
    sexualDriveMultiplier: 60,
    maxHumanAge: 1000,
    deathReward: 0,
    qGeneMutationStd: .02,
    broadcastLearning: false,
    localBroadcastLearning: true,
    localitySize: 15,

    // locality
    numFirstNeighbors: 1,
    numSecondNeighbors: 1,
    graphBroadcastDepth: 1,

    nullCost: 1,
    fishingCost: 20,
    eatingCost: 20,
    reproductionCost: 20,


    qLearningRate: 0.05,
    qLearningDiscount: 0.999,
    defaultQValue: 0,


    // data gathering
    histogramWidth: 5,
    reportingPeriod: 50,
    epoch: 150000,

    // database
    db: "domesticationDB",
    collection: "test"
};

