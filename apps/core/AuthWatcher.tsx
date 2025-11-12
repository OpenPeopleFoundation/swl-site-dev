"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function AuthWatcher() {
  const [sessionState, setSessionState] = useState<{
    email?: string | null;
    status: "checking" | "active" | "missing";
  }>({ status: "checking" });

  useEffect(() => {
    let mounted = true;

    async function hydrate() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session) {
        setSessionState({
          status: "active",
          email: data.session.user.email,
        });
      } else {
        setSessionState({ status: "missing" });
      }
    }

    void hydrate();
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        if (session) {
          setSessionState({
            status: "active",
            email: session.user.email,
          });
        } else {
          setSessionState({ status: "missing" });
        }
      },
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (sessionState.status === "active" && sessionState.email) {
      console.info("✅ Cortex Auth Active:", sessionState.email);
    } else if (sessionState.status === "missing") {
      console.warn("⚠️ Cortex Auth Missing — chat may fail.");
    }
  }, [sessionState]);

  return null;
}
