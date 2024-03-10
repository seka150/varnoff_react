
import { Grid, Theme, Typography } from "@mui/material";
import {styled} from "@mui/system"
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode)

        const Root = styled(Grid) ({
            padding: '10px, 20px',
        });
        const WatchlistHeading = styled(Grid) ({
            textAlign: 'center',
        });
        const Heading = styled(Typography) ({
            margin: '25px 0 !important',
        });
        const AssetsTableBlock = styled(Grid)({
            backgroundColor: `${
                theme.palette.mode === 'light'
                    ? colors.primary.DEFAULT
                    : colors.primary[600]
            }`,
            padding: '20px 16px',
            marginBottom: 32,
            minHeight: 270,
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 12,
            '& .MuiPaper-root': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important',
                backgroundImage: 'none !important',
            } 
        });
        
        return {AssetsTableBlock, Heading, WatchlistHeading, Root};
        
    }
