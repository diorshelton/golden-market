import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validators } from "../utils/validators";
import { ROUTES } from "../constants";
import PegasusIcon from "../components/common/PegasusIcon";
import styles from "./Register.module.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "", general: "" });
  };

  const validateForm = (): boolean => {
    const usernameError = validators.username(formData.username);
    const firstNameError = !formData.firstName ? "First name is required" : "";
    const lastNameError = !formData.lastName ? "Last name is required" : "";
    const emailError = validators.email(formData.email);
    const passwordError = validators.password(formData.password);
    const confirmPasswordError = validators.confirmPassword(
      formData.password,
      formData.confirmPassword
    );

    setErrors({
      username: usernameError || "",
      firstName: firstNameError || "",
      lastName: lastNameError || "",
      email: emailError || "",
      password: passwordError || "",
      confirmPassword: confirmPasswordError || "",
      general: "",
    });

    return (
      !usernameError &&
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    });

    try {
      await register(
        formData.username,
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      navigate(ROUTES.PROFILE);
    } catch (err: any) {
      setErrors({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        general: err.response?.data?.error || "Registration failed. Please try again.",
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
          <h1 className={styles.title}>Join Golden Market</h1>
          <p className={styles.subtitle}>Become a member today!</p>
        </div>

        {/* Form card */}
        <div className={styles.card}>
          {errors.general && (
            <div className={styles.generalError} role="alert">
              {errors.general}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>

            {/* Username */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
              />
              {errors.username && <p className={styles.fieldError}>{errors.username}</p>}
            </div>

            {/* First and Last Name */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                />
                {errors.firstName && <p className={styles.fieldError}>{errors.firstName}</p>}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                />
                {errors.lastName && <p className={styles.fieldError}>{errors.lastName}</p>}
              </div>
            </div>

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

            {/* Password fields */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                />
                {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="confirmPassword">
                  Confirm
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                />
                {errors.confirmPassword && <p className={styles.fieldError}>{errors.confirmPassword}</p>}
              </div>
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? "Creating account…" : "Create Account"}
            </button>

          </form>

          <p className={styles.signinPrompt}>
            Already a member?{" "}
            <Link to={ROUTES.LOGIN} className={styles.signinLink}>
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
