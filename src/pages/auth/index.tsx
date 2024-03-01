import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStyled } from './styles';
import LoginPage from './login';
import RegisterPage from './register';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { AppErrors } from '../../common/errors';
import { useForm } from 'react-hook-form';
import { yupResolver}  from '@hookform/resolvers/yup';
import { LoginSchema, RegisterSchema } from '../../utils/yup';
import { useTheme } from '@mui/material';
import { loginUser, registerUser } from '../../store/thunks/auth'



const AuthRootComponent: React.FC = ():JSX.Element => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    const {Root, Form, Boxing} = useStyled(theme)
    const loading = useAppSelector((state)=> state.auth.isLoading)
    
    const {
        register, formState: {
            errors
        }, handleSubmit
    } = useForm({
        resolver: yupResolver(location.pathname === '/login' ? LoginSchema : RegisterSchema)
    })

    const handleSubmitForm = async (data: any) => {
        if (location.pathname === '/login') {
            try {
                await dispatch(loginUser(data))
                navigate('/')
            } catch (e) {
                return e
            }
        } else {
            if (data.password === data.confirmPasswort) {
                try {
                    const userData = {
                        firstName: data.name,
                        username: data.username,
                        password: data.password,
                        email: data.email
                    }
                    await dispatch(registerUser(userData))
                    navigate('/')
                } catch (error) {
                    return error
                }
            } else {
                alert(AppErrors.PasswordDoNotMatch)
            }
        }
    }
    

    return (
        <Root>
            <Form onSubmit={handleSubmit(handleSubmitForm)}>
                <Boxing>
                    {
                    location.pathname === '/login' 
                    ? <LoginPage register={register} errors={errors} navigate={navigate} loading={loading}/> 
                    : location.pathname === '/register' 
                    ? <RegisterPage 
                        navigate={navigate}
                        register={register}
                        errors={errors}
                        loading={loading}
                    />
                    : null
                }

                </Boxing>
            </Form>
        </Root>
    )
}

export default AuthRootComponent;