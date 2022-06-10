<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		ButtonSet,
		Button,
		OrderedList,
		ListItem,
		Checkbox,
		Form
	} from 'carbon-components-svelte';
    
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
	<div class="form-head">
		<h2>Add delivery note and label</h2>
		<p>
			The delivery note and label has been printed. Please follow the instructions to apply the note
			and label to the packaging
		</p>
	</div>
	<Form
		on:submit={(e) => {
			e.preventDefault();
			next();
		}}
	>
		<div class="list">
			<OrderedList expressive>
				<ListItem
					><Checkbox required labelText="Put the delivery note into the packaging with the skis" /></ListItem
				>
				<ListItem><Checkbox required labelText="Close the packaging throuruly" /></ListItem>
				<ListItem
					><Checkbox required
						labelText="Remove the adhesive from the back of the label and stick it on top of the packaging"
					/></ListItem
				>
			</OrderedList>
		</div>

		<div style="display: flex; width: 84%; justify-content: center;">
			<ButtonSet>
				<Button kind="secondary" on:click={() => cancel()}>Cancel</Button>
				<Button type="submit">Next</Button>
			</ButtonSet>
		</div>
	</Form>
</div>

<style>
	.form-head {
		text-align: center;
	}
	h2 {
		margin-bottom: var(--cds-spacing-06);
	}
	p {
		margin-bottom: var(--cds-spacing-06);
	}
	.list {
		margin-bottom: var(--cds-spacing-06);
	}
</style>
