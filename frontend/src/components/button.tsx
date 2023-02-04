export const Button = ({
  title,
  handleClick,
  className,
  type,
}: {
  title: string;
  handleClick?: () => void;
  className: string;
  type?: "button" | "submit" | "reset";
  [key: string]: unknown;
}) => {
  return (
    <button
      className={className}
      onClick={handleClick}
      type={`${type ? type : "button"}`}
    >
      {title}
    </button>
  );
};
