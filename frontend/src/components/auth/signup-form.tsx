"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { PasswordRequirements } from "./password-requirements";
import { SignupSuccessPreview } from "./signup-success-preview";
import Link from "next/link";

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

type SignupFieldName =
  | "fullName"
  | "email"
  | "password"
  | "confirmPassword"
  | "acceptedTerms";

type SignupFormErrors = Partial<Record<SignupFieldName, string>>;

const isStrongPassword = (p: string) => p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p);
const isValidEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

export function SignupForm() {
  const [values, setValues] = useState<SignupFormValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<SignupFieldName, boolean>>>({});
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSummaryAlert, setShowSummaryAlert] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const validateField = (name: SignupFieldName, currentValues: SignupFormValues): string | undefined => {
    switch (name) {
      case "fullName":
        if (!currentValues.fullName.trim()) return "Enter your full name.";
        if (currentValues.fullName.trim().length < 2) return "Enter your full name.";
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
        if (!currentValues.acceptedTerms) return "Accept the terms and privacy agreement to continue.";
        return undefined;
    }
  };

  const validateAll = (currentValues: SignupFormValues): SignupFormErrors => {
    const newErrors: SignupFormErrors = {};
    const fields: SignupFieldName[] = ["fullName", "email", "password", "confirmPassword", "acceptedTerms"];
    
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = validateAll(values);
    setErrors(newErrors);

    const allTouched: Partial<Record<SignupFieldName, boolean>> = {
      fullName: true, email: true, password: true, confirmPassword: true, acceptedTerms: true
    };
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      setShowSummaryAlert(true);
      
      // Focus first invalid field
      // We must use setTimeout 0 to allow React to flush state to the DOM (aria-invalid) if we were relying on it,
      // but we can just focus the ref directly.
      if (newErrors.fullName) nameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.password) passwordRef.current?.focus();
      else if (newErrors.confirmPassword) confirmPasswordRef.current?.focus();
      else if (newErrors.acceptedTerms) termsRef.current?.focus();
      
      return;
    }

    setShowSummaryAlert(false);
    setIsSubmitting(true);

    // Prototype loading behavior
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
      confirmPassword: "",
      acceptedTerms: false
    });
    setTouched({});
    setErrors({});
    setShowSummaryAlert(false);
    
    setTimeout(() => {
      passwordRef.current?.focus();
    }, 0);
  };

  if (isSuccess) {
    return <SignupSuccessPreview onReset={handleReset} />;
  }

  return (
    <div className="w-full relative">
      <div 
        aria-live="polite" 
        className="sr-only"
      >
        {isSubmitting ? "Checking your signup details." : ""}
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
          ref={nameRef}
          label="Full name"
          name="fullName"
          id="fullName"
          placeholder="Enter your full name"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          disabled={isSubmitting}
          required
        />

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
          <label htmlFor="password" className="text-label text-foreground">
            Password<span aria-hidden="true" className="ml-1 text-danger">*</span>
          </label>
          <div className="relative">
            <Input
              ref={passwordRef}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
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
          {values.password.length > 0 && <PasswordRequirements password={values.password} />}
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="confirmPassword" className="text-label text-foreground">
            Confirm password<span aria-hidden="true" className="ml-1 text-danger">*</span>
          </label>
          <div className="relative">
            <Input
              ref={confirmPasswordRef}
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your password again"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              disabled={isSubmitting}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-3 top-[10px] text-foreground-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm z-10"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              aria-pressed={showConfirmPassword}
              disabled={isSubmitting}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Checkbox
            ref={termsRef}
            name="acceptedTerms"
            id="acceptedTerms"
            checked={values.acceptedTerms}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.acceptedTerms}
            disabled={isSubmitting}
            required
            label={
              <span className="font-normal text-body-sm">
                I agree to the Terms of Use (prototype copy) and the{" "}
                <Link 
                  href="/privacy" 
                  className="text-[var(--primary)] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm"
                >
                  Privacy Policy
                </Link>.
              </span>
            }
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
              "Create My Account"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
