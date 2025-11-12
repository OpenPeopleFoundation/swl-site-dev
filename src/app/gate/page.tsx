"use client";

import { useState } from "react";

export default function Gate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Access denied");
      }

      window.location.href = "/staff";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Access denied");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(42,99,255,0.35),transparent_55%)]"
      />
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-white/5 bg-black/60 p-10 backdrop-blur">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            SWL Cortex Gate
          </p>
          <h1 className="text-3xl font-light">Staff access</h1>
          <p className="text-sm text-white/60">
            Authenticate with your Snow White Laundry staff credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm text-white/70">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#2A63FF]"
            />
          </label>

          <label className="block text-sm text-white/70">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#2A63FF]"
            />
          </label>

          {error && (
            <p className="text-center text-sm text-[#FF5E7A]">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-[#2A63FF] py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-[#244eda] disabled:opacity-70"
          >
            {isLoading ? "Verifying…" : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}
