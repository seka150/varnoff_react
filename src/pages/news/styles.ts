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
    const BlockTitle = styled (Grid) ({
        textAlign: 'center',
        marginBottom: 32,
    });
    const NewsBlock = styled(Grid) ({
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
        },
    });

    const NewsTitle = styled(Box) ({
        marginBottom: 32,
    });
    const ReadMore = styled(Grid) ({
        textAlign: 'center',
    })
        
        return {Root, BlockTitle, NewsBlock,  NewsTitle, ReadMore};
        
    }
