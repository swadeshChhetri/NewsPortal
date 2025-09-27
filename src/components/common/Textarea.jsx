// 3. Textarea
export const Textarea = ({ placeholder, ...props }) => (
  <textarea
  placeholder={placeholder}
  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-600 focus:outline-none"
  rows="4"
  {...props}
  />
  );