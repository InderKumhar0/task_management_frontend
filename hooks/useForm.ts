import { useState, useCallback } from 'react';
import { ZodType, ZodError } from 'zod/v3';

interface UseFormOptions<T> {
  schema: ZodType<T, any, any>; // ✅ we use ZodObject instead of generic ZodSchema
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
}

export const useForm = <T extends Record<string, any>>({
  schema,
  initialValues,
  onSubmit,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      if (errors[name as keyof T]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      try {
        schema.parse(values[name]);
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      } catch (err) {
        if (err instanceof ZodError) {
          const fieldError = err.errors.find((e) => e.path[0] === name);
          setErrors((prev) => ({
            ...prev,
            [name]: fieldError?.message,
          }));
        }
      }
    },
    [schema, values]
  );

  const validateForm = useCallback(() => {
    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors = err.errors.reduce((acc, curr) => {
          const path = curr.path[0] as keyof T;
          acc[path] = curr.message;
          return acc;
        }, {} as Partial<Record<keyof T, string>>);
        setErrors(newErrors);
      }
      return false;
    }
  }, [schema, values]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        if (error && typeof error === 'object') {
          setErrors((prev) => ({
            ...prev,
            ...error,
          }));
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm, onSubmit]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldError: (field: keyof T, error: string) => {
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    setFieldValue: (field: keyof T, value: unknown) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
  };
};
