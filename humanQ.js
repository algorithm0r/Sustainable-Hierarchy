// TODO: make each q-value a gene.

// TODO: make sex reward a fixed value


class HumanQ {


    constructor({
            id = lastHumanId++,
            energy = PARAMS.initialEnergy + generateNormalSample(0, 20),
            // parentQLearner = new QLearner(["null", "fish", "eat", "reproduce"], [2, 2, 3]),
            parentGeneSet = null,
            age = 0,
            // generationalEpsilonDecay = 1,
            } = {}) {
        this.id = id;

        this.energy = energy;
        this.supply = 0;

        let actions = ["null", "fish", "eat"];
        let numStates = [2, 2, 3];
        this.lastAction = 0;
        this.geneSet = new HumanGeneSet({
            parentGeneSet: parentGeneSet,
            allStateSizes: numStates,
            numActions: actions.length
        });
        this.learner = new QLearner(actions, this.geneSet.initialQValues);

        // this.generationalEpsilonDecay = generationalEpsilonDecay;
        // this.epsilon = (generationalEpsilonDecay + 1) / 2;
        this.epsilon = this.geneSet.initialEpsilon;
        this.age = age;
        this.maxAge = PARAMS.maxHumanAge + generateNormalSample(0, PARAMS.maxHumanAge*.5)
    }


    isHungry() {
        return this.energy < PARAMS.reproductionThreshold;
    }

    isVeryHungry() {
        return this.energy < PARAMS.hungerThreshold;
    }

    isSupplyFull() {
        return this.supply >= PARAMS.supplyEatThreshold;
    }

//
//    isPondFull() {
//        return gameEngine.automata.ponds[0].numFish > (PARAMS.pondCapacity * PARAMS.fullPondThreshold);
//    }


    doNothing() {
        let spent = PARAMS.basicEnergyDepletion * PARAMS.nullCost;
        this.energy -= spent;
        return -spent;
    }

    fish() {
        let spent = PARAMS.basicEnergyDepletion * PARAMS.fishingCost;
        this.energy -= spent;

        // probability of catching 1 fish
        let numFish = gameEngine.automata.ponds[0].numFish;
        let fishAvailability = (numFish / PARAMS.pondCapacity) / PARAMS.fishingDifficulty;
        // if ((numFish > PARAMS.minFish) && (randomFloat(0, 1) > 1 - fishAvailability)) {
        if (numFish > PARAMS.minFish) {
            gameEngine.automata.ponds[0].numFish -= 1;
            this.supply += 1;
        }

        // catch # fish proportional to pond
        // let numFish = gameEngine.automata.ponds[0].numFish;
        // if (numFish > PARAMS.minFish) {
        //     gameEngine.automata.ponds[0].numFish -= 1;
        //     this.supply += 1;
        // }
        return -spent;
    }

    eat() {
        let spent = PARAMS.basicEnergyDepletion * PARAMS.eatingCost;
        this.energy -= spent;
        let reward = -spent;

        if (this.supply >= 1) {
            this.supply -= 1;
            //  todo: this is not quite right yet!
            // let base = PARAMS.metabolismDiminishingReturns * PARAMS.maxEnergy + 1;
            // this.energy = PARAMS.maxEnergy * Math.min(1, logBase(base, PARAMS.metabolismDiminishingReturns * (this.energy + PARAMS.fishEnergy) + 1));
            let gap = PARAMS.maxEnergy - this.energy;
            let energyFromFood = gap / 100 * PARAMS.fishEnergy;
            this.energy += energyFromFood;
            reward += energyFromFood;
        // } else {
        //     console.log("cannot eat when has no supply!");
        }
        return reward;
    }

    reproduce() {
        // let spent = PARAMS.basicEnergyDepletion * PARAMS.reproductionCost;
        // this.energy -= spent;
        // let reward = -spent;

        if (this.energy >= PARAMS.reproductionThreshold) {
            let spentEnergy = this.energy * PARAMS.ratioEnergyToOffspring;
            this.makeBaby(spentEnergy);
            this.energy -= spentEnergy;
            // reward -= spentEnergy;
            // reward += this.calculateSexualDrive();
        }
        // return reward;
    }

