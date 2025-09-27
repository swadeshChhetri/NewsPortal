import { ChevronDown } from "lucide-react";

export const Select = ({ options = [], ...props }) => (
  <div className="relative">
    <select
      className="appearance-none px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
      {...props}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
  </div>
);

export default Select;
