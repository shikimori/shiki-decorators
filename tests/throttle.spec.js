/* global describe, it */

import { expect } from 'chai';
import throttle from '../src/throttle';

describe('@throttle', () => {
  it('should throttle when used as a simple decorator', next => {
    const c = {
      calls: 0,
      args: null,

      @throttle(10)
      foo(...args) {
        c.calls++;
        c.args = args;
        c.context = this;
      }
    };

    c.foo(1);
    expect(c).to.have.property('calls', 1);
    expect(c.args).to.deep.equal([1]);
    c.foo(2);
    c.foo(3);
    expect(c).to.have.property('calls', 1);

    setTimeout(() => {
      expect(c).to.have.property('calls', 2);
      expect(c.args).to.deep.equal([3]);
      expect(c.context).to.equal(c);

      next();
    }, 20);
  });

  it('should throttle when used as a function', next => {
    const c = throttle(10, (...args) => {
      m.calls++;
      m.args = args;
    });
    const m = { calls: 0, args: null };

    c(1);
    expect(m).to.have.property('calls', 1);
    expect(m.args).to.deep.equal([1]);
    c(2);
    c(3);
    setTimeout( () => {
      expect(m).to.have.property('calls', 2);
      expect(m.args).to.deep.equal([3]);

      next();
    }, 20);
  });
});
