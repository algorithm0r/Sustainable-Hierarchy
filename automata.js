
let lastHumanId = 0;


class Automata {
    constructor() {
        gameEngine.automata = this;
        gameEngine.addEntity(this);
        this.generation = 0;
        this.ponds = [new Pond()];
        this.humans = [];
        this.locality = new LocalityGraph();
        this.totalDeaths = 0;
        this.totalBirths = 0;
        gameEngine.addEntity(new DataManager(this));

        for (let i = 0; i < PARAMS.initialHumans; i++) {
            this.add_human(new HumanQ({age: randomInt(PARAMS.maxHumanAge)}));
        }
    }

    add_human(human) {
        this.humans.push(human);
        this.locality.add_node(human);
        this.totalBirths++;
    }

    update() {
        this.generation++;
        for (let pond of this.ponds) {
            pond.update();
        }
        for (let human of this.humans) {
            human.update();
        }


        for (let i = this.humans.length - 1; i >= 0; --i) {
            if (this.humans[i].removeFromWorld) {
                if (PARAMS.preventHumanExtinction && this.humans.length <= PARAMS.minHumans) {
                    this.humans[i].energy = Math.max(30, this.humans[i].energy); // give the baby some initial energy in dying breath
                    let baby = this.humans[i].makeBaby();
                    this.add_human(baby);
                }
                this.locality.delete_node(this.humans[i].id);
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
