import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import { IAssetsService, ISingleAssetsService } from "common/types/service";
import { useStyled } from "./styles";
import { useNavigate } from "react-router-dom";

const ServiceDataComponent = (props: ISingleAssetsService) => {
    const theme = useTheme();
    const { Root, Cards, CardsButton, CardsButtonWhite } = useStyled(theme);
    const { service } = props;

    const serviceArray = Object.values(service);
    const flatServiceArray = serviceArray.flat();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<IAssetsService | null>(null);

    const serviceWithIds = flatServiceArray.map((service, index) => ({
        id: index + 1,
        name: service.name,
        description: service.description,
        price: service.price,
        url: service.url,
        image: service.img
    }));

    const handleSelectItem = (e: React.MouseEvent, value: { name: string; url: string }) => {
        if (value) {
            navigate(`/single/${value.url}`, { state: { url: value.url } });
            setSelectedItem(null);
        }
    };

    const handleClickCreateOrder = () => {
        navigate('/watchlist'); 
    };

    return (
        <Root>
            {serviceWithIds.map((service) => (
                <Cards key={service.id}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={service.image || '/default-image.jpg'} 
                        alt={service.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {service.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {service.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <CardsButton size="small" onClick={handleClickCreateOrder}>Создать заявку</CardsButton>
                        <CardsButtonWhite
                            size="small"
                            onClick={(e) => handleSelectItem(e, { name: service.name, url: service.url })}
                        >
                            Подробнее
                        </CardsButtonWhite>
                    </CardActions>
                </Cards>
            ))}
        </Root>
    );
};

export default ServiceDataComponent;
