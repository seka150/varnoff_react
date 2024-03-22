import { styled, Theme } from "@mui/system";
import { AppBar, Toolbar } from "@mui/material";
import { tokens } from '../../theme'
import { MenuOutlined } from "@mui/icons-material";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode)

    const Toolbars = styled(Toolbar)({
        justifyContent: 'space-between',
        padding: '25px 45px',
    });

    const Root = styled (AppBar) ({
        position: 'static',
        background: `${colors.primary.DEFAULT} !important`,
        borderBottom: `1px solid ${colors.borderColor}`,
        boxShadow: 'none !important',
    });

    const MenuIcon = styled (MenuOutlined) ({
        marginRight: '10px',
        cursor: 'pointer',
    });

    return { Toolbars, Root, MenuIcon };
};
