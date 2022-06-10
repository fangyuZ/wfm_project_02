export type Task<T> = {
    id: string;
    name: string;
    processInstanceId: string;
    completed: boolean;
    rawVariables: any;
    variables: T;
}