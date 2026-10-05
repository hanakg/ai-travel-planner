import { cn } from "cn";
import { Input } from "../ui/input";
import { FormField } from "./form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CreateTripValues } from "@/schemas/trip";
import { useController, useFormContext } from "react-hook-form";
type SelectOption = {
  value: string;
  label: string;
};

type FormFieldProps = {
  id: string;
  label: string;
  name: keyof CreateTripValues;
  placeholder?: string;
  icon?: React.ReactNode;
  options: SelectOption[];
};

export const FormSelect: React.FC<FormFieldProps> = ({
  id,
  label,
  name,
  placeholder,
  icon,
  options,
}) => {
  const { control } = useFormContext<CreateTripValues>();

  const { field, fieldState } = useController({
    name: name,
    control,
  });

  return (
    <FormField id={id} label={label} icon={icon}>
      <Select
        id={id}
        value={(field.value as unknown) ?? ""}
        onValueChange={field.onChange}
      >
        <SelectTrigger className={cn("min-h-11.5 w-full", icon && "pl-9")}>
          <SelectValue placeholder={placeholder}>
            {(value) => options.find((o) => o.value === value)?.label}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
};
