import React from 'react';
import { Box, Typography, useTheme, Container, Grid, Paper, Link } from '@mui/material';
import { useStyled } from './styles';
import { AboutUs } from 'common/moks/about-us';

const CompanyPage = () => {
  const theme = useTheme();
  const { Root, History, HistoryText, InnovationBox, InnovationItem, ContactInfo } = useStyled(theme);

  return (
    <Root>
      <Container>
        <History>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <HistoryText>
                <Typography variant='h1'>
                  V@RNOFF
                </Typography>
                <Typography variant='h5' sx={{ marginTop: theme.spacing(2) }}>
                  Интернет-Агентство Варнофф может предложить полный спектр услуг в области Интернет бизнеса, как стандартные и простые решения так и оригинальные идеи.
                </Typography>
              </HistoryText>
            </Grid>
            <Grid item xs={12} md={6}>
              <InnovationBox>
                <InnovationItem>
                  {AboutUs.inovation}
                </InnovationItem>
                <InnovationItem>
                  {AboutUs.litelive}
                </InnovationItem>
                <InnovationItem>
                  {AboutUs.development}
                </InnovationItem>
              </InnovationBox>
            </Grid>
          </Grid>
        </History>
        <ContactInfo>
          <Typography variant='h6'>
            Контактная информация
          </Typography>
          <Box sx={{ marginTop: theme.spacing(2) }}>
            <Typography variant='body1'>
              <strong>Адрес:</strong> 123456, Москва, ул. Примерная, д. 1
            </Typography>
            <Typography variant='body1'>
              <strong>Телефон:</strong> +7 (495) 123-45-67
            </Typography>
            <Typography variant='body1'>
              <strong>Email:</strong> <Link href="mailto:info@varnoff.ru">info@varnoff.ru</Link>
            </Typography>
            <Typography variant='body1'>
              <strong>Социальные сети:</strong>
            </Typography>
            <Box sx={{ display: 'flex', gap: theme.spacing(2), marginTop: theme.spacing(1) }}>
              <Link href="https://facebook.com/varnoff" target="_blank" rel="noopener noreferrer">
                Facebook
              </Link>
              <Link href="https://twitter.com/varnoff" target="_blank" rel="noopener noreferrer">
                Twitter
              </Link>
              <Link href="https://instagram.com/varnoff" target="_blank" rel="noopener noreferrer">
                Instagram
              </Link>
              <Link href="https://linkedin.com/company/varnoff" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </Link>
            </Box>
          </Box>
        </ContactInfo>
      </Container>
    </Root>
  );
};

export default CompanyPage;
