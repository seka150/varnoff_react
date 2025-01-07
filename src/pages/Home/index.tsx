import { FC } from "react";
import { Box,  Typography,  useTheme } from "@mui/material";
import { useStyled } from "./styles";
import StatusComponent from "components/status";
import CardComponent from "components/card";
import Footer from "components/footer";


const HomePage: FC = (): JSX.Element => {
    const theme = useTheme()
    const {Root, Typog, Parag, ButtonKatal, Main, MainText} = useStyled(theme)

    const handleServiceClick = () => {
        window.location.href = '/service';
    };

    const cardsData = [
        {
            title: 'SEO-BOX.RU',
            description: 'Сайт должен приносить прибыль! SEO-BOX.RU продвинет Ваш сайт в ТОП-10 благодаря услуге "продвижение сайтов", что поможет повысить посещаемость ресурса, а следовательно, и увеличит продажи. ',
            image: 'https://varnoff.ru/assets/img/web10.jpg'
        },
        {
            title: 'IT-COMPUTERS.RU',
            description: 'IT Аутсорсинг - обслуживание компьютеров, серверов и сетей организаций в Самаре и Самарской области',
            image: 'https://varnoff.ru/assets/img/web7.jpg'
        },
        {
            title: 'AKULA-COMPANY.COM',
            description: 'Маркетинг - двигатель роста прибыли организаций в Самаре и Самарской области',
            image: 'https://varnoff.ru/assets/img/shark.jpg'
        },
        {
            title: 'SERVERNAY.RU',
            description: 'Услуги дата-центра такие как хостинг, регистрация доменов, размещение и аренда серверов мы решили отобразить на отдельном сайте. Там же вы сможете ознакомится с тарифами на наши услуги. ',
            image: 'https://varnoff.ru/assets/img/web1.jpg'
        },
        {
            title: '163.RU',
            description: 'В работе находится информационный портал Самарской области. Сроки запуска проекта пока неизвесты, но мы его всетаки доделаем ',
            image: 'https://varnoff.ru/assets/img/web2.jpg'
        },
    ];
    


    return(
        <Root>
            <Main>
                <MainText>
                    <Typog variant="h1" paddingBottom='30px'>ЗАВОД <Typography variant="h5">Металлоконструкций</Typography></Typog>
                    <Parag paddingBottom='30px'>Интернет-Агентство, котрый может предложить полный спектр услуг в области Интернет бизнеса, как стандартные и простые решения так и оригинальные идеи.</Parag>
                    <ButtonKatal variant="outlined" size="large" onClick={handleServiceClick}>
                        Каталог
                    </ButtonKatal>
                </MainText>
                <Box>
                    <img src="https://cdn3d.iconscout.com/3d/premium/thumb/male-programmer-5743382-4846824.png" alt="programmer" />
                </Box>
            </Main>
            <Box>
                <StatusComponent/>
            </Box>
            <Box sx={{marginTop: '90px'}}>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                    {cardsData.map((card, index) => (
                        <CardComponent
                            key={index}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                        />
                    ))}
                </Box>
            </Box>
            <Box component="footer" mt="auto">
                <Footer />
            </Box>
        </Root>
    )
}

export default HomePage;