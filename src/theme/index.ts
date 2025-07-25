import { createContext, useState, useMemo } from 'react'
import { createTheme } from '@mui/material'

export const tokens = (mode: string) => ({
    ...(mode === 'dark'
        ? {
            primary: {
                DEFAULT: '#000000',
                100: '#000000',
                200: '#000000',
                300: '#000000',
                400: '#000000',
                500: '#0F0E0E',
                600: '#232323',
                700: '#3D3D3D',
                800: '#525252',
                900: '#5C5C5C',
            },
            secondary: {
                DEFAULT: '#7C7C7C',
            },
            black: {
                DEFAULT: '#000000',
                100: '#000000',
                200: '#000000',
                300: '#000000',
                400: '#000000',
                500: '#0F0E0E',
                600: '#292929',
                700: '#3D3D3D',
                800: '#525252',
                900: '#5C5C5C',
                1000: '#dfele4'
            },
            white: {
                DEFAULT: '#FFFFFF',
                100: '#F7F7F7',
            },
            gray: {
                DEFAULT: '#3C3C3C',
                100: '#eaeaee'
            },
            green: {
                DEFAULT: '#485935'
            },
            accentMain: '#0F0E0E',
            borderColor: '#3C3C3C',
            blue: '#93a267',
        }
        : {
            white: {
                DEFAULT: '#FFFFFF',
                100: '#F7F7F7',
                200: '#D1D1D1',
            },
            primary: {
                DEFAULT: '#FFFFFF',
                500: '#F7F7F7',
            },
            secondary: {
                DEFAULT: '#7C7C7C',
            },
            black: {
                DEFAULT: '#000000',
                100: '#525252',
                200: '#3D3D3D',
                300: '#292929',
                400: '#141414',
                500: '#000000',
                600: '#000000',
                700: '#000000',
                800: '#000000',
                900: '#000000',
                1000: '#4C5866'
            },
            gray: {
                DEFAULT: '#3C3C3C',
                100: '#85859B'
            },
            green: {
                DEFAULT: '#485935'
            },
            accentMain: '#F7F7F7',
            borderColor: '#3C3C3C',
            blue: '#93a267',
        }),
})

export const themeSettings: any = (mode: string) => {
    const colors = tokens(mode)
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.primary.DEFAULT,
                    },
                    secondary: {
                        main: colors.secondary.DEFAULT,
                    },
                    neutral: {
                        dark: colors.black[500],
                        light: colors.white[100],
                    },
                }
                : {
                    primary: {
                        main: colors.primary.DEFAULT,
                    },
                    secondary: {
                        main: colors.secondary.DEFAULT,
                    },
                    neutral: {
                        dark: colors.black[500],
                        light: colors.white[100],
                    },
                }),
        },
        typography: {
            fontFamily: ['Poppins', 'sans-serif'].join(','),
            fontSize: 14,
            h1: {
                fontFamily: ['Poppins', 'sans-serif'].join(','),
                fontSize: 40,
                fontWeight: 600,
            },
            h2: {
                fontFamily: ['Poppins', 'sans-serif'].join(','),
                fontSize: 35,
                fontWeight: 600,
            },
            h3: {
                fontFamily: ['Poppins', 'sans-serif'].join(','),
                fontSize: 30,
                fontWeight: 500,
            },
            h4: {
                fontFamily: ['Poppins', 'sans-serif'].join(','),
                fontSize: 25,
                fontWeight: 500,
            },
            p: {
                fontFamily: ['Poppins', 'sans-serif'].join(','),
                fontSize: 20,
            },
        },
    }
}

export const ColorModeContext = createContext<{ toggleColorMode: () => void }>({
    toggleColorMode: () => {},
})

export const useMode = () => {
    const getInitialMode = () => {
    const stored = localStorage.getItem('theme');
        return stored === 'light' || stored === 'dark' ? stored : 'dark';
    };
    
    const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode);
    
        const colorMode = useMemo(() => ({
        toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme', newMode); // сохраняем тему
        }
        }), [mode]);
    
        const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    
        return [theme, colorMode] as const;
    };