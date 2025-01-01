class DataManager {
    constructor(automata) {
        this.automata = automata;

        // population data
        this.fishPopulation = [];
        this.humanPopulation = [];
        this.humanAveSupply = [];
        this.humanAveEnergy = [];

        this.nullActions = [];
        this.fishActions = [];
        this.eatActions = [];
        this.reproduceActions = [];
        this.sexDriveData = [];
        this.initialEpsilonData = [];
        this.qGene1Data = [];

        this.qlearners = [];

        // Initialize the Histogram instance for visualization
        let graphX = 20;
        let graphY = 10;
        gameEngine.addGraph(new Graph(graphX, 0 + graphY, [this.fishPopulation], "Fish", [], [["full pond threshold", PARAMS.pondCapacity * PARAMS.fullPondThreshold]]));
        gameEngine.addGraph(new Graph(graphX, 130 + graphY, [this.humanPopulation], "Humans"));
        gameEngine.addGraph(new Graph(graphX, 260 + graphY, [this.humanAveSupply], "Average Human Supply", [], [["supply full threshold", PARAMS.supplyEatThreshold]]));
        gameEngine.addGraph(new Graph(graphX, 390 + graphY, [this.humanAveEnergy], "Average Human Energy", [], [["reproduction threshold", PARAMS.reproductionThreshold], ["very hungry threshold", PARAMS.hungerThreshold]]));
        // gameEngine.addGraph(new Graph(graphX, 520 + graphY, [this.nullActions, this.fishActions, this.eatActions, this.reproduceActions], "Actions", ["null", "fish", "eat", "reproduce"]));
        gameEngine.addGraph(new Graph(graphX, 520 + graphY, [this.fishActions, this.eatActions, this.reproduceActions], "Actions", ["fish", "eat", "reproduce"]));
        gameEngine.addGraph(new Histogram(graphX, 650 + graphY, this.sexDriveData, "Sex Drive Gene"))
        gameEngine.addGraph(new VariableViewer(600 + graphX/2, 650 + graphY, "Variables", () => ({
            "total_deaths": this.automata.totalDeaths,
            "total_births": this.automata.totalBirths,
            "minHumanAge": this.automata.minHumanAge,
            "aveHumanAge": this.automata.aveHumanAge,
            "maxHumanAge": this.automata.maxHumanAge,
            // "aveStartingEpsilon": this.automata.aveStartingEpsilon
        })));
        gameEngine.addGraph(new Histogram(graphX, 780 + graphY, this.initialEpsilonData, "initial Epsilon Gene"))
        gameEngine.addGraph(new Histogram(600 + graphX/2, 780 + graphY, this.qGene1Data, "Q Gene 1"))
        gameEngine.addGraph(new QValueViewer(graphX, 915 + graphY, "Average Q Values"));
        gameEngine.addGraph(new InitialQValueGeneViewer(graphX, 1185 + graphY, "Average Initial Q Value Genes"));
    }


    updateData() {
        this.fishPopulation.push(this.automata.ponds[0].numFish.toFixed(2));

        let humanPop = this.automata.humans.length;
        this.humanPopulation.push(humanPop);

        let humanSupply = 0;
        for (let human of this.automata.humans) {
            let sply = human.supply;
            humanSupply += sply;
        }
        this.humanAveSupply.push(humanSupply / humanPop);

        let humanEnergy = 0;
        for (let human of this.automata.humans) {
            let engy = human.energy;
            humanEnergy += engy;
        }
        this.humanAveEnergy.push(humanEnergy / humanPop);

        // this.nullActions.push(this.automata.humans.filter(human => human.lastAction === 0).length / humanPop);
        let numNullActions = this.automata.humans.filter(human => human.lastAction === 0).length;
        this.fishActions.push((this.automata.humans.filter(human => human.lastAction === 1).length / (humanPop - numNullActions + 1)).toFixed(2));
        this.eatActions.push((this.automata.humans.filter(human => human.lastAction === 2).length / (humanPop - numNullActions + 1)).toFixed(2));
        this.reproduceActions.push((this.automata.humans.filter(human => human.lastAction === 3).length / (humanPop - numNullActions + 1)).toFixed(2));

        let sexDriveData = Array(20).fill(0);
        let initialEpsilonData = Array(20).fill(0);
        let qGene1Data = Array(20).fill(0);
        for (let human of this.automata.humans) {
            let sexDriveBucket = human.geneSet.sexDriveGene.value >= 1 ? 19 : Math.max(Math.floor(human.geneSet.sexDriveGene.value * 20), 0);
            let initialEpsilonBucket = human.geneSet.initialEpsilon.value >= 1 ? 19 : Math.max(Math.floor(human.geneSet.initialEpsilon.value * 20), 0);
            let randomGene = 0;
            let qGene1Bucket = human.geneSet.initialQValues[randomGene].value >= 1 ? 19 : Math.max(Math.floor(human.geneSet.initialQValues[randomGene].value * 20), 0);
            sexDriveData[sexDriveBucket]++;
            initialEpsilonData[initialEpsilonBucket]++;
            qGene1Data[qGene1Bucket]++;
        }
        this.sexDriveData.push(sexDriveData);
        this.initialEpsilonData.push(initialEpsilonData);
        this.qGene1Data.push(qGene1Data);

        this.automata.aveHumanAge = Math.ceil(this.automata.humans.reduce((sum, human) => sum + human.age, 0) / this.automata.humans.length);
        this.automata.maxHumanAge = this.automata.humans.reduce((m, human) => Math.max(human.age, m), 0);
        this.automata.minHumanAge = this.automata.humans.reduce((m, human) => Math.min(human.age, m), PARAMS.maxHumanAge*50);
        // this.automata.aveStartingEpsilon = (((this.automata.humans.reduce((sum, human) => sum + human.generationalEpsilonDecay, 0) / this.automata.humans.length) + 1) / 2).toFixed(3);
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
