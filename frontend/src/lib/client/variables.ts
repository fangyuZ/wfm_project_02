//console.log(process.env)
console.log(import.meta.env.VITE_CAMUNDA_ADDRESS)
export const variables = {
    camundaOauthAddress: import.meta.env.VITE_CAMUNDA_OAUTH_ADDRESS,
    camundaAddress: import.meta.env.VITE_CAMUNDA_ADDRESS,
    camundaClientId: import.meta.env.VITE_CAMUNDA_CLIENT_ID,
    camundaClientSecret: import.meta.env.VITE_CAMUNDA_CLIENT_SECRET,
};