import { styled, Box, Theme } from '@mui/system';
import { tokens } from '../../theme';
import { List, ListItemButton } from '@mui/material';

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Brand = styled(Box)({
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '30px 15px',
        cursor: 'pointer',
    });

    const NavItemButton = styled(ListItemButton)(({ theme }) => ({
        '&:hover': {
            backgroundColor: '#7875FE !important',
            color: '#fff',
            borderRadius: '4px',
            '& .MuiSvgIcon-root': {
                color: `${colors.white.DEFAULT} !important`,
            },
        },
        '&.active': {
            backgroundColor: '#7875FE !important',
            color: '#fff !important',
            borderRadius: '4px !important'
        },
    }));

    const NavBlock = styled(Box)({
        borderBottom: `1px solid ${colors.borderColor}`,
        width: '100%',
    });

    const NavList = styled(List)({
        marginBottom: '55px',
    });

    return { Brand, NavItemButton, NavBlock, NavList };
};
