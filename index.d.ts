interface PromiseWrapper {
    promise: Promise<any>;
    errorMessage: unknown;
}
export declare class PromiseArray extends Array {
    promiseArray: PromiseWrapper[];
    constructor(promiseArray: PromiseWrapper[]);
    private initialize;
    private prepareElement;
    unshift(element: any): number;
    push(element: any): number;
}
export {};
