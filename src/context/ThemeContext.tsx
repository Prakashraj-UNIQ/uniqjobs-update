// app/context/ThemeContext.tsx
'use client';

import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type SetStateAction,
    type ReactNode,
} from 'react';

export type NavStyle = {
    dropdownTextColor: string;
};

export type ThemeContextValue = {
    navStyle: NavStyle;
    setNavStyle: Dispatch<SetStateAction<NavStyle>>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [navStyle, setNavStyle] = useState<NavStyle>({
        dropdownTextColor: 'text-white',
    });

    return (
        <ThemeContext.Provider value={{ navStyle, setNavStyle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return ctx;
}

export default ThemeContext;
