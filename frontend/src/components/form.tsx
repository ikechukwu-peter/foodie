import React, { ReactElement, FormEvent, ReactNode } from "react";

export const Form = ({
  onSubmit,
  children,
  className,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};
