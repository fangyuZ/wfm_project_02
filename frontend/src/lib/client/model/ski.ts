export class Ski {
    curvature_height_back: number;
    curvature_height_front: number;
    edge_radius: number;
    height: number;
    kernal_material: string;
    outside_material: string;
    quality: boolean;
    ski_height: number;
    ski_length: number;
    skitype: string;

    constructor(curvature_height_back: any, curvature_height_front: any, edge_radius: any, height: any,
        kernal_material: any, outside_material: any, quality: any, ski_height: any, ski_length: any, skitype: any) {
        this.curvature_height_back = curvature_height_back.value;
        this.curvature_height_front = curvature_height_front.value;
        this.edge_radius = edge_radius.value;
        this.height = height.value;
        this.kernal_material = kernal_material.value;
        this.outside_material = outside_material.value;
        this.quality = quality.value;
        this.ski_height = ski_height.value;
        this.ski_length = ski_length.value;
        this.skitype = skitype.value;
    }
}