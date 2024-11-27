import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableRow, IconButton, TextField, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const SubStep1: React.FC = () => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [rows, setRows] = useState([
    'Utility company has acknowledged the receipt of the LOA.',
    'Data retrieval is currently in progress.',
    'No issues reported from the utility so far.',
    'Estimated completion of data processing is within 48 hours.',
    'You will be notified once the interval data is available.',
  ]);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newRows = [...rows];
    newRows[index] = event.target.value;
    setRows(newRows);
  };
  

  const handleBlur = () => {
    setEditIndex(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        p: 1,
        pr: 4,
        pl: 1,
        pt: 1,
      }}
    >
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <h2>DATA VERIFICATION AND PROCESSING</h2>
        <br />
        <h2>Processing Status & Profile Summary</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        <Table
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: '#f9f9f9',
                  textAlign: 'right',
                  width: '50%',
                  borderBottom: '1px solid #ccc',
                }}
              >
                Overall Progress to Completing the DER Analysis:
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: '#036CA1',
                  textAlign: 'justify',
                  width: '50%',
                  borderBottom: '1px solid #ccc',
                }}
              >
                x% Completed
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: '#f9f9f9',
                  textAlign: 'right',
                  width: '50%',
                  verticalAlign: 'middle',
                }}
              >
                Overall Profile Summary:
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  textAlign: 'justify',
                  width: '50%',
                }}
              >
                {rows.map((row, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: '#f1f1f1',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      marginBottom: '8px',
                      position: 'relative',
                    }}
                  >
                    {editIndex === index ? (
                      <TextField
                        value={row}
                        onChange={(e) => handleInputChange(e, index)}
                        onBlur={handleBlur}
                        autoFocus
                        fullWidth
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        sx={{
                          fontFamily: 'Nunito Sans, sans-serif',
                          fontSize: '0.75rem',
                        }}
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontFamily: 'Nunito Sans, sans-serif',
                          fontSize: '0.75rem',
                        }}
                      >
                        {row}
                      </Typography>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(index)}
                      sx={{ position: 'absolute', top: '4px', right: '4px' }}
                    >
                      <EditIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Box>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mt: 1 }}>
          <Checkbox
            sx={{
              padding: '0 0',
              '& .MuiSvgIcon-root': { fontSize: '1.1rem' },
            }}
          />
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }}>
            I have read and agreed to the terms of this Letter of Authorization.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep1;
