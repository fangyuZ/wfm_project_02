<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import {
		Form,
		FormGroup,
		TextInput,
		Button,
		Grid,
		Row,
		Column,
		ButtonSet
	} from 'carbon-components-svelte';

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

{#if task}
	<div>
		<div class="form-head">
			<h2>Delivery Note</h2>
			<p>Please check the delivery note.</p>
		</div>
		<Form
			on:submit={(e) => {
				e.preventDefault();
				next();
			}}
		>
			<FormGroup legendText="Customer">
				<Grid>
					<Row>
						<Column>
							<TextInput
								bind:value={task.variables.customer.name}
								labelText="Name"
								placeholder="Please enter a name..."
							/>
						</Column>
					</Row>
					<Row>
						<Column>
							<!-- Addresse -->
							<TextInput
								bind:value={task.variables.customer.address}
								labelText="Street"
								placeholder="Please enter the street..."
							/>
						</Column>
					</Row>
					<Row>
						<Column>
							<TextInput
								bind:value={task.variables.customer.zip}
								labelText="Zip"
								placeholder="Please enter the zip-code..."
							/>
						</Column>
						<Column>
							<TextInput
								bind:value={task.variables.customer.city}
								labelText="City"
								placeholder="Please enter the city..."
							/>
						</Column>
					</Row>
					<Row
						><Column>
							<TextInput
								bind:value={task.variables.customer.country}
								labelText="Country"
								placeholder="Please enter the country..."
							/>
						</Column></Row
					>
				</Grid>
			</FormGroup>
			<FormGroup legendText="Product">
				<Grid>
					<Row>
						<Column>
							<TextInput
								bind:value={task.variables.ski.skitype}
								labelText="Model"
								placeholder="Please enter a model name..."
							/>
						</Column>
					</Row>
					<!-- Could add more info -->
				</Grid>
			</FormGroup>
			<Grid>
				<Row>
					<Column>
						<ButtonSet>
							<Button kind="secondary" on:click={() => cancel()}>Cancel</Button>
							<Button type="submit">Print</Button>
						</ButtonSet>
					</Column>
				</Row>
			</Grid>
		</Form>

		<div style="display: flex; width: 84%; justify-content: center;" />
	</div>
{/if}

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
</style>
