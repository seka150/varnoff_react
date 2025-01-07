import LoadingButton from '@mui/lab/LoadingButton';
import styled from "@emotion/styled";
import { tokens } from 'theme';

const AppLoadingButtonComponent = styled(LoadingButton)
({
    borderRadius: 4,
    backgroundColor: '#00BCA9 !important',
    boxShadow: '0px 1px 7px #332a76 !important',
    padding: '10px 20px !important',
    maxWidth: 300,
    color: `#fff !important`
})

export default AppLoadingButtonComponent;