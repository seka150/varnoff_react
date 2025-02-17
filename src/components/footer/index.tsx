import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6, 0),
  marginTop: theme.spacing(4),
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
        ИП ВДОВЕНКО А.С.
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Индивидуальный предприниматель в сфере строительства.
        </Typography>
        <Box mt={4} display="flex" justifyContent="center">
          <Link href="#" variant="body2" color="textSecondary" sx={{ mx: 1 }}>
            Контакты
          </Link>
          <Link href="#" variant="body2" color="textSecondary" sx={{ mx: 1 }}>
            Политика конфиденциальности
          </Link>
          <Link href="#" variant="body2" color="textSecondary" sx={{ mx: 1 }}>
            Условия использования
          </Link>
        </Box>
        <Box mt={4}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            <Link color="inherit" href="https://example.com/">
              ИП ВДОВЕНКО А.С.
            </Link>{' '}
            {new Date().getFullYear()}
            {'. Все права защищены.'}
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
