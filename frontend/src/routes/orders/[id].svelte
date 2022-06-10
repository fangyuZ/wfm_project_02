<script context="module" lang="ts">
	let id: string;
	export async function load({ params }: any) {
		id = params.id;

		return {
			status: 200
		}
	}
</script>

<script lang="ts">
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { camunda } from '$lib/client/camunda/camunda';

	import type { Task } from '$lib/client/camunda/model';
	import { Order } from '$lib/client/model/order';
	import { Step, stepStore, StepType, stepTypeByValue } from '$lib/client/stores/step';
	
	import AddDeliveryNote from '$lib/client/components/addDeliveryNote.svelte';
	import DeliveryNote from '$lib/client/components/deliveryNote.svelte';
	import Material from '$lib/client/components/material.svelte';
	import Package from '$lib/client/components/package.svelte';
	import Warehouse from '$lib/client/components/warehouse.svelte';


	import { Tabs, Tab, TabContent, Loading, Modal } from 'carbon-components-svelte';

	export let task: Task<Order>;
	let tabs = [
		{ label: StepType.Material, disabled: false, component: Material },
		{ label: StepType.Package, disabled: true, component: Package },
		{ label: StepType.DeliveryNote, disabled: true, component: DeliveryNote },
		{ label: StepType.AddDeliveryNote, disabled: true, component: AddDeliveryNote },
		{ label: StepType.FinalCheck, disabled: true, component: Warehouse }
	];

	let selected: number;
	let loading: boolean = true;
	let error: string;

	onMount(async () => {
		try {
		task = await camunda.getTaskById(Object.values(StepType), id, Order.mapper());
		console.log(task.name)
		} catch(e: any) {
			error = e as string
		}
		loading = false;

		stepStore.set(new Step(stepTypeByValue(task.name), task));

		stepStore.subscribe((step: Step) => {
			let s = 0;
			for (let i = 0; i < tabs.length; i++) {
			console.log(tabs[i].label)
				if (tabs[i].label == step.stepType) {
					tabs[i].disabled = false;
					selected = i;
				} else {
					tabs[i].disabled = true;
				}
			}
		});
	});

	// Normally this should all be done using a state machine
	async function completed(event: any) {
		let t = event.detail as Task<Order>;

		let step = get(stepStore).stepType;

		if (t.name == step) {
			// Set assignee
			await camunda.completeTask(task.id, task.rawVariables);
		}

		if (t.name == StepType.FinalCheck) {
			goto('/')
		}

		let delay: number | undefined;
		// Next is a long running task (printing for example)
		if (t.name == StepType.DeliveryNote) {
			delay = 10000
		// Show loading screen and tell the user that the delivery note is being printed
		loading = true
		}
		try {
		task = await camunda.getTaskById(
			Object.values(StepType),
			t.processInstanceId,
			Order.mapper(), delay
		);
		} catch(e) {
			error = e as string
		}
		loading = false
		stepStore.set(new Step(stepTypeByValue(task.name), task));
	}

	function cancel() {
		goto('/')
	}
</script>

{#if loading}
<Loading/>
{:else if error}
<Modal passiveModal open={true} modalHeading="Error loading task" on:close={cancel}>
	<p>{error}</p>
</Modal>
{:else}
<div class="tab-container">
	<Tabs bind:selected>
		{#each tabs as tab, i}
			<Tab label="{i + 1}. {tab.label}" bind:disabled={tab.disabled} />
		{/each}
		<svelte:fragment slot="content">
			{#each tabs as tab, i}
				<TabContent>
					<svelte:component this={tab.component} bind:task on:completed={completed} on:cancelled={cancel} />
				</TabContent>
			{/each}
		</svelte:fragment>
	</Tabs>
</div>
{/if}

<style>
	.tab-container :global(.bx--tabs) {
		display: flex;
		justify-content: center;
		margin-bottom: 3em;
	}
</style>
