import React from 'react';
import { TextField, Typography, useTheme } from '@mui/material';
import { IPropsLogin } from '../../../common/types/auth';
import { useStyled } from '../styles';

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const {navigate, register, errors} = props
  const theme = useTheme()
  const {IncitingText, Submit} = useStyled(theme)
  return (
    <>
        <Typography variant="h2" fontFamily='Poppins, sans-serif' textAlign='center'>Авторизация</Typography>

        <Typography variant="body1" marginBottom={3} fontFamily='Poppins, sans-serif' textAlign='center'>Введите ваш логин и пароль</Typography>

        <TextField helperText={errors.email ? `${errors.email.message}` : ''} error={!!errors.email} {...register('email')} fullWidth={true} margin='normal' label="Email" variant="outlined" placeholder='Введите ваш email' />

        <TextField helperText={errors.password ? `${errors.password?.message}` : ''} error={!!errors.password} {...register('password')} type='password' fullWidth={true} margin='normal' label="Password" variant="outlined" placeholder='Введите ваш пароль'/>

        <Submit type="submit" variant="contained">Войти</Submit>

        <Typography variant="body1" sx={{fontFamily:'Poppins, sans-serif' }}>У вас нет аккаунта?<IncitingText className='incitingText' onClick={()=> navigate('/register')}>Регистрация</IncitingText></Typography>
    </>
  );
};

export default LoginPage;