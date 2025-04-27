import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyledTableCellProps {
  isLarge: boolean;
}

const StyledTableCell = styled(TableCell)<StyledTableCellProps>(({ theme, isLarge }) => ({
  border: '1px solid #ddd',
  padding: isLarge ? theme.spacing(1.5, 2) : theme.spacing(1),
}));

const LabelTypography = styled(Typography)<{ isLarge: boolean }>(({ /* theme, */ isLarge }) => ({
  fontWeight: 'medium',
  fontSize: isLarge ? '1rem' : '0.8rem',
}));

const ValueTypography = styled(Typography)<{ isLarge: boolean }>(({ /* theme, */ isLarge }) => ({
  fontWeight: 'bold',
  fontSize: isLarge ? '1.2rem' : '1rem',
}));

const SubLabelTypography = styled(Typography)<{ isLarge: boolean }>(({ theme, isLarge }) => ({
  fontSize: isLarge ? '0.8rem' : '0.6rem',
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
}));

const GrandTotalTypography = styled(Typography)<{ isLarge: boolean }>(({ theme, isLarge }) => ({
  fontWeight: 'bold',
  fontSize: isLarge ? '1.6rem' : '1.2rem',
  color: theme.palette.primary.main,
}));

export const FinancialIncentives: React.FC<{ size: 'small' | 'large' }> = ({
  size,
}) => {
  const isLarge = size === 'large';

  return (
    <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
      <Table aria-label="cost offset summary">
        <TableBody>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <LabelTypography isLarge={isLarge}>REBATES</LabelTypography>
              <SubLabelTypography isLarge={isLarge}>At project completion</SubLabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}>$325,567</ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <LabelTypography isLarge={isLarge}>GRANTS</LabelTypography>
              <SubLabelTypography isLarge={isLarge}>50% at start 50% at completion</SubLabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}>$125,000</ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <LabelTypography isLarge={isLarge}>TAX DEDUCTIONS</LabelTypography>
              <SubLabelTypography isLarge={isLarge}>Anytime after commercial operation (ITC + MACRS)</SubLabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}>$1,212,443</ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <LabelTypography isLarge={isLarge}>SRECs</LabelTypography>
              <SubLabelTypography isLarge={isLarge}>5-year estimate, can have multiple additional 5 year values</SubLabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}>$225,567</ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <Typography fontWeight="bold" fontSize={isLarge ? '1.1rem' : '0.9rem'}>GRAND TOTAL</Typography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <GrandTotalTypography isLarge={isLarge}>$1,825,567</GrandTotalTypography>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};