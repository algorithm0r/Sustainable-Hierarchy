class DataManager {
    constructor(automata) {
        this.automata = automata;

        // Store histograms over time
        this.geneticHistogramData = [];

        // Initialize the Histogram instance for visualization
        gameEngine.addGraph(new Histogram(800, 0, this.geneticHistogramData, "Genetic Distribution"));
    }

    createGeneHistogram() {
        const bucketCount = 20;
        const minRange = -PARAMS.histogramWidth;
        const maxRange = PARAMS.histogramWidth;
        const bucketSize = (maxRange - minRange) / bucketCount;

        let histogram = Array(bucketCount).fill(0);

        for (const organism of this.automata.grid[0][0].currentPopulation) {
            for (const gene of organism.genes) {
                let value = gene.value;
                let index = Math.floor((value - minRange) / bucketSize);

                if (index < 0) index = 0;
                else if (index >= bucketCount) index = bucketCount - 1;

                histogram[index]++;
            }
        }

        // const maxCount = Math.max(...histogram);
        // const normalizedHistogram = histogram.map(count => count / maxCount);

        return histogram;
    }

    updateData() {
        // Generate a new histogram for the current population
        const newHistogram = this.createGeneHistogram();
        
        // Append the new histogram to the geneticHistogramData for time-series tracking
        this.geneticHistogramData.push(newHistogram);
    }

    logData() {
        const data = {
            db: PARAMS.db,
            collection: PARAMS.collection,
            data: {
                PARAMS: PARAMS,
                geneticHistogramData: this.geneticHistogramData
            }
        };

        if (socket) socket.emit("insert", data);
    }

    update() {
        // Update data each frame
        if(this.automata.generation % PARAMS.reportingPeriod === 0) this.updateData();
    }

    draw(ctx) {
        // Draw the histogram, handled by the Histogram class in the game engine
    }
}
