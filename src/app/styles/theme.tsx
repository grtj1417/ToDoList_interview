import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        text: {
            primary: '#EBEBEB',
            secondary: '#757575',
        },
        error: {
            main: '#F05B56',
        },
        background: {
            default: '#1A1A1A',
            paper: '#1A1A1A',
        },
    },
    typography: {
        fontSize: 12,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export default theme;