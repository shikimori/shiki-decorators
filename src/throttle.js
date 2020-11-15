export default function outerDecorator(duration, method) {
  if (!duration || duration.constructor !== Number) {
    throw 'throttle duration is not defiend';
  }

  if (method && method.constructor === Function) {
    return throttle(duration, method);
  }

  return function innerDecorator(target, key, descriptor) {
    // return {
    //   configurable: true,
    //   enumerable: descriptor.enumerable,
    //   get: function getter() {
    //     // Attach this function to the instance (not the class)
    //     Object.defineProperty(this, key, {
    //       configurable: true,
    //       enumerable: descriptor.enumerable,
    //       value: throttle(descriptor.value, duration)
    //     });
    //
    //     return this[key];
    //   }
    // };

    descriptor.value = throttle(duration, descriptor.value);
    return descriptor;
  };
}

/** throttles the specified function and returns a wrapper function */
export function throttle(duration, method) {
  let timeoutId;
  let execAfterTimeout = false;
  let execArgs;

  function throttleWrapper(...args) {
    execArgs = args;

    if (timeoutId) {
      execAfterTimeout = true;
      return;
    }
    const self = this;

    function delay() {
      timeoutId = null;

      if (execAfterTimeout) {
        execAfterTimeout = false;
        method.apply(self, execArgs);
        timeoutId = setTimeout(delay, duration);
      }
    }

    timeoutId = setTimeout(delay, duration);
    method.apply(this, execArgs);
  }

  return throttleWrapper;
}
