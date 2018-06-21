import {expect} from "chai";
import * as Sinon from "sinon";

import Timeout from "./timeout";

describe("Timeout", () => {
  // constructor(callback: Fn, delay: number)
  // start(): void
  // cancel(): void
  // hasStarted(): boolean
  // hasFinished(): boolean
  
  const TIMEOUT_DURATION = 500; // ms
  let clock;
  before( () => clock = Sinon.useFakeTimers() );
  after( () => clock.restore() );

  it("should execute callback exactly once, after the specified number of miliseconds, after receiving the signal to start", () =>{
    const callback = Sinon.spy();
    const timeout = new Timeout(callback, TIMEOUT_DURATION);
    timeout.start();
    clock.tick(TIMEOUT_DURATION - 1);
    expect(callback.notCalled).to.be.true;
    clock.tick(1);
    expect(callback.calledOnce).to.be.true;
  });

  it("should ignore repeated calls to the start method after timeout has started", () => {
    const callback = Sinon.spy();
    const timeout = new Timeout(callback, TIMEOUT_DURATION);
    timeout.start();
    clock.tick(TIMEOUT_DURATION - 1);
    // call start again, right before first timeout ends
    timeout.start();
    // timeout should end here
    clock.tick(1);
    // callback should execute
    expect(callback.calledOnce).to.be.true;
    // fast-forward to TIMEOUT_DURATION after second start() call
    clock.tick(TIMEOUT_DURATION + 1);
    // callback should not have been called again
    expect(callback.callCount).to.equal(1);
  });

  it("should ignore calls to the start method after timeout has ended", () => {
    const callback = Sinon.spy();
    const timeout = new Timeout(callback, TIMEOUT_DURATION);
    timeout.start();
    clock.tick(TIMEOUT_DURATION - 1);
    expect(callback.notCalled).to.be.true;
    clock.tick(1);
    // timeout should have ended
    expect(callback.calledOnce).to.be.true;
    // call start again
    timeout.start();
    // go forward for another TIMEOUT_DURATION, plus an extra ms for safety
    clock.tick(TIMEOUT_DURATION + 1);
    // callback should not have been called again
    expect(callback.callCount).to.equal(1);
  });

  it("should NOT execute the callback if the cancel method is called before the timeout is done", () => {
    const callback = Sinon.spy();
    const timeout = new Timeout(callback, TIMEOUT_DURATION);
    timeout.cancel();
    timeout.start();
    clock.tick(TIMEOUT_DURATION);
    expect(callback.called).to.be.false;
  });

  it("should NOT execute the callback if the cancel method is called BEFORE the start method is called", () => {
    const callback = Sinon.spy();
    const timeout = new Timeout(callback, TIMEOUT_DURATION);
    timeout.start();
    clock.tick(TIMEOUT_DURATION - 1);
    timeout.cancel();
    expect(callback.called).to.be.false;
  });

  it("should say it hasn't started before timeout has started", () => {
    const timeout = new Timeout(() => null, TIMEOUT_DURATION);
    expect(timeout.hasStarted()).to.be.false;
  });

  it("should say it's started after timeout has started and before timeout has ended", () => {
    const timeout = new Timeout(() => null, TIMEOUT_DURATION);
    timeout.start();
    expect(timeout.hasStarted()).to.be.true;
    clock.tick(TIMEOUT_DURATION - 1);
    expect(timeout.hasStarted()).to.be.true;
  });

  it("should say it's started after timeout has ended", () => {
    const timeout = new Timeout(() => null, TIMEOUT_DURATION);
    timeout.start();
    clock.tick(TIMEOUT_DURATION);
    expect(timeout.hasStarted()).to.be.true;
  });

  it("should say it hasn't finished before timeout has started", () => {
    const timeout = new Timeout(() => null, TIMEOUT_DURATION);
    expect(timeout.hasFinished()).to.be.false;
  });

  it("should say it hasn't finished after timeout has started and before timeout has ended", () => {
    const timeout = new Timeout(() => null, TIMEOUT_DURATION);
    timeout.start();
    expect(timeout.hasFinished()).to.be.false;
    clock.tick(TIMEOUT_DURATION - 1);
    expect(timeout.hasFinished()).to.be.false;
  });

  it("should say it has finished after timeout has ended", () => {
    const timeout = new Timeout(() => null, TIMEOUT_DURATION);
    timeout.start();
    clock.tick(TIMEOUT_DURATION);
    expect(timeout.hasFinished()).to.be.true;
  });

});
