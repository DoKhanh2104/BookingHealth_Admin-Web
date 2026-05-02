import { Stack, Typography } from '@mui/material';
import { theme } from '../theme';

export const HeaderPage = ({
  title,
  description,
  button,
}: {
  title: string;
  description: string;
  button?: React.ReactNode;
}) => {
  return (
    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
      <Stack spacing={0.5}>
        <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {description}
        </Typography>
      </Stack>
      {button}
    </Stack>
  );
};
