import { useEffect, useState } from "react";
import { Observable } from "./Observable";

// 钩子
export function useObservable<T>(observable: Observable<T>): T {
  const [val, setVal] = useState(observable.get());
  useEffect(() => {
    setVal(observable.get());
    return observable.subscribe(setVal);
  }, [observable]);
  return val;
}
