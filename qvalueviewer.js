class QValueViewer {
    constructor(x, y, label) {
//        this.game = game;
        this.x = x;
        this.y = y;
        this.label = label;

        this.xSize = 1100;
        this.ySize = 135;
        this.ctx = gameEngine.ctx;
        this.colors = ["#00BB00", "#BB0000", "#00BBBB", "#CCCCCC"];
        this.maxVal = 0;

    }
    update() {
    }
    draw(ctx) {
        // Check if the graph drawing is enabled
        if (!document.getElementById("graphs").checked) return;

        // Set the style for the box
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 1;

        // Draw the box
        this.ctx.strokeRect(this.x, this.y, this.xSize, this.ySize);

        // Set the style for the text
        this.ctx.fillStyle = "#000000";
        this.ctx.textAlign = "left";
        this.ctx.font = "14px Arial";

        // Calculate the spacing between each variable display
        const lineHeight = 20;
        let startX = this.x + 10;
        let startY = this.y + 20;

        // Loop through the variables and display their names and values
        const aveQValues = this.calculateAverageQValues();

        const orderedAveQValues = Object.keys(aveQValues).sort().reduce(
            (obj, key) => {
                obj[key] = aveQValues[key];
                return obj;
            },
            {}
        );
        let i = 0;
        for (let key in orderedAveQValues) {

            const text = `${key}: ${orderedAveQValues[key].toFixed(3)}`;

            // Draw the text inside the box
            this.ctx.fillText(text, startX, startY);

            // Update the y position for the next variable
            startY += lineHeight;
            startX

            // Break the loop if the box height is exceeded
            if (startY > this.y + this.ySize - 10) {
                startY = this.y + 20;
                startX += 260;
            }
        }
    }

    calculateAverageQValues() {
        // Initialize dictionaries to store the sums and counts of values for each key
        let sums = {};
        let counts = {};


        // Iterate through each object in the data list
        gameEngine.automata.humans.forEach(human => {
            // Iterate through each key-value pair in the object
//            console.log("hello", human.learner.qValues)

            for (let [key, value] of human.learner.qValues.entries()) {

                // If the key is not yet in sums or counts, initialize them
                if (!sums.hasOwnProperty(key)) {
                    sums[key] = 0;
                    counts[key] = 0;
                }
                // Update the sum and count for the key
                sums[key] += value;
                counts[key] += 1;
            }
        });

        // Initialize a dictionary to store the averages
        let averages = {};

        // Calculate the average for each key
        for (let key in sums) {
            averages[key] = sums[key] / counts[key];
        }

        return averages;
    }

}



