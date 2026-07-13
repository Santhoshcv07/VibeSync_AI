"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { LoginSuccessPreview } from "./login-success-preview";
import { ForgotPasswordPreview } from "./forgot-password-preview";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

type LoginFieldName = "email" | "password";

type LoginFormErrors = Partial<Record<LoginFieldName, string>>;

const isValidEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

export function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<LoginFieldName, boolean>>>({});
  
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSummaryAlert, setShowSummaryAlert] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateField = (name: LoginFieldName, currentValues: LoginFormValues): string | undefined => {
    switch (name) {
      case "email":
        if (!currentValues.email.trim()) return "Enter your email address.";
        if (!isValidEmail(currentValues.email.trim())) return "Enter a valid email address.";
        return undefined;
      case "password":
        if (!currentValues.password) return "Enter your password.";
        return undefined;
    }
  };

  const validateAll = (currentValues: LoginFormValues): LoginFormErrors => {
    const newErrors: LoginFormErrors = {};
    const fields: LoginFieldName[] = ["email", "password"];
    
    fields.forEach((field) => {
      const error = validateField(field, currentValues);
      if (error) newErrors[field] = error;
    });
    
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    const newValue = type === "checkbox" ? checked : value;
    const newValues = { ...values, [name]: newValue };
    setValues(newValues);

    if (name === "rememberMe") return;

    const fieldName = name as LoginFieldName;
    if (touched[fieldName] || showSummaryAlert) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, newValues),
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "rememberMe") return;

    const fieldName = name as LoginFieldName;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, values),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = validateAll(values);
    setErrors(newErrors);

    setTouched({ email: true, password: true });

    if (Object.keys(newErrors).length > 0) {
      setShowSummaryAlert(true);
      
      if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.password) passwordRef.current?.focus();
      
      return;
    }

    setShowSummaryAlert(false);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 750);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setValues({
      ...values,
      password: "",
      rememberMe: false
    });
    setTouched({});
    setErrors({});
    setShowSummaryAlert(false);
    
    setTimeout(() => {
      passwordRef.current?.focus();
    }, 0);
  };

  if (isSuccess) {
    return <LoginSuccessPreview onReset={handleReset} />;
  }

  return (
    <div className="w-full relative">
      <div aria-live="polite" className="sr-only">
        {isSubmitting ? "Checking your login details locally." : ""}
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
              placeholder="Password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-label="Password"
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
        </div>

        <div className="flex justify-between items-center pt-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              name="rememberMe"
              id="rememberMe"
              checked={values.rememberMe}
              onChange={handleChange}
              disabled={isSubmitting}
              className="sr-only peer"
            />
            <div className="w-4 h-4 rounded-sm border border-white/20 bg-black/20 peer-checked:bg-[#8338ec] peer-checked:border-[#8338ec] flex items-center justify-center transition-colors">
              <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <span className="text-[13px] text-white/70 group-hover:text-white transition-colors">Remember me</span>
          </label>
          <button 
            type="button" 
            onClick={() => setShowForgotModal(true)}
            className="text-[13px] text-[#ff7e67] hover:text-[#ff0a54] font-medium hover:underline focus-visible:outline-none transition-colors"
          >
            Forgot password?
          </button>
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
                  Logging in...
                </>
              ) : (
                "✨ Log In"
              )}
            </div>
          </button>
        </div>
      </form>
      
      <ForgotPasswordPreview open={showForgotModal} onOpenChange={setShowForgotModal} />
    </div>
  );
}
