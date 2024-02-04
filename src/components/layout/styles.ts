import { styled } from "@mui/system";

export const RootContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%'
}));

export const MainSectionContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
}));
