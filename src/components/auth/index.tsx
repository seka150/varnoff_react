import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';
import { Box } from '@mui/material';
import LoginPage from './login';
import RegisterPage from './register';
import { instance } from '../../utils/axios';
import { useAppDispatch } from '../../utils/hook';
import { login } from '../../store/slice/auth';
import { AppErrors } from '../../common/errors';
import { useForm } from 'react-hook-form';
import { yupResolver}  from '@hookform/resolvers/yup';
import { LoginSchema, RegisterSchema } from '../../utils/yup';


const AuthRootComponent: React.FC = ():JSX.Element => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
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
                const userData = {
                    email: data.email,
                    password: data.password
                }
                const user = await instance.post('auth/login', userData)
                await dispatch(login(user.data))
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
                    const newUser = await instance.post('auth/register', userData)
                    await dispatch(login(newUser.data))
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
        <div className='root'>
            <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                    maxWidth={640}
                    margin='auto'
                    padding={5}
                    borderRadius={5}
                    boxShadow={'5px 5px 10px #ccc'}
                >
                    {
                    location.pathname === '/login' 
                    ? <LoginPage register={register} errors={errors} navigate={navigate}/> 
                    : location.pathname === '/register' 
                    ? <RegisterPage 
                        navigate={navigate}
                        register={register}
                        errors={errors}
                    />
                    : null
                }

                </Box>
            </form>
        </div>
    )
}

export default AuthRootComponent;