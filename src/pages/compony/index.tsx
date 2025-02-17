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
                  Znaves
                </Typography>
                <Typography variant='h5' sx={{ marginTop: theme.spacing(2) }}>
                  Компания «Znaves» специализируется на производстве и установке качественных навесов для дома, дачи и бизнеса. Мы предлагаем индивидуальные решения, которые сочетают в себе надежность, стиль и доступную цену.
                </Typography>
              </HistoryText>
            </Grid>
            <Grid item xs={12} md={6}>
              <InnovationBox>
                <InnovationItem>
                  <Typography variant='h6'>Качество материалов</Typography>
                  <Typography variant='body1'>
                    Используем только проверенные материалы: металл, поликарбонат и дерево, чтобы обеспечить долговечность вашего навеса.
                  </Typography>
                </InnovationItem>
                <InnovationItem>
                  <Typography variant='h6'>Индивидуальный подход</Typography>
                  <Typography variant='body1'>
                    Каждый навес изготавливается по вашим размерам и предпочтениям. Мы учитываем все пожелания клиентов.
                  </Typography>
                </InnovationItem>
                <InnovationItem>
                  <Typography variant='h6'>Быстрая установка</Typography>
                  <Typography variant='body1'>
                    Наши специалисты оперативно доставляют и устанавливают навесы, чтобы вы могли наслаждаться комфортом уже через несколько дней.
                  </Typography>
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
              <strong>Адрес:</strong> 123456, Москва, ул. Навесная, д. 10
            </Typography>
            <Typography variant='body1'>
              <strong>Телефон:</strong> +7 (495) 765-43-21
            </Typography>
            <Typography variant='body1'>
              <strong>Email:</strong> <Link href="mailto:info@znaves.ru">info@znaves.ru</Link>
            </Typography>
            <Typography variant='body1'>
              <strong>Социальные сети:</strong>
            </Typography>
            <Box sx={{ display: 'flex', gap: theme.spacing(2), marginTop: theme.spacing(1) }}>
              <Link href="https://facebook.com/znaves" target="_blank" rel="noopener noreferrer">
                Facebook
              </Link>
              <Link href="https://instagram.com/znaves" target="_blank" rel="noopener noreferrer">
                Instagram
              </Link>
              <Link href="https://vk.com/znaves" target="_blank" rel="noopener noreferrer">
                ВКонтакте
              </Link>
              <Link href="https://youtube.com/znaves" target="_blank" rel="noopener noreferrer">
                YouTube
              </Link>
            </Box>
          </Box>
        </ContactInfo>
      </Container>
    </Root>
  );
};

export default CompanyPage;