export type Task<T> = {
    id: string;
    name: string;
    completed: boolean;
    rawVariables: any;
    variables: T;
}