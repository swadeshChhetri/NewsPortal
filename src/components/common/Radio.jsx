// 6. Radio Button
export const Radio = ({ label, name, ...props }) => (
  <label className="flex items-center gap-2 cursor-pointer">
  <input type="radio" name={name} className="accent-yellow-600" {...props} />
  <span>{label}</span>
  </label>
  );