<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ButtonSet, Button, ImageLoader, InlineLoading } from 'carbon-components-svelte';

	import type { Task } from '$lib/client/camunda/model';
	import type { Order } from '$lib/client/model/order';

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
	<h2>Package</h2>
	<p>Please put the skis into the packaging. Take care of the edges and wrap in cushion material</p>
	<div class="image">
		<ImageLoader src="/package.jpg">
			<svelte:fragment slot="loading">
				<InlineLoading />
			</svelte:fragment>
			<svelte:fragment slot="error">An error occurred.</svelte:fragment>
		</ImageLoader>
	</div>

	<div style="display: flex; width: 84%; justify-content: center;">
		<ButtonSet>
			<Button kind="secondary" on:click={() => cancel()}>Cancel</Button>
			<Button on:click={() => next()}>Next</Button>
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
	.image :global(img) {
		width: auto !important;
		height: 28em;
	}
</style>
