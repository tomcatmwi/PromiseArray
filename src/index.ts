interface PromiseWrapper {
  promise: Promise<any>;
  errorMessage: unknown;
}

export class PromiseArray extends Array {
  
  constructor(public promiseArray: PromiseWrapper[]) {
    super();
    this.initialize(promiseArray);
  }

  private initialize(promiseArray: PromiseWrapper[]) {
    promiseArray.forEach(element => this.push(element));
  }

  private prepareElement(element: any): Promise<any> {
    const newElement = element.promise;
    newElement.catch((err: any) => {
      throw {
        error: err,
        message: element.errorMessage,
      };
    });
    return newElement;
  }

  public unshift(element: any): number {
    return super.unshift(this.prepareElement(element));
  }

  public push(element: any): number {
    return super.push(this.prepareElement(element));
  }
}