class DataManager {
    constructor(automata) {
        this.automata = automata;

        // population data
        this.fishPopulation = [];

        // Initialize the Histogram instance for visualization
        gameEngine.addGraph(new Graph(800, 0, [this.fishPopulation], "Fish"));
    }


    updateData() {
        let fishPop = 0;

        for (let pond of this.automata.ponds) {
            let numFish = pond.numFish;
            fishPop += numFish
        }

        // Append the new histogram to the geneticHistogramData for time-series tracking
        this.fishPopulation.push(fishPop);
    }

    logData() {
    }

    update() {
        // Update data each frame
        if(this.automata.generation % PARAMS.reportingPeriod === 0) this.updateData();
    }

    draw(ctx) {
        // Draw the histogram, handled by the Histogram class in the game engine
    }
}
