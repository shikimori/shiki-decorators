### `@chain`
Allows chaining execution of a function. Each method returns a called object,
allowing the calls to be chained together in a single statement.

```js
import { chain from 'shiki-decorators';

class Example {
  @chain
  foo(num) {
    console.log('num:', num);
  }
}

const e = new Example();

e.foo(1).foo(2);
// Output
// num: 1
// num: 2
```


### `@throttle`
Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.

```js
import { throttle } from 'shiki-decorators';

class Example {
  @throttle(1000)
  foo(num) {
    console.log('num:', num);
  }
}

const e = new Example();

e.foo(1); // Will execute the callback
e.foo(2); // Won’t execute callback
e.foo(3); // Won’t execute callback

setTimeout(() => {
  e.foo(10); // Will execute the callback
}, 900);

setTimeout(() => {
  e.foo(100); // Will execute the callback
}, 1200);
```


### `@debounce`
Debounce execution of a function. Debouncing, unlike throttling, guarantees that
a function is only executed a single time, either at the very beginning of a
series of calls, or at the very end.
```js
import { debounce } from 'shiki-decorators';

class Example {
  @debounce(1000)
  foo(num) {
    console.log('num:', num);
  }
}

const e = new Example();

e.foo(1); // Won't execute callback
e.foo(2); // Won’t execute callback
e.foo(3); // Will execute the callback

setTimeout(() => {
  e.foo(10); // Will execute the callback
}, 1200);

// Output
// num: 3
// num: 10
```
