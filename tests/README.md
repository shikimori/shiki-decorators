### `@debounce`

> Throttle calls to the decorated function. To debounce means "call this at most once per N ms".
> All outward function calls get collated into a single inward call, and only the latest (most recent) arguments as passed on to the debounced function.
>
> ##### Options:
>
> `delay` - _The number of milliseconds to buffer calls for._

```js
class Example {
	@debounce(300)
	foo() {
		return this;
	}
}

let e = new Example();

// this will only call foo() once:
for (let i=1000; i--) e.foo();
```
