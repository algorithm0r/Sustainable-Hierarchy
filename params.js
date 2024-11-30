var PARAMS = {
    // sim
    updatesPerDraw: 20,

    // automata
    pixelDimension: 800,
    numRows: 8,
    numCols: 8,

    // population
    numOrganisms: 100,
    initialVariation: 1,
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
    minFish: 100,
    pondCapacity: 6000,
    initialFish: 1000,
    fishGrowth: .0003,
    fishEnergy: 5,

    // humans
    initialHumans: 10,
    initialEnergy: 60,
    deathThreshold: 0,
    reproductionThreshold: 80,
    eatThreshold: 90,
    ratioEnergyToOffspring: .4,
    basicEnergyDepletion: .01,


    // data gathering
    histogramWidth: 5,
    reportingPeriod: 100,
    epoch: 150000,

    // database
    db: "domesticationDB",
    collection: "test"
};

