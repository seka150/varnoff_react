import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { getNews } from '../../store/thunks/news'
import { Box, Grid, Link, Typography, useTheme } from '@mui/material'
import { useStyled } from './styles'

const NewsPage: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const { news } = useAppSelector((state) => state.news)
    const theme = useTheme()
    const {Root, BlockTitle, NewsBlock,  NewsTitle, ReadMore} = useStyled(theme)

    const renderNewsBlock = news.map((element: any) => (
        <NewsBlock container key={element.id}>
            <Grid  item xs={12} md={3}>
                <img src={element.imageurl} alt={element.category} />
            </Grid>
            <Grid item xs={12} md={9}>
                <NewsTitle>
                    <Typography variant="h3">{element.title}</Typography>
                </NewsTitle>
                <Box>
                    <Typography variant="body1">{element.body}</Typography>
                </Box>
            </Grid>
            <ReadMore item xs={12} md={12} >
                <Typography variant="h4">
                    <Link href={element.url}>Read more</Link>
                </Typography>
            </ReadMore>
        </NewsBlock>
    ))

    useEffect(() => {
        dispatch(getNews())
    }, [dispatch])

    return (
        <Root >
            <BlockTitle >
                <Typography variant="h2">Новости</Typography>
            </BlockTitle>
            <Grid>{renderNewsBlock}</Grid>
        </Root>
    )
}

export default NewsPage