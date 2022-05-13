import { get as getStore } from 'svelte/store';

import { orders } from '$lib/server/datastore'

/** @type {import('./index').RequestHandler} */
export async function get({}) {
    let s = getStore(orders);
    return {
      status: 200,
      body: s
    };
 }
