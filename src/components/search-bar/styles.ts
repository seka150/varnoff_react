import { styled, Theme } from "@mui/system";
import { tokens } from "../../theme";
import { Grid, IconButton, InputBase } from "@mui/material";

export const useStyles = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const SearchIcon = styled(IconButton)({
        '&:hover': {
            backgroundColor: 'transparent',
        },
    });

    const SearchBlock = styled(Grid)({
        display: 'flex',
        maxHeight: '45px',
        borderRadius: '8px',
        backgroundColor: `${colors.primary[600]}`,
    });

    const SearchInput = styled(InputBase)({
        padding: '12px 18px',
    });

    return { SearchInput, SearchBlock, SearchIcon };
};

