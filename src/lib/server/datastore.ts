import { writable } from "svelte/store";
import type { Order } from "./model/order";

const orders = writable<Order[]>([]);

// Here we store the active data
export { orders }