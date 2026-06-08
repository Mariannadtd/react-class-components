type FieldErrorProps = {
  id: string;
  message?: string;
};

export const FieldError = ({ id, message }: FieldErrorProps) => (
  <p className="field-error" id={id} role="alert">
    {message || ' '}
  </p>
);
