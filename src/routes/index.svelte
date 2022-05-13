<script context="module" lang="ts">
	import { DataTable } from 'carbon-components-svelte';

	import { orders } from '$lib/client/datastore';
	import { goto } from '$app/navigation';

	async function loadOrders(fetch: any) {
		const response = await fetch('/orders');
		let allOrders = (await response.json()) as any[];

		orders.update((storedOrders) => {
			let filteredOrders = allOrders.filter(
				(ski) => storedOrders.map((o) => o.id).indexOf(ski.id) === -1
			);
			storedOrders.push(...filteredOrders);
			return storedOrders;
		});
	}

	export async function load({ params, fetch, session, stuff }: any) {
		loadOrders(fetch);
		setInterval(() => loadOrders(fetch), 5000);

		return {
			status: 200
		};
	}
</script>

<script lang="ts">
	async function startPackaging(event: any) {
		goto('/orders/' + event.detail.id + '?action=material');
	}
</script>

{#if $orders.length == 0}
	<h1>Waiting for orders...</h1>
{:else}
	<p>Choose orders for packaging</p>
	<DataTable
		on:click:row={(event) => startPackaging(event)}
		headers={[
			{ key: 'id', value: 'ID' },
			{ key: 'ski', value: 'Ski' },
			{ key: 'customer', value: 'Customer' }
		]}
		rows={$orders}
	/>
{/if}
