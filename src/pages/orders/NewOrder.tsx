import {
  Button,
  Card,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  tableCellClasses,
  styled,
  TableBody,
  TableCell,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";

import "./newOrder.scss";
import useCustomer from "../../hooks/useCustomer";
import { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import { Product } from "../../types/product";
import { Order, OrderDetail } from "../../types/order";
import { toast } from "react-toastify";
import useOrder from "../../hooks/useOrder";

const NewOrder = () => {
  const { getCustomersData, customers } = useCustomer();
  const { getProductsData, Products } = useProduct();
  const { createOrder } = useOrder();
  const [productSelected, setProductSelected] = useState({} as Product);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [percentageDiscount, setPercentageDiscount] = useState(0);
  const [detail, setDetail] = useState([] as OrderDetail[]);
  const [errors, setErrors] = useState({} as any);
  const [total, setTotal] = useState(0);

  const validationSchema = Yup.object().shape({
    customer: Yup.string().required("El cliente es requerido"),
    orderDetail: Yup.array().required("Debe agregar al menos un producto"),
    amount: Yup.number().required("El monto total es requerido"),
    status: Yup.string().required("El estado es requerido"),
    paymentMethod: Yup.string().required("El metodo de pago es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      customer: "",
      orderDetail: detail,
      amount: total,
      status: "Pendiente",
      paymentMethod: "Efectivo",
    },
    validationSchema,
    onSubmit: async (values: Order) => {
      values = {
        ...values,
        orderDetail: detail,
        amount: total,
        customer: values.customer,
        paymentMethod: values.paymentMethod,
        status: values.status,
      };

      console.log("epale");
      const response = await createOrder(values);
      if (response) {
        toast.success("Orden creada con exito");
        formik.resetForm();
        setDetail([]);
        setTotal(0);
        setProductSelected({} as Product);
        setAmount(0);
        setQuantity(0);
        setPercentageDiscount(0);
      }
    },
  });

  const handleSelectProduct = (value: string) => {
    const productSelect = Products.find((product) => product._id === value);
    setProductSelected(productSelect || ({} as Product));
    setErrors({});
    setQuantity(0);
    setAmount(0);
    setPercentageDiscount(0);
  };

  const handleSetAmount = (
    value: number = quantity,
    percent: number = percentageDiscount
  ) => {
    value =
      value * productSelected.unit_cost_sale -
      (value * productSelected.unit_cost_sale * (percent || 0)) / 100;
    setAmount(value);
  };

  const handleAddDetail = () => {
    const product = detail.find((item) => item.product === productSelected._id);
    if (quantity === 0) {
      setErrors({ ...errors, quantity: "La cantidad no puede ser 0" });
      return;
    }
    if (product) {
      if (product.quantity + quantity > productSelected.stock) {
        setErrors({
          ...errors,
          quantity: "No hay suficiente stock para este producto",
        });
        return;
      } else {
        setErrors({});
      }
      product.quantity += quantity;
      product.amount += amount;
      product.percent = percentageDiscount;
      if (product?.total) {
        product.total += amount;
      }
      formik.setFieldValue("orderDetail", [...detail]);
      setDetail([...detail]);
    } else {
      if (quantity > productSelected.stock) {
        setErrors({
          ...errors,
          quantity: "No hay suficiente stock para este producto",
        });
        return;
      } else {
        setErrors({});
      }
      const newProduct: OrderDetail = {
        name: productSelected?.name,
        product: productSelected?._id,
        quantity: quantity,
        amount: amount,
        total: amount,
        percent: percentageDiscount,
      };
      formik.setFieldValue("orderDetail", [...detail, newProduct]);
      setDetail([...detail, newProduct]);
    }
    setTotal(total + amount);
  };

  const deleteProduct = (product: OrderDetail) => {
    const newDetail = detail.filter((item) => item.product !== product.product);
    setDetail(newDetail);
    setTotal(total - product.amount);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    getCustomersData();
    getProductsData();
  }, []);

  return (
    <div className="Orders">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card className="card">
            <h1 className="card__title">Nueva Orden</h1>
            <form className="card_form" onSubmit={formik.handleSubmit}>
              <FormControl className="card_select">
                <InputLabel>Cliente</InputLabel>
                <Select
                  id="customer"
                  name="customer"
                  className="select"
                  value={formik.values.customer}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.customer && Boolean(formik.errors.customer)
                  }
                  label="Cliente"
                  style={{ width: "100%" }}
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer?._id} value={customer?._id}>
                      {customer?.first_name} {customer?.last_name} -{" "}
                      {customer?.dni}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.customer && formik.errors.customer && (
                  <FormHelperText style={{ color: "red" }}>
                    {formik.errors.customer}
                  </FormHelperText>
                )}
              </FormControl>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl className="card_select">
                    <label htmlFor="product">Producto</label>
                    <Select
                      id="product"
                      name="product"
                      className="select"
                      onChange={(e) =>
                        handleSelectProduct(e.target.value as string)
                      }
                      label="Producto"
                      style={{ width: "100%" }}
                    >
                      {Products.map((product) => (
                        <MenuItem key={product?._id} value={product?._id}>
                          {product?.name} -{product?.oam}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* {formik.touched.brand && formik.errors.brand && (
                  <FormHelperText style={{ color: "red" }}>
                    {formik.errors.brand}
                  </FormHelperText>
                )} */}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="quantity">Cantidad</label>
                  <TextField
                    name="quantity"
                    variant="outlined"
                    type="number"
                    className="card_text_field"
                    onChange={(e) => {
                      setQuantity(Number(e.target.value));
                      handleSetAmount(Number(e.target.value));
                    }}
                    defaultValue={0}
                    value={quantity}
                    style={{ marginTop: "10px" }}
                    disabled={!productSelected._id}
                    error={errors.quantity}
                    helperText={errors.quantity}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <label htmlFor="amount">Monto</label>
                  <TextField
                    variant="outlined"
                    name="amount"
                    className="card_text_field"
                    value={amount}
                    contentEditable={false}
                    style={{ marginTop: "10px" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="percentage_discount">% de descuento</label>
                  <TextField
                    name="percentage_discount"
                    variant="outlined"
                    type="number"
                    defaultValue={0}
                    value={percentageDiscount}
                    className="card_text_field"
                    inputProps={{ min: 0, max: 100 }}
                    style={{ marginTop: "10px" }}
                    onChange={(e) => {
                      setPercentageDiscount(Number(e.target.value));
                      handleSetAmount(quantity, Number(e.target.value));
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl variant="outlined" className="card_select">
                    <InputLabel>Estado</InputLabel>
                    <Select
                      className="select"
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.status && Boolean(formik.errors.status)
                      }
                    >
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                      <MenuItem value="Pagado">Pagado</MenuItem>
                      <MenuItem value="Entregado">Entregado</MenuItem>
                    </Select>
                  </FormControl>
                  {formik.touched.status && formik.errors.status && (
                    <FormHelperText style={{ color: "red" }}>
                      {formik.errors.status}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" className="card_select">
                    <InputLabel>Metodo de pago</InputLabel>
                    <Select
                      className="select"
                      name="paymentMethod"
                      value={formik.values.paymentMethod}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.paymentMethod &&
                        Boolean(formik.errors.paymentMethod)
                      }
                    >
                      <MenuItem value="Efectivo">Efectivo</MenuItem>
                      <MenuItem value="Zelle">Zelle</MenuItem>
                      <MenuItem value="Transferencia">
                        Transferencia (VES)
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {formik.touched.paymentMethod &&
                    formik.errors.paymentMethod && (
                      <FormHelperText style={{ color: "red" }}>
                        {formik.errors.paymentMethod}
                      </FormHelperText>
                    )}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    className="card__button"
                    onClick={handleAddDetail}
                    type="button"
                  >
                    Agregar producto
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    className="card__button"
                    type="submit"
                    disabled={formik.values.orderDetail?.length === 0}
                  >
                    Crear venta
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
        <Grid item xs={6}>
          {/* Tabla con todos los productos disponibles */}
          <Card className="card">
            <h1 className="card__title">Listado de productos</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell align="right">Cantidad</StyledTableCell>
                    <StyledTableCell align="right">Monto ($)</StyledTableCell>
                    <StyledTableCell align="right">Accion</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detail.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.amount}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <div
                          className="delete"
                          onClick={() => deleteProduct(row)}
                        >
                          <img src="/delete.svg" alt="" />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <h1 className="card__title" style={{ marginTop: "10px" }}>
              Total a pagar: {total} $
            </h1>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewOrder;
