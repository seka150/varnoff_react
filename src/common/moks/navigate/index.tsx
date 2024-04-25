import {HomeOutlined, MenuBookOutlined, SettingsOutlined, WorkOutline, AdminPanelSettings, LocalGroceryStore} from '@mui/icons-material';

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
        icon: <LocalGroceryStore/>,
        path: '/watchlist',
        id: 3
    },
    {
        name: 'Наша компания',
        icon: <MenuBookOutlined/>,
        path: '/about',
        id: 4
    },
    {
        name: 'Панель админа',
        icon: <AdminPanelSettings/>,
        path: '/admin',
        visibleForRoles: ['admin'],
        id: 5
    },
    {
        name: 'Настройки',
        icon: <SettingsOutlined/>,
        path: '/settings',
        id: 6
    }
]