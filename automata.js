class Automata {
    constructor() {
        gameEngine.automata = this;
        gameEngine.addEntity(this);
        this.generation = 0;
        this.ponds = [new Pond()];
        this.humans = Array.from({ length: PARAMS.initialHumans}, (_, index) => new HumanQ({age: randomInt(PARAMS.maxHumanAge)}));
        this.totalDeaths = 0;


        gameEngine.addEntity(new DataManager(this));
    }

    update() {
        this.generation++;
        for (let pond of this.ponds) {
            pond.update();
        }
        for (let human of this.humans) {
            human.update();
        }


        for (let i = this.humans.length - 1; i >= PARAMS.minHumans; --i) {
            if (this.humans[i].removeFromWorld) {
                this.humans.splice(i, 1);
                this.totalDeaths++;
            }
        }
        for (let i = PARAMS.minHumans - 1; i >= 0; --i) {
            if (this.humans[i].removeFromWorld) {
                if (PARAMS.preventHumanExtinction && this.humans.length <= PARAMS.minHumans) {
                    this.humans[i].energy = Math.max(30, this.humans[i].energy); // give the baby some initial energy in dying breath
                    let baby = this.humans[i].makeBaby();
                    this.humans.push(baby);
                }
                this.humans.splice(i, 1);
                this.totalDeaths++;
            }
        }
    }

  
    draw(ctx) {
        for (let pond of this.ponds) {
            pond.draw(ctx);
        }
        for (let human of this.humans) {
            human.draw(ctx);
        }

//        ctx.restore();
      
    }
}
