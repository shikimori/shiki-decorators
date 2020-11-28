/* global describe, it */

import { expect } from 'chai';
import debounce from '../src/debounce';

describe('@debounce', () => {
  it('should debounce when used as a simple decorator', next => {
    const c = {
      calls: 0,
      args: null,

      @debounce(10)
      foo(...args) {
        c.calls++;
        c.args = args;
        c.context = this;
      }
    };

    c.foo(1);
    expect(c).to.have.property('calls', 0);
    c.foo(2);
    c.foo(3);
    setTimeout(() => {
      expect(c).to.have.property('calls', 1);
      expect(c.args).to.deep.equal([3]);
      expect(c.context).to.equal(c);

      next();
    }, 20);
  });

  it('should debounce when used as a function', next => {
    const c = debounce(10, (...args) => {
      m.calls++;
      m.args = args;
    });
    const m = { calls: 0, args: null };

    c(1);
    expect(m).to.have.property('calls', 0);
    c(2);
    c(3);
    setTimeout(() => {
      expect(m).to.have.property('calls', 1);
      expect(m.args).to.deep.equal([3]);
      next();
    }, 20);
  });

  it('should support passing a delay', next => {
    const c = debounce(5, (...args) => {
      m.calls.push(args);
    });
    const m = { calls: [] };

    c(1);
    setTimeout(()=> c(2), 1);
    setTimeout(()=> c(3), 10);
    setTimeout(()=> c(4), 14);
    setTimeout(()=> c(5), 22);
    expect(m.calls).to.have.length(0);
    setTimeout( () => {
      expect(m.calls).to.deep.equal([ [2], [4], [5] ]);
      next();
    }, 30);
  });
});
