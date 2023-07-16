# PromiseArray #

A helper class for `Promise.all()` calls.

# What can it do? #

`Promise.all()` takes an array of Promises, runs them in a chain, and resolves an array of returned values if they were all successful. If any of them fails, it stops executing, and rejects with a single error.

```
Promise.all([
  promise1,
  promise2,
  promise3
])
.then(result => console.log(result))      // displays array of results
.catch(err => console.log(err));          // displays single error
```

The problem is that `Promise.all()` can't tell you exactly which Promise has failed.

Of course, you could use `Promise.allSettled()`, which would tell which one has failed. However, it would also always run the entire Promise chain, regardless of errors. This may be undesired if you want it to stop at the first error.

This is what `PromiseArray` solves.

# How to use? #

`PromiseArray` is a descendant of the standard Javascript array. Here is how to use it.

```
import { PromiseArray } from 'another-promise-array';

Promise.all(
  new PromiseArray([
    {
      promise: <FIRST PROMISE>,
      errorMessage: 'Promise 1 failed!'
    },
    {
      promise: <SECOND PROMISE>,
      errorMessage: 'Promise 2 failed!'
    },
    {
      promise: <THIRD PROMISE>,
      errorMessage: 'Promise 3 failed!'
    }

    ...

  ])
)
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
```

If any of the Promises fail, it will throw an object containing both the specified `errorMessage` and the actual error thrown by the Promise. 

For example, if the Promise was an Axios call, this is what it may look like:

```
{
    //  Your error message
    message: 'Promise 2 failed!',

    //  The actual error message from the Promise
    error: {
        message: 'Request failed with status code 404',
        name: 'Error',
        stack: 'Error: Request failed with status code 404',
        config: {
            url: '/api_endpoint',
            method: 'get',
            headers: {
            Accept: 'application/json, text/plain, */*'
            },
            ...
        }
    }
}
```

Note that the error message can be any type, not just a string.
