import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  FileText,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import API_URL from "../config/api";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050711] px-4 py-12 text-white sm:px-6">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-cyan-400/5 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-80 w-80 rounded-full bg-indigo-500/5 blur-[120px]" />

      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <Link
          to="/"
          className="group mb-8 flex items-center justify-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_28px_rgba(124,92,255,0.18)] transition duration-300 group-hover:shadow-[0_0_35px_rgba(124,92,255,0.3)]">
            <FileText size={21} />
          </div>

          <span className="text-xl font-extrabold tracking-tight">
            Resu
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Me
            </span>{" "}
            AI
          </span>
        </Link>

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-8">

          {/* Card Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-[70px]" />

          <div className="relative">

            {/* Heading */}
            <div className="mb-8 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <Sparkles size={20} />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight">
                Create your account
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Start building your professional resume today.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-400">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-300"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-gray-600 hover:border-white/15 focus:border-indigo-400/40 focus:bg-white/[0.045] focus:shadow-[0_0_0_3px_rgba(124,92,255,0.08)]"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-gray-600 hover:border-white/15 focus:border-indigo-400/40 focus:bg-white/[0.045] focus:shadow-[0_0_0_3px_rgba(124,92,255,0.08)]"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-300"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 pr-12 text-sm text-white outline-none transition duration-200 placeholder:text-gray-600 hover:border-white/15 focus:border-indigo-400/40 focus:bg-white/[0.045] focus:shadow-[0_0_0_3px_rgba(124,92,255,0.08)]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

                <p className="mt-2 text-[11px] text-gray-600">
                  Password must contain at least 8 characters.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-3.5 text-sm font-bold text-black shadow-[0_10px_30px_rgba(124,92,255,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(124,92,255,0.34)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

                <span className="relative">
                  {loading
                    ? "Creating account..."
                    : "Create Account"}
                </span>

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}

              </button>

            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Or
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>

            {/* Google */}
            <button
              type="button"
              onClick={() =>
                setError("Google sign-in is not available yet.")
              }
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] py-3.5 text-sm font-semibold text-gray-300 transition duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs font-extrabold text-gray-800">
                G
              </span>

              Continue with Google
            </button>

            {/* Security */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-600">
              <ShieldCheck
                size={13}
                className="text-cyan-400/70"
              />

              Secure account authentication
            </div>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Sign in
              </Link>
            </p>

          </div>

        </div>

        {/* Back Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs font-medium text-gray-600 transition hover:text-gray-400"
          >
            ← Back to home
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Signup;