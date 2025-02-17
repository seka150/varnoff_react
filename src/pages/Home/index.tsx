import { FC } from "react";
import { Box, Typography,  useTheme } from "@mui/material";
import { useStyled } from "./styles";
import Footer from "components/footer";
// import { green } from "@mui/material/colors";
import GalleryComponent from "components/gallery";



const HomePage: FC = (): JSX.Element => {
    const theme = useTheme()
    const {Root, Typog, Parag, ButtonKatal, Main, MainText, CreateOrder, CreateOrderBox, CreateOrderBoxText, GelleryStyle} = useStyled(theme)

    const handleServiceClick = () => {
        window.location.href = '/service';
    };

    const handleWatchlist = () => {
        window.location.href = '/watchlist'
    }
    


    return(
        <Root>
            <Main>
                <MainText>
                    <Typog paddingBottom='30px'>СДЕЛАЕМ И УСТАНОВИМ НАВЕС ЛЮБОЙ СЛОЖНОСТИ ПОД КЛЮЧ ОТ 3 ДНЕЙ В САМАРЕ</Typog>
                    <Parag paddingBottom='30px'> Бесплатный выезд специалиста в день обращения!</Parag>
                    <ButtonKatal variant="outlined" size="large" onClick={handleServiceClick}>
                        Каталог
                    </ButtonKatal>
                </MainText>
                <Box>
                    <img width={650} src="https://mirnavesov.com/wp-content/uploads/2022/11/Picture_main-1024x717.png?v=1681207476" alt="naves" />
                </Box>
            </Main>
            <CreateOrder>
                <CreateOrderBox>
                    <CreateOrderBoxText>
                        <Typography variant="h3">Получите ТОЧНЫЙ РАСЧЕТ навеса</Typography>
                        <Typography variant="h6">Подберем для Вас все параметры навеса и бесплатно посчитаем смету</Typography>
                        <Typography variant="h6">Ждем вашу заявку!</Typography>
                    </CreateOrderBoxText>
                    <ButtonKatal variant="outlined" size="large" onClick={handleWatchlist}>Сoздать заявку</ButtonKatal>
                </CreateOrderBox>
            </CreateOrder>
            <Box paddingTop= '100px'>
                <Typog>Малая часть объектов 2018 - 2024 года</Typog>
            </Box>
            <GelleryStyle>
                <GalleryComponent/>
            </GelleryStyle>
            <Box component="footer" mt="auto">
                <Footer />
            </Box>
        </Root>
    )
}

export default HomePage;