import { variables } from "$lib/variables";

import pkg from 'camunda-external-task-client-js';
const { Client, logger } = pkg;

const config = { baseUrl: variables.camundaAddress, use: logger };

export const camunda = new Client(config);
