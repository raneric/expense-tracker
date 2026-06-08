import { useEffect, useRef, useState, useCallback } from 'react';

export default function useTemporaryVisibility(duration = 5000) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleVisibility = useCallback(() => {
    if (visible) {
      setVisible(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      return;
    }

    setVisible(true);

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      timeoutRef.current = null;
    }, duration);
  }, [visible, duration]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    visible,
    toggleVisibility,
  };
}
