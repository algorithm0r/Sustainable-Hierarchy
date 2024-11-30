class Pond {
    constructor() {
        this.numFish = PARAMS.initialFish;
    }

    update() {
        this.numFish = this.growthModel(this.numFish);
    }

  
    draw(ctx) {
        ctx.fillStyle = rgb(200, 200, 0);
        ctx.fillRect(this.x, this.y, 10, 20);
    }

    growthModel(numFish) {
        let r = .000051
        return numFish + PARAMS.fishGrowth * (1 - numFish / PARAMS.pondCapacity) * numFish;
    }

    harvest(proportion) {
        this.numFish *= (1-proportion);
    }
}
