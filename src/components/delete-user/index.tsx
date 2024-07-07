import React, { FC, useState } from 'react'
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography,
    useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../utils/hook'
import { deleteUser } from '../../store/thunks/auth'
import { tokens } from '../../theme'
import { useStyled } from './styles'

const DeleteUserComponent: FC = (): JSX.Element => {
    const [checked, setChecked] = useState(false)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const { TabHeading, AlertMessage, CheckBoxBlock, ButtonBlock } = useStyled(theme)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleDelete = async () => {
        await dispatch(deleteUser())
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('name')
        navigate('/login')
    }

    return (
        <Grid container>
            <TabHeading item>
                <Typography variant="h2">Удаление аккаунта</Typography>
            </TabHeading>
            <AlertMessage item>
                <Typography variant="body1">
                    Уважаемый пользователь, удаляя свой аккаунт, вы удаляете всю
                    персональную информацию. После удаления вся сохраненная вами
                    информация будет недоступна.
                </Typography>
            </AlertMessage>
            <CheckBoxBlock item>
                <FormGroup>
                    <FormControlLabel
                        sx={{ justifyContent: 'center' }}
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                                sx={{
                                    color: colors.blue,
                                    '&.Mui-checked': { color: colors.blue },
                                }}
                            />
                        }
                        label="Я соглашаюсь"
                    />
                </FormGroup>
            </CheckBoxBlock>
            <ButtonBlock item>
                <Button
                    onClick={handleDelete}
                    color="success"
                    variant="outlined"
                    disabled={!checked}
                >
                    Удалить аккаунт
                </Button>
            </ButtonBlock>
        </Grid>
    )
}

export default DeleteUserComponent
