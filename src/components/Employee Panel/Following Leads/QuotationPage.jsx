// import section
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Button,
  Paper,
  Snackbar,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
  InputLabel,
  Select
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import config from '../../../config';
import logo from '../../../images/Krishna Industries.jpeg';
import QuotationBackGround from '../../../images/QuotationBackground.png';
import { Text } from 'recharts';
import { format } from 'date-fns';

// state management section
const QuotationPage = () => {
  const { follow_id } = useParams();
  const pdfRef = useRef();
  const [termsConditions, setTermsConditions] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const fromDetails = {
    company: 'Krishna Industry',
    phone: '9171585789',
    email: 'email@example.com',
    address:
      'Sri Venkateshwara Industrial Estate, No. 338/D2C, Balaguru Garden West, Peelamedu, Opposite Fun Mall, Peelamedu, Near NISE School, Coimbatore, Tamil Nadu, India, 641004',
    gst: '33BLDPS3889N1ZB'
  };
  const [existing, setExisting] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [quotationList, setQuotationList] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [toDetails, setToDetails] = useState({});
  const [quotationNumber, setQuotationNumber] = useState('');
  const [quotationDate, setQuotationDate] = useState('');
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [discount, setDiscount] = useState({ type: 'percentage', value: '0.00' });
  const [gst, setGst] = useState('');
  const [igst, setIgst] = useState('')
  const [isGstReadOnly, setIsGstReadOnly] = useState(false);
  const [isIgstReadOnly, setIsIgstReadOnly] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [totalWithoutTax, setTotalWithoutTax] = useState(0);
  const [success, setSuccess] = useState();
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [PaidAmount, setPaidAmount] = useState(0);
  const [previousPaidAmount, setPreviousPaidAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const formattedDate = quotationDate ? format(new Date(quotationDate), 'dd/MM/yyyy') : '';

  const fetchQuotationdatas = () => {
    if (follow_id) {
      setLoading(true);
      axios
        .get(`${config.apiUrl}/quotation/quotation/${follow_id}`)
        .then((res) => {
          console.log('API Response:', res.data);
          setToDetails(res.data);

          const productDetails = res.data.product_details || [];
          const formattedProducts = Array.isArray(productDetails)
            ? productDetails.map(product => ({
              pro_id: product.pro_id || '',
              quantity: product.quantity || 0,
              price: product.price || 0,
              hsn: product.hsn || '',
              description: product.description || ''
            }))
            : [];

          // console.log('Formatted Products:', formattedProducts);
          setProducts(formattedProducts);
          // console.log("first data:",res.data);

        })
        .catch((err) => {
          console.error('Error fetching lead data:', err);
          setSnackbarMessage('Failed to fetch lead details');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    fetchQuotationdatas();
  }, [follow_id, success]);

  // submit quotation
  const handleSubmitQuotation = async () => {
    if (!products.length) {
      setSnackbarMessage('Please add at least one product.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const totalPaidAmount = (parseFloat(previousPaidAmount) || 0) + (parseFloat(PaidAmount) || 0);
    const quotationData = {
      leads_id: toDetails.leads_id,
      leads_name: toDetails.leads_name,
      leads_mobile: toDetails.leads_mobile,
      leads_email: toDetails.leads_email,
      product_details: products,
      total_without_tax: totalWithoutTax,
      total_with_tax: totalWithTax,
      discount: discount.value,
      discountType: discount.type,
      gst: gst || '0',
      igst: igst || '0',
      paidAmount: totalPaidAmount,
      balance: balance
    };

    console.log("Submitting Quotation Data:", quotationData);
    setLoading(true);
    try {
      const response = selectedQuotation
        ? await axios.put(`${config.apiUrl}/quotation/updateQuotation`, { ...quotationData, quotation_number: quotationNumber })
        : await axios.post(`${config.apiUrl}/quotation/quotations`, quotationData);

      console.log("API Response:", response.data);
      const { quotation_number, quotation_date, message } = response.data;

      if (message && quotation_number) {
        setQuotationNumber(quotation_number);
        setQuotationDate(quotation_date);
        setSnackbarMessage('Quotation submitted successfully.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setSuccess('success');

        // Update the quotation list
        const updatedList = await axios.get(`${config.apiUrl}/quotation/quotationlist/${toDetails.leads_id}`);
        setQuotationList(updatedList.data);

        // Automatically select the newly created/updated quotation
        setSelectedQuotation(quotation_number);

        // Optionally, set the selected quotation's data
        const selectedData = updatedList.data.find((quotation) => quotation.quotation_number === quotation_number);
        if (selectedData) {
          // Check if product_details needs to be parsed
          const parsedProductDetails = typeof selectedData.product_details === 'string'
            ? JSON.parse(selectedData.product_details)
            : selectedData.product_details;

          setProducts(parsedProductDetails);
          setTotalWithTax(parseFloat(selectedData.total_with_tax).toFixed(2));
          setTotalWithoutTax(parseFloat(selectedData.total_without_tax).toFixed(2));
          setPreviousPaidAmount(parseFloat(selectedData.paidAmount).toFixed(2));
          setPaidAmount(0);
          setBalance(parseFloat(selectedData.balance).toFixed(2));
          setGst(selectedData.gst);
          setIgst(selectedData.igst);
          setDiscount({
            type: selectedData.discountType,
            value: selectedData.discount
          });
        }

        setLoading(false);
      } else {
        setSnackbarMessage('Quotation number is undefined.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error submitting quotation:', error);
      setSnackbarMessage('Error submitting quotation.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (toDetails.leads_id) {
      axios
        .get(`${config.apiUrl}/quotation/quotationlist/${toDetails.leads_id}`)
        .then((res) => {
          setQuotationList(res.data);
        })
        .catch((err) => {
          console.error('Error fetching quotation list:', err);
        });
    }
  }, [toDetails.leads_id, success]);


  const handleQuotationChange = (event) => {
    const value = event.target.value;
    setSelectedQuotation(value);

    if (value === '') {
      setProducts([]);
      setQuotationDate('');
      setQuotationNumber('');
      setTotalWithTax('');
      setTotalWithoutTax('');
      setPaidAmount('');
      setPreviousPaidAmount('');
      setBalance('');
      setGst('');
      setIgst('');
      setDiscount({ type: '', value: '' });
    } else {
      const selectedData = quotationList.find((quotation) => quotation.quotation_number === value);
      console.log("selected data:", selectedData);

      if (selectedData) {
        try {
          const parsedProducts = JSON.parse(selectedData.product_details);
          setProducts(Array.isArray(parsedProducts) ? parsedProducts : []); // Ensure we set products as an array
        } catch (error) {
          console.error('Error parsing product_details:', error);
          setProducts([]); // Fallback to an empty array on parsing error
        }

        setQuotationDate(selectedData.quotation_date);
        setQuotationNumber(selectedData.quotation_number);
        setTotalWithTax(parseFloat(selectedData.total_with_tax).toFixed(2));
        setTotalWithoutTax(parseFloat(selectedData.total_without_tax).toFixed(2));
        setPreviousPaidAmount(parseFloat(selectedData.paidAmount).toFixed(2));
        setPaidAmount(0);
        setBalance(parseFloat(selectedData.balance).toFixed(2));
        setGst(selectedData.gst);
        setIgst(selectedData.igst);
        setDiscount({
          type: selectedData.discountType,
          value: selectedData.discount,
        });
      }
    }
  };

  // getproductdata
  useEffect(() => {
    axios
      .get(`${config.apiUrl}/product/getProductData`)
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setSnackbarMessage('Failed to fetch products');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  }, [follow_id, success]);

  // product change
  const handleProductChange = (index, value) => {
    const selectedProduct = allProducts.find((product) => product.pro_name === value);
    const newProducts = [...products];
    if (selectedProduct) {
      newProducts[index] = {
        pro_id: selectedProduct.pro_id,
        pro_name: selectedProduct.pro_name,
        price: selectedProduct.price,
        hsn: selectedProduct.hsn,
        description: '',
        quantity: ''
      };
    } else {
      newProducts[index] = { pro_id: '', quantity: '', price: '', hsn: '', description: '' };
    }
    setProducts(newProducts);
    calculateTotal(newProducts);
  };

  // quantity change
  const handleQuantityChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index].quantity = value;
    setProducts(newProducts);
    calculateTotal(newProducts);
  };

  // price change
  const handlePriceChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index].price = value;
    setProducts(newProducts);
    calculateTotal(newProducts);
  };

  // hsn number change
  const handleHsnChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index].hsn = value;
    setProducts(newProducts);
    calculateTotal(newProducts);
  };

  // description change
  const handleDescriptionChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index].description = value;
    setProducts(newProducts);
    calculateTotal(newProducts);
  };

  // gst change
  const handleGstChange = (e) => {
    const value = e.target.value;
    setGst(value);
    if (value > 0) {
      setIsGstReadOnly(false);
      setIsIgstReadOnly(true);
    } else {
      if (parseFloat(igst) > 0) {
        setIsIgstReadOnly(false);
      } else {
        setIsIgstReadOnly(false);
      }
    }
  };

  // igst change
  const handleIgstChange = (e) => {
    const value = e.target.value;
    setIgst(value);
    if (value > 0) {
      setIsIgstReadOnly(false);
      setIsGstReadOnly(true);
    } else {
      if (parseFloat(gst) > 0) {
        setIsGstReadOnly(false);
      } else {
        setIsGstReadOnly(false);
      }
    }
  };

  // remove product
  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  // calculation for total
  const calculateTotal = (paidAmount = 0) => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return;
    }

    let total = products.reduce((acc, product) => {
      const productTotal = (parseFloat(product.price) || 0) * (parseInt(product.quantity) || 0);
      return acc + productTotal;
    }, 0);

    setSubTotal(total);

    if (discount.type === 'percentage') {
      total -= (total * (parseFloat(discount.value) || 0)) / 100;
    } else {
      total -= parseFloat(discount.value) || 0;
    }

    const gstRate = parseFloat(gst) || 0;
    const igstRate = parseFloat(igst) || 0;
    const totalTax = total * (gstRate + igstRate) / 100;
    const totalWithTax = total + totalTax;

    setTotalWithoutTax(total.toFixed(2));
    setTotalWithTax(totalWithTax.toFixed(2));
    const totalPaidAmount = (parseFloat(previousPaidAmount) || 0) + (parseFloat(paidAmount) || 0);
    const balanceAmount = totalWithTax - totalPaidAmount;
    setBalance(balanceAmount.toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  }, [products, PaidAmount, discount, gst, igst]);

  // add product
  const handleAddProduct = () => {
    setProducts([...products, { pro_id: '', quantity: '', price: '', hsn: '', description: '' }]);
  };

  // snackbar close,open
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // generate pdf format
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const headerHeight = 20;
    const footerHeight = 15;

    html2canvas(pdfRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.setFillColor(0, 0, 139);
      doc.rect(0, 0, doc.internal.pageSize.width, headerHeight, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('Helvetica', 'bold');
      doc.text('Quotation', doc.internal.pageSize.width / 2, 10, { align: 'center', baseline: 'middle' });
      doc.addImage(imgData, 'PNG', 10, headerHeight + 5, 190, 0);

      // Add the Terms & Conditions text to the PDF
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text('Terms & Conditions:', 10, headerHeight + canvas.height + 15);
      const termsLines = doc.splitTextToSize(termsConditions, doc.internal.pageSize.width - 20);
      doc.text(termsLines, 10, headerHeight + canvas.height + 25);

      const pageHeight = doc.internal.pageSize.height;
      doc.setTextColor(0, 255, 0);
      doc.setFontSize(14);
      doc.text('Thanks for your Business with Us !!! Visit Again !!!', doc.internal.pageSize.width / 2, pageHeight - footerHeight - 10, {
        align: 'center',
        baseline: 'middle',
      });
      doc.setFillColor(0, 0, 139);
      doc.rect(0, pageHeight - footerHeight, doc.internal.pageSize.width, footerHeight, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('© 2024 Krishna Industry | All rights reserved', doc.internal.pageSize.width / 2, pageHeight - 5, {
        align: 'center',
        baseline: 'middle',
      });

      doc.save(`Quotation-${quotationNumber}.pdf`);
    });
  };

  // open preview dialogue
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // close preview dialogue
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  return (
    // form leads information dont change
    <div>
      <Typography variant="h1" align="center" justifyContent="center" marginBottom="20px">
        Quotation
      </Typography>
      {/* from details */}
      <Grid container spacing={3} alignItems="flex-start" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h2" marginBottom={'10px'}>
            From
          </Typography>
          <Typography variant="h3">{fromDetails.company}</Typography>
          <Typography variant="h5">Phone: {fromDetails.phone}</Typography>
          <Typography variant="h5">Email: {fromDetails.email}</Typography>
          <Typography variant="h5">Address: {fromDetails.address}</Typography>
          <Typography variant="h5">GST NO: {fromDetails.gst}</Typography>
        </Grid>

        {/* To Details */}
        <Grid item xs={6} style={{ textAlign: 'left', marginLeft: '0px' }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h2" marginBottom={'10px'}>
                To
              </Typography>
              <Typography variant="h3">{toDetails.leads_name}</Typography>
              <Typography variant="h5">Company: {toDetails.leads_company}</Typography>
              <Typography variant="h5">Phone: {toDetails.leads_mobile}</Typography>
              <Typography variant="h5">Email: {toDetails.leads_email}</Typography>
              <Typography variant="h5">GST No :{toDetails.gst_number}</Typography>
            </>
          )}
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Billing and Shipping Address */}
          <Grid container spacing={3} marginTop={'2px'}>
            <Grid item xs={12} sm={6}>
              <h3>Billing Address</h3>
              <Typography variant="h6">
                {toDetails.billing_door_number || 'N/A'}, {toDetails.billing_street || 'N/A'}, <br />
                {toDetails.billing_landMark || 'N/A'}, <br />
                {toDetails.billing_city || 'N/A'},<br /> {toDetails.billing_state || 'N/A'} - {toDetails.billing_pincode || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} marginBottom="10px">
              <h3>Shipping Address</h3>
              <Typography variant="h6">
                {toDetails.shipping_door_number || 'N/A'}, {toDetails.shipping_street || 'N/A'},<br />{' '}
                {toDetails.shipping_landMark || 'N/A'}, <br />
                {toDetails.shipping_city || 'N/A'},<br /> {toDetails.shipping_state || 'N/A'} - {toDetails.shipping_pincode || 'N/A'}
              </Typography>
            </Grid>
          </Grid>

          {/* select quotation using quotation number */}
          {quotationList.length > 0 && (
            <Grid item xs={6} sm={3} margin={'13px'}>
              <InputLabel id="Quotation-select-label">Select Quotation</InputLabel>
              <Select
                labelId="Quotation-select-label"
                value={selectedQuotation || ''}
                onChange={handleQuotationChange}
                displayEmpty
                renderValue={(selected) => {
                  return selected ? selected : <em>Select Quotation</em>;
                }}
                label="Select Quotation"
              >
                <MenuItem value="">
                  <em>Clear Selection</em>
                </MenuItem>
                {quotationList.map((quotation) => (
                  <MenuItem key={quotation.id} value={quotation.quotation_number}>
                    {quotation.quotation_number}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}


          {/* Product Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>HSN No</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Autocomplete
                          options={allProducts.map((p) => p.pro_name)}
                          renderInput={(params) => <TextField {...params} label="Product" />}
                          onChange={(event, value) => handleProductChange(index, value)}
                          value={product.pro_name || ''}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          label="Quantity"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                          inputProps={{ min: 0 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          label="Price"
                          value={product.price}
                          onChange={(e) => handlePriceChange(index, e.target.value)}
                          inputProps={{ min: 0 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          label="HSN No"
                          value={product.hsn}
                          onChange={(e) => handleHsnChange(index, e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          label="Description"
                          value={product.description}
                          onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        {parseFloat(product.price) * parseInt(product.quantity, 10) || 0}
                      </TableCell>
                      <TableCell>
                        <Button color="secondary" onClick={() => handleRemoveProduct(index)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>No products available</TableCell>
                  </TableRow>
                )}
              </TableBody>

              {/* Subtotal Row */}
              <TableRow>
                <TableCell colSpan={8} align="right">
                  <Typography variant="h4">Sub Total: {subTotal}</Typography>
                </TableCell>
              </TableRow>
            </Table>
            <Button style={{ margin: '20px' }} onClick={handleAddProduct}>
              Add Product
            </Button>
          </TableContainer>


          {/* Discount and GST */}
          <Grid container spacing={3} margin={'2px'}>
            <Grid item xs={6} sm={3}>
              <TextField
                select
                label="Discount Type"
                value={discount.type}
                onChange={(e) => setDiscount({ ...discount, type: e.target.value })}
                fullWidth
                InputProps={{

                }}
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="Amount"> Amount</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Discount"
                type="number"
                value={discount.value}
                onChange={(e) => setDiscount({ ...discount, value: e.target.value })}
                fullWidth
                InputProps={{
                }}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                label="GST"
                type="number"
                value={gst}
                onChange={handleGstChange}
                fullWidth
                InputProps={{ readOnly: isGstReadOnly }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="IGST"
                type="number"
                value={igst}
                onChange={handleIgstChange}
                fullWidth
                InputProps={{ readOnly: isIgstReadOnly }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} margin={'2px'}>
            <Grid item xs={12} sm={2}>
              <TextField label="Total" type="number" value={totalWithTax} fullWidth inputProps={{ readOnly: true, min: 0 }} />
            </Grid>

            {previousPaidAmount > 0 && (
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Advance"
                  type="number"
                  value={previousPaidAmount}
                  fullWidth
                  inputProps={{ readOnly: true, min: 0 }}
                />
              </Grid>
            )}

            <Grid item xs={6} sm={3}>
              <TextField
                label="Paid Amount"
                type="number"
                value={PaidAmount === 0 ? '' : PaidAmount}
                onChange={(e) => {
                  const newPaidAmount = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
                  if (newPaidAmount > parseFloat(balance)) {
                    setPaidAmount(parseFloat(balance));
                  } else {
                    setPaidAmount(newPaidAmount);
                  }
                }}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Balance" type="number" value={balance} fullWidth inputProps={{ readOnly: true, min: 0 }} />
            </Grid>

          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="terms & conditions"
              label="Terms & Conditions"
              multiline
              rows={4}
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: 'white',
                  border: 'none',
                  textAlign: 'center',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
              }}
              value={termsConditions}
              onChange={(e) => setTermsConditions(e.target.value)}
            />
          </Grid>
          {/* Totals */}
          <Grid item xs={6} sm={3} margin={'15px'} marginTop={'20px'}>
            <Grid container direction="column">
              <Grid item container justifyContent="space-between">
                <Typography variant="h6" style={{ flex: 0.3 }}>
                  Total (without tax)
                </Typography>
                <Typography variant="h6" style={{ textAlign: 'left', flex: 1 }}>
                  {totalWithoutTax}
                </Typography>
              </Grid>
              <Grid item container justifyContent="space-between">
                <Typography variant="h6" style={{ flex: 0.3 }}>
                  Discount
                </Typography>
                <Typography variant="h6" style={{ textAlign: 'left', flex: 1 }}>
                  {discount.type === 'percentage' ? `${discount.value}%` : `₹${discount.value}`}
                </Typography>
              </Grid>

              {/* <Grid item container justifyContent="space-between">
                <Typography variant="h6" style={{ flex: 0.3 }}>
                  GST
                </Typography>
                <Typography variant="h6" style={{ textAlign: 'left', flex: 1 }}>
               {gst}%      (GST Amount: ₹{(totalWithTax - totalWithoutTax).toFixed(2)})
               </Typography>
               </Grid>

              <Grid item container justifyContent="space-between">
                <Typography variant="h6" style={{ flex: 0.3 }}>
                  IGST
                </Typography>
                <Typography variant="h6" style={{ textAlign: 'left', flex: 1 }}>
                  {igst}%       (IGST Amount: ₹{(totalWithTax - totalWithoutTax).toFixed(2)})
                </Typography>
              </Grid> */}




<Grid item container justifyContent="space-between">
  <Typography variant="h6" style={{ flex: 0.3 }}>
    GST
  </Typography>
  <Typography variant="h6" style={{ textAlign: 'left', flex: 1 }}>
    {gst ? `${gst}%` : "N/A"} 
    {gst && ` (GST Amount: ₹${((totalWithoutTax * gst) / 100).toFixed(2)})`}
  </Typography>
</Grid>

<Grid item container justifyContent="space-between">
  <Typography variant="h6" style={{ flex: 0.3 }}>
    IGST
  </Typography>
  <Typography variant="h6" style={{ textAlign: 'left', flex: 1 }}>
    {igst ? `${igst}%` : "N/A"} 
    {igst && ` (IGST Amount: ₹${((totalWithoutTax * igst) / 100).toFixed(2)})`}
  </Typography>
</Grid>

              <Grid item container justifyContent="space-between">
                <Typography variant="h6" style={{ flex: 0.3 }}>
                  Total (with tax)
                </Typography>
                <Typography variant="h6" style={{ textAlign: 'left', flex: 1 }}>
                  {totalWithTax}
                </Typography>
              </Grid>
            </Grid>
          </Grid>


          {/* Submit Button */}
          <Grid item xs={30}>
            <Button onClick={handleSubmitQuotation} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit Quotation'}
            </Button>
            <Button onClick={() => setOpenDialog(true)} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Preview'}
            </Button>
          </Grid>

          {/* PDF Preview Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>Quotation Preview</DialogTitle>
            <DialogContent dividers color="red">
              <div
                ref={pdfRef}
                style={{
                  padding: '10px',
                  backgroundColor: '#ffffff',
                  backgroundImage: '',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  borderRadius: '8px'
                }}
              >

                <Grid container alignItems="center" justifyContent="space-between">

                  {/* Logo on the left */}
                  <Grid item xs={3}>
                    <img src={logo} alt="Company Logo" style={{ width: '120px', height: 'auto' }} />
                  </Grid>

                  {/* Quotation number and date on the right */}
                  <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <Typography variant="h6">Quotation No: {quotationNumber}</Typography>
                    <Typography>Date: {formattedDate}</Typography>
                  </Grid>
                </Grid>

                {/* Company Logo */}
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>

                  {/* From Section */}
                  <Grid item xs={6} style={{ textAlign: 'left' }}>
                    <Typography variant="h3" marginTop="15px" gutterBottom>
                      From
                    </Typography>
                    <Typography variant="h3">{fromDetails.company}</Typography>
                    <Typography variant="h6">Phone: {fromDetails.phone}</Typography>
                    <Typography variant="h6">Email: {fromDetails.email}</Typography>
                    <Typography variant="h6">Address: {fromDetails.address}</Typography>
                    <Typography variant="h6">GST NO: {fromDetails.gst}</Typography>
                  </Grid>

                  {/* To Section */}
                  <Grid item xs={6} style={{ textAlign: 'left' }}>
                    <Typography variant="h3" marginTop="15px" gutterBottom>
                      To
                    </Typography>
                    <Typography variant="h3">{toDetails.leads_name}</Typography>
                    <Typography variant="h5">Company: {toDetails.leads_company}</Typography>
                    <Typography variant="h6">Phone: {toDetails.leads_mobile}</Typography>
                    <Typography variant="h6">Email: {toDetails.leads_email}</Typography>
                    <Typography variant="h6">GST No :{toDetails.gst_number}</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ borderWidth: '2px', borderColor: 'black', paddingTop: '15px' }}>

                  {/* Billing Address */}
                  <Grid item xs={6}>
                    <Typography variant="h4">Billing Address</Typography>
                    <Typography variant="h6">
                      {toDetails.billing_door_number || 'N/A'},<br /> {toDetails.billing_street || 'N/A'},{' '}
                      {toDetails.billing_landMark || 'N/A'}, <br />
                      {toDetails.billing_city || 'N/A'},<br /> {toDetails.billing_state || 'N/A'} - {toDetails.billing_pincode || 'N/A'}
                    </Typography>
                  </Grid>

                  {/* Shipping Address */}
                  <Grid item xs={6}>
                    <Typography variant="h4">Shipping Address</Typography>
                    <Typography variant="h6">
                      {toDetails.billing_door_number || 'N/A'}, <br />
                      {toDetails.billing_street || 'N/A'}, {toDetails.billing_landMark || 'N/A'}, <br />
                      {toDetails.billing_city || 'N/A'}, <br />
                      {toDetails.billing_state || 'N/A'} - {toDetails.billing_pincode || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Product Details Table */}
                <TableContainer style={{ marginTop: '20px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>HSN No</TableCell>
                        <TableCell>Desccription</TableCell>
                        <TableCell>Sub Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(products) && products.length > 0 ? (
                        products.map((product, index) => {
                          const matchedProduct = allProducts.find((p) => p.pro_id === product.pro_id);

                          return (
                            <TableRow key={index}>
                              <TableCell>{matchedProduct ? matchedProduct.pro_name : 'Unknown Product'}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell>{product.price}</TableCell>
                              <TableCell>{product.hsn}</TableCell>
                              <TableCell>{product.description}</TableCell>
                              <TableCell>
                                {parseFloat(product.price) * parseInt(product.quantity, 10) || 0}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6}>No products available</TableCell>
                        </TableRow>
                      )}
                    </TableBody>

                    <TableCell colSpan={6} align="right">
                      <Typography variant="h4">Sub Total: {subTotal}</Typography>
                    </TableCell>
                  </Table>
                </TableContainer>

                <Grid item xs={8} sm={5} margin={'15px'} marginTop={'10px'} marginBottom={"10px"}>
                  <Typography variant="h4" align="right" margin={'20px'}>
                    Totals Section
                  </Typography>

                  <Grid container direction="column">
                    <Grid item container justifyContent="space-between">
                      <Typography variant="h6" style={{ textAlign: 'right', flex: 1, marginBottom: '10px' }}>
                        {`Discount :`}
                      </Typography>
                      <Typography variant="h6" style={{ textAlign: 'right', flex: 0.1 }}>
                        {discount.type === 'percentage' ? `${discount.value}%` : `₹${discount.value}`}
                      </Typography>
                    </Grid>

                    <Grid container spacing={2}>
                      {gst > 0 && (
                        <Grid item container justifyContent="space-between">
                          <Typography variant="h6" style={{ textAlign: 'right', flex: 1 }}>
                            GST
                          </Typography>
                          <Typography variant="h6" style={{ textAlign: 'right', flex: 0.1 }}>
                            {gst}%
                          </Typography>
                        </Grid>
                      )}

                      {igst > 0 && (
                        <Grid item container justifyContent="space-between">
                          <Typography variant="h6" style={{ textAlign: 'right', flex: 1 }}>
                            IGST
                          </Typography>
                          <Typography variant="h6" style={{ textAlign: 'right', flex: 0.1 }}>
                            {igst}%
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                    <Grid item container justifyContent="space-between">
                      <Typography variant="h6" style={{ textAlign: 'right', flex: 1 }}>
                        Paid Amount
                      </Typography>
                      <Typography variant="h6" style={{ textAlign: 'right', flex: 0.1 }}>
                        {previousPaidAmount}
                      </Typography>
                    </Grid>
                    <Grid item container justifyContent="space-between">
                      <Typography variant="h6" style={{ textAlign: 'right', flex: 1 }}>
                        Balance Amount
                      </Typography>
                      <Typography variant="h6" style={{ textAlign: 'right', flex: 0.1 }}>
                        {balance}
                      </Typography>
                    </Grid>

                    <Grid item container justifyContent="space-between">
                      <Typography variant="h6" style={{ textAlign: 'right', flex: 1 }}>
                        {gst > 0 || igst > 0 ? `Total (without tax) :` : `Total:`}
                      </Typography>
                      <Typography variant="h6" style={{ textAlign: 'right', flex: 0.1 }}>
                        {totalWithoutTax}
                      </Typography>
                    </Grid>


                    {(gst > 0 || igst > 0) && (
                      <Grid item container justifyContent="space-between">
                        <Typography variant="h4" style={{ textAlign: 'right', flex: 1 }}>
                          {`Total (with tax)   :`}
                        </Typography>
                        <Typography variant="h5" style={{ textAlign: 'right', flex: 0.1 }}>
                          {totalWithTax}
                        </Typography>
                      </Grid>
                    )}

                  </Grid>
                  <DialogTitle>{termsConditions ? 'Terms & Conditions' : ''}</DialogTitle>
                  <DialogContent>
                    {termsConditions && <Typography>{termsConditions}</Typography>}
                  </DialogContent>

                </Grid>
              </div>
            </DialogContent>

            {/* Actions for Download */}
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button onClick={handleGeneratePDF}>Download PDF</Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for feedback */}
          <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default QuotationPage;
