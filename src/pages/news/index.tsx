import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { getNews } from '../../store/thunks/news'
import { Box, Grid, Link, Typography, useTheme } from '@mui/material'
import { useStyled } from './styles'

const NewsPage: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const { news } = useAppSelector((state) => state.news)
    const theme = useTheme()
    const { Root, BlockTitle, NewsBlock, NewsTitle, ReadMore } = useStyled(theme)

    useEffect(() => {
        dispatch(getNews())
    }, [dispatch])

    return (
        <Root>
            <BlockTitle>
                <Typography variant="h2">Новости</Typography>
            </BlockTitle>
            <Grid container spacing={2}> 
                {news.map((element: any) => (
                    <Grid item xs={12} key={element.id}> 
                        <NewsBlock>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <img src={element.imageurl} alt={element.category} style={{ width: '100%' }} /> 
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <NewsTitle>
                                        <Typography variant="h3">{element.title}</Typography>
                                    </NewsTitle>
                                    <Box>
                                        <Typography variant="body1">{element.body}</Typography>
                                    </Box>
                                </Grid>
                                <ReadMore item xs={12} md={12}>
                                    <Typography variant="h4">
                                        <Link href={element.url}>Read more</Link>
                                    </Typography>
                                </ReadMore>
                            </Grid>
                        </NewsBlock>
                    </Grid>
                ))}
            </Grid>
        </Root>
    )
}

export default NewsPage
