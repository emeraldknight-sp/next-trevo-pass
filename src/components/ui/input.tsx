import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  icon?: React.ReactNode;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  required?: boolean;
}

export const Input = ({
  label,
  name,
  icon,
  placeholder,
  type,
  register,
  errors,
  required = false,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        {icon && <span className="text-slate-500">{icon}</span>}
        <input
          id={name}
          type={type}
          placeholder={placeholder || label}
          className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1"
          autoComplete={name}
          required={required}
          {...register(name, { required })}
        />
      </div>
      {errors && errors[name] && (
        <span className="text-red-500 text-xs font-ubuntu">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};
