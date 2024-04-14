import {HomeOutlined, AutoGraphOutlined, MenuBookOutlined, SettingsOutlined, WorkOutline, AdminPanelSettings} from '@mui/icons-material';

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
        id: 2
    },
    {
        name: 'Мои заказы',
        icon: <AutoGraphOutlined/>,
        path: '/watchlist',
        id: 3
    },
    {
        name: 'Новости',
        icon: <MenuBookOutlined/>,
        path: '/news',
        id: 4
    },
    {
        name: 'Админ',
        icon: <AdminPanelSettings/>,
        path: '/admin',
        id: 5
    },
    {
        name: 'Настройки',
        icon: <SettingsOutlined/>,
        path: '/settings',
        id: 6
    }
]