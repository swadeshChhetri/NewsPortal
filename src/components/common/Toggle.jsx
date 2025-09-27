// 7. Toggle / Switch
export const Toggle = ({ checked, onChange }) => (
  <button
  onClick={() => onChange(!checked)}
  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors
  ${checked ? "bg-yellow-600" : "bg-gray-400"}`}
  >
  <div
  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform
  ${checked ? "translate-x-6" : "translate-x-0"}`}
  ></div>
  </button>
  );