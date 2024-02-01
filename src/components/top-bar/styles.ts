import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { tokens } from "../../theme";

export const useStyles = makeStyles((theme: Theme)=> {
    const colors = tokens(theme.palette.mode)
    return(
        {
            searchIcon: {
                '&:hover': {
                    backgroundColor: 'transparent',
                }
            },
            root: {
                boxShadow: 'none !important',
                background: `${colors.primary.DEFAULT} !important`,
                borderBottom: `1px solid ${colors.borderColor}`
            },
            themeIcon: {
                marginRight: '45px'
            },
            searchBlock: {
                display: 'flex',
                maxHeight: '45px',
                borderRadius: '8px',
                backgroundColor: `${colors.primary[600]}`,
                marginLeft: '28px'
            },
            searchInput: {
                padding: '12px 18px'
            },
            iconBlock: {
                paddingRight: '37px', 
                borderRight: `1px solid ${colors.borderColor}`,
                paddingTop: '10px'
            },
            toolbar: {
                justifyContent: 'space-between',
                padding: '25px 45px'
            }, 
            menuIcon: {
                marginRight: '10px',
                cursor: 'pointer'
            }
        }
    )
})