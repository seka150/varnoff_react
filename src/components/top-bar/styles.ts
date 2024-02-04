import { styled, Theme } from "@mui/system";
import { tokens } from "../../theme";
import { Grid, IconButton, InputBase, Toolbar } from "@mui/material";

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
        marginLeft: '28px',
    });

    const SearchInput = styled(InputBase)({
        padding: '12px 18px',
    });

    const IconBlock = styled(Grid)({
        paddingRight: '37px',
        borderRight: `1px solid ${colors.borderColor}`,
        paddingTop: '10px',
    });

    const Toolbars = styled(Toolbar)({
        justifyContent: 'space-between',
        padding: '25px 45px',
    });

    return { Toolbars, IconBlock, SearchInput, SearchBlock, SearchIcon };
};

