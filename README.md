### `@memoize` based on [andreypopp/memoize-decorator](https://github.com/andreypopp/memoize-decorator)
A method/getter decorator which is when applied to a method or a getter
memoizes the result of the first call and returns it on subsequent calls.

```js
class Example {
  @memoize
  foo() {
    console.log('heavy method computations');
    return 1;
  }

  @memoize
  get boo() {
    console.log('heavy getter computations');
    return 2;
  }
}

let example = new Example();
example.foo(); // prints 'heavy method computations', returns 1
example.foo(); // just returns 1

example.boo; // prints 'heavy getter computations', returns 2
example.boo; // just returns 1
```

### `@chain`
Allows chaining execution of a function. Each method returns a called object,
allowing the calls to be chained together in a single statement.

```js
import { chain } from 'shiki-decorators';

class Example {
  @chain
  foo(num) {
    console.log('num:', num);
  }
}

const example = new Example();

example.foo(1).foo(2);
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

const example = new Example();

example.foo(1); // Will execute the callback
example.foo(2); // Won’t execute callback
example.foo(3); // Won’t execute callback

setTimeout(() => {
  example.foo(10); // Will execute the callback
}, 900);

setTimeout(() => {
  example.foo(100); // Will execute the callback
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

const example = new Example();

example.foo(1); // Won't execute callback
example.foo(2); // Won’t execute callback
example.foo(3); // Will execute the callback

setTimeout(() => {
  example.foo(10); // Will execute the callback
}, 1200);

// Output
// num: 3
// num: 10
```
