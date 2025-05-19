import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";

export const useSessionManager = () => {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("ensake-token");
    localStorage.removeItem("ensake-token-expiry");
    localStorage.removeItem("ensake-keep-logged-in");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    toaster.create({
      title: "Session expired",
      description: "You have been logged out.",
      type: "warning",
      duration: 5000,
      action: {
        label: "X",
        onClick: () => {},
      },
    });
    router.push("en/login");
  }, [router]);

  const extendSession = () => {
    const token = localStorage.getItem("ensake-token");
    if (!token) return;

    const keepLoggedIn =
      localStorage.getItem("ensake-keep-logged-in") === "true";
    const ttl = keepLoggedIn
      ? 7 * 24 * 60 * 60 * 1000
      : 5 * 60 * 1000;

    if (token) {
      const newExpiry = Date.now() + ttl;
      localStorage.setItem(
        "ensake-token-expiry",
        newExpiry.toString()
      );
    }
  };

  const checkExpiry = useCallback(() => {
    const expiry = localStorage.getItem("ensake-token-expiry");
    if (!expiry || Date.now() > Number(expiry)) {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const events = ["click", "keydown", "mousemove", "scroll"];

    const handleActivity = () => {
      extendSession();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const expiry = Number(
        localStorage.getItem("ensake-token-expiry") || 0
      );
      const delay = expiry - Date.now();
      if (delay > 0 && !isNaN(delay)) {
        timeoutRef.current = setTimeout(logout, delay);
      } else {
        logout();
      }
    };

    events.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );
    checkExpiry();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [logout, checkExpiry]);
};
