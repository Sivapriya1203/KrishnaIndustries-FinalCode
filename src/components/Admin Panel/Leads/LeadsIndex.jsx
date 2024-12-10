import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Search from '../../Search Option/Search';
import config from '../../../config';

import { makeStyles } from '@mui/styles';
import AddFollowingLeads from 'components/Employee Panel/Following Leads/AddFollowingLeads';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: '600px'
  },
  stickyAction: {
    position: 'sticky',
    right: 0,
    justifyItems: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 1
  },
  actionColumnHeader: {
    position: 'sticky',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  }
}));

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = hours.toString().padStart(2, '0');

  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
};

const LeadsIndex = () => {
  const classes = useStyles();
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [dataPerPage, setDataPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedFilter, setSearchedFilter] = useState([]);
  const [openFollowForm, setOpenFollowForm] = useState(false);
  const [followData, setFollowData] = useState();

  const [showTodayLeads, setShowTodayLeads] = useState(true); // Toggle for showing today's leads

  useEffect(() => {
    setLoading(true);
    fetchLeadsData(); // Fetch leads data on mount
  }, []);

  const fetchLeadsData = () => {
    axios
      .get(`${config.apiUrl}/leads/getleads`)
      .then((res) => {
        if (res.data.data.length > 0) {
          setLeadsData(res.data.data);
          setSearchedFilter(res.data.data); // Show all leads initially
        }
        setLoading(false);
      })
      .catch((err) => {
        setSnackbarMessage('An error occurred while fetching leads data.');
        setSnackbarOpen(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (leadsData.length > 0) {
      // Filter to show today's leads by default
      const today = moment().format('YYYY-MM-DD');
      const todayLeads = leadsData.filter((lead) => moment(lead.QUERY_TIME).format('YYYY-MM-DD') === today);
      setSearchedFilter(todayLeads); // Set initial filter to today's leads
    }
  }, [leadsData]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleShowTodayLeads = () => {
    if (showTodayLeads) {
      setSearchedFilter(leadsData); // Show all leads
    } else {
      const today = moment().format('YYYY-MM-DD');
      const todayLeads = leadsData.filter((lead) => moment(lead.QUERY_TIME).format('YYYY-MM-DD') === today);
      setSearchedFilter(todayLeads); // Show today's leads
    }
    setShowTodayLeads(!showTodayLeads);
    setCurrentPage(1); // Reset to the first page when toggling
  };

  const firstIndexOfData = (currentPage - 1) * dataPerPage;
  const lastIndexOfData = currentPage * dataPerPage;
  const currentData = searchedFilter.slice(firstIndexOfData, lastIndexOfData);

  const handleFollow = (id) => {
    if (leadsData.length > 0) {
      const selectData = leadsData.find((leads) => leads.UNIQUE_QUERY_ID === id);
      if (selectData) {
        setFollowData(selectData);
        setOpenFollowForm(true);
      }
    }
  };

  const handleFollowSuccess = () => {
    setOpenFollowForm(false);
    setSnackbarSeverity('success');
    setSnackbarMessage('Lead followed successfully!');
    setSnackbarOpen(true);
  };

  return (
    <div>
      <h1 className="text-center">Leads Index</h1>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
          <p>Processing... Please wait.</p>
        </div>
      ) : (
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Search data={leadsData} setData={setSearchedFilter} />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" onClick={handleShowTodayLeads}>
                {showTodayLeads ? 'Show All Leads' : "Show Today's Leads"}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <Select value={dataPerPage} onChange={(e) => setDataPerPage(e.target.value)}>
                  {[5, 10, 15, 20].map((size) => (
                    <MenuItem key={size} value={size}>
                      {size} per page
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>S.No</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Unique Query ID</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Query Type</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Query Time</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Mobile No</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Company Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>City</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>State</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Pincode</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Country ISO</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Mobile Alt</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Phone</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Phone Alt</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Email Alt</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Product Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Message</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Category Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Call Duration</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Receiver Mobile</TableCell>
                  <TableCell className={classes.actionColumnHeader}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((lead, index) => (
                    <TableRow key={lead.UNIQUE_QUERY_ID}>
                      <TableCell>{index + 1 + firstIndexOfData}</TableCell>
                      <TableCell>{lead.UNIQUE_QUERY_ID}</TableCell>
                      <TableCell>{lead.QUERY_TYPE}</TableCell>
                      <TableCell>{formatDate(lead.QUERY_TIME)}</TableCell>
                      <TableCell>{lead.SENDER_NAME}</TableCell>
                      <TableCell>{lead.SENDER_MOBILE}</TableCell>
                      <TableCell>{lead.SENDER_EMAIL}</TableCell>
                      <TableCell>{lead.SENDER_COMPANY}</TableCell>
                      <TableCell>{lead.SENDER_ADDRESS}</TableCell>
                      <TableCell>{lead.SENDER_CITY}</TableCell>
                      <TableCell>{lead.SENDER_STATE}</TableCell>
                      <TableCell>{lead.SENDER_PINCODE}</TableCell>
                      <TableCell>{lead.SENDER_COUNTRY_ISO}</TableCell>
                      <TableCell>{lead.SENDER_MOBILE_ALT}</TableCell>
                      <TableCell>{lead.SENDER_PHONE}</TableCell>
                      <TableCell>{lead.SENDER_PHONE_ALT}</TableCell>
                      <TableCell>{lead.SENDER_EMAIL_ALT}</TableCell>
                      <TableCell>{lead.QUERY_PRODUCT_NAME}</TableCell>
                      <TableCell>{lead.QUERY_MESSAGE}</TableCell>
                      <TableCell>{lead.QUERY_MCAT_NAME}</TableCell>
                      <TableCell>{lead.CALL_DURATION}</TableCell>
                      <TableCell>{lead.RECEIVER_MOBILE}</TableCell>
                      <TableCell className={classes.stickyAction}>
                        <Button onClick={() => handleFollow(lead.UNIQUE_QUERY_ID)}>Follow</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={23} style={{ textAlign: 'center' }}>
                      No leads found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={2} style={{ marginTop: '20px' }}>
            <Pagination
              count={Math.ceil(searchedFilter.length / dataPerPage)}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Stack>
        </>
      )}

      {/* Snackbar for error or success messages */}
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

      {/* Dialogs for following leads */}
      <Dialog open={openFollowForm} onClose={() => setOpenFollowForm(false)} fullWidth maxWidth="md">
        <DialogTitle>Follow Lead</DialogTitle>
        <DialogContent>
          <AddFollowingLeads leadData={followData} onSuccess={handleFollowSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFollowForm(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LeadsIndex;
