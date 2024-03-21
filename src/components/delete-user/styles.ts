import { Grid, Theme, styled } from "@mui/material";

export const useStyled = (theme: Theme) => {
    const TabHeading = styled (Grid) ({
        width: '100%',
        textAlign: 'center',
        marginBottom: '32px !important',
    });

    const AlertMessage = styled (Grid) ({
        width: '100%',
        textAlign: 'center',
        marginBottom: '32px !important',
    });

    const CheckBoxBlock = styled (Grid) ({
        width: '100%',
        marginBottom: '32px !important',
    });

    const ButtonBlock = styled (Grid) ({
        width: '100%',
        textAlign: 'center',
    })

    return {TabHeading, AlertMessage, CheckBoxBlock, ButtonBlock}
}
