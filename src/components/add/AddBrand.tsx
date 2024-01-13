import { TextField, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useFormik } from "formik";
import * as Yup from "yup";
import useBrand from "../../hooks/useBrand";
import { partialBrand } from "../../types/brand";
import { toast } from "react-toastify";
import "./add.scss";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRefetch: () => void;
};

const AddBrand = (props: Props) => {
  const { onRefetch } = props;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    country: Yup.string().required("El país es requerido"),
  });

  const { loading, createBrand } = useBrand();

  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
    },
    validationSchema,
    onSubmit: async (values: partialBrand) => {
      const response = await createBrand(values);
      if (response && response.error) {
        toast.error(`${response.message[0]}`);
      } else {
        toast.success(`Marca creada con éxito`);
        onRefetch();
        props.setOpen(false);
      }
    },
  });

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Crear nueva {props.slug}</h1>
        <form onSubmit={formik.handleSubmit} className="form">
          <TextField
            id="name"
            name="name"
            label="Nombre"
            className="text-field"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="country"
            name="country"
            label="País"
            className="text-field"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
          <Button type="submit" variant="contained" color="primary">
            {loading ? "Cargando..." : "Crear"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
