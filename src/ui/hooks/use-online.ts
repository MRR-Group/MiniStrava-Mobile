import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useOnline(): boolean {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    let mounted = true;

    NetInfo.fetch().then((state) => {
      if (!mounted) return;
      setOnline(!!state.isConnected && (state.isInternetReachable ?? true));
    });

    const unsub = NetInfo.addEventListener((state) => {
      if (!mounted) return;
      setOnline(!!state.isConnected && (state.isInternetReachable ?? true));
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  return online;
}
