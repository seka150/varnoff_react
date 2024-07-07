import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface CardProps {
    title: string;
    description: string;
    image: string;
}

const CustomCard = styled(Card)(({ theme }) => ({
    maxWidth: 300,
    margin: theme.spacing(2),
    backgroundColor: 'transporent '
}));

const CardComponent: React.FC<CardProps> = ({ title, description, image }) => {
    return (
        <CustomCard>
        <CardMedia
            component="img"
            height="140"
            image={image}
            alt={title}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {description}
            </Typography>
        </CardContent>
        </CustomCard>
  );
};

export default CardComponent;
