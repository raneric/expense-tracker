import { Box, Card, Divider, Grid, Skeleton, Stack } from '@mui/material';

export default function ProfileSkeleton() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        p: { xs: 2, md: 4 },
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 850,
          mx: 'auto',
          overflow: 'hidden',
          borderRadius: 5,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        {/* Header */}
        <Skeleton
          variant="rectangular"
          height={180}
          animation="wave"
        />

        <Box
          sx={{
            px: 4,
            pb: 4,
            mt: '-60px',
          }}
        >
          {/* Avatar + Identity */}
          <Stack
            sx={{ alignItems: 'center' }}
            spacing={1.5}
          >
            <Skeleton
              variant="circular"
              width={120}
              height={120}
            />

            <Skeleton
              variant="text"
              width={220}
              height={50}
            />

            <Skeleton
              variant="text"
              width={280}
              height={24}
            />

            <Skeleton
              variant="rounded"
              width={100}
              height={32}
            />
          </Stack>

          <Divider sx={{ my: 4 }} />

          {/* Personal Information */}
          <Skeleton
            variant="text"
            width={180}
            height={40}
            sx={{ mb: 2 }}
          />

          <Grid
            container
            spacing={2}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCardSkeleton />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCardSkeleton />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InfoCardSkeleton />
            </Grid>
          </Grid>

          {/* Financial Information */}
          <Skeleton
            variant="text"
            width={180}
            height={40}
            sx={{ mt: 4, mb: 2 }}
          />

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Skeleton
                variant="text"
                width={100}
                height={24}
              />

              <Skeleton
                variant="circular"
                width={32}
                height={32}
              />
            </Stack>

            <Skeleton
              variant="text"
              width={220}
              height={60}
              sx={{ mt: 1 }}
            />

            <Skeleton
              variant="rounded"
              width={120}
              height={28}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

function InfoCardSkeleton() {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Skeleton
        variant="text"
        width={90}
        height={20}
      />

      <Skeleton
        variant="text"
        width="70%"
        height={32}
      />
    </Box>
  );
}
