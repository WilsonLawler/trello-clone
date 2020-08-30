import { useRef, useEffect } from "react";

export const useFocus = () => {
  // Typescript can’t automatically know what will be the element type
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  });
  return ref;
};
