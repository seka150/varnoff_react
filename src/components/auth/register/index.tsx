import React from 'react'
import { Typography, TextField, Button } from '@mui/material';
import { IPropsRegister } from '../../../common/types/auth';

const RegisterPage:React.FC<IPropsRegister> = (props : IPropsRegister): JSX.Element => {
  const { navigate, register, errors} = props
  return (
    <>
    <Typography variant="h2" fontFamily='Poppins, sans-serif' textAlign='center'>Регистрация</Typography>
    <Typography variant="body1" marginBottom={3} fontFamily='Poppins, sans-serif' textAlign='center'>Введите данные для регистрации</Typography>
    <TextField 
      error={!!errors.name}
      fullWidth={true} 
      margin='normal' 
      label="Имя" 
      variant="outlined" 
      placeholder='Введите ваше имя' 
      helperText={errors.name ? `${errors.name.message}` : ''}
      {...register('name')}
      />
    <TextField 
      error={!!errors.username}
      fullWidth={true} 
      margin='normal' 
      label="Username" 
      variant="outlined" 
      placeholder='Введите ваш username' 
      helperText={errors.username ? `${errors.username.message}` : ''}
      {...register('username')}
      />
    <TextField 
      error={!!errors.email}
      fullWidth={true} 
      margin='normal' 
      label="Email" 
      variant="outlined" 
      placeholder='Введите ваш email' 
      helperText={errors.email ? `${errors.email.message}` : ''}
      {...register('email')}
      />
    <TextField 
      error={!!errors.password}
      type='password' 
      fullWidth={true} 
      margin='normal' 
      label="Password" 
      variant="outlined" 
      placeholder='Введите ваш пароль' 
      helperText={errors.password ? `${errors.password.message}` : ''}
      {...register('password')}
      />
    <TextField 
      error={!!errors.confirmPasswort}
      type='password' 
      fullWidth={true} 
      margin='normal' 
      label="Password" 
      variant="outlined" 
      placeholder='Повторите ваш пароль' 
      helperText={errors.confirmPasswort ? `${errors.confirmPasswort.message}` : ''}
      {...register('confirmPasswort')}
      />
    <Button type='submit' sx={{fontFamily:'Poppins, sans-serif', marginTop: 2, marginBottom:2, width: '60%'}} variant="contained">Регистрация</Button>
    <Typography variant="body1" sx={{fontFamily:'Poppins, sans-serif' }}>У вас есть аккаунт?<span className='incitingText' onClick={()=> navigate('/login')}>Войти</span></Typography>
</>
  )
}

export default RegisterPage;