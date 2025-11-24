// import { LANG_OPTIONS } from "../utils/constants";

// export default function LanguageSelector({ value, onChange }) {
//   return (
//     <select 
//       value={value} 
//       onChange={e => onChange(e.target.value)}
//       className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//     >
//       {LANG_OPTIONS.map(opt => <option key={opt.code} value={opt.code}>{opt.label}</option>)}
//     </select>
//   );
// }

import { LANG_OPTIONS } from "../utils/constants"
import { useLang } from "../contexts/LangContext.jsx"

export default function LanguageSelector() {
  const { selectedLang, setSelectedLang } = useLang()
  return (
    <select 
      value={selectedLang} 
      onChange={e => setSelectedLang(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
      {LANG_OPTIONS.map(opt => <option key={opt.code} value={opt.code}>{opt.label}</option>)}
    </select>
  );
}