class RealGene {
    constructor(gene) {
        this.value = gene ? gene.value : generateNormalSample(.5,PARAMS.initialVariation);
    }

    mutate() {
        var range = 0.08;
        // this.value += Math.random() * range - range / 2;
        this.value += generateNormalSample(0, PARAMS.mutationRange);
    }
};

