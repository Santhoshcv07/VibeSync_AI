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
      <div 
        aria-live="polite" 
        className="sr-only"
      >
        {isSubmitting ? "Checking your login details locally." : ""}
      </div>

      <form 
        noValidate 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5 w-full"
        aria-busy={isSubmitting}
      >
        {showSummaryAlert && Object.keys(errors).length > 0 && (
          <Alert variant="danger" title="Check your details" className="mb-2">
            Correct the highlighted fields and try again.
          </Alert>
        )}

        <Input
          ref={emailRef}
          label="Email address"
          name="email"
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck="false"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          disabled={isSubmitting}
          required
        />

        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex justify-between items-end mb-1">
            <label htmlFor="password" className="text-label text-foreground">
              Password<span aria-hidden="true" className="ml-1 text-danger">*</span>
            </label>
            <button 
              type="button" 
              onClick={() => setShowForgotModal(true)}
              className="text-body-sm text-[var(--primary)] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              ref={passwordRef}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              disabled={isSubmitting}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-[10px] text-foreground-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm z-10"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={isSubmitting}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Checkbox
            name="rememberMe"
            id="rememberMe"
            checked={values.rememberMe}
            onChange={handleChange}
            disabled={isSubmitting}
            label={
              <span className="font-normal text-body-sm">
                Remember me
              </span>
            }
            description="Prototype only — this preference is not stored."
          />
        </div>

        <div className="pt-4">
          <Button type="submit" variant="primary" fullWidth size="lg" disabled={isSubmitting} className="font-semibold text-body">
            {isSubmitting ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Checking details...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
      
      <ForgotPasswordPreview open={showForgotModal} onOpenChange={setShowForgotModal} />
    </div>
  );
}
