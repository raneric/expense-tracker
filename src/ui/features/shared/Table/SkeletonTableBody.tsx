import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';

export default function SkeletonTableBody({
  columnNumber,
  rowPerPage,
}: {
  columnNumber: number;
  rowPerPage: number;
}) {
  return (
    <TableBody>
      {Array.from(new Array(rowPerPage)).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from(new Array(columnNumber)).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton
                variant="text"
                animation="wave"
                height={30}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
