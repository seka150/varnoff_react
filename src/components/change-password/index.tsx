import React, { FC, useState } from 'react'
import { Grid, useTheme } from '@mui/material'
import { useStyled } from './styles'
import AppLoadingButton from '../loading-button'
import { useAppDispatch } from '../../utils/hook'
import { updateUserPassword } from '../../store/thunks/auth'

const ChangePasswordComponent: FC = (): JSX.Element => {
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const theme = useTheme()
    const {FormWrapper, InputField, ButtonSubmitBlock} = useStyled(theme)
    const dispatch = useAppDispatch()

    const handleChangePassword = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            oldPassword,
            newPassword,
        }

        dispatch(updateUserPassword(data))
    }

    return (
        <Grid
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleChangePassword}
        >
            <FormWrapper>
                <InputField
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type="text"
                    label="Старый пароль"
                    variant="outlined"
                />
                <InputField
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="text"
                    label="Новый пароль"
                    variant="outlined"
                />
                <ButtonSubmitBlock>
                    <AppLoadingButton type="submit">
                        Изменить пароль
                    </AppLoadingButton>
                </ButtonSubmitBlock>
            </FormWrapper>
        </Grid>
    )
}

export default ChangePasswordComponent