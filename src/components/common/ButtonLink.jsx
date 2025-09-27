import { Link } from "react-router-dom";

const ButtonLink = ({ to, children, variant = "primary", ...props }) => {
  const base = "inline-block px-4 py-2 rounded-xl font-medium transition-colors";
  const styles = {
    primary: "bg-yellow-600 text-white hover:bg-yellow-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <Link
      to={to}
      className={`${base} ${styles[variant]}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
