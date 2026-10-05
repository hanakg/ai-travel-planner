import { PropsWithChildren } from "react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";

type FormFieldProps = {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

export const FormField: React.FC<PropsWithChildren<FormFieldProps>> = ({
  id,
  label,
  description,
  icon,
  children,
}) => {
  return (
    <Field className="flex flex-col gap-1">
      <FieldLabel className="text-xs" htmlFor={id}>
        {label}
      </FieldLabel>

      <div className="relative">
        {children}

        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            {icon}
          </span>
        )}
      </div>
      {description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
    </Field>
  );
};
