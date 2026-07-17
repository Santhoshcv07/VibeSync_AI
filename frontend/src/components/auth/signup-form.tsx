"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { PasswordRequirements } from "./password-requirements";
import { SignupSuccessPreview } from "./signup-success-preview";

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
  acceptedMarketing: boolean;
}

type SignupFieldName = keyof SignupFormValues;
type SignupFormErrors = Partial<Record<SignupFieldName, string>>;

const isStrongPassword = (p: string) => p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p);
const isValidEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

export function SignupForm() {
  const [values, setValues] = useState<SignupFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
    acceptedMarketing: false,
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<SignupFieldName, boolean>>>({});
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSummaryAlert, setShowSummaryAlert] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const validateField = (name: SignupFieldName, currentValues: SignupFormValues): string | undefined => {
    switch (name) {
      case "firstName":
        if (!currentValues.firstName.trim()) return "Enter your first name.";
        return undefined;
      case "lastName":
        if (!currentValues.lastName.trim()) return "Enter your last name.";
        return undefined;
      case "email":
        if (!currentValues.email.trim()) return "Enter your email address.";
        if (!isValidEmail(currentValues.email.trim())) return "Enter a valid email address.";
        return undefined;
      case "password":
        if (!currentValues.password) return "Create a password.";
        if (!isStrongPassword(currentValues.password)) return "Your password does not meet all requirements.";
        return undefined;
      case "confirmPassword":
        if (!currentValues.confirmPassword) return "Confirm your password.";
        if (currentValues.confirmPassword !== currentValues.password) return "Passwords do not match.";
        return undefined;
      case "acceptedTerms":
        if (!currentValues.acceptedTerms) return "Accept the terms and privacy policy to continue.";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (currentValues: SignupFormValues): SignupFormErrors => {
    const newErrors: SignupFormErrors = {};
    const fields: SignupFieldName[] = ["firstName", "lastName", "email", "password", "confirmPassword", "acceptedTerms"];
    
    fields.forEach((field) => {
      const error = validateField(field, currentValues);
      if (error) newErrors[field] = error;
    });
    
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldName = name as SignupFieldName;
    const newValue = type === "checkbox" ? checked : value;

    const newValues = { ...values, [fieldName]: newValue };
    setValues(newValues);

    if (touched[fieldName] || showSummaryAlert) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, newValues),
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as SignupFieldName;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, values),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = validateAll(values);
    setErrors(newErrors);

    const allTouched: Partial<Record<SignupFieldName, boolean>> = {
      firstName: true, lastName: true, email: true, password: true, confirmPassword: true, acceptedTerms: true
    };
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      setShowSummaryAlert(true);
      
      if (newErrors.firstName) firstNameRef.current?.focus();
      else if (newErrors.lastName) lastNameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.password) passwordRef.current?.focus();
      else if (newErrors.confirmPassword) confirmPasswordRef.current?.focus();
      
      return;
    }

    setShowSummaryAlert(false);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("name", `${values.firstName} ${values.lastName}`.trim());

    try {
      const { signupAction } = await import("@/app/actions/auth");
      const res = await signupAction(formData);

      if (res?.error) {
        setErrors({ email: res.error });
        setShowSummaryAlert(true);
        setIsSubmitting(false);
      } else if (res?.success) {
        setIsSuccess(true);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setErrors({ email: "An unexpected error occurred." });
      setShowSummaryAlert(true);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
      acceptedMarketing: false
    });
    setTouched({});
    setErrors({});
    setShowSummaryAlert(false);
    
    setTimeout(() => {
      firstNameRef.current?.focus();
    }, 0);
  };

  if (isSuccess) {
    return <SignupSuccessPreview onReset={handleReset} />;
  }

  return (
    <div className="w-full relative">
      <div aria-live="polite" className="sr-only">
        {isSubmitting ? "Checking your signup details." : ""}
      </div>

      <form 
        noValidate 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 w-full"
        aria-busy={isSubmitting}
      >
        {showSummaryAlert && Object.keys(errors).length > 0 && (
          <Alert variant="danger" title="Check your details" className="mb-2">
            Correct the highlighted fields and try again.
          </Alert>
        )}

        <div className="flex gap-4">
          {/* First Name */}
          <div className="relative group flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-white/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <input
              ref={firstNameRef}
              name="firstName"
              id="firstName"
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-label="First Name"
              className={`w-full bg-black/20 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} focus:border-[#8338ec] rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#8338ec] transition-all`}
            />
          </div>

          {/* Last Name */}
          <div className="relative group flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-white/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <input
              ref={lastNameRef}
              name="lastName"
              id="lastName"
              type="text"
              placeholder="Last Name"
              autoComplete="family-name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-label="Last Name"
              className={`w-full bg-black/20 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} focus:border-[#8338ec] rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#8338ec] transition-all`}
            />
          </div>
        </div>
        {(errors.firstName || errors.lastName) && <p className="text-red-400 text-xs pl-1">Please enter your full name.</p>}

        {/* Email */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-white/80 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <input
            ref={emailRef}
            name="email"
            id="email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck="false"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            required
            aria-label="Email Address"
            className={`w-full bg-black/20 border ${errors.email ? 'border-red-500' : 'border-white/10'} focus:border-[#8338ec] rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#8338ec] transition-all`}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1.5 pl-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col w-full relative">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-white/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <input
              ref={passwordRef}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-label="Create Password"
              className={`w-full bg-black/20 border ${errors.password ? 'border-red-500' : 'border-white/10'} focus:border-[#8338ec] rounded-xl py-3 pl-10 pr-10 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#8338ec] transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/80 focus-visible:outline-none rounded-r-xl transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={isSubmitting}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1.5 pl-1">{errors.password}</p>}
          {values.password.length > 0 && <div className="mt-2"><PasswordRequirements password={values.password} /></div>}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col w-full relative">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-white/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <input
              ref={confirmPasswordRef}
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-label="Confirm Password"
              className={`w-full bg-black/20 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} focus:border-[#8338ec] rounded-xl py-3 pl-10 pr-10 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#8338ec] transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/80 focus-visible:outline-none rounded-r-xl transition-colors"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              aria-pressed={showConfirmPassword}
              disabled={isSubmitting}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-400 text-xs mt-1.5 pl-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          {/* Terms Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              name="acceptedTerms"
              id="acceptedTerms"
              checked={values.acceptedTerms}
              onChange={handleChange}
              disabled={isSubmitting}
              className="sr-only peer"
            />
            <div className={`shrink-0 w-4 h-4 rounded-sm border ${errors.acceptedTerms ? 'border-red-500' : 'border-white/20'} bg-black/20 peer-checked:bg-[#8338ec] peer-checked:border-[#8338ec] flex items-center justify-center transition-colors`}>
              <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <span className="text-[13px] text-white/70 group-hover:text-white transition-colors leading-none pt-px">
              I agree to the <span className="text-[#8338ec]">Terms of Service</span> and <span className="text-[#8338ec]">Privacy Policy</span>
            </span>
          </label>

          {/* Marketing Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              name="acceptedMarketing"
              id="acceptedMarketing"
              checked={values.acceptedMarketing}
              onChange={handleChange}
              disabled={isSubmitting}
              className="sr-only peer"
            />
            <div className="shrink-0 w-4 h-4 rounded-sm border border-white/20 bg-black/20 peer-checked:bg-[#8338ec] peer-checked:border-[#8338ec] flex items-center justify-center transition-colors">
              <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <span className="text-[13px] text-white/70 group-hover:text-white transition-colors leading-none pt-px">
              Send me personalized updates and vibes
            </span>
          </label>
          
          {errors.acceptedTerms && <p className="text-red-400 text-xs pl-7">{errors.acceptedTerms}</p>}
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full relative overflow-hidden rounded-xl font-semibold text-white text-[15px] py-3.5 shadow-lg shadow-purple-900/20 transition-all hover:scale-[1.02] hover:shadow-purple-700/40 focus:outline-none focus:ring-2 focus:ring-[#8338ec] focus:ring-offset-2 focus:ring-offset-[#0d061a] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8338ec] via-[#ff0a54] to-[#ff7e67] opacity-90"></div>
            <div className="relative flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <Spinner size="sm" className="mr-2 border-white/50 border-t-white" />
                  Creating account...
                </>
              ) : (
                "✨ Create Account"
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
