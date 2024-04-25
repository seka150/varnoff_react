import { Box, Button, Grid, Theme, styled } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";


export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled(Grid)({
        flexGrow: 1,
        padding: '32px',
        display: 'flex',
        justifyContent: 'space-between', 
        width: '100%',
    });


    const TextFilding = styled (Box) ({
        display: 'flex',
        flexDirection: 'column',
        padding: 32,
        gap: '20px',
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 12,
        '& .MuiPaper-root': {
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',
            backgroundImage: 'none !important'
        }
    });

    const Buttons = styled (Box) ({
        display: 'flex',
        flexDirection: 'column',
        marginTop: '32px',
        padding: 32,
        gap: '20px',
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 12,
        '& .MuiPaper-root': {
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',
            backgroundImage: 'none !important'
        }
    });

    const SelectBox = styled (Box) ({
        width: '58%', 
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 12,
        padding: '32px'
    })

    const Autocompletebox = styled (Box) ({
        display: 'flex', 
        gap: '15px',
        marginBottom: '32px'
    })

    const ButtonSend = styled (Button) ({
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 5,
        color: `${colors.secondary.DEFAULT}`,
        '&:hover': {
            backgroundColor: `${colors.blue}`,
            color: `${colors.white.DEFAULT}`,
        }
    })

    const Table = styled (DataGrid) ({
        border: 'none !important',
        backgroundColor: `${
            theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
        }`,
        marginBottom: 32,
        minHeight: 270,
        borderRadius: 12,
        '&:hover .Mui-checked': { 
            backgroundColor: colors.blue,
            
        },
        '& .MuiPaper-root': {
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',
            backgroundImage: 'none !important'
        }
    })


    return {TextFilding, Root, Buttons, SelectBox, Autocompletebox, ButtonSend, Table}
}
