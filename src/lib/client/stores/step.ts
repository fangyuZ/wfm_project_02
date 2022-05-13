import { writable } from "svelte/store";

export enum Step {
    Material = "Material",
    Package = "Package",
    DeliveryNote = "Delivery Note",
    PrintLabel = "Print Label",
    FinalCheck = "Final Check"
}
export const stepStore = writable<Step>(Step.Material);