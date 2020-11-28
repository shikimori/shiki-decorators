[![Build Status](https://travis-ci.com/shikimori/shiki-decorators.svg?branch=master)](https://travis-ci.com/shikimori/shiki-decorators)

# shiki-decorators
This repository contains set of useful es7 decorators: `bind`, `memoize`, `chain`, `throttle` and `debounce`.

### `@bind` uses [NoHomey/bind-decorator](https://github.com/NoHomey/bind-decorator)
Binds method to the current context.

```js
import { bind } from 'shiki-decorators';
// or to import with tree shaking use
// import bind from 'shiki-decorators/src/bind';

class Example {
  a = 'a from example'

  @bind
  foo() {
    console.log(this.a);
  }

  boo() {
    console.log(this.a);
  }
}

const example = new Example();
const z = { a: 'a from z' };
z.foo = example.foo;
z.boo = example.boo;

z.foo();
z.boo();

// Output
// a from example
// a from z
```


### `@memoize` uses [andreypopp/memoize-decorator](https://github.com/andreypopp/memoize-decorator)
A method/getter decorator which is when applied to a method or a getter
memoizes the result of the first call and returns it on subsequent calls.

```js
import { memoize } from 'shiki-decorators';
// or to import with tree shaking use
// import memoize from 'shiki-decorators/src/memoize';

class Example {
  @memoize
  foo() {
    console.log('heavy method computations');
    return 'foo';
  }

  @memoize
  get boo() {
    console.log('heavy getter computations');
    return 'boo';
  }
}

let example = new Example();

console.log(example.foo()); // prints '', and then prints "1"
console.log(example.boo); // prints '', and then prints "1"

console.log(example.foo()); // just prints '1'
console.log(example.boo); // just prints '1'

// Output
// heavy method computations
// foo
// heavy getter computations
// boo
// foo
// boo
```

### `@chain`
Allows chaining execution of a function. Each method returns a called object,
allowing the calls to be chained together in a single statement.

```js
import { chain } from 'shiki-decorators';
// or to import with tree shaking use
// import chain from 'shiki-decorators/src/chain';

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
// or to import with tree shaking use
// import throttle from 'shiki-decorators/src/throttle';

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

// Output
// num: 1
// num: 10
// num: 100
```


### `@debounce`
Debounce execution of a function. Debouncing, unlike throttling, guarantees that
a function is only executed a single time, either at the very beginning of a
series of calls, or at the very end.
```js
import { debounce } from 'shiki-decorators';
// or to import with tree shaking use
// import debounce from 'shiki-decorators/src/debounce';

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


####
Package release command
```sh
GITHUB_TOKEN=... npm run release
```
