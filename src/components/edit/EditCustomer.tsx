import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCustomer from "../../hooks/useCustomer";
import { Customer } from "../../types/customer";
import { toast } from "react-toastify";
import "./edit.scss";
import useBrand from "../../hooks/useBrand";
import { useEffect } from "react";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onRefetch: () => void;
  Customer: Customer;
};

const EditCustomer = (props: Props) => {
  const { onRefetch, Customer } = props;
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("El nombre es requerido"),
    last_name: Yup.string().required("El apellido es requerido"),
    dni: Yup.string().required("El dni es requerido"),
    email: Yup.string().email().required("El email es requerido"),
    phone: Yup.string().required("El telefono es requerido"),
    address: Yup.string().required("La direccion es requerida"),
  });

  const { loading, updateCustomer } = useCustomer();
  const { getBrandsData, brands } = useBrand();
  const formik = useFormik({
    initialValues: {
      first_name: Customer?.first_name || "",
      last_name: Customer?.last_name || "",
      dni: Customer?.dni || "",
      email: Customer?.email || "",
      phone: Customer?.phone || "",
      address: Customer?.address || "",
    },
    validationSchema,
    onSubmit: async (values: Customer) => {
      const response = await updateCustomer(Customer?._id || "", values);
      if (response && response.error) {
        if (response.message) toast.error(`${response.message[0]}`);
        else toast.error(`${response.error}`);
      } else {
        toast.success(`Marca actualizada con éxito`);
        onRefetch();
        props.setOpenEdit(false);
      }
    },
  });

  useEffect(() => {
    getBrandsData();
  }, []);

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpenEdit(false)}>
          X
        </span>
        <h1>Editar {props.slug}</h1>
        <form onSubmit={formik.handleSubmit} className="form">
          <TextField
            id="first_name"
            name="first_name"
            label="Nombre"
            className="text-field"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <TextField
            id="last_name"
            name="last_name"
            label="Apellido"
            className="text-field"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
          <TextField
            id="dni"
            name="dni"
            label="DNI"
            className="text-field"
            value={formik.values.dni}
            onChange={formik.handleChange}
            error={formik.touched.dni && Boolean(formik.errors.dni)}
            helperText={formik.touched.dni && formik.errors.dni}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            className="text-field"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="phone"
            name="phone"
            label="Teléfono"
            className="text-field"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            id="address"
            name="address"
            label="Dirección"
            className="text-field"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />

          <Button type="submit" variant="contained" color="primary">
            {loading ? "Cargando..." : "Editar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
