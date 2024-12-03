
class HumanQ {

    static lastHumanId = 0;

    constructor(
        id = Human.lastHumanId + 1,
        energy = PARAMS.initialEnergy,
        qLearner = null
    ) {
        this.id = id;
        Human.lastHumanId = id;

        this.energy = energy;
        this.supply = 0;

//        let actions = ["null", "fish", "eat", "reproduce"];
        let actions = ["null", "fish", "eat"];
        this.lastAction = 0;
        console.log(qLearner == null);
        this.learner = qLearner == null ? new QLearner(actions) : qLearner;

        this.epsilon = 1;
        this.epsilonDecay = 0.99;
    }

    spendEnergy() {
        let spent = PARAMS.basicEnergyDepletion;
        this.energy -= spent;
        return -spent;
    }

    isHungry() {
        return this.energy < PARAMS.hungerThreshold;
    }

    isSupplyFull() {
        return this.supply >= 1;
    }

//
//    isPondFull() {
//        return gameEngine.automata.ponds[0].numFish > (PARAMS.pondCapacity * PARAMS.fullPondThreshold);
//    }


    doNothing() {
        let reward = this.spendEnergy() / 100;
        return reward;
    }

    fish() {
        let reward = this.spendEnergy() * 300;

        let numFish = gameEngine.automata.ponds[0].numFish;
        let fishAvailability = (numFish / PARAMS.pondCapacity) / PARAMS.fishingDifficulty;
        if ((numFish > PARAMS.minFish) && (randomFloat(0, 1) > 1 - fishAvailability)) {
            gameEngine.automata.ponds[0].numFish -= 1;
            this.supply += 1;
        }
        return reward;
    }

    eat() {
        let reward = this.spendEnergy();

        if (this.supply >= 1) {
            this.supply -= 1;
            let base = PARAMS.metabolismDiminishingReturns * PARAMS.maxEnergy + 1;
            //  todo: this is not quite right yet!
//            this.energy = PARAMS.maxEnergy * Math.min(1, logBase(base, PARAMS.metabolismDiminishingReturns * (this.energy + PARAMS.fishEnergy) + 1));
            let gap = PARAMS.maxEnergy - this.energy;
            let energyFromFood = gap / 100 * PARAMS.fishEnergy;
            this.energy += energyFromFood;
            reward += energyFromFood;
        } else {
            console.assert("cannot eat when has no supply!");
        }
        return reward;
    }

    reproduce() {
        let spentEnergy = this.energy * (1 - PARAMS.ratioEnergyToOffspring);
        let reward = -spentEnergy;

        let baby = new HumanQ(
            gameEngine.automata.lastHumanId + 1,
            this.energy * PARAMS.ratioEnergyToOffspring,
            this.copyLearner(),
        );
        gameEngine.automata.humans.push(baby);
        return reward;
    }

    copyLearner() {
        let newLearner = new QLearner(this.learner.actions);
        newLearner.qValues = new Map(this.learner.qValues);
        return newLearner;
    }


    selfState(cellState) {
        let state = "";
        state += this.isHungry() ? "1" : "0";
        state += this.isSupplyFull() ? "1" : "0";

        cellState += state;
        return cellState;
    }

    learn(state, action, reward, nextState) {
        if (PARAMS.broadcastLearning) {
            // calls learn on all humans in 5x5 neighborhood (including this humans)
            this.broadcast(state, action, reward, nextState);
        } else {
            this.learner.learn(state, action, reward, nextState);
        }
    }

    broadcast(state, action, reward, nextState) {
        gameEngine.automata.humans.forEach(human => {
            human.learner.learn(state, action, reward, nextState);
        });
    }

    selectAction() {
        let action = null;
        let actions = this.learner.actions;
        let state = gameEngine.automata.ponds[0].isFull() ? "1" : "0";
        state = this.selfState(state);

        if(Math.random() < this.epsilon) {
            // explore
            action = randomInt(actions.length);
        } else {
            // exploit
            action = this.learner.policy(state).action;
        }

        let reward = this.act(action);
        let nextState = gameEngine.automata.ponds[0].isFull() ? "1" : "0";
        nextState = this.selfState(nextState);


        this.epsilon *= this.epsilonDecay;
    }

    act(action) {
        this.lastAction = action;
        switch (action) {
            case 0:
                return this.doNothing();
            case 1:
                return this.fish();
            case 2:
                return this.eat();
            case 3:
                return this.reproduce();
            }
    }

    update() {
        this.selectAction();

        if (this.energy < PARAMS.deathThreshold) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {

    }
}
