import { retry } from "ts-retry-promise";
import type { Task } from "./model";

type CamundaConfig = {
    address: string;
    clientId: string;
    clientSecret: string;
}

type Variable = {
    key: string;
    value: string;
}

var t = 500;

class Camunda {
    address: string;
    headers: HeadersInit;

    constructor(config: CamundaConfig) {
        this.headers = { "Authorization": '', "Content-Type": 'application/json' }
        this.address = config.address
    }

    public getTaskByVariable<T>(vars: Variable, mapVariables: (vars: any) => T, delay?: number): Promise<Task<T>> {
        return retry(() => this.getTasks<T>(mapVariables)
            .then(tasks => tasks.filter(t => {
                let x = (t.variables as any)[vars.key].value == vars.value
                console.log(t)
                console.log(vars.value)
                return x
            }))
            .then(tasks => {
                console.log(tasks)
                if (tasks.length == 0) {
                    throw new Error('not found')
                } else {
                    return tasks[0]
                }
            }), { delay: delay != undefined ? delay : 3000, retries: 5})
    }

    public getTasks<T>(mapVariables: (vars: any) => T): Promise<Task<T>[]> {
        return fetch(this.address + "/task", { headers: this.headers })
            .then(res => res.json())
            .then(res => res as Task<T>[])
            .then(async tasks => await Promise.all(tasks.map(async t => {
                t.rawVariables = await this.getVariables(t.id)
                t.variables = mapVariables(t.rawVariables)
                return t
            })));
    }

    public completeTask(taskId: string, variables: any) {
        return fetch(this.address + `/task/${taskId}/complete`,
            { headers: this.headers, method: 'POST', body: JSON.stringify({ variables }) })
    }

    private getVariables(taskId: string): Promise<any> {
        return fetch(this.address + `/task/${taskId}/variables`, { headers: this.headers })
            .then(res => res.json())
            .then(res => res as any)
            .then(res => Object.entries(res).map(([key, value]) => {
                let t: any = {}
                t[key] = value
                return t
            }))
            .then(res => {
                let o: any = {}
                for (let i = 0; i < res.length; i++) {
                    o[Object.keys(res[i])[0]] = res[i][Object.keys(res[i])[0]]
                }
                return o
            })
    }
}

export let camunda: Camunda;

export async function initCamunda(config: CamundaConfig) {
    camunda = new Camunda(config)
}