import { variables } from "$lib/server/variables";

import pkg, { type ClientConfig } from 'camunda-external-task-client-js';
const { Client, logger } = pkg;

const config = { baseUrl: variables.camundaAddress, use: logger };
console.log(config)

export const camunda = new Client(config as ClientConfig);

console.log("camunda started")