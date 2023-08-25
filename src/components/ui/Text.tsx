import { clsx } from "clsx";

const sizes = {
  sm: "font-medium text-sm leading-normal",
  base: "font-medium text-base leading-normal",
  lg: "font-semibold text-lg md:text-2xl leading-relaxed",
  xl: "font-semibold text-xl md:text-3xl leading-relaxed",
};

const variants = {
  gray: "text-gray-600",
  white: "text-white",
  dark: "text-gray-900",
};

type asKey = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
type sKey = keyof typeof sizes;
type vKey = keyof typeof variants;

interface HeaderProps {
  size?: sKey;
  variant?: vKey;
  as?: asKey;
  className?: string;
  children: React.ReactNode;
}

const Text = ({
  size = "base",
  variant = "dark",
  as = "p",
  className,
  children,
}: HeaderProps) => {
  const Tag = as;

  return (
    <Tag className={clsx(sizes[size], variants[variant], className)}>
      {children}
    </Tag>
  );
};

export default Text;
