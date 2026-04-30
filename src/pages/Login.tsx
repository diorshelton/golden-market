import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validators } from "../utils/validators";
import { ROUTES } from "../constants";
import PegasusIcon from "../components/common/PegasusIcon";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "", general: "" });
  };

  const validateForm = (): boolean => {
    const emailError = validators.email(formData.email);
    const passwordError = validators.password(formData.password);
    setErrors({ email: emailError || "", password: passwordError || "", general: "" });
    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({ email: "", password: "", general: "" });

    try {
      await login(formData.email, formData.password);
      navigate(ROUTES.PROFILE);
    } catch (err: any) {
      setErrors({
        email: "",
        password: "",
        general: err.response?.data?.error || "Login failed. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Auth mark + title */}
        <div className={styles.brand}>
          <div className={styles.authMark}>
            <PegasusIcon width={44} height={44} color="#f59f00" />
          </div>
          <h1 className={styles.title}>Golden Market</h1>
          <p className={styles.subtitle}>Welcome back! Sign in to continue.</p>
        </div>

        {/* Form card */}
        <div className={styles.card}>
          {errors.general && (
            <div className={styles.generalError} role="alert">
              {errors.general}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              />
              {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <div className={styles.passwordWrap}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className={styles.signupPrompt}>
            Don't have an account?{" "}
            <Link to={ROUTES.REGISTER} className={styles.signupLink}>
              Sign up for free
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
