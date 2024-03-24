import { Theme } from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled(DataGrid)({
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
    });

    return { Root };
};
