import { Typography, styled, type TypographyProps } from '@mui/material';

/**
 * Reusable Typography component that applies a primary-to-secondary gradient.
 */
export const GradientText = styled(Typography)<TypographyProps>(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  fontWeight: 800,
}));
