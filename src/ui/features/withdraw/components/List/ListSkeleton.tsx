import { Card, CardContent, Skeleton, Stack } from '@mui/material';

export default function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <Stack spacing={1.5}>
      {Array.from({ length: rows }).map((_, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{ borderRadius: 3 }}
        >
          <CardContent sx={{ pb: 1.5 }}>
            <Stack spacing={1}>
              <Skeleton
                variant="text"
                width="70%"
                height={24}
              />
              <Skeleton
                variant="rectangular"
                height={56}
                sx={{ borderRadius: 2 }}
              />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
