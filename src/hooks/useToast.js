import { useCallback, useEffect, useRef, useState } from "react";

export function useToast(duration = 2600) {
  const [toast, setToast] = useState({ message: "", visible: false });
  const timer = useRef();

  const show = useCallback(
    (message) => {
      setToast({ message, visible: true });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), duration);
    },
    [duration]
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return [toast, show];
}
