import { writable } from "svelte/store";

import type { Order } from "$lib/client/model/order";
import type { Task } from "$lib/client/camunda/model";

export enum StepType {
    Accept = "Accept for Packaging",
    Material = "Collect packaging material",
    Package = "Package",
    DeliveryNote = "Check delivery note",
    AddDeliveryNote = "Add delivery note",
    FinalCheck = "Put into warehouse"
}

export function stepTypeByValue(val: string) {
    return StepType[Object.keys(StepType).find(key => StepType[key as keyof typeof StepType] === val) as keyof typeof StepType]
}

export class Step {
    stepType: StepType;
    task: Task<Order>;

    constructor(stepType: StepType, task: Task<Order>) {
        this.stepType = stepType;
        this.task = task;
    }
}

export const stepStore = writable<Step>();