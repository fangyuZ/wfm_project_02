<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { ButtonSet, Button, ImageLoader, InlineLoading } from 'carbon-components-svelte';

	import type { Order } from '$lib/client/model/order';
	import type { Task } from '$lib/client/camunda/model';

	export let task: Task<Order>;
	const dispatch = createEventDispatcher();

	const shelfs = [
		{ label: 'A', img: '/materialA.jpg' },
		{ label: 'B', img: '/materialB.jpg' },
		{ label: 'C', img: '/materialC.jpg' },
		{ label: 'D', img: '/materialD.jpg' },
		{ label: 'E', img: '/materialE.jpg' }
	];

	const shelf = shelfs[Math.floor(Math.random() * 5)];

	async function next() {
		dispatch('completed', task);
	}

	function cancel() {
		dispatch('cancelled', task);
	}
</script>

<div>
	<h2>Get Material</h2>
	<p>Please pickup the appropiate packaging materials from shelf</p>
	<h3>{shelf.label}</h3>
	<div class="image">
		<ImageLoader src={shelf.img}>
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
	h2,
	h3 {
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
