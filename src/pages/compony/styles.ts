import { Box, Grid, Theme } from "@mui/material";
import {styled} from "@mui/system"
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode)

    const Root = styled(Grid) ({
        padding: 32,
        '& a': {
            textDecoration: 'none',
            color: `${
                theme.palette.mode === 'light'
                    ? colors.black.DEFAULT
                    : colors.white.DEFAULT
            }`,
        },
    });

    const History = styled(Box) ({
        display: 'flex',
        backgroundColor: `${theme.palette.mode === 'light' ? colors.primary.DEFAULT : colors.primary[600]}`,
        padding: '20px 16px',
        minHeight: '185px',
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 12,
    });

    const HistoryText = styled(Box) ({
        width: '50%',
        textAlign: 'center'
    });

    const Image = styled('img') ({
        width: '80%',
        borderRadius: 12,
    });

    const Mission = styled(Box) ({
        paddingTop: '40px'
    });
    
        
        return {Root, History, HistoryText, Image, Mission};
        
    }
