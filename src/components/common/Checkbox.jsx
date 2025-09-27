// 5. Checkbox
export const Checkbox = ({ label, ...props }) => (
  <label className="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="accent-yellow-600" {...props} />
  <span>{label}</span>
  </label>
  );