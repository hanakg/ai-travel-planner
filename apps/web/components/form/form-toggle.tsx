import { cn } from "cn";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { FormField } from "./form-field";

type ToggleOption<T extends string> = {
  value: T;
  label: string;
};

type SingleProps<T extends string> = {
  type: "single";
  value: T;
  onValueChange: (value: T) => void;
};

type MultipleProps<T extends string> = {
  type: "multiple";
  value: T[];
  onValueChange: (value: T[]) => void;
};

type Props<T extends string> = {
  id: string;
  label: string;
  options: ToggleOption<T>[];
} & (SingleProps<T> | MultipleProps<T>);
export const FormToggle = <T extends string>({
  id,
  label,
  options,
  type,
  value,
  onValueChange,
}: Props<T>) => {
  const groupValue: T[] = type === "multiple" ? value : value ? [value] : [];

  const handleChange = (next: string[]) => {
    if (type === "multiple") {
      onValueChange(next as T[]);
    } else {
      onValueChange(next[0] as T);
    }
  };
  console.log(value);
  return (
    <FormField id={id} label={label}>
      <ToggleGroup
        {...(type === "multiple" && { multiple: true })}
        value={groupValue}
        onValueChange={handleChange}
        variant="outline"
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className="data-pressed:bg-accent data-pressed:text-accent-foreground data-pressed:border-accent-foreground rounded-2xl"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </FormField>
  );
};
