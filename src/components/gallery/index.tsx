import React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import { useStyled } from "./slyles";

const GalleryComponent = () => {
    const CardsContent = [
        {
        id: 1,
        image: `https://optim.tildacdn.com/tild6233-3832-4566-b564-613635353137/-/format/webp/QvFxa7sDke4.jpg`,
        title: "Навес 7х6 метров",
        task: "Сделать навес на 4 автомобиля для хозяев и гостей дома",
        disc: 'Материал кровли - сотовый поликарбонат (СПК) - 10 мм NOVATTRO цвета "БРОНЗА"',
        },
        {
        id: 2,
        image: "https://optim.tildacdn.com/tild3434-3364-4663-a538-633234633733/-/format/webp/16.jpg",
        title: "Навес для двух автомобилей 7х8 метров",
        task: "Сделать навес для двух автомобилей",
        disc: 'Материал кровли - сотовый поликарбонат (СПК) - 10 мм NOVATTRO цвета "Янтарь"',
        },
        {
        id: 3,
        image: "https://optim.tildacdn.com/tild6631-6662-4634-a538-373836316365/-/format/webp/21.jpg",
        title: "Навес для двух автомобилей 7х9 метров.",
        task: "Сделать навес для четырех автомобилей",
        disc: 'Материал кровли - сотовый поликарбонат (СПК) - 10 мм NOVATTRO цвета "Янтарь"',
        },
    ];

    const theme = useTheme();
    const {ButtonKatal, ButtonContainer} = useStyled(theme);

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", padding: 2 }}>
        {CardsContent.map((card) => (
            <Card key={card.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={card.image} alt={card.title} />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {card.task}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 1 }}>
                    {card.disc}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <ButtonContainer>
                <ButtonKatal size="small">
                    Подробнее
                </ButtonKatal>
                </ButtonContainer>
            </CardActions>
            </Card>
        ))}
        </Box>
    );
    };

export default GalleryComponent;
