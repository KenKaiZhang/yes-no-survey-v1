import { NextRequest } from "next/server";
import { useEffect, useState } from "react";
import { getAccessToken } from "../service/tokens";
import { clearInterval } from "timers";

const useAccessToken = (req: NextRequest) => {
  const [accessToken, setAccessToken] = useState(getAccessToken(req));

  useEffect(() => {
    const interval = setInterval(() => {
      const newAccessToken = getAccessToken(req);
      if (newAccessToken !== accessToken) {
        setAccessToken(newAccessToken);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [accessToken, req]);
  return accessToken;
};

export default useAccessToken;
