import { orders } from '$lib/server/datastore'

export function handler(job, _,  worker) {
	worker.log('Task variables', job.variables)
    worker.log(job)
    orders.update(activeOrders => {
        worker.log(job.variables)
        activeOrders.push(job.variables)
        return activeOrders
    })

	return job.complete()
};