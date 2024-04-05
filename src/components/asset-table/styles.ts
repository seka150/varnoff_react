import { TableCell, Theme } from "@mui/material";
import {styled} from "@mui/system"


export const useStyled = (theme: Theme) => {
    
    const PriceUp = styled(TableCell)({
        color: '#a9ffa7 !important',
        
        
        
    });

    const PriceDown = styled(TableCell) ({
        color: '#ffa7a7 !important'
    }); 

    return {PriceDown, PriceUp };
};