import styled from '@emotion/styled';
import { Theme, Paper } from '@mui/material';

export const useStyled = (theme: Theme) => {
  const Root = styled('div')({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  });

  const History = styled(Paper)({
    backgroundImage: 'url(https://i.pinimg.com/564x/07/52/40/075240dc018c6ea3e462277e09bfe03d.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    height: '500px',
    borderRadius: '10px',
    color: 'white',
    position: 'relative',
  });

  const HistoryText = styled('div')({
    zIndex: 2,
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '10px',
  });

  const InnovationBox = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '10px',
    padding: theme.spacing(2),
  });

  const InnovationItem = styled('div')({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:last-child': {
      marginBottom: 0,
    },
  });

  const ContactInfo = styled(Paper)({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    marginTop: theme.spacing(4),
  });

  return { Root, History, HistoryText, InnovationBox, InnovationItem, ContactInfo };
};
