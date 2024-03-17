import React, { useEffect, useState } from 'react'
import { Tab, Tabs, useTheme } from '@mui/material'
import TabPanel from '../../components/tab-panel'
import { tabProps } from '../../utils/helpers'
import { tokens } from '../../theme'
import { useStyled } from './styles'
import SettingsPersonalInfoComponent from '../../components/settings-personal-info'
import { useAppDispatch } from '../../utils/hook'
import { getPublicUser } from '../../store/thunks/auth'


const SettingsPage = () => {
  const [value, setValue] = useState(0)
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { Root, TabsWrapper} = useStyled(theme)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    dispatch(getPublicUser)
  }, [dispatch])

    return (
      <Root>
        <TabsWrapper>
          <Tabs value={value} onChange={handleChange} aria-label="Sattings tabs" centered textColor='secondary' TabIndicatorProps={{style: {backgroundColor: colors.blue}}}> 
            <Tab label="Персональные данные" {...tabProps(0)} />
            <Tab label="Изменить пароль" {...tabProps(1)} />
            <Tab label="Удалить аккаунт" {...tabProps(2)} />
          </Tabs>
        </TabsWrapper>
        <TabPanel value={value} index={0}>
          <SettingsPersonalInfoComponent/> 
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Root>
    )
}

export default SettingsPage