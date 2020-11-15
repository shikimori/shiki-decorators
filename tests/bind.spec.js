/* global describe, it */

import { expect } from 'chai';
import bind from '../bind';

describe('@bind', () => {
  it('should bind method to its context', () => {
    const c = {
      value: 1,

      @bind
      foo() {
        return this.value;
      }
    };
    const z = {
      value: 2,
      foo: c.foo
    };

    expect(c.foo()).to.equal(1);
    expect(z.foo()).to.equal(1);
  });
});
