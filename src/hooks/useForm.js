import { useState } from "react";

export function useForm({ initialValues = {}, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      await onSubmit(values);
    } catch (error) {
      // Allow onSubmit to handle its own errors, or catch them here
    } finally {
      setIsSubmitting(false);
    }
  };

  const setError = (name, message) => {
    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setError,
    setValues,
  };
}
