import { FC } from "react";
import { Grid, useTheme } from "@mui/material";
import { useStyled } from "./styles";
import ServicePage from "pages/service";

import StatusComponent from "components/status";


const HomePage: FC = (): JSX.Element => {
    const theme = useTheme()
    const { Root} = useStyled(theme)

    return(
        <>
        <Root>
            <StatusComponent/>
        </Root>
        <Grid item lg={12} md={12} xs={12}>
            <ServicePage/>
        </Grid>
        </>
    )
}

export default HomePage;