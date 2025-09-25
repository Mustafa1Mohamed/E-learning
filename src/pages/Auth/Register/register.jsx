import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import GlobalMessage from "../../../components/GlobalMessage";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Register() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.combineTheme?.theme ?? "Light");

  
  const pageClass = theme === "Dark" ? "bg-gray-900" : "bg-gray-100";
  const cardClass = theme === "Dark" ? "bg-gray-800 text-white" : "bg-white text-black";

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [errors, setErrors] = useState({
    nameErr: "",
    usernameErr: "",
    emailErr: "",
    passErr: "",
    confirmPassErr: "",
    roleErr: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [banner, setBanner] = useState({ type: "", message: "" });

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    switch (name) {
      case "name":
        setErrors((prev) => ({
          ...prev,
          nameErr: !value
            ? t("Name is required")
            : value.length < 3
            ? t("Name too short")
            : "",
        }));
        break;

      case "username":
        setErrors((prev) => ({
          ...prev,
          usernameErr: !value
            ? t("Username is required")
            : value.length < 3
            ? t("Username too short")
            : "",
        }));
        break;

      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prev) => ({
          ...prev,
          emailErr: !value
            ? t("Email is required")
            : !emailPattern.test(value)
            ? t("Email is invalid")
            : "",
        }));
        break;

      case "password":
        const passwordPattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setErrors((prev) => ({
          ...prev,
          passErr: !value
            ? t("Password is required")
            : value.length < 8
            ? t("Password must be at least 8 characters")
            : passwordPattern.test(value)
            ? ""
            : t(
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
              ),
        }));
        break;

      case "confirmPassword":
        setErrors((prev) => ({
          ...prev,
          confirmPassErr: !value
            ? t("Confirm your password")
            : value !== form.password
            ? t("Passwords do not match")
            : "",
        }));
        break;

      case "role":
        setErrors((prev) => ({
          ...prev,
          roleErr:
            value === "admin" && !form.email.includes("admin")
              ? t("Your email not authorized to register as admin")
              : "",
        }));
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      errors.nameErr ||
      errors.usernameErr ||
      errors.emailErr ||
      errors.passErr ||
      errors.confirmPassErr ||
      errors.roleErr
    ) {
      setBanner({
        type: "error",
        message: t("Please fix the highlighted errors."),
      });
      return;
    }

    if (
      !form.name ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        nameErr: !form.name ? t("Name is required") : prev.nameErr,
        usernameErr: !form.username ? t("Username is required") : prev.usernameErr,
        emailErr: !form.email ? t("Email is required") : prev.emailErr,
        passErr: !form.password ? t("Password is required") : prev.passErr,
        confirmPassErr: !form.confirmPassword
          ? t("Confirm your password")
          : prev.confirmPassErr,
      }));
      setBanner({ type: "error", message: t("Please fill all fields.") });
      return;
    }

    if (form.role === "admin" && !form.email.includes("admin")) {
      setBanner({
        type: "error",
        message: t("You are not authorized to register as admin."),
      });
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find(
      (u) => u.email === form.email || u.username === form.username
    );

    if (existingUser) {
      setBanner({
        type: "error",
        message: t("Email or Username already exists."),
      });
      setErrors((prev) => ({
        ...prev,
        emailErr:
          existingUser.username === form.username
            ? t("Email already exists")
            : prev.emailErr,
        usernameErr:
          existingUser.email === form.email
            ? t("Username already exists")
            : prev.usernameErr,
      }));
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    setBanner({
      type: "success",
      message: t("Registration successful! Redirecting..."),
    });

    setTimeout(() => navigate("/login"), 1500);
  };

  const inputClass = (error, value) =>
    `peer block w-full rounded-lg px-2.5 pb-2.5 pt-5 text-sm appearance-none 
 focus:outline-none focus:ring-0
 ${theme === "Dark" ? "bg-gray-900 text-white" : "bg-white text-black"}
 ${
   error
     ? "border-b-2 border-red-600 focus:border-red-600"
     : value
     ? "border-b-2 border-green-600 focus:border-green-600"
     : "border-b-2 border-gray-300 focus:border-blue-500"
 }`;

  const labelClass = (error, value) =>
    `absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5
     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
     peer-focus:scale-75 peer-focus:-translate-y-4
     ${
       error
         ? "text-red-600"
         : value
         ? "text-green-600"
         : "text-gray-500"
     }`;

  return (
    <div
      dir={direction}
      className={`min-h-screen flex items-center justify-center mt-10 ${pageClass}`}
    >
      <div className={`max-w-lg w-full shadow-lg rounded-xl p-6 ${cardClass}`}>
        <h1 className="text-2xl font-bold text-indigo-500 mb-6 text-center">
          {t("Register")}
        </h1>

        {banner.message && (
          <GlobalMessage
            type={banner.type}
            message={banner.message}
            onClose={() => setBanner({ type: "", message: "" })}
          />
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder=" "
              value={form.name}
              onChange={handleForm}
              className={inputClass(errors.nameErr, form.name)}
            />
            <label htmlFor="name" className={labelClass(errors.nameErr, form.name)}>
              {t("Full Name")}
            </label>
            {errors.nameErr ? (
              <p className="mt-2 text-xs text-red-600">{errors.nameErr}</p>
            ) : form.name ? (
              <p className="mt-2 text-xs text-green-600">{t("Looks good.")}</p>
            ) : null}
          </div>

          {/* Username */}
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder=" "
              value={form.username}
              onChange={handleForm}
              className={inputClass(errors.usernameErr, form.username)}
            />
            <label
              htmlFor="username"
              className={labelClass(errors.usernameErr, form.username)}
            >
              {t("Username")}
            </label>
            {errors.usernameErr ? (
              <p className="mt-2 text-xs text-red-600">{errors.usernameErr}</p>
            ) : form.username ? (
              <p className="mt-2 text-xs text-green-600">{t("Looks good.")}</p>
            ) : null}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={form.email}
              onChange={handleForm}
              className={inputClass(errors.emailErr, form.email)}
            />
            <label
              htmlFor="email"
              className={labelClass(errors.emailErr, form.email)}
            >
              {t("Email Address")}
            </label>
            {errors.emailErr ? (
              <p className="mt-2 text-xs text-red-600">{errors.emailErr}</p>
            ) : form.email ? (
              <p className="mt-2 text-xs text-green-600">{t("Looks good.")}</p>
            ) : null}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder=" "
              value={form.password}
              onChange={handleForm}
              className={inputClass(errors.passErr, form.password)}
            />
            <label
              htmlFor="password"
              className={labelClass(errors.passErr, form.password)}
            >
              {t("Password")}
            </label>
            <button
              type="button"
              onClick={handleTogglePassword}
              className={`absolute inset-y-0 ${
                direction === "rtl" ? "left-3" : "right-3"
              } flex items-center text-gray-500 hover:text-gray-700 pb-6`}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.passErr ? (
              <p className="mt-2 text-xs text-red-600">{errors.passErr}</p>
            ) : form.password ? (
              <p className="mt-2 text-xs text-green-600">{t("Looks good.")}</p>
            ) : null}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder=" "
              value={form.confirmPassword}
              onChange={handleForm}
              className={inputClass(errors.confirmPassErr, form.confirmPassword)}
            />
            <label
              htmlFor="confirmPassword"
              className={labelClass(errors.confirmPassErr, form.confirmPassword)}
            >
              {t("Confirm Password")}
            </label>
            <button
              type="button"
              onClick={handleToggleConfirmPassword}
              className={`absolute inset-y-0 ${
                direction === "rtl" ? "left-3" : "right-3"
              } flex items-center text-gray-500 hover:text-gray-700`}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.confirmPassErr ? (
              <p className="mt-2 text-xs text-red-600">
                {errors.confirmPassErr}
              </p>
            ) : form.confirmPassword ? (
              <p className="mt-2 text-xs text-green-600">{t("Looks good.")}</p>
            ) : null}
          </div>

          {/* Role */}
          <div className="relative">
            <select
              name="role"
              value={form.role}
              onChange={handleForm}
              className={inputClass(errors.roleErr, form.role)}
            >
              <option value="user">{t("User")}</option>
              <option value="admin">{t("Admin")}</option>
            </select>
            <label htmlFor="role" className={labelClass(errors.roleErr, form.role)}>
              {t("Role")}
            </label>
            {errors.roleErr ? (
              <p className="mt-2 text-xs text-red-600">{errors.roleErr}</p>
            ) : form.role ? (
              <p className="mt-2 text-xs text-green-600">{t("Looks good.")}</p>
            ) : null}
          </div>

          {/* Link to Login */}
          <div>
            <span>{t("Already have an account?")} </span>
            <NavLink
              to="/login"
              className="text-sm text-indigo-500 hover:underline"
            >
              {t("Login")}
            </NavLink>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-white font-medium shadow-md transition bg-indigo-500 hover:bg-indigo-400 login&register"
          >
            {t("Register")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

