import { useEffect, useRef } from "react";

export function useOnClickOutside<T extends HTMLElement>({
  ref,
  handler,
  when = true,
}: {
  ref: React.RefObject<T | null>;
  handler: (event: MouseEvent | TouchEvent) => void;
  when?: boolean;
}) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!when) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (!element) return;

      const target = event.target;
      if (!(target instanceof Node)) return;
      if (element.contains(target)) return;

      handlerRef.current(event);
    };

    document.addEventListener("mousedown", listener, true);
    document.addEventListener("touchstart", listener, true);

    return () => {
      document.removeEventListener("mousedown", listener, true);
      document.removeEventListener("touchstart", listener, true);
    };
  }, [ref, when]);
}
