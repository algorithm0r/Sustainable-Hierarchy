
class Human {
    static lastHumanId = 0;
    constructor(
        id = Human.lastHumanId + 1,
        x = randomInt(500),
        y = randomInt(500),
        colorR = randomFloat(0, 2.55),
        colorG = randomFloat(0, 2.55),
        colorB = randomFloat(0, 2.55),
        energy = PARAMS.initialEnergy
    ) {
//        this.x = x;
//        this.y = y;
        this.id = id;
        Human.lastHumanId = id;
        this.colorRGB = [colorR, colorG, colorB];

        this.speed = .1;
        this.energy = energy;
        this.supply = 0;
        this.actionState = 0;
        this.actions = [this.fish, this.eat, this.reproduce];
    }

    update() {
        this.actionState = (this.actionState + 1) % this.actions.length;
//        this.x += randomFloat(-this.speed, this.speed);
//        this.y += randomFloat(-this.speed, this.speed);
        this.energy -= PARAMS.basicEnergyDepletion;

        if (this.actionState === 0) { this.fish(); }
        if (this.actionState === 1) { this.eat(); }
        if (this.actionState === 2) { this.reproduce(); }

        if (this.energy < PARAMS.deathThreshold) {
            this.removeFromWorld = true;
        }
    }

  
    draw(ctx) {
//        ctx.fillStyle = this.getColor();
//        ctx.fillRect(this.x, this.y, 15, 25);
//        ctx.fillText(`${Math.floor(this.energy)}`, this.x + 7, this.y + 35);
//        ctx.fillText(this.supply, this.x + 7, this.y + 45);
    }

    reproduce() {
        if (this.energy > PARAMS.reproductionThreshold) {
            let colorMutation = .02;
            let baby = new Human(
                gameEngine.automata.lastHumanId + 1,
//                this.x + randomInt(20) - 10,
//                this.y + randomInt(20) - 10,
                Math.max(2.55, this.colorRGB[0] + randomFloat(-colorMutation, colorMutation)),
                Math.max(2.55, this.colorRGB[1] + randomFloat(-colorMutation, colorMutation)),
                Math.max(2.55, this.colorRGB[2] + randomFloat(-colorMutation, colorMutation)),
                this.energy * PARAMS.ratioEnergyToOffspring
            );
            this.energy *= (1 - PARAMS.ratioEnergyToOffspring);
            gameEngine.automata.humans.push(baby);
        }
    }

    fish() {
        let multiplier = 60;
        let numFish = gameEngine.automata.ponds[0].numFish;
        let fishAvailability = (numFish / PARAMS.pondCapacity) / multiplier;
        if ((numFish > PARAMS.minFish) && (randomFloat(0, 1) > 1 - fishAvailability)) {
            gameEngine.automata.ponds[0].numFish -= 1;
            this.supply += 1;
        }

    }

    eat() {
        if ((this.supply > 5) && (this.energy < PARAMS.eatThreshold)) {
            this.supply -= 1;
            this.energy += 1 * PARAMS.fishEnergy;
        }
    }

    getColor() {
        return rgb(Math.floor(this.colorRGB[0] * this.energy), Math.floor(this.colorRGB[1] * this.energy), Math.floor(this.colorRGB[2] * this.energy));
    }
}
