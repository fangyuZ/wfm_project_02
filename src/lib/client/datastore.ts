import type { Order } from "$lib/server/model/order";
import { writable } from "svelte/store";

const orders = writable<Order[]>([]);

// Here we store the active data
export { orders }