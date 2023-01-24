import { FormEvent } from "react";

export const TextArea = ({
  placeholder,
  onChange,
  className,
  rows,
  ...rest
}: {
  placeholder: string;
  onChange: (e: FormEvent<HTMLTextAreaElement>) => void;
  className: string;
  rows: number;
  [key: string]: unknown;
}) => {
  return (
    <textarea
      className={`${className} resize-y`}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
};
