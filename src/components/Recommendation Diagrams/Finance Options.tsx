import React from 'react';
import {
  // Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)<{ isLarge: boolean }>(({ theme, isLarge }) => ({
  border: '1px solid #ddd',
  padding: isLarge ? theme.spacing(1.5, 2) : theme.spacing(1),
  textAlign: 'center',
}));

const HeaderTypography = styled(Typography)<{ isLarge: boolean }>(({ /* theme, */ isLarge }) => ({
  fontWeight: 'bold',
  fontSize: isLarge ? '1.1rem' : '0.9rem',
}));

const InfoTypography = styled(Typography)<{ isLarge: boolean }>(({ /* theme, */ isLarge }) => ({
  fontSize: isLarge ? '1rem' : '0.8rem',
}));

const AmountTypography = styled(Typography)<{ isLarge: boolean }>(({ theme, isLarge }) => ({
  fontWeight: 'bold',
  fontSize: isLarge ? '1.2rem' : '1rem',
  color: theme.palette.primary.main,
}));

export const FinanceOptions: React.FC<{ size: 'small' | 'large' }> = ({
  size,
}) => {
  const isLarge = size === 'large';

  const offers = [
    {
      lender: 'Hannon Armstrong',
      rate: '6.25%',
      term: '20-yrs',
      payment: '$789,641',
    },
    {
      lender: 'Bostonia',
      rate: '6.37%',
      term: '22-yrs',
      payment: '$759,641',
    },
    {
      lender: 'BoFA',
      rate: '6.75%',
      term: '25-yrs',
      payment: '$739,641',
    },
  ];

  return (
    <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
      <Table aria-label="finance offers received">
        <TableBody>
						<TableRow>
						<StyledTableCell colSpan={offers.length} isLarge={isLarge} align="center">
							<HeaderTypography isLarge={isLarge}>All Finance Offers Received</HeaderTypography>
						</StyledTableCell>
						</TableRow>
          <TableRow>
            {offers.map((offer) => (
              <StyledTableCell key={offer.lender} isLarge={isLarge} align="center">
                <HeaderTypography isLarge={isLarge}>{offer.lender}</HeaderTypography>
              </StyledTableCell>
            ))}
          </TableRow>
          <TableRow>
            {offers.map((offer) => (
              <StyledTableCell key={offer.lender} isLarge={isLarge} align="center">
                <InfoTypography isLarge={isLarge}>Rate: {offer.rate}</InfoTypography>
              </StyledTableCell>
            ))}
          </TableRow>
          <TableRow>
            {offers.map((offer) => (
              <StyledTableCell key={offer.lender} isLarge={isLarge} align="center">
                <InfoTypography isLarge={isLarge}>Term: {offer.term}</InfoTypography>
              </StyledTableCell>
            ))}
          </TableRow>
          <TableRow>
            {offers.map((offer) => (
              <StyledTableCell key={offer.lender} isLarge={isLarge} align="center">
                <InfoTypography isLarge={isLarge}>Annual Payment:</InfoTypography>
                <AmountTypography isLarge={isLarge}>{offer.payment}</AmountTypography>
              </StyledTableCell>
            ))}
          </TableRow>
					<TableRow>
						<StyledTableCell colSpan={offers.length} isLarge={isLarge} align="center">
							<InfoTypography isLarge={isLarge}>
								<i>Summaries of indicative offers from 3rd party lenders are shown above. Full indicative offer letters are included in the appendix of the report. Finance offers are from qualified lenders and are not part of 8x Energy. 8x Energy retains the right to participate in the syndication of the finance offer at its sole discretion.</i>
							</InfoTypography>
						</StyledTableCell>
					</TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};