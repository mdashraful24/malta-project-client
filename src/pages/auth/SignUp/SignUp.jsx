import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Droplets, CheckCircle, Mail, Lock, User } from "lucide-react";
import { useTranslation } from 'react-i18next';

const SignUp = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Password validation checks
    const passwordChecks = {
        length: formData.password.length >= 8,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /\d/.test(formData.password),
    };

    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = t('errors.fullNameRequired', 'Full name is required');
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = t('errors.fullNameShort', 'Full name must be at least 2 characters');
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = t('errors.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('errors.emailInvalid');
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = t('errors.passwordRequired');
        } else if (formData.password.length < 8) {
            newErrors.password = t('errors.passwordMin8', 'Password must be at least 8 characters');
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = t('errors.passwordComplex', 'Password must contain an uppercase, lowercase, and a number');
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t('errors.confirmPassword', 'Please confirm your password');
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('errors.passwordsMismatch', 'Passwords do not match');
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            // Here you would typically make an API call
            console.log("Form submitted:", formData);

            // Simulate API call delay
            setTimeout(() => {
                alert(t('signup.created', 'Account created successfully!'));
                setIsSubmitting(false);
                // Reset form after successful signup
                setFormData({
                    fullName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            }, 1000);
        } else {
            setErrors(formErrors);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="md:min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-6">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <Droplets className="w-8 h-8 text-green-600" />
                        <span className="text-3xl font-bold text-green-600">{t('brand')}</span>
                    </Link>
                    <h1 className="mt-4 text-2xl font-bold">{t('signup.title')}</h1>
                    <p className="mt-2 leading-relaxed">{t('signup.subtitle')}</p>
                </div>

                {/* Sign Up Form */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                                {t('signup.fullName')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className={`w-full pl-10 pr-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                {t('login.email')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="farmer@example.com"
                                    className={`w-full pl-10 pr-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">
                                {t('login.password')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-12 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    disabled={isSubmitting}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}

                            {/* Password Requirements */}
                            <div className="mt-2 grid md:grid-cols-2 place-items-start gap-2 text-sm break-all">
                                <div className="flex items-center">
                                    <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.length ? 'text-green-500' : 'text-gray-300'}`} />
                                    <span className={passwordChecks.length ? 'text-green-600' : 'text-gray-500'}>
                                        {t('signup.pw_length', 'At least 8 characters')}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.uppercase ? 'text-green-500' : 'text-gray-300'}`} />
                                    <span className={passwordChecks.uppercase ? 'text-green-600' : 'text-gray-500'}>
                                        {t('signup.pw_upper', 'One uppercase letter')}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.lowercase ? 'text-green-500' : 'text-gray-300'}`} />
                                    <span className={passwordChecks.lowercase ? 'text-green-600' : 'text-gray-500'}>
                                        {t('signup.pw_lower', 'One lowercase letter')}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.number ? 'text-green-500' : 'text-gray-300'}`} />
                                    <span className={passwordChecks.number ? 'text-green-600' : 'text-gray-500'}>
                                        {t('signup.pw_number', 'One number')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                                {t('signup.confirmPassword')}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-12 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    disabled={isSubmitting}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                            {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <p className="mt-2 text-sm text-green-600 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    {t('signup.passwordsMatch', 'Passwords match')}
                                </p>
                            )}
                        </div>

                        {/* Terms Agreement */}
                        {/* <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="terms"
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the{" "}
                                <Link to="/terms" className="text-green-600 hover:text-green-700 font-medium">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div> */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full mt-3 py-2.5 px-4 rounded-lg font-medium text-white transition duration-200 shadow-md ${isSubmitting
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-95'
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('signup.creating')}
                                </span>
                            ) : (
                                t('signup.createButton')
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm">
                            {t('signup.already')}{' '}
                            <Link
                                to="/auth/login"
                                className="font-semibold text-green-600 hover:text-green-700"
                            >
                                {t('signup.signIn')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
