/* global describe, it */

import { expect } from 'chai';
import memoize from '../memoize';

describe('@memoize', () => {
  it('should memoize value as a simple decorator', () => {
    const c = {
      value: 0,

      @memoize
      foo() {
        this.value += 1;
        return this.value;
      }
    };

    expect(c.foo()).to.equal(1);
    expect(c.foo()).to.equal(1);
  });
});
