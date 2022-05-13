<script lang="ts">
	import Material from '$lib/client/components/material.svelte';
	import { Step, stepStore } from '$lib/client/stores/step';

	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import Package from '../package.svelte';

	let tabs = [
		{ label: Step.Material, disabled: false, component: Material },
		{ label: Step.Package, disabled: true, component: Package },
		{ label: Step.DeliveryNote, disabled: true, component: Material },
		{ label: Step.PrintLabel, disabled: true, component: Material },
		{ label: Step.FinalCheck, disabled: true, component: Material }
	];

	let selected: number;

	stepStore.subscribe((step: Step) => {
		console.log(step);
		let s = 0;
		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].label == step) {
				tabs[i].disabled = false;
				selected = i;
			} else {
				tabs[i].disabled = true;
			}
		}
	});
</script>

<div class="tab-container">
	<Tabs bind:selected>
		{#each tabs as tab, i}
			<Tab label="{i + 1}. {tab.label}" bind:disabled={tab.disabled} />
		{/each}
		<svelte:fragment slot="content">
			{#each tabs as tab, i}
				<TabContent>
					<svelte:component this={tab.component} />
				</TabContent>
			{/each}
		</svelte:fragment>
	</Tabs>
</div>

<style>
	.tab-container :global(.bx--tabs) {
		display: flex;
		justify-content: center;
		margin-bottom: 3em;
	}
</style>
