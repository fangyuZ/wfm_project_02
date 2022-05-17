import { writable } from "svelte/store";

import type { Task } from "$lib/client/camunda/model";
import type { Order } from "$lib/client/model/order";

const tasks = writable<Task<Order>[]>([]);

export { tasks }