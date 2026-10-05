import { cn } from "cn";
import { Input } from "../ui/input";
import { FormField } from "./form-field";

type FormFieldProps = {
  id: string;
  label: string;
  description?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof Input>;

export const FormInput: React.FC<FormFieldProps> = ({
  id,
  label,
  description,
  placeholder,
  icon,
  className,
  ...props
}) => {
  return (
    <FormField id={id} label={label} description={description} icon={icon}>
      <Input
        id={id}
        className={cn("h-11.5", icon && "pl-9", className)}
        placeholder={placeholder}
        {...props}
      />
    </FormField>
  );
};
