import { useState, type ChangeEvent, type FormEvent } from "react";

const useValidateForm = <T extends Record<string, any>>(
  initialValue: T,
  validate: (values: T) => Partial<T>,
  onSubmit: (values: T) => void
) => {
  const [values, setValues] = useState<T>(initialValue);
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    if (errors[name as keyof T]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validateErrors = validate(values);

    if (Object.keys(validateErrors).length === 0) {
      onSubmit(values);
    } else {
      setErrors(validateErrors);
    }
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useValidateForm;
