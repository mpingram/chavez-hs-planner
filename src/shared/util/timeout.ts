export default class Timeout {

  public start(): void {
    if (!this.started && !this.cancelled) {
      this.started = true;
      this.timerInstance = setTimeout(this.callback, this.delay);
    }
    // else do nothing
  }
  public cancel(): void {
    this.cancelled = true;
    if (this.timerInstance !== undefined) {
      clearTimeout(this.timerInstance);
      this.timerInstance = undefined;
    }
  }
  public hasStarted(): boolean {
    return this.started;
  }
  public hasFinished(): boolean {
    return this.callbackExecuted;
  }

  constructor(callback: Function, delay: number) {
    this.callback = () => {
      this.callbackExecuted = true;
      callback();
    }
    this.delay = delay;
  }

  private timerInstance: any = undefined;
  private callback: Function;
  private delay: number;
  private callbackExecuted: boolean = false;
  private started: boolean = false;
  private cancelled: boolean = false;

}
