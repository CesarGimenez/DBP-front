import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";
import useCustomer from "../../hooks/useCustomer";
import DataTableCustomer from "../../components/dataTable/DataTableCustomer";
import { toast } from "react-toastify";
import { Customer } from "../../types/customer";
import AddCustomer from "../../components/add/AddCustomer";
import EditCustomer from "../../components/edit/EditCustomer";
import Confirm from "../../components/confirm/Confirm";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "dni", headerName: "CI", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          src={
            params.row.img ||
            "https://www.seekpng.com/png/detail/202-2024994_profile-icon-profile-logo-no-background.png"
          }
          alt=""
        />
      );
    },
  },
  {
    field: "first_name",
    type: "string",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "last_name",
    type: "string",
    headerName: "Apellido",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Telefono",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Fecha de creacion",
    width: 200,
    type: "string",
  },
];

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { loading, customers, getCustomersData } = useCustomer();
  const [refetch, setRefetch] = useState(false);
  const [Customer, setCustomer] = useState({} as Customer);
  const [openConfirm, setOpenConfirm] = useState(false);

  const onRefetch = () => {
    setRefetch((prev) => !prev);
  };

  const onShowEdit = (Customer: Customer) => {
    setCustomer(Customer);
    setOpenEdit(true);
  };

  const onDelete = (Customer: Customer) => {
    setCustomer(Customer);
    setOpenConfirm(true);
  };

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const deleteCustomerConfirm = async () => {
    // const response = await deleteCustomer(Customer._id);
    // if (response && response.error) {
    //   if (response.message) toast.error(`${response.message[0]}`);
    //   else toast.error(`${response.error}`);
    // } else {
    //   toast.success(`cliente eliminado con éxito`);
    //   onRefetch();
    //   setOpenConfirm(false);
    // }
  };

  useEffect(() => {
    getCustomersData();
  }, [refetch]);

  return (
    <div className="Customers">
      <div className="info">
        <h1>Clientes registrados</h1>
        <button onClick={() => setOpen(true)} className="button">
          Agregar Cliente
        </button>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <DataTableCustomer
          slug="Customers"
          columns={columns}
          rows={customers.map((Customer) => ({
            ...Customer,
          }))}
          onShowEdit={onShowEdit}
          onDelete={onDelete}
        />
      )}
      {open && (
        <AddCustomer
          slug="cliente"
          columns={columns}
          setOpen={setOpen}
          onRefetch={onRefetch}
        />
      )}
      {openEdit && (
        <EditCustomer
          slug="cliente"
          columns={columns}
          setOpenEdit={setOpenEdit}
          onRefetch={onRefetch}
          Customer={Customer}
        />
      )}
      {openConfirm && (
        <Confirm
          open={openConfirm}
          onClose={closeConfirm}
          onConfirm={() => deleteCustomerConfirm()}
          object={Customer}
        />
      )}
    </div>
  );
};

export default Customers;
