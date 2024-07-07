import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import AppLoadingButton from '../loading-button'
import { getPublicUser, updateUserInfo } from '../../store/thunks/auth'
import { useStyled } from './styles'
import { Grid, useTheme, Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert';

const SettingsPersonalInfoComponent: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const { FormWrapper, InputField, ButtonBlock} = useStyled(theme)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const { user } = useAppSelector((state) => state.auth.user)

    useEffect(() => {
        if (user) {
            setName(user.firstName)
            setUsername(user.username)
            setEmail(user.email)
        }
    }, [user])

    useEffect(() => {
        if (user) {
            setName(user.firstName)
        }
    }, [user])

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('')
                setErrorMessage('')
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            firstName: name,
            username: username,
            email: email,
        }
        dispatch(updateUserInfo(data))
            .then(() => {
                setSuccessMessage('Информация успешно обновлена')
                dispatch(getPublicUser())
            })
            .catch((error: any) => {
                setErrorMessage('Ошибка при обновлении информации: ' + error.message)
            })
    }

    return (
        <Grid
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <FormWrapper>
                <InputField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    label="Имя"
                    variant="outlined"
                />
                <InputField
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    label="Username"
                    variant="outlined"
                />
                <InputField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    label="Email"
                    variant="outlined"
                />
                <ButtonBlock >
                    <AppLoadingButton type="submit" >Сохранить</AppLoadingButton>
                </ButtonBlock>
            </FormWrapper>
            {successMessage && (
                <Alert 
                    severity="success" 
                    sx={{ 
                        position: 'fixed', 
                        bottom: theme.spacing(2), 
                        left: theme.spacing(2),
                        zIndex: theme.zIndex.snackbar
                    }}
                    onClose={() => setSuccessMessage('')}
                >
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert 
                    severity="error" 
                    sx={{ 
                        position: 'fixed', 
                        bottom: theme.spacing(2), 
                        left: theme.spacing(2),
                        zIndex: theme.zIndex.snackbar
                    }}
                    onClose={() => setErrorMessage('')}
                >
                    {errorMessage}
                </Alert>
            )}
        </Grid>
    )
}

export default SettingsPersonalInfoComponent
