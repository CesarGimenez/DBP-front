import { TextField, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useFormik } from "formik";
import * as Yup from "yup";
import useBrand from "../../hooks/useBrand";
import { Brand, partialBrand } from "../../types/brand";
import { toast } from "react-toastify";
import "./edit.scss";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onRefetch: () => void;
  brand: Brand;
};

const EditBrand = (props: Props) => {
  const { onRefetch, brand } = props;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    country: Yup.string().required("El país es requerido"),
  });

  const { loading, updateBrand } = useBrand();
  const formik = useFormik({
    initialValues: {
      name: brand?.name || "",
      country: brand?.country || "",
    },
    validationSchema,
    onSubmit: async (values: partialBrand) => {
      const response = await updateBrand(brand?._id, values);
      console.log(response);
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

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpenEdit(false)}>
          X
        </span>
        <h1>Editar {props.slug}</h1>
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
            {loading ? "Cargando..." : "Editar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditBrand;
