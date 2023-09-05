import { useState, useEffect } from "react";

export default function useIsHyderated() {
  const [isHyderated, setIsHyderated] = useState(false);

  useEffect(() => {
    setIsHyderated(true);
  }, []);

  return isHyderated;
}
