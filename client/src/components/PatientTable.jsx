import React, { useState ,useEffect} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import axios from 'axios';
const headCells = [
  {
    id: 'patientName',
    numeric: false,
    disablePadding: true,
    label: 'Patient Name',
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    label: 'Age',
  },
  {
    id: 'injurySpot',
    numeric: false,
    disablePadding: false,
    label: 'Injury Spot',
  },
  {
    id: 'reasonDesc',
    numeric: false,
    disablePadding: false,
    label: 'Reason',
  },
  {
    id: 'dateOfJoin',
    numeric: false,
    disablePadding: false,
    label: 'Date of Joining',
  },
];

function EnhancedTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [patients,setPatients]=useState([]);
  const [updateState, setUpdateState] = useState(false);
  ///const forceUpdate = useCallback(() => setUpdateState(prev => !prev), []);



const handleDeleteClick = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(`http://localhost:5000/patients/${id}`);
    if (response.status >= 200 && response.status <= 299) {
      setPatients(patients.filter(patient => patient.id !== id));
     // console.log(updatedPatients);
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patients.length) : 0;

  const visibleRows = patients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  

  useEffect(()=>{
    const getPatients= async ()=>{
       try{
        const res = await axios.get("http://localhost:5000/patients");
        setPatients(res.data);
       }catch(err){
        console.log(err);
       }
    }
    getPatients();
  },[patients]);


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
  <TableRow>
    {headCells.map((headCell) => (
      <TableCell
        key={headCell.id}
        align={'right'}
        padding={headCell.disablePadding ? 'none' : 'normal'}
        sortDirection={orderBy === headCell.id ? order : false}
      >
        {headCell.label} 
      </TableCell>
    ))}
    <TableCell />
  </TableRow>
</TableHead>
            <TableBody>
              {/* {console.log(visibleRows)} */}
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow key={row._id}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align='right'
                    >
                      {row.patientName}
                    </TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">{row.injurySpot}</TableCell>
                    <TableCell align="right">{row.reasonDesc}</TableCell>
                    <TableCell align="right">{row.dateOfJoin}</TableCell>
                    <TableCell>
                    <IconButton onClick={() => handleDeleteClick(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default EnhancedTable;
