// app/page.js (Login Page)
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Check } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Here you would typically make an API call to authenticate
      // For demo purposes, we'll just navigate to dashboard
      // In production, you would validate credentials with your backend
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication token (in real app, this would come from your API)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      
      // Navigate to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center px-20 bg-linear-to-br from-slate-700 to-teal-400 text-white">
        <div>
          <h1 className="text-5xl font-bold mb-6">MailHost</h1>
          <p className="text-lg text-slate-200 max-w-md">
            Manage domains, mailboxes, aliases, and email routing from a simple
            control panel.
          </p>
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <Check className="text-teal-400" size={20} />
              Unlimited Mailboxes
            </div>
            <div className="flex items-center gap-3">
              <Check className="text-teal-400" size={20} />
              SMTP / IMAP Settings
            </div>
            <div className="flex items-center gap-3">
              <Check className="text-teal-400" size={20} />
              Spam Protection
            </div>
            <div className="flex items-center gap-3">
              <Check className="text-teal-400" size={20} />
              Domain Management
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center mx-auto mb-4">
              <Mail className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-gray-500 mt-2">Login to your email hosting panel</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="relative mb-4">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>
              <button type="button" className="text-sm text-teal-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            © 2026 MailHost Control Panel
          </p>
        </div>
      </div>
    </div>
  );
}