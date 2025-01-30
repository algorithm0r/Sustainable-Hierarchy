//
// const cy = cytoscape({
//   // container: document.getElementById('cy'),
//   elements: [
//     { data: { id: 'A' } },
//     { data: { id: 'B' } },
//     { data: { id: 'A-B', source: 'A', target: 'B' } }
//   ]
// });


class LocalityGraph {
    constructor() {
        this.cy = cytoscape({
            container: document.getElementById('cy'),  // Attach to the div
            elements: [],  // Empty graph initially
            style: [  // Define styles
                {
                    selector: 'node',
                    style: {
                        'background-color': '#0074D9',
                        'label': 'data(id)',
                        'width': 20,
                        'height': 20,
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#AAAAAA'
                    }
                }
            ],
            layout: {
                name: 'cose',  // Force-directed layout
                animate: true
            }
        });
    }

    visualize_graph_animate() {
        this.cy.layout({ name: 'cose', animate: true }).run(); // Recalculate layout
    }

    visualize_graph() {
        this.cy.layout({ name: 'cose', animate: false }).run(); // Recalculate layout
    }

    add_node(human) {
        let first_neighbors = [];
        let second_neighbors = [];
        const nodes = this.cy.nodes(); // Get all nodes

        // Pick first neighbors randomly
        for (let i = 0; i < Math.min(nodes.length, PARAMS.numFirstNeighbors); i++) {
            let first_neighbor = nodes[randomInt(nodes.length)].id();
            let neighbors_of_neighbor = shuffleArray(this.get_neighbors(first_neighbor).map(n => n.id()));

            // Pick second neighbors randomly
            for (let j = 0; j < Math.min(neighbors_of_neighbor.length, PARAMS.numSecondNeighbors); j++) {
                let second_neighbor = neighbors_of_neighbor[j];
                second_neighbors.push(second_neighbor);
            }

            first_neighbors.push(first_neighbor);
        }

        // Add new node
        this.cy.add({
            group: 'nodes',
            data: { id: human.id, ref: human }
        });

        // Add edges to first and second neighbors
        first_neighbors.forEach(neighbor => {
            this.cy.add({ group: 'edges', data: { source: human.id, target: neighbor } });
        });
        second_neighbors.forEach(neighbor => {
            this.cy.add({ group: 'edges', data: { source: human.id, target: neighbor } });
        });
    }

    delete_node(id) {
        this.cy.getElementById(id).remove();
    }

    get_neighbors(id) {
        return this.cy.getElementById(id).neighborhood('node');
    }
}



//
// class LocalityGraph {
//     constructor() {
//         this.G = new graphology.Graph()
//     }
//
//     add_node(human) {
//         let first_neighbors = [];
//         let second_neighbors = [];
//         for (let i = 0; i < Math.min(this.G._nodes.size, PARAMS.numFirstNeighbors); i++) {
//             let first_neighbor = this.G.nodes()[randomInt(this.G._nodes.size)];
//
//             let neighbors_of_neighbor = shuffleArray(this.get_neighbors(first_neighbor));
//             for (let j = 0; j < Math.min(neighbors_of_neighbor.length, PARAMS.numSecondNeighbors); j++) {
//                 let second_neighbor = neighbors_of_neighbor[j];
//                 second_neighbors.push(second_neighbor);
//             }
//
//             first_neighbors.push(first_neighbor);
//         }
//         this.G.addNode(human.id, {ref: human});
//         first_neighbors.forEach(neighbor => {
//             this.G.addEdge(human.id, neighbor);
//         });
//         second_neighbors.forEach(neighbor => {
//             this.G.addEdge(human.id, neighbor);
//         });
//
//     }
//
//     get_neighbors(id) {
//         return this.G.neighbors(id);
//     }
//
//     delete_node(id) {
//         this.G.dropNode(id);
//     }
//
//     // broadcast(id) {
//     //
//     // }
//     //
//     // visualize_graph() {
//     //
//     // }
//
//
//
// }