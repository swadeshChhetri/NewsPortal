// 2. Input Field
export const Input = ({ type = "text", placeholder, ...props }) => (
  <input
  type={type}
  placeholder={placeholder}
  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-600 focus:outline-none"
  {...props}
  />
  );