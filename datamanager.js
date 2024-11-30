class DataManager {
    constructor(automata) {
        this.automata = automata;

        // population data
        this.fishPopulation = [];
        this.humanPopulation = [];
        this.humanSupply = [];
        this.humanEnergy = [];
        this.humanAveEnergy = [];

        // Initialize the Histogram instance for visualization
        let graphX = 50;
        gameEngine.addGraph(new Graph(graphX, 0, [this.fishPopulation], "Fish"));
        gameEngine.addGraph(new Graph(graphX, 150, [this.humanPopulation], "Humans"));
        gameEngine.addGraph(new Graph(graphX, 300, [this.humanSupply], "Human Supply"));
        gameEngine.addGraph(new Graph(graphX, 450, [this.humanEnergy], "Human Energy"));
        gameEngine.addGraph(new Graph(graphX, 600, [this.humanAveEnergy], "Average Human Energy"));
    }


    updateData() {
        this.fishPopulation.push(this.automata.ponds[0].numFish);

        let humanPop = this.automata.humans.length;
        this.humanPopulation.push(humanPop);


        let humanSupply = 0;
        for (let human of this.automata.humans) {
            let sply = human.supply;
            humanSupply += sply;
        }
        this.humanSupply.push(humanSupply);

        let humanEnergy = 0;
        for (let human of this.automata.humans) {
            let engy = human.energy;
            humanEnergy += engy;
        }
        this.humanEnergy.push(humanEnergy);
        this.humanAveEnergy.push(humanEnergy / humanPop);


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
