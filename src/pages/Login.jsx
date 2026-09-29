import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, FileText } from "lucide-react";
import API_URL from "../config/api";


function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
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
        `${API_URL}/api/auth/login`,
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
        throw new Error(data.message || "Login failed");
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
    <div className="min-h-screen bg-[#080b12] px-6 py-12 text-white flex items-center justify-center">

      <div className="w-full max-w-md">

        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-black">
            <FileText size={20} />
          </div>

          <span className="text-xl font-bold">
            Resu<span className="text-cyan-400">Me</span> AI
          </span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              Welcome back
            </h1>

            <p className="mt-2 text-gray-400">
              Sign in to continue building your resume
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-gray-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none transition focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-400 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-gray-500">
              OR
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 font-medium transition hover:bg-white/10"
          >
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-medium text-cyan-400 hover:text-cyan-300"
            >
              Create account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;