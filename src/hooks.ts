import { camunda } from '$lib/server/camunda';
import { handler as printHandler } from "$lib/server/workers/printDeliveryNote";
import { handler as informCustomerHandler } from "$lib/server/workers/informCustomer";

camunda.subscribe("printDeliveryNote", printHandler);
camunda.subscribe("informCustomer", informCustomerHandler);