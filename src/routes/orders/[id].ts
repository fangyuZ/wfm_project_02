import { get as getStore } from 'svelte/store';

import { orders } from "$lib/server/datastore";
import { camunda } from '$lib/server/camunda';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }: any) {
    let s = getStore(orders);

    let order = s.filter(o => o.id = params.id)[0];
    return {
      status: 200,
      body: order
    };
}

// Starts packaging this order
/** @type {import('./[id]').RequestHandler} */
export async function put({ params }: any) {
    let s = getStore(orders);
    
    let order = s.filter(o => o.id = params.id)[0];
    
    console.log("send message")
    
    //const res = await camunda.publishStartMessage({ name: "startPackaging", timeToLive: 60000, variables: order })
    //console.log(res);

    return {
      status: 200
    };
}