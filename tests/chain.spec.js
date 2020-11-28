/* global describe, it */

import { expect } from 'chai';
import chain from '../src/chain';

describe('@chain', () => {
  it('should chain calls as a simple decorator', () => {
    const c = {
      calls: 0,
      args: null,

      @chain
      foo(...args) {
        c.calls++;
        c.args = args;
        c.context = this;
      }
    };

    c.foo(1);
    expect(c).to.have.property('calls', 1);
    c.foo(2).foo(3);
    expect(c).to.have.property('calls', 3);
    expect(c.args).to.deep.equal([3]);
    expect(c.context).to.equal(c);
  });
});
