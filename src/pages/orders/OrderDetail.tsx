import React, { useEffect } from "react";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Order } from "../../types/order";
import useOrder from "../../hooks/useOrder";
import "./orderDetail.scss";
import { format } from "date-fns";

interface PaymentModalProps {
  payment: Order;
  totalPayment?: number;
  setOpen: (open: boolean) => void;
}

const PaymentDetail: React.FC<PaymentModalProps> = ({
  payment,
  totalPayment,
  setOpen,
}) => {
  const { getOrderDetail, loading, Order } = useOrder();

  useEffect(() => {
    getOrderDetail(payment._id ?? "");
  }, [payment]);

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

  const { order, orderDetail } = Order;

  console.log(orderDetail);
  return (
    <div className="detail">
      <div className="modal">
        <Typography variant="h4">Detalle de pago</Typography>
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        {!order ? (
          <div>Cargando...</div>
        ) : (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "start",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <Typography variant="h5">
                Cliente:{" "}
                {typeof order.customer === "object"
                  ? `${order.customer?.first_name} ${order.customer?.last_name}`
                  : ""}
              </Typography>
            </div>
            <div>
              <Typography variant="h5">
                Fecha:{" "}
                {format(new Date(order.createdAt ?? ""), "dd/MM/yyyy HH:mm")}
              </Typography>
            </div>
            <div>
              <Typography variant="h5">
                Estatus de pago: {order.status}
              </Typography>
            </div>
            <div>
              <Typography variant="h5">
                Metodo de pago: {order.paymentMethod}
              </Typography>
            </div>
          </div>
        )}
        {orderDetail && orderDetail.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              style={{ marginBottom: "20px" }}
              className="text-red"
            >
              Detalle de productos
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Codigo D.B.P</StyledTableCell>
                    <StyledTableCell>Producto</StyledTableCell>
                    <StyledTableCell>Precio unitario</StyledTableCell>
                    <StyledTableCell>Cantidad</StyledTableCell>
                    <StyledTableCell>Descuento</StyledTableCell>
                    <StyledTableCell>Total</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {orderDetail.map((detail) => {
                    return (
                      <TableRow key={detail?._id}>
                        <TableCell>
                          {typeof detail.product === "object"
                            ? detail.product.code
                            : ""}
                        </TableCell>
                        <TableCell>
                          {typeof detail.product === "object"
                            ? detail.product.name
                            : ""}
                        </TableCell>
                        <TableCell>
                          {typeof detail.product === "object"
                            ? detail.product.unit_cost_sale.toFixed(2)
                            : ""}
                        </TableCell>
                        <TableCell>{detail.quantity}</TableCell>
                        <TableCell>{`${detail.percent ?? "0"}%`}</TableCell>
                        <TableCell>{detail.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        <div className="total-payment">
          <Typography variant="h4">
            <span className="text-red">Total: </span> $
            {totalPayment ? totalPayment.toFixed(2) : "0.00"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
