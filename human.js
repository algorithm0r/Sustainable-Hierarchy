
class Human {
    static lastHumanId = 0;
    constructor(
        id = Human.lastHumanId + 1,
        energy = PARAMS.initialEnergy
    ) {
//        this.x = x;
//        this.y = y;
        this.id = id;
        Human.lastHumanId = id;

        this.energy = energy;
        this.supply = 0;
        this.actionState = 0;
        this.actions = [this.fish, this.eat, this.reproduce];
    }

    update() {
        this.actionState = (this.actionState + 1) % this.actions.length;
        this.energy -= PARAMS.basicEnergyDepletion;

        if (this.actionState === 0) { this.fish(); }
        if (this.actionState === 1) { this.eat(); }
        if (this.actionState === 2) { this.reproduce(); }

        if (this.energy < PARAMS.deathThreshold) {
            this.removeFromWorld = true;
        }
    }

  
    draw(ctx) {

    }

    reproduce() {
        if (this.energy > PARAMS.reproductionThreshold) {
            let baby = new Human(
                gameEngine.automata.lastHumanId + 1,
                this.energy * PARAMS.ratioEnergyToOffspring
            );
            this.energy *= (1 - PARAMS.ratioEnergyToOffspring);
            gameEngine.automata.humans.push(baby);
        }
    }

    fish() {
        let numFish = gameEngine.automata.ponds[0].numFish;
        let fishAvailability = (numFish / PARAMS.pondCapacity) / PARAMS.fishingDifficulty;
        if ((numFish > PARAMS.minFish) && (randomFloat(0, 1) > 1 - fishAvailability)) {
            gameEngine.automata.ponds[0].numFish -= 1;
            this.supply += 1;
        }

    }

    eat() {
        if ((this.supply >= PARAMS.supplyEatThreshold) && (this.energy < PARAMS.energyEatThreshold)) {
            this.supply -= 1;
            this.energy += 1 * PARAMS.fishEnergy;
        }
    }

//    getColor() {
//        return rgb(Math.floor(this.colorRGB[0] * this.energy), Math.floor(this.colorRGB[1] * this.energy), Math.floor(this.colorRGB[2] * this.energy));
//    }
}
