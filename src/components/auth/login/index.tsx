import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { IPropsLogin } from '../../../common/types/auth';

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const {navigate, register, errors} = props
  return (
    <>
        <Typography variant="h2" fontFamily='Poppins, sans-serif' textAlign='center'>Авторизация</Typography>

        <Typography variant="body1" marginBottom={3} fontFamily='Poppins, sans-serif' textAlign='center'>Введите ваш логин и пароль</Typography>

        <TextField helperText={errors.email ? `${errors.email.message}` : ''} error={!!errors.email} {...register('email')} fullWidth={true} margin='normal' label="Email" variant="outlined" placeholder='Введите ваш email' />

        <TextField helperText={errors.password ? `${errors.password?.message}` : ''} error={!!errors.password} {...register('password')} type='password' fullWidth={true} margin='normal' label="Password" variant="outlined" placeholder='Введите ваш пароль'/>

        <Button type="submit" sx={{fontFamily:'Poppins, sans-serif', marginTop: 2, marginBottom:2, width: '60%'}} variant="contained">Войти</Button>

        <Typography variant="body1" sx={{fontFamily:'Poppins, sans-serif' }}>У вас нет аккаунта?<span className='incitingText' onClick={()=> navigate('/register')}>Регистрация</span></Typography>
    </>
  );
};

export default LoginPage;