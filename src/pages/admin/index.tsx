import React, { useState } from 'react'
import { Tab, Tabs, useTheme } from '@mui/material'
import TabPanel from '../../components/tab-panel'
import { tabProps } from '../../utils/helpers'
import { tokens } from '../../theme'
import { useStyled } from './styles'
import GetOrdersComponent from 'components/get-orders'
import ContentComponent from 'components/content-table'


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
                    <Tab label="Заказы" {...tabProps(1)} />
                </Tabs>
            </TabsWrapper>
            <TabPanel value={value} index={0}>
                <ContentComponent />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GetOrdersComponent  orders={undefined}/>
            </TabPanel>
        </Root>
        )
    }

    export default AdminPage