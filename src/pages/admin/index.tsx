import React, { useState } from 'react'
import { Tab, Tabs, useTheme } from '@mui/material'
import TabPanel from '../../components/tab-panel'
import { tabProps } from '../../utils/helpers'
import { tokens } from '../../theme'
import { useStyled } from './styles'
import ChangePasswordComponent from '../../components/change-password'
import DeleteUserComponent from '../../components/delete-user'
import ServiceComponent from '../../components/create-services'
import GetOrdersComponent from 'components/get-orders'


const AdminPage = () => {
    const [value, setValue] = useState(0)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const { Root, TabsWrapper} = useStyled(theme)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

        return (
        <Root>
            <TabsWrapper>
                <Tabs value={value} onChange={handleChange} aria-label="Admin tabs" centered textColor='secondary' TabIndicatorProps={{style: {backgroundColor: colors.blue}}}> 
                    <Tab label="Контент" {...tabProps(0)} />
                    <Tab label="Основные настройки" {...tabProps(1)} />
                    <Tab label="Аналитика" {...tabProps(2)} />
                    <Tab label="Заказы" {...tabProps(3)} />
                </Tabs>
            </TabsWrapper>
            <TabPanel value={value} index={0}>
                <ServiceComponent />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ChangePasswordComponent/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DeleteUserComponent/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <GetOrdersComponent  orders={undefined}/>
            </TabPanel>
        </Root>
        )
    }

    export default AdminPage