    makeBaby(initialEnergy) {
        // let offspringGene = new RealGene(this.sexualDriveGene);
        // offspringGene.mutate();

        let baby = new HumanQ({
            energy: initialEnergy,
            // qLearner: this.copyLearner()
            parentGeneSet: this.geneSet,
            // generationalEpsilonDecay: this.generationalEpsilonDecay * PARAMS.generationalEpsDecay,
        });
        gameEngine.automata.add_human(baby);
        return baby;
    }

    calculateSexualDrive() {
        return (this.geneSet.sexDriveGene.value - .5) * 2 * PARAMS.sexualDriveMultiplier;
    }
    //
    // copyLearner() {
    //     let newLearner = new QLearner(this.learner.actions, [0]);
    //     newLearner.qValues = new Map(this.learner.qValues);
    //     return newLearner;
    // }


    selfState(cellState) {
        let state = "";
        state += this.isSupplyFull() ? "1" : "0";
        state += this.isHungry() ? (this.isVeryHungry() ? "2" : "1") : "0";

        cellState += state;
        return cellState;
    }

    learn(state, action, reward, nextState) {
        if (PARAMS.localBroadcastLearning) {
            // this.local_broadcast(state, action, reward, nextState);
            this.graph_broadcast(state, action, reward, nextState, 0);
        } else if (PARAMS.broadcastLearning) {
            this.broadcast(state, action, reward, nextState);
        } else {
            this.learner.learn(state, action, reward, nextState);
        }
    }

    // todo: should I broadcast births, in addition to deaths?
    // todo: do I really want to tamper with the delicate learnings of all individual
    //   humans when a person dies by broadcasting their q-values to everyone? Could
    //   that be jarring to the individual learning happening?
    broadcast(state, action, reward, nextState) {
        gameEngine.automata.humans.forEach(human => {
            // if (randomFloat(0, 1) < .2) {
            //     human.learner.learn(state, action, reward, nextState);
            // }
            human.learner.learn(state, action, reward, nextState);
        });
    }
    //
    // local_broadcast(state, action, reward, nextState) {
    //     this.learner.learn(state, action, reward, nextState);
    //     for (let i = 0; i < PARAMS.localitySize; i++) {
    //         let random_human_index = randomInt(gameEngine.automata.humans.length);
    //         let human = gameEngine.automata.humans[random_human_index];
    //         human.learner.learn(state, action, reward, nextState);
    //     }
    // }

    graph_broadcast(state, action, reward, nextState, recurse_lvl) {
        this.learner.learn(state, action, reward, nextState);
        // TODO: can't go more than 1 deep without handling repeating a node.
        console.assert(PARAMS.graphBroadcastDepth <= 1);
        if (recurse_lvl < PARAMS.graphBroadcastDepth) {
            let neighbors = gameEngine.automata.locality.get_neighbors(this.id);

            neighbors.map(n => n.data('ref')).forEach(neighbor => {
                neighbor.graph_broadcast(state, action, reward, nextState, recurse_lvl+1);
            });
            // neighbors.forEach(neighbor_id => {
            //     let neighbor = gameEngine.automata.locality.G.getNodeAttribute(neighbor_id, 'ref');
            //     neighbor.graph_broadcast(state, action, reward, nextState, recurse_lvl+1);
            // });
        }
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

        // if (this.energy < PARAMS.deathThreshold) {
        //     reward -= PARAMS.deathReward;
        //     this.broadcast(state, action, reward, nextState);
        // } else {
        //     this.learn(state, action, reward, nextState);
        // }
        this.learn(state, action, reward, nextState);

        if (this.energy > PARAMS.reproductionThreshold) {
            this.reproduce();
        }

        this.epsilon *= PARAMS.epsilonDecay;
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
            // case 3:
            //     return this.reproduce();
            }
    }

    update() {
        this.age++;
        this.selectAction();

        if (this.energy < PARAMS.deathThreshold || this.age > this.maxAge) {
            this.removeFromWorld = true;


            // logic to simply replace dead human with new one
            // console.log("adding baby")
            // let baby = new HumanQ(
            //     gameEngine.automata.lastHumanId + 1,
            //     50,
            //     this.copyLearner(),
            // );
            // gameEngine.automata.humans.push(baby);
        }
    }

    draw(ctx) {

    }
}
