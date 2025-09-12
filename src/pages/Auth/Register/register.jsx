import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import GlobalMessage from "../../../components/GlobalMessage";

function Register() {
    const navigate = useNavigate();

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
                        ? "Name is required"
                        : value.length < 3
                            ? "Name too short"
                            : "",
                }));
                break;

            case "username":
                setErrors((prev) => ({
                    ...prev,
                    usernameErr: !value
                        ? "Username is required"
                        : value.length < 3
                            ? "Username too short"
                            : "",
                }));
                break;

            case "email":
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                setErrors((prev) => ({
                    ...prev,
                    emailErr: !value
                        ? "Email is required"
                        : !emailPattern.test(value)
                            ? "Email is invalid"
                            : "",
                }));
                break;

            case "password":
                const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                setErrors((prev) => ({
                    ...prev,
                    passErr: !value
                        ? "Password is required"
                        : value.length < 8
                            ? "Password must be at least 8 characters"
                            : passwordPattern.test(value)
                                ? ""
                                : "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                }));
                break;

            case "confirmPassword":
                setErrors((prev) => ({
                    ...prev,
                    confirmPassErr: !value
                        ? "Confirm your password"
                        : value !== form.password
                            ? "Passwords do not match"
                            : "",
                }));
                break;

            case "role":
                setErrors((prev) => ({
                    ...prev,
                    roleErr:
                        value === "admin" && !form.email.includes("admin")
                            ? "Your email not authorized to register as admin"
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
            setBanner({ type: "error", message: "Please fix the highlighted errors." });
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
                nameErr: !form.name ? "Name is required" : prev.nameErr,
                usernameErr: !form.username ? "Username is required" : prev.usernameErr,
                emailErr: !form.email ? "Email is required" : prev.emailErr,
                passErr: !form.password ? "Password is required" : prev.passErr,
                confirmPassErr: !form.confirmPassword
                    ? "Confirm your password"
                    : prev.confirmPassErr,
            }));
            setBanner({ type: "error", message: "Please fill all fields." });
            return;
        }

        if (form.role === "admin" && !form.email.includes("admin")) {
            setBanner({
                type: "error",
                message: "You are not authorized to register as admin.",
            });
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let existingUser = users.find(
            (u) => u.email === form.email || u.username === form.username
        );

        if (existingUser) {
            setBanner({ type: "error", message: "Email or Username already exists." });
            setErrors((prev) => ({
                ...prev,
                emailErr:
                    existingUser.username === form.username
                        ? "Email already exists"
                        : prev.emailErr,
                usernameErr:
                    existingUser.email === form.email
                        ? "Username already exists"
                        : prev.usernameErr,
            }));
            return;
        }

   
        users.push(form);
        localStorage.setItem("users", JSON.stringify(users));

        setBanner({
            type: "success",
            message: "Registration successful! Redirecting...",
        });

        setTimeout(() => navigate("/login"), 1500);
    };
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
            ? "text-red-600 light:text-red-500"
            : value
                ? "text-green-600 light:text-green-500"
                : "text-gray-500 light:text-gray-400"
        }`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-20">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-2xl font-bold text-indigo-500 mb-6 text-center">
                    Register
                </h1>

                {banner.message && (
                    <GlobalMessage
                        type={banner.type}
                        message={banner.message}
                        onClose={() => setBanner({ type: "", message: "" })}
                    />
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
             
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
                            Full Name
                        </label>
                        {errors.nameErr ? (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                <span className="font-medium">Oh, snap!</span> {errors.nameErr}
                            </p>
                        ) : form.name ? (
                            <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                                <span className="font-medium">Well done!</span> Looks good.
                            </p>
                        ) : null}
                    </div>

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
                            Username
                        </label>
                        {errors.usernameErr ? (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                <span className="font-medium">Oh, snap!</span>{" "}
                                {errors.usernameErr}
                            </p>
                        ) : form.username ? (
                            <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                                <span className="font-medium">Well done!</span> Looks good.
                            </p>
                        ) : null}
                    </div>

       
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
                            Email Address
                        </label>
                        {errors.emailErr ? (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                <span className="font-medium">Oh, snap!</span> {errors.emailErr}
                            </p>
                        ) : form.email ? (
                            <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                                <span className="font-medium">Well done!</span> Looks good.
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
                        <label
                            htmlFor="password"
                            className={labelClass(errors.passErr, form.password)}
                        >
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                        {errors.passErr ? (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                <span className="font-medium">Oh, snap!</span> {errors.passErr}
                            </p>
                        ) : form.password ? (
                            <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                                <span className="font-medium">Well done!</span> Looks good.
                            </p>
                        ) : null}
                    </div>

              
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
                            Confirm Password
                        </label>
                        <button
                            type="button"
                            onClick={handleToggleConfirmPassword}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                        {errors.confirmPassErr ? (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                <span className="font-medium">Oh, snap!</span>{" "}
                                {errors.confirmPassErr}
                            </p>
                        ) : form.confirmPassword ? (
                            <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                                <span className="font-medium">Well done!</span> Looks good.
                            </p>
                        ) : null}
                    </div>

                    <div className="relative">
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleForm}
                            className={inputClass(errors.roleErr, form.role)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <label
                            htmlFor="role"
                            className={labelClass(errors.roleErr, form.role)}
                        >
                            Role
                        </label>
                        {errors.roleErr ? (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                <span className="font-medium">Oh, snap!</span> {errors.roleErr}
                            </p>
                        ) : form.role ? (
                            <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                                <span className="font-medium">Well done!</span> Looks good.
                            </p>
                        ) : null}
                    </div>

               
                    <div>
                        <span>Already have an account? </span>
                        <NavLink
                            to="/login"
                            className="text-sm text-indigo-500 hover:underline"
                        >
                            Login
                        </NavLink>
                    </div>

          
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg text-white font-medium shadow-md transition bg-indigo-500 hover:bg-indigo-400 login&register"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
