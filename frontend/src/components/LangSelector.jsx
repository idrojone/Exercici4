import { LANG_OPTIONS } from "../utils/constants";

export default function LanguageSelector({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {LANG_OPTIONS.map(opt => <option key={opt.code} value={opt.code}>{opt.label}</option>)}
    </select>
  );
}