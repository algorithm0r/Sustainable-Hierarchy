class Automata {
    constructor() {
        gameEngine.automata = this;
        gameEngine.addEntity(this);
        this.generation = 0;
        this.ponds = [new Pond()];
        this.humans = Array.from({ length: PARAMS.initialHumans}, (_, index) => new HumanQ());
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
        for (var i = this.humans.length - 1; i >= 0; --i) {
            if (this.humans[i].removeFromWorld) {
                this.humans.splice(i, 1);
                this.totalDeaths++
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
