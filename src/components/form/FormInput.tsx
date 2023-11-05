import { HTMLInputTypeAttribute } from "react";

import { FieldValues, useController, UseControllerProps, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

export default function FormInput<T extends FieldValues>(
  props: UseControllerProps<T> & {
    placeholder?: string;
    label?: string;
    type?: HTMLInputTypeAttribute;
    className?: string;
  },
) {
  const { name, placeholder, label, type, className } = props;
  const { field, fieldState } = useController<T>(props);
  const context = useFormContext();

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <Label htmlFor={name} className="mb-1">
          {label}
        </Label>
      )}
      <Input
        {...field}
        onChange={(e) => {
          if (type === "number" && context) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-explicit-any
            context.setValue(name, Number(e.target.value) as any)
          } else {
            field.onChange(e);
          }
        }}
        id={name}
        placeholder={placeholder}
        className={`${fieldState.error && "border-destructive"}`}
        type={type}
      />
      {fieldState.error && <span className="text-xs text-destructive">{fieldState.error.message}</span>}
    </div>
  );
}
