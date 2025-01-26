import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import { ISingleAssetsService } from "common/types/service";
import { useStyled } from "./styles";

const ServiceDataComponent = (props: ISingleAssetsService) => {
    const theme = useTheme();
    const {Root, Cards, CardsButton, CardsButtonWhite} = useStyled(theme);
    const { service } = props;

    const serviceArray = Object.values(service); 
    const flatServiceArray = serviceArray.flat();

    const CardImage = [
        "https://i.pinimg.com/736x/e9/21/cd/e921cdbaab699b88fc5e1a44edb86f67.jpg",
        "https://i.pinimg.com/736x/45/c4/98/45c4981be65e53b13d364eb4da3c9fc3.jpg",
        "https://i.pinimg.com/736x/f8/cd/f0/f8cdf056372449d6edfcc03b96ed40c7.jpg",
        "https://i.pinimg.com/736x/64/e1/93/64e193dffb289c39958be0fc73028784.jpg",
        "https://i.pinimg.com/736x/da/d0/ea/dad0ea75fdf55609a884d0b554cdbe83.jpg",
        "https://i.pinimg.com/736x/6d/51/e3/6d51e3565f2c60f5330eb87f49ad12c5.jpg",
        "https://i.pinimg.com/736x/2e/88/03/2e8803c93f399a82f7de4b1fd376876d.jpg",
        "https://i.pinimg.com/736x/07/c3/67/07c367bf473c1a26060c63839d5664c4.jpg",
        "https://i.pinimg.com/736x/ff/12/b0/ff12b0de2a700cc6d87efd4a31b15e5c.jpg"
    ];
    
    const serviceWithIds = flatServiceArray.map((service, index) => ({
        id: index + 1,
        name: service.name,
        description: service.description,
        price: service.price,
        url: service.url,
        image: CardImage[index % CardImage.length],
    }));

    const handleClickCreateOrder = () => {
        window.location.href = '/watchlist'
    }
        return (
            <Root>
                {serviceWithIds.map((service) => (
                    <Cards key={service.id}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={service.image}
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
                            <CardsButtonWhite size="small">Подробнее</CardsButtonWhite>
                        </CardActions>
                    </Cards>
                ))}
            </Root>
        );
    };

export default ServiceDataComponent;
