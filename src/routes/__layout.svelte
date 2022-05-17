<script  context="module" lang="ts">
	export async function load({ }: any) {
		await initCamunda({
			address: variables.camundaAddress,
			clientId: variables.camundaClientId,
			clientSecret: variables.camundaClientSecret
		})

		return {
			status: 200
		};
	}
</script>
<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import '../app.css';
    import { Toggle } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
import { variables } from '$lib/variables';
import { initCamunda } from '$lib/client/camunda/camunda';

	let theme = 'white';

	let doc: any;

	onMount(async () => {
		doc = document;
	});
	$: if (doc) {
		doc.documentElement.setAttribute('theme', theme);
	}
</script>

<div style="display: flex; justify-content: flex-end;">
	<div style="flex: 0 0 100px;">
		<Toggle
			style="flex: 0; margin-right: 40px;"
			labelA="Light"
			labelB="Dark"
			on:toggle={() => (theme == 'white' ? (theme = 'g100') : (theme = 'white'))}
		/>
	</div>
</div>
<div class="container">
    <slot></slot>
</div>

<style>
    .container {
        max-width: 56rem;
        margin-left: auto;
        margin-right: auto;
    }
</style>