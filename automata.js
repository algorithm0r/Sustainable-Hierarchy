class Automata {
    constructor() {
        gameEngine.automata = this;
        gameEngine.addEntity(this);
        

        gameEngine.addEntity(new DataManager(this));
    }

    update() {
        
    }

  
    draw(ctx) {
      
    }
}
