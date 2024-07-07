import { useTheme } from "@mui/material";
import ServiceDataComponent from "components/service-data";
import React, { useEffect } from "react";
import { useStyled } from "./styles";
import { IAssetsService } from "common/types/service";
import { useAppDispatch, useAppSelector } from "utils/hook";
import { getService } from "store/thunks/service";

const ServicePage = () => {
    const theme = useTheme()
    const {Root, TopPriceRoot} = useStyled(theme)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getService());
    }, [dispatch]);

    const serviceArray: IAssetsService[] = useAppSelector(
        (state) => state.service.service
    )


    return (
    <Root>
        <TopPriceRoot container item xs={12} sm={12} lg={12}>
            <ServiceDataComponent service={serviceArray}/>
        </TopPriceRoot>
    </Root>
    )
}

export default ServicePage