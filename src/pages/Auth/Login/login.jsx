import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import GlobalMessage from "../../../components/GlobalMessage";
import { useTranslation } from "react-i18next";

function Login() {
    const { t, i18n } = useTranslation();
    const direction = i18n.dir();
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            navigate("/");
        }
    }, [navigate]);

    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ emailErr: "", passErr: "", globalErr: "" });
    const [successMsg, setSuccessMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => setShowPassword(!showPassword);

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        switch (name) {
            case "email":
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
                setErrors((prev) => ({
                    ...prev,
                    passErr: !value
                        ? t("Password is required")
                        : value.length < 8
                            ? t("Password must be at least 8 characters")
                            : !passwordPattern.test(value)
                                ? t("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
                                : "",
                }));
                break;

            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;

        if (!email || !password) {
            setErrors((prev) => ({
                ...prev,
                emailErr: !email ? t("Email is required") : prev.emailErr,
                passErr: !password ? t("Password is required") : prev.passErr,
                globalErr: t("Please fill in all required fields."),
            }));
            return;
        }

        if (errors.emailErr || errors.passErr) return;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            setErrors((prev) => ({
                ...prev,
                globalErr: t("Invalid credentials. Please check your email or password."),
                emailErr: " ",
                passErr: " ",
            }));
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        window.dispatchEvent(new Event("userChange"));
        setSuccessMsg(t("Logged in successfully! Redirecting..."));

        setTimeout(() => {
            navigate("/");
        }, 1500);
    };


    const handleCloseGlobalError = () => setErrors((prev) => ({ ...prev, globalErr: "" }));
    const handleCloseSuccess = () => setSuccessMsg("");

    const inputClass = (error, value) =>
        `peer block w-full rounded-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-white appearance-none
        focus:outline-none focus:ring-0
        ${error
            ? "border-b-2 border-red-600 focus:border-red-600"
            : value
                ? "border-b-2 border-green-600 focus:border-green-600"
                : "border-b-2 border-gray-300 focus:border-blue-500"
        }`;

    const labelClass = (error, value) =>
        `absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-4
        ${error
            ? "text-red-600"
            : value
                ? "text-green-600"
                : "text-gray-500"
        }`;

    return (
        <div dir={direction} className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-2xl font-bold text-indigo-500 mb-6 text-center">{t("Login")}</h1>

                {errors.globalErr && (
                    <GlobalMessage type="error" message={errors.globalErr} onClose={handleCloseGlobalError} />
                )}
                {successMsg && (
                    <GlobalMessage type="success" message={successMsg} onClose={handleCloseSuccess} />
                )}

                <form dir={direction} className="space-y-6" onSubmit={handleSubmit}>

                    <div dir={direction} className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            value={form.email}
                            onChange={handleForm}
                            className={inputClass(errors.emailErr, form.email)}
                        />
                        <label htmlFor="email" className={labelClass(errors.emailErr, form.email)}>
                            {t("Email Address")}
                        </label>
                        {errors.emailErr ? (
                            <p className="mt-2 text-xs text-red-600">
                                <span className="font-medium">{t("Oh, snap!")}</span> {errors.emailErr}
                            </p>
                        ) : form.email ? (
                            <p className="mt-2 text-xs text-green-600">
                                <span className="font-medium">{t("Well done!")}</span> {t("Looks good.")}
                            </p>
                        ) : null}
                    </div>


                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder=" "
                            value={form.password}
                            onChange={handleForm}
                            className={inputClass(errors.passErr, form.password)}
                        />
                        <label htmlFor="password" className={labelClass(errors.passErr, form.password)}>
                            {t("Password")}
                        </label>
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className={`absolute inset-y-0 ${direction==="rtl"?"left-3":"right-3"} flex items-center text-gray-500 hover:text-gray-700 pb-6`}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                        {errors.passErr ? (
                            <p className="mt-2 text-xs text-red-600">
                                <span className="font-medium">{t("Oh, snap!")}</span> {errors.passErr}
                            </p>
                        ) : form.password ? (
                            <p className="mt-2 text-xs text-green-600">
                                <span className="font-medium">{t("Well done!")}</span> {t("Password looks good.")}
                            </p>
                        ) : null}
                    </div>


                    <div>
                        <span>{t("Don't have an account?")} </span>
                        <NavLink to="/register" className="text-sm text-indigo-500 hover:underline">
                            {t("Register")}
                        </NavLink>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-lg text-white font-medium shadow-md transition
                             bg-indigo-500 hover:bg-indigo-400
                            }`}
                    >
                        {t("Login")}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
