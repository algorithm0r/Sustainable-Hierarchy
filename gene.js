class RealGene {
    constructor(gene) {
        this.value = gene ? gene.value : generateNormalSample(.5,PARAMS.initialVariation);
        this.clip();
    }

    mutate() {
        var range = 0.08;
        // this.value += Math.random() * range - range / 2;
        this.value += generateNormalSample(0, PARAMS.mutationRange);
        this.clip();
    }

    clip() {
        // keep value between 0 and 1;
        this.value = Math.min(this.value, 1);
        this.value = Math.max(this.value, 0);
    }
};

