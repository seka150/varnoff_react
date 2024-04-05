import {styled} from "@mui/system"
import { Theme} from "@mui/material";
import { tokens } from "../../theme"

const useStyled = (theme: Theme) => {

    const colors = tokens(theme.palette.mode);

    const StyledButton = styled('button')({
        margin: 10,
        color: `${colors.secondary.DEFAULT}`,
        backgroundColor: 'transparent',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1, 2),
        border: `1px solid ${colors.borderColor}`,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
        width: 200,
        height: '50px',
        "&:hover": {
            backgroundColor: `${colors.blue}`,
            color: `${colors.white.DEFAULT}`
        },
        "&:focus": {
            outline: 'none',
        },
    });
        
        return { StyledButton };
}

export default useStyled