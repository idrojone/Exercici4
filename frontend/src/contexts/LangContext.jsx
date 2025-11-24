import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext()

export function LangProvider({ children }) {
    const [selectedLang, setSelectedLang] = useState(() => {
        try {
            return localStorage.getItem('selectedLang') || 'en'
        } catch { return 'en' }
    })

    useEffect(() => {
        try { localStorage.setItem('selectedLang', selectedLang) } catch {}
    }, [selectedLang])

    return (
        <LangContext.Provider 
            value={{
                selectedLang, setSelectedLang
            }}>
            {children}
        </LangContext.Provider>
    )
}

export function useLang() {
  return useContext(LangContext)
}