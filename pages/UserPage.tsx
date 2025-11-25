import React from "react";
import { COLORS } from "../constants";
import giftImage from "../assets/images/tiffany-box.jpg";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"signin" | "signup">(
    "signin"
  );
  const [showPassword, setShowPassword] = React.useState(false);

  // Sign In form
  const [signinForm, setSigninForm] = React.useState({
    email: "",
    password: "",
  });

  // Sign Up form
  const [signupForm, setSignupForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  // 🔹 Handle Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_BASE;
      const res = await fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign in failed");

      localStorage.setItem("auth_token", data.token);
      localStorage.setItem(
        "user_firstname",
        data.profile?.firstName || data.user?.firstName || ""
      );
      localStorage.setItem(
        "user_email",
        data.profile?.email || data.user?.email || ""
      );

      setMessage("✅ Signed in successfully!");
      // 🚀 跳转到首页
      window.location.href = "/#/";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_BASE;
      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign up failed");

      setMessage("✅ Account created! Please sign in.");
      setActiveTab("signin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 h-screen">
      {/* 左侧图片 */}
      <div className="hidden md:flex items-center justify-center h-full w-full">
        <img
          src={giftImage}
          alt="Tiffany Gift"
          className="w-3/4 max-w-md object-contain"
        />
      </div>

      {/* 右侧表单 */}
      <div className="flex flex-col justify-center px-8 md:px-16 bg-white">
        {/* 登录 / 注册切换标签 */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("signin")}
            className={`pb-2 ${
              activeTab === "signin"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`pb-2 ${
              activeTab === "signup"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Create an Account
          </button>
        </div>

        {/* 状态提示 */}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}

        {/* Sign In 表单 */}
        {activeTab === "signin" && (
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email*
              </label>
              <input
                type="email"
                value={signinForm.email}
                onChange={(e) =>
                  setSigninForm({ ...signinForm, email: e.target.value })
                }
                className="w-full border-b border-gray-400 focus:border-black outline-none pb-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={signinForm.password}
                  onChange={(e) =>
                    setSigninForm({ ...signinForm, password: e.target.value })
                  }
                  className="w-full border-b border-gray-400 focus:border-black outline-none pb-1 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 mt-1"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a
                href="#"
                className={`text-sm text-${COLORS.brandDark} hover:underline`}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-3 uppercase tracking-widest font-medium hover:bg-${COLORS.brandGreen} transition-all duration-300 disabled:opacity-60`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        )}

        {/* Create Account 表单 */}
        {activeTab === "signup" && (
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                First Name*
              </label>
              <input
                type="text"
                value={signupForm.firstName}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, firstName: e.target.value })
                }
                className="w-full border-b border-gray-400 focus:border-black outline-none pb-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Name*
              </label>
              <input
                type="text"
                value={signupForm.lastName}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, lastName: e.target.value })
                }
                className="w-full border-b border-gray-400 focus:border-black outline-none pb-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email*
              </label>
              <input
                type="email"
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                className="w-full border-b border-gray-400 focus:border-black outline-none pb-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  className="w-full border-b border-gray-400 focus:border-black outline-none pb-1 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 mt-1"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border-gray-400"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 select-none"
              >
                I agree to Tiffany & Co.’s{" "}
                <a
                  href="#"
                  className={`text-${COLORS.brandGreen} underline hover:text-${COLORS.brandDark}`}
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-3 uppercase tracking-widest font-medium hover:bg-${COLORS.brandGreen} transition-all duration-300 disabled:opacity-60`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserPage;
