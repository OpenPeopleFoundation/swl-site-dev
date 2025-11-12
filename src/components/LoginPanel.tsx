"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type LoginPanelProps = {
  nextPath?: string;
  wakeSignal?: number;
};

type GateResponse = {
  role?: string;
};

export function LoginPanel({ nextPath, wakeSignal = 0 }: LoginPanelProps) {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [exists, setExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("Enter your email to begin.");
  const [showSignupFields, setShowSignupFields] = useState(false);

  useEffect(() => {
    if (wakeSignal > 0) {
      emailRef.current?.focus();
    }
  }, [wakeSignal]);

  function resetFields(value: string) {
    setEmail(value);
    setPassword("");
    setConfirmPassword("");
    setExists(null);
    setShowSignupFields(false);
    setError(null);
    setStatus("Enter your email to begin.");
  }

  async function checkUser() {
    if (!email.trim()) return;
    setChecking(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        throw new Error("Unable to check user");
      }
      const payload = (await res.json()) as { exists: boolean };
      setExists(payload.exists);
      setShowSignupFields(false);
      setStatus(
        payload.exists
          ? "Crew recognized • enter your passphrase."
          : "New signal — create credentials to proceed.",
      );
    } catch (err) {
      console.error(err);
      setExists(null);
      setStatus("Unable to verify email. Try again.");
    } finally {
      setChecking(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (exists === null) {
      await checkUser();
      return;
    }

    if (exists) {
      if (!password) {
        setError("Enter your password.");
        return;
      }
      await authenticate("login");
      return;
    }

    if (!showSignupFields) {
      setShowSignupFields(true);
      setStatus("Create a password to unlock Cortex.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Create and confirm your password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    await authenticate("register");
  }

  const buttonLabel = useMemo(() => {
    if (exists === null) return checking ? "Scanning..." : "Continue";
    if (exists) return submitting ? "Entering…" : "Enter";
    if (!showSignupFields) return "Continue";
    return submitting ? "Creating…" : "Create Access";
  }, [exists, showSignupFields, submitting, checking]);

  async function authenticate(intent: "login" | "register") {
    setSubmitting(true);
    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          intent,
        }),
      });
      const payload = (await res.json()) as GateResponse & { error?: string };
      if (!res.ok) {
        throw new Error(payload.error ?? "Access denied");
      }
      await ensureSupabaseSession(email.trim());
      const destination =
        nextPath || (payload.role === "customer" ? "/customer" : "/staff");
      setStatus("Warping into Cortex…");
      setTimeout(() => {
        router.replace(destination);
      }, 600);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to continue.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{
        scale: submitting ? 0.92 : 1,
        opacity: submitting ? 0 : 1,
      }}
      transition={{ duration: submitting ? 0.6 : 1.2, ease: [0.12, 0.9, 0.39, 1] }}
      className="glass-panel w-full max-w-lg space-y-8 text-gray-100"
    >
      <motion.div
        key={exists ? "welcomeBack" : "welcome"}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-center"
      >
        <p className="text-xs uppercase tracking-[0.6em] text-white/50">
          Snow White Laundry
        </p>
        <h1 className="mt-3 text-4xl font-light tracking-[0.25em]">
          {exists ? "Welcome Back" : "Welcome"}
        </h1>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block text-sm text-white/70">
          <span className="sr-only">Email</span>
          <input
            ref={emailRef}
            type="email"
            value={email}
            onChange={(event) => resetFields(event.target.value)}
            onBlur={checkUser}
            placeholder="you@snowwhitelaundry.co"
            className="w-full border-b border-white/10 bg-transparent py-3 text-base text-white outline-none transition focus:border-white/60"
            required
          />
        </label>

        <AnimatePresence initial={false}>
          {exists && (
            <motion.label
              key="password-existing"
              className="block text-sm text-white/70"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="sr-only">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="w-full border-b border-white/10 bg-transparent py-3 text-base text-white outline-none transition focus:border-white/60"
                required
              />
            </motion.label>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {!exists && showSignupFields && (
            <motion.div
              key="signup-fields"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4"
            >
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create password"
                className="w-full border-b border-white/10 bg-transparent py-3 text-base text-white outline-none transition focus:border-white/60"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm password"
                className="w-full border-b border-white/10 bg-transparent py-3 text-base text-white outline-none transition focus:border-white/60"
                required
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center text-sm text-white/60">{status}</div>

        {error && (
          <p className="text-center text-sm text-[#FF5E7A]">{error}</p>
        )}

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.02 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full rounded-2xl border border-white/15 bg-white/5 py-3 text-sm uppercase tracking-[0.3em] text-white/90 shadow-[0_20px_60px_rgba(81,69,255,0.35)] hover:border-white/40 disabled:opacity-60"
        >
          {buttonLabel}
        </motion.button>
      </form>
    </motion.div>
  );
}

async function ensureSupabaseSession(email: string) {
  try {
    const response = await fetch("/api/supabase/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) return;
    const tokens = (await response.json()) as {
      access_token?: string;
      refresh_token?: string;
    };
    if (tokens.access_token && tokens.refresh_token) {
      await supabaseBrowser.auth.setSession({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
    }
  } catch (error) {
    console.warn("Unable to sync Supabase session", error);
  }
}
