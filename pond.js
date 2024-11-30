class Pond {
    constructor() {
        this.numFish = PARAMS.initialFish;
    }

    update() {
        this.numFish = this.growthModel(this.numFish);
    }

  
    draw(ctx) {

    }

    growthModel(numFish) {
        return numFish + PARAMS.fishGrowth * (1 - numFish / PARAMS.pondCapacity) * numFish;
    }

    harvest(proportion) {
        this.numFish *= (1-proportion);
    }
}
