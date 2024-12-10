import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Snackbar,
  Alert,
  TableRow,
  TextField
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UpdateFlwLeads from './UpdateFlwLeads';
import ConvertCustomer from '../Customer/ConvertCustomer';
import Followups from './Followup';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';
import AddWakeingLeads from './AddWakeingLeads';

const FollowingLeadsIndex = () => {
  const navigate = useNavigate();
  const [leadsData, setLeadsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filteredLeadsData, setFilteredLeadsData] = useState([]);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [leadsState, setLeadsState] = useState('');
  const [leadsCity, setLeadsCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const emp_id = sessionStorage.getItem('emp_id');
  const [tabValue, setTablValue] = useState(1); // 1 for all leads, 2 for today's leads
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openNewData, setOpenNewData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [openFollow, setOpenFollow] = useState(false);
  const [followupData, setFollowupData] = useState([]);
  const [openConvert, setOpenConvert] = useState(false);
  const [convertData, setConvertData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [startDate, setStartDate] = useState(''); // Start date
const [endDate, setEndDate] = useState(''); // End date


  useEffect(() => {
    // Fetch all leads once
    axios
      .get(`${config.apiUrl}/leads/followingLeadsByEmpId?emp_id=${emp_id}`)
      .then((res) => {
        const states = new Set(res.data.map((state) => state.leads_state));
        setStateData([...states]);
        setLeadsData(res.data);
        setFilteredLeadsData(res.data); // Default to show all leads
      })
      .catch((err) => {
        console.log('Leads data is not fetched.', err);
      });
  }, [openUpdate, openNewData, openNew]);

  useEffect(() => {
    if (leadsState) {
      const filteredCities = new Set(leadsData.filter((lead) => lead.leads_state === leadsState).map((lead) => lead.leads_city));
      setCityData([...filteredCities]);
    } else {
      setCityData([]);
    }
  }, [leadsState]);

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    const filtered = leadsData.filter((lead) => {
      const matchesSearch =
        searchTerm === '' ||
        // lead.leads_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // lead.leads_name.toUpperCase().includes(searchTerm.toUpperCase) ||
        // lead.leads_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // lead.leads_email.toUpperCase().includes(searchTerm.toUpperCase()) ||
        // lead.leads_mobile.includes(searchTerm);

        (lead.leads_name && lead.leads_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.leads_email && lead.leads_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.leads_mobile && lead.leads_mobile.includes(searchTerm));

      const matchesState = leadsState === '' || lead.leads_state === leadsState;
      const matchesCity = leadsCity === '' || lead.leads_city === leadsCity;

      // Filter based on tab selection (1: All Leads, 2: Today's Leads)
      const matchesTab = tabValue === 1 || (tabValue === 2 && moment(lead.created_at).format('YYYY-MM-DD') === today);

      return matchesSearch && matchesState && matchesCity && matchesTab;
    });
    setFilteredLeadsData(filtered);
  }, [searchTerm, leadsState, leadsCity, tabValue, leadsData]);

  const handleChangeDataPerPage = (e) => {
    const newDataPerPage = parseInt(e.target.value, 10);
    if (newDataPerPage == 1) {
      setDataPerPage(leadsData.length);
      setCurrentPage(1);
    } else {
      setDataPerPage(newDataPerPage);
      setCurrentPage(1);
    }
  };

  const firstIndexOfData = (currentPage - 1) * dataPerPage;
  const lastIndexOfData = currentPage * dataPerPage;
  const currentData = filteredLeadsData ? filteredLeadsData.slice(firstIndexOfData, lastIndexOfData) : [];

  const handleFilterClear = () => {
    setLeadsState('');
    setLeadsCity('');
    setSearchTerm('');
    setFilteredLeadsData(leadsData);
  };

  const handleUpdate = (id) => {
    const selectUpdate = leadsData.find((leads) => leads.follow_id === id);
    if (selectUpdate) {
      setUpdateData(selectUpdate);
      setOpenUpdate(true);
    }
  };

  const handlewalkingLeads = (id) => {
    setUpdateData('');
    setOpenNew(true);
  };
  const handleAddQuotationClick = (event, lead) => {
    setAnchorEl(event.currentTarget); // Track where the popover should open
    setSelectedLead(lead); // Track the currently selected lead
  };

  const handleClosePopover = () => {
    setAnchorEl(null); // Close popover
    setSelectedLead(null); // Clear selected lead
  };

  const handleOptionClick = (option, leadId) => {
    handleClosePopover();
    navigate(`/${option}/${leadId}`); // Navigate to the respective option (quotation, proforma, invoice) with the correct leadId
  };

  const open = Boolean(anchorEl);

  const handleFollowUps = (id) => {
    const selectConvert = leadsData.find((leads) => leads.follow_id === id);
    if (selectConvert) {
      setFollowupData(selectConvert);
      setOpenFollow(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleConvert = (id) => {
    const selectConvert = leadsData.find((leads) => leads.follow_id === id);
    if (selectConvert) {
      setConvertData(selectConvert);
      setOpenConvert(true);
    }
  };
  const handleAddNewWakeingSuccess = () => {
    setOpenNew(false);
    setSnackbarSeverity('success');
    setSnackbarMessage(' New Lead created successfully');
    setSnackbarOpen(true);
  };
  const handleRemove = async (id) => {
    try {
        // Send delete request to the backend
        const response = await axios.delete(`${config.apiUrl}/leads/deleteFollowingLead/${id}`);
        if (response.status === 200) {
            // Filter out the lead from both leadsData and filteredLeadsData
            const updatedLeads = leadsData.filter((lead) => lead.follow_id !== id);
            const updatedFilteredLeads = filteredLeadsData.filter((lead) => lead.follow_id !== id);

            // Update both leadsData and filteredLeadsData states
            setLeadsData(updatedLeads);
            setFilteredLeadsData(updatedFilteredLeads);

            // Show success snackbar
            setSnackbarSeverity('success');
            setSnackbarMessage('Lead removed successfully!');
            setSnackbarOpen(true);
        }
    } catch (error) {
        console.error('Error deleting lead:', error);

        // Show error snackbar
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to delete lead.');
        setSnackbarOpen(true);
    }
};

  //// here start date and end date Leads/////////////////////
  const getFilteredData = () => {
    const filtered = leadsData.filter((lead) => {
      if (startDate && endDate) {
        const leadDate = moment(lead.created_at).format('YYYY-MM-DD');
        return leadDate >= startDate && leadDate <= endDate;
      }
      return true;
    });
  
    return filtered;
  };
  
    const handleDownload = () => {
    const filteredData = getFilteredData(); 
    
    // Convert the filtered data into CSV format
    const csvData = convertToCSV(filteredData);
  
    // Create a Blob and trigger the download
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filtered_data.csv'; 
    link.click();
  };

  const convertToCSV = (data) => {
    // Define the fields you want to include in the CSV
    const headers = [
      'follow_id', 'emp_id','emp_name', 'leads_id', 'leads_name', 'leads_mobile', 'leads_email',
      'product_name', 'leads_company','Description','Call_Discussion', 'remember', 'reminder_date',
       'leads_address', 'leads_state', 'leads_city', 'call_Attended', 'gst_number', 'created_at'

    ];
    const rows = data.map(row => 
      headers.map(field => row[field] || '').join(',') 
    );
  
    return `${headers.join(',')}\n${rows.join('\n')}`;
  };
  
    return (
    <div style={{ padding: '10px' }}>
      <h1 className="text-center">Followed Leads Index</h1>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={tabValue} onChange={(event, newValue) => setTablValue(newValue)} centered>
              <Tab label="All Leads" value={1} />
              <Tab label="Today's Leads" value={2} />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="end">
          <Button variant="outlined" onClick={handleFilterClear}>
            Cancel Filters
          </Button>
        </Grid>
      </Grid>
      <Button onClick={() => handlewalkingLeads()}>New walking leads</Button>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Search"
            placeholder="Search by name, email, or mobile"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <Select value={dataPerPage} onChange={handleChangeDataPerPage}>
              <MenuItem value={5}>5 Per Page</MenuItem>
              <MenuItem value={10}>10 Per Page</MenuItem>
              <MenuItem value={15}>15 Per Page</MenuItem>
              <MenuItem value={1}>All Per Page</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={6}>
          <TextField fullWidth select label="Select State" value={leadsState} onChange={(e) => setLeadsState(e.target.value)}>
            <MenuItem value="">All States</MenuItem>
            {stateData.map((state, index) => (
              <MenuItem key={index} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            select
            label="Select City"
            value={leadsCity}
            onChange={(e) => setLeadsCity(e.target.value)}
            disabled={!leadsState}
          >
            <MenuItem value="">All Cities</MenuItem>
            {cityData.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>



      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{textAlign: 'center', padding: '10px', color: 'red'}}> Daily Reports Download</h3>
  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', justifyContent: 'center' }}>
    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Start Date:</label>
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      style={{
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
      }}
    />
    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>End Date:</label>
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      style={{
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
      }}
    />
  </div>

  {/* Download Button */}
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleDownload}
      style={{
        padding: '10px 20px',
        fontWeight: 'bold',
        borderRadius: '6px',
        backgroundColor: '#007bff',
        color: '#fff',
      }}
    >
      Download Data
    </Button>
  </div>
</div>



      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ fontWeight: 'bold', backgroundColor: '#FFF9C4' }}>
              <TableCell>S.No</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Leads Name</TableCell>
              <TableCell>Leads Mobile</TableCell>
              <TableCell>Leads Email</TableCell>
              <TableCell>Leads Company</TableCell>
              <TableCell>State</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Reminder Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((leads, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{leads.emp_name}</TableCell>
                <TableCell>{leads.leads_name}</TableCell>
                <TableCell>{leads.leads_mobile}</TableCell>
                <TableCell>{leads.leads_email}</TableCell>
                <TableCell>{leads.leads_company}</TableCell>
                <TableCell>{leads.leads_state}</TableCell>
                <TableCell>{leads.leads_city}</TableCell>
                <TableCell>{moment(leads.reminder_date).format('YYYY-MM-DD')}</TableCell>
                <TableCell>
                  {/* Quotation Button to Open Popover */}
                  <Button variant="outlined" onClick={() => handleOptionClick('quotation', leads.follow_id)}>
                    Quotation
                  </Button>
                  <Button onClick={() => handleUpdate(leads.follow_id)}>Edit</Button>
                  <Button variant="outlined" onClick={() => handleRemove(leads.follow_id)}>Remove</Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2} display="flex" justifyContent="center" className="mt-4">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredLeadsData.length / dataPerPage)}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            size="small"
          />
        </Stack>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth="md">
        <DialogContent>
          <UpdateFlwLeads data={updateData} onClose={() => setOpenUpdate(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdate(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openNew} onClose={() => setOpenNew(false)} maxWidth="md">
        <DialogContent>
          <AddWakeingLeads data={openNewData} onSuccess={handleAddNewWakeingSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNew(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openFollow} onClose={() => setOpenFollow(false)} maxWidth="md">
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <Followups data={followupData} onClose={() => setOpenFollow(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFollow(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConvert} onClose={() => setOpenConvert(false)} maxWidth="md">
        <DialogContent>
          <ConvertCustomer data={convertData} onClose={() => setOpenConvert(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConvert(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FollowingLeadsIndex;
