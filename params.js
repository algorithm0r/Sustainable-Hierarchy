var PARAMS = {
    // sim
    updatesPerDraw: 100,

    // automata
    pixelDimension: 800,
    numRows: 8,
    numCols: 8,

    // population
    numOrganisms: 100,
    initialVariation: .3,
    maxOffspring: 5,
    targetValue: 0,
    targetVariance: 5,
    reproductionVariance: 2,
    populationSoftCap: 100, // make softer slope bro

    // organism
    numLocii: 100,
    mutationRate: 0.05,
    mutationRange: 0.025,
    targetObservationalNoise: 0.1,
    adaptiveStepSize: 0.5,
    deathChancePerGeneration: 0.2,
    offspringMigrationChance: 0.0001, // offspring migration
    adultMigrationChance: 0.0001,

    // pond
    minFish: 40,
    pondCapacity: 2000,
    initialFish: 100,
    fishGrowth: .001,
    fishEnergy: 6,
    fishingDifficulty: 20,
    fullPondThreshold: .5,


    // humans
    initialHumans: 10,
    initialEnergy: 50,
    deathThreshold: 0,
    maxEnergy: 100,
    reproductionThreshold: 90,
    energyEatThreshold: 90,
    supplyEatThreshold: 2,
    ratioEnergyToOffspring: .5,
    basicEnergyDepletion: .01,
    hungerThreshold: 50,
    broadcastLearning: false,
    metabolismDiminishingReturns: 20,
    epsilonDecay: 0.9999,
    preventHumanExtinction: false,
    sexualDriveMultiplier: 60,


    qLearningRate: 0.5,
    qLearningDiscount: 0.2,
    defaultQValue: 0,


    // data gathering
    histogramWidth: 5,
    reportingPeriod: 100,
    epoch: 150000,

    // database
    db: "domesticationDB",
    collection: "test"
};

