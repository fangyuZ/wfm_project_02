<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { ButtonSet, Button } from 'carbon-components-svelte';

	import type { Order } from '$lib/client/model/order';
	import type { Task } from '$lib/client/camunda/model';

	export let task: Task<Order>;
	const dispatch = createEventDispatcher();

	async function next() {
		dispatch('completed', task);
	}

	function cancel() {
		dispatch('cancelled', task);
	}
</script>

<div>
	<h2>Store in warehouse</h2>
	<p>
		Check the packaging for faults and a clearly visible label. Package is ready for shipping,
		please store it in the warehouse.
	</p>

	<div style="display: flex; width: 84%; justify-content: center;">
		<ButtonSet>
			<Button kind="secondary" on:click={() => cancel()}>Cancel</Button>
			<Button on:click={() => next()}>Finish</Button>
		</ButtonSet>
	</div>
</div>

<style>
	* {
		text-align: center;
	}
	h2 {
		margin-bottom: var(--cds-spacing-06);
	}
	p {
		margin-bottom: var(--cds-spacing-06);
	}
</style>
