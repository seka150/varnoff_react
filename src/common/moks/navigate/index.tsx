import {HomeOutlined, AutoGraphOutlined, MenuBookOutlined, SettingsOutlined, WorkOutline} from '@mui/icons-material';

export const navMenu =[
    {
        name: 'Главная',
        icon: <HomeOutlined/>,
        path: '/',
        id: 1
    },
    {
        name: 'Услуги',
        icon: <WorkOutline/>,
        path: '/service',
        id: 1
    },
    {
        name: 'Изранное',
        icon: <AutoGraphOutlined/>,
        path: '/watchlist',
        id: 2
    },
    {
        name: 'Новости',
        icon: <MenuBookOutlined/>,
        path: '/news',
        id: 3
    },
    {
        name: 'Админ',
        icon: <MenuBookOutlined/>,
        path: '/admin',
        id: 3
    },
    {
        name: 'Настройки',
        icon: <SettingsOutlined/>,
        path: '/settings',
        id: 4
    }
]