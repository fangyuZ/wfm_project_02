// Here we have our camunda strategy

import { variables } from "$lib/variables";
import { ZBClient } from "zeebe-node";

export const camunda: ZBClient = new ZBClient(variables.camundaAddress, {
    camundaCloud: {
        clientId: variables.camundaClientId,
        clientSecret: variables.camundaClientSecret,
        clusterId: variables.camundaClusterId,
        cacheOnDisk: false
    },
    useTLS: true,
    eagerConnection: true,
    onReady: () => console.log(`Connected!`),
    onConnectionError: () => console.log(`Disconnected!`),
});