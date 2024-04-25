import { Box, Grid, Typography, useTheme } from '@mui/material'
import { AboutUs } from 'common/moks/about-us'
import FlexBetweenComponent from 'components/flex-between'
import React from 'react'
import { useStyled } from './styles'

const CompanyPage = () => {
    const theme = useTheme()
    const {Root, History, HistoryText, Image, Mission} = useStyled(theme)

        return (
        <Root>
            <History>
                <HistoryText>
                    <Typography variant='h3'>
                        Наша история
                    </Typography>
                    <Typography sx={{marginTop: '20px'}}>
                        {AboutUs.history}
                    </Typography>
                </HistoryText>
                <HistoryText>
                    <Image src='https://varnoff.ru/assets/img/web7.jpg'/>
                </HistoryText>
            </History>
            <Mission>
                <Typography>
                    Миссия
                </Typography>
                <FlexBetweenComponent>
                <Box>
                    {AboutUs.inovation}
                </Box>
                <Box>
                    {AboutUs.litelive}
                </Box>
                <Box>
                    {AboutUs.development}
                </Box>
                </FlexBetweenComponent>
            </Mission>
            <Box>
                Партнеры
            </Box>
            <Box>
                Отзывы
            </Box>
            <Box>
            Контактная информация
            </Box>
        </Root>
    )
}

export default CompanyPage