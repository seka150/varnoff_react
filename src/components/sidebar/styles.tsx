import { makeStyles } from "@mui/styles";
import { tokens } from "../../theme";
import { Theme } from "@mui/material";

export const useStyles = makeStyles ((theme: Theme)=> {
    const colors = tokens(theme.palette.mode)
    return(
        {
            brand : {
                display: 'flex',
                alignItems:'center', 
                gap:'10px', 
                padding:'30px 15px',
                cursor: 'pointer'
            },
            navItem : {
                '&:hover': {
                    backgroundColor: '#1900d5 !important',
                    color: '#fff',
                    borderRadius: '4px',
                    '& .MuiSvgIcon-root': {
                        color: `${colors.white.DEFAULT} !important`
                    }
                }
            },
            navBlock: {
                borderBottom: `1px solid ${colors.borderColor}`,
                width:'100%' 
            },
            navList: {
                marginBottom: '55px'
            }
        }
    )
})