
class Human {
    constructor(id, x = randomInt(500), y = randomInt(500), colorR = randomFloat(0, 2.55), colorG = randomFloat(0, 2.55), colorB = randomFloat(0, 2.55), energy = 70) {
        this.x = x;
        this.y = y;
        this.id = id;
        gameEngine.automata.lastHumanId = id;
        this.colorR = colorR;
        this.colorG = colorG;
        this.colorB = colorB;
        this.energy = energy;

    }

    update() {
        let speed = .1;
        this.x += randomFloat(-speed, speed);
        this.y += randomFloat(-speed, speed);
        this.energy -= .005;

//        if (this.energy < 30) {
//            this.fish();
//        }
        this.fish();
        this.reproduce();

        if (this.energy < PARAMS.deathThreshold) {
            this.removeFromWorld = true;
        }
    }

  
    draw(ctx) {
        ctx.fillStyle = this.color();
        ctx.fillRect(this.x, this.y, 15, 25);
    }

    reproduce() {
        if (this.energy > PARAMS.reproductionThreshold) {
            let colorMutation = .02
            let baby = new Human(
                gameEngine.automata.lastHumanId + 1,
                this.x + randomInt(20),
                this.y + randomInt(20),
                Math.max(2.55, this.colorR * randomFloat(-colorMutation, colorMutation)),
                Math.max(2.55, this.colorG * randomFloat(-colorMutation, colorMutation)),
                Math.max(2.55, this.colorB * randomFloat(-colorMutation, colorMutation)),
                this.energy / 2,
            );
            this.energy /= 2;
            gameEngine.automata.humans.push(baby);
        }
    }

    fish() {
        let multiplier = 30;
        let numFish = gameEngine.automata.ponds[0].numFish;
        let fishAvailability = (numFish / PARAMS.pondCapacity) / multiplier;
        if (numFish > PARAMS.minFish && randomFloat(0, 1) > 1 - fishAvailability) {
            gameEngine.automata.ponds[0].numFish -= 1;
            this.energy += 1;
        }

    }

    color() {
        return rgb(Math.floor(this.colorR * this.energy), Math.floor(this.colorG * this.energy), Math.floor(this.colorB * this.energy));
    }
}
