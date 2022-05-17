<script context="module" lang="ts">
	import { DataTable, Modal } from 'carbon-components-svelte';

	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	import { StepType } from '$lib/client/stores/step';
	import { camunda } from '$lib/client/camunda/camunda';
	import { Order } from '$lib/client/model/order';
	import type { Task } from '$lib/client/camunda/model';
	//import { tasks } from '$lib/client/camunda/operations';

	let loading: boolean;
	let error: string;
	let tasks = writable<Task<Order>[]>([]);

	async function loadOrders(fetch: any) {
		loading = true;
		try {
			await camunda.getTasks<Order>(Order.mapper()).then((t) => tasks.set(t));
		} catch (e) {
			error = e as string;
		}
		loading = false;
	}

	let interval: any;
	export async function load({ params, fetch, session, stuff }: any) {
		loadOrders(fetch);

		return {
			status: 200
		};
	}
</script>

<script lang="ts">
	interval = setInterval(() => loadOrders(fetch), 5000);
	onDestroy(() => clearInterval(interval));

	async function startPackaging(event: any) {
		const task = event.detail as Task<Order>;
		if (task.name == StepType.Accept) {
			// Set assignee
			await camunda.completeTask(task.id, task.variables);
		}
		goto('/orders/' + task.variables.id.value);
	}
	function reload() {
		goto('/');
	}
</script>

{#if error}
	<Modal passiveModal open={true} modalHeading="Error loading task" on:close={reload}>
		<p>{error}</p>
	</Modal>
{:else if $tasks.length == 0}
	<h1>Waiting for tasks...</h1>
{:else}
	<p>Choose tasks for packaging</p>
	<DataTable
		on:click:row={(event) => startPackaging(event)}
		headers={[
			{ key: 'id', value: 'ID' },
			{ key: 'variables.id.value', value: 'Order ID' },
			{ key: 'variables.ski.value.model', value: 'Ski' },
			{ key: 'variables.customer.value.fullname', value: 'Customer' },
			{ key: 'name', value: 'Task' }
		]}
		rows={$tasks}
	/>
{/if}
