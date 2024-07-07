import React from "react";
import { Grid, useTheme } from "@mui/material";
import { IAssetsService, MenuServiceProps } from "common/types/service";
import useStyled from "./styles";

const MenuService: React.FC<MenuServiceProps> = (props) => {
    const { service, handleServiceSelect } = props;
    const theme = useTheme();
    const { StyledButton } = useStyled(theme);

    const handleButtonClick = (item: IAssetsService) => {
        try {
            if (!item.url) {
                console.error("URL не может быть пустым");
                return;
            }
            handleServiceSelect(item);
        } catch (error) {
            console.error("Ошибка при вызове handleServiceSelect:", error);
        }
    };

    const serviceArray = Object.values(service); 

    const flatServiceArray = serviceArray.flat();

    const serviceWithIds = flatServiceArray.map((service, index) => (
        <StyledButton onClick={() => handleButtonClick(service)} type="button" key={index}>
            {service.name}
        </StyledButton>
    ));
    

    return (
        <Grid container>
            {serviceWithIds}
        </Grid>
    );
}

export default MenuService;
