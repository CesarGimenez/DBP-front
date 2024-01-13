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
import useProduct from "../../hooks/useProduct";
import { Product, partialProduct } from "../../types/product";
import { toast } from "react-toastify";
import "./edit.scss";
import useBrand from "../../hooks/useBrand";
import { useEffect } from "react";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onRefetch: () => void;
  Product: Product;
};

const EditProduct = (props: Props) => {
  const { onRefetch, Product } = props;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    oam: Yup.string()
      .required("El oam es requerido")
      .max(8, "El oam no debe tener más de 8 caracteres"),
    // description: Yup.string().required("La descripcion es requerida"),
    unit_cost: Yup.number()
      .required("El precio es requerido")
      .min(0.5, "El valor minimo es 0.5"),
    unit_cost_sale: Yup.number()
      .required("El precio es requerido")
      .min(0.5, "El valor minimo es 0.5"),
    recomended_price: Yup.number()
      .required("El precio es requerido")
      .min(0.5, "El valor minimo es 0.5"),
    brand: Yup.string().required("La marca es requerida"),
    stock: Yup.number().required("El stock es requerido"),
  });

  const { loading, updateProduct } = useProduct();
  const { getBrandsData, brands } = useBrand();
  const formik = useFormik({
    initialValues: {
      name: Product?.name || "",
      oam: Product?.oam || "",
      description: Product?.description || "",
      unit_cost: Product?.unit_cost || 0,
      unit_cost_sale: Product?.unit_cost_sale || 0,
      recomended_price: Product?.recomended_price || 0,
      is_active: Product?.is_active || true,
      brand: Product?.brand || "",
      stock: Product?.stock || 0,
    },
    validationSchema,
    onSubmit: async (values: partialProduct) => {
      const response = await updateProduct(Product?._id, values);
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
            id="oam"
            name="oam"
            label="País"
            className="text-field"
            value={formik.values.oam}
            onChange={formik.handleChange}
            error={formik.touched.oam && Boolean(formik.errors.oam)}
            helperText={formik.touched.oam && formik.errors.oam}
          />
          {/* <TextField
            id="description"
            name="description"
            label="Descripción"
            className="text-field"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          /> */}
          <TextField
            id="unit_cost"
            name="unit_cost"
            label="Precio de compra unitario"
            type="number"
            className="text-field"
            value={formik.values.unit_cost}
            onChange={formik.handleChange}
            error={formik.touched.unit_cost && Boolean(formik.errors.unit_cost)}
            helperText={formik.touched.unit_cost && formik.errors.unit_cost}
          />
          <TextField
            id="unit_cost_sale"
            name="unit_cost_sale"
            label="Precio de venta unitario"
            type="number"
            className="text-field"
            value={formik.values.unit_cost_sale}
            onChange={formik.handleChange}
            error={
              formik.touched.unit_cost_sale &&
              Boolean(formik.errors.unit_cost_sale)
            }
            helperText={
              formik.touched.unit_cost_sale && formik.errors.unit_cost_sale
            }
          />
          <TextField
            id="recomended_price"
            name="recomended_price"
            label="Precio de venta recomendado"
            type="number"
            className="text-field"
            value={formik.values.recomended_price}
            onChange={formik.handleChange}
            error={
              formik.touched.recomended_price &&
              Boolean(formik.errors.recomended_price)
            }
            helperText={
              formik.touched.recomended_price && formik.errors.recomended_price
            }
          />

          <FormControl className="select-field">
            <InputLabel id="brand-label">Marca</InputLabel>
            <Select
              id="brand"
              name="brand"
              labelId="brand-label"
              className="select-field"
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              label="Marca"
              style={{ width: "100%" }}
            >
              {brands.map((brand) => (
                <MenuItem key={brand?._id} value={brand?._id}>
                  {brand?.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.brand && formik.errors.brand && (
              <FormHelperText style={{ color: "red" }}>
                {formik.errors.brand}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            id="stock"
            name="stock"
            label="En stock"
            type="number"
            className="text-field"
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />
          <Button type="submit" variant="contained" color="primary">
            {loading ? "Cargando..." : "Editar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
