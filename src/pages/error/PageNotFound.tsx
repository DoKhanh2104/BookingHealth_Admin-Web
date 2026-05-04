import React from 'react';
import { Box, Button, Container, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 12,
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              mb: 4,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '120px', md: '200px' },
                fontWeight: 900,
                lineHeight: 1,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                opacity: 0.15,
                userSelect: 'none',
              }}
            >
              404
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            ></Box>
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
            Oops! Trang không tồn tại
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', maxWidth: 480, mb: 5, fontSize: '1.1rem' }}
          >
            Có vẻ như bạn đã đi lạc hoặc đường dẫn này đã bị thay đổi. Đừng lo lắng, hãy quay lại
            trang chủ để tiếp tục công việc nhé.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: (theme) => `0 8px 25px ${theme.palette.primary.main}40`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: (theme) => `0 12px 30px ${theme.palette.primary.main}60`,
              },
            }}
          >
            Quay lại trang chủ
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default PageNotFound;
