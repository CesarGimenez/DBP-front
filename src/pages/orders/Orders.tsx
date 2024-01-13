import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Confirm from "../../components/confirm/Confirm";
import { toast } from "react-toastify";
import { Order } from "../../types/order";
import DataTableOrder from "../../components/dataTable/DataTableOrders";
import useOrder from "../../hooks/useOrder";
import { useNavigate } from "react-router-dom";
import PaymentDetail from "./OrderDetail";

const columns: GridColDef[] = [
  {
    field: "code",
    type: "string",
    headerName: "Codigo",
    width: 150,
  },
  {
    field: "customer",
    type: "string",
    headerName: "Cliente",
    width: 200,
    renderCell: (params) => {
      const customer = params.row.customer;
      return (
        <div>
          <span>
            {`${customer.first_name} ${customer.last_name}`} -{" "}
            {customer.dni ?? ""}
          </span>
        </div>
      );
    },
  },
  {
    field: "amount",
    type: "number",
    headerName: "Monto",
    width: 200,
    renderCell: (params) => {
      return <span>{`$${params.row.amount}`}</span>;
    },
  },
  {
    field: "status",
    type: "string",
    headerName: "Estado",
    width: 150,
    renderCell: (params) => {
      const status = params.row.status;
      return (
        <div>
          <span
            style={{
              color:
                status === "Pendiente"
                  ? "orange"
                  : status === "Pagado"
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {" "}
            {status}{" "}
          </span>
        </div>
      );
    },
  },
  {
    field: "paymentMethod",
    type: "string",
    headerName: "Metodo de pago",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Fecha de creacion",
    width: 150,
    type: "string",
  },
];

const Orders = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { loading, Orders, getOrdersData, deleteOrder } = useOrder();
  const [refetch, setRefetch] = useState(false);
  const [Order, setOrder] = useState({} as Order);
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const onRefetch = () => {
    setRefetch((prev) => !prev);
  };

  const onShowEdit = (Order: Order) => {
    setOrder(Order);
    setOpenEdit(true);
  };

  const onShowDetail = (Order: Order) => {
    setOrder(Order);
    setOpenDetail(true);
  };

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const handleRedirectToNewOrder = () => {
    navigate("/new-order");
  };

  //   const deleteOrderConfirm = async () => {
  //     const response = await deleteOrder(Order._id);
  //     if (response && response.error) {
  //       if (response.message) toast.error(`${response.message[0]}`);
  //       else toast.error(`${response.error}`);
  //     } else {
  //       toast.success(`Marca eliminada con éxito`);
  //       onRefetch();
  //       setOpenConfirm(false);
  //     }
  //   };

  useEffect(() => {
    getOrdersData();
  }, [refetch]);

  return (
    <div className="Orders">
      <div className="info">
        <h1>Ventas registradas</h1>
        <button className="button" onClick={handleRedirectToNewOrder}>
          Crear Venta
        </button>
      </div>
      {null ? (
        "Loading..."
      ) : (
        <DataTableOrder
          slug="Orders"
          columns={columns}
          rows={Orders.map((Order) => ({
            ...Order,
          }))}
          onShowEdit={onShowEdit}
          onShowDetail={onShowDetail}
        />
      )}
      {openDetail && (
        <PaymentDetail
          payment={Order}
          totalPayment={Order.amount}
          setOpen={setOpenDetail}
        />
      )}
      {/* {openEdit && (
        <EditOrder
          slug="marca"
          columns={columns}
          setOpenEdit={setOpenEdit}
          onRefetch={onRefetch}
          Order={Order}
        />
      )} */}
      {/* {openConfirm && (
        <Confirm
          open={openConfirm}
          onClose={closeConfirm}
          onConfirm={() => deleteOrderConfirm()}
          object={Order}
        />
      )} */}
    </div>
  );
};

export default Orders;
