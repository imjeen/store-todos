type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

/**
 * 可观察类：一种管理状态的简单方法
 *
 * Observable类，不同于单个Redux Store状态，这里可用多个Observable用来存储一般状态
 *
 * @export
 * @class Observable
 * @template T
 */
export class Observable<T> {
  private _listeners: Listener<T>[] = [];
  constructor(private _val: T) {}
  get(): T {
    return this._val;
  }
  set(val: T) {
    if (this._val !== val) {
      this._val = val;
      this._listeners.forEach((l) => l(val));
    }
  }
  subscribe(listener: Listener<T>): Unsubscriber {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }
}
