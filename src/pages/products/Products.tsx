import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import AddProduct from "../../components/add/AddProduct";
import DataTableProduct from "../../components/dataTable/DataTableProduct";
import EditProduct from "../../components/edit/EditProducts";
import { Product } from "../../types/product";
import Confirm from "../../components/confirm/Confirm";
import { toast } from "react-toastify";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Imagen",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          src={
            params.row.img ||
            "https://static.thenounproject.com/png/4693713-200.png"
          }
          alt=""
        />
      );
    },
  },
  {
    field: "code",
    type: "string",
    headerName: "Codigo D.B.P",
    width: 100,
  },
  {
    field: "name",
    type: "string",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "oam",
    type: "string",
    headerName: "OAM",
    width: 100,
  },
  // {
  //   field: "description",
  //   type: "string",
  //   headerName: "Descripcion",
  //   width: 150,
  // },
  {
    field: "unit_cost",
    type: "number",
    headerName: "Precio de compra",
    width: 150,
  },
  {
    field: "unit_cost_sale",
    type: "number",
    headerName: "Precio de venta",
    width: 150,
  },
  {
    field: "recomended_price",
    type: "number",
    headerName: "Precio recomendado",
    width: 150,
  },
  // {
  //   field: "is_active",
  //   type: "boolean",
  //   headerName: "Activo",
  //   width: 100,
  // },
  {
    field: "stock",
    type: "number",
    headerName: "Disponible",
    width: 100,
    renderCell: (params) => {
      const stock = params.row.stock || 0;
      return (
        <div>
          <div
            style={{
              color: "black",
              padding: 5,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              backgroundColor:
                stock < 10
                  ? "red"
                  : stock >= 10 && stock < 20
                  ? "yellow"
                  : "green",
            }}
          >
            {stock}
          </div>
        </div>
      );
    },
  },
  {
    field: "brandName",
    type: "string",
    headerName: "Marca",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Fecha de creacion",
    width: 100,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "Fecha de actualizacion",
    width: 100,
    type: "string",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { loading, Products, getProductsData, deleteProduct } = useProduct();
  const [refetch, setRefetch] = useState(false);
  const [Product, setProduct] = useState({} as Product);
  const [openConfirm, setOpenConfirm] = useState(false);

  const onRefetch = () => {
    setRefetch((prev) => !prev);
  };

  const onShowEdit = (Product: Product) => {
    setProduct(Product);
    setOpenEdit(true);
  };

  const onDelete = (Product: Product) => {
    setProduct(Product);
    setOpenConfirm(true);
  };

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const deleteProductConfirm = async () => {
    const response = await deleteProduct(Product._id);
    if (response && response.error) {
      if (response.message) toast.error(`${response.message[0]}`);
      else toast.error(`${response.error}`);
    } else {
      toast.success(`Marca eliminada con éxito`);
      onRefetch();
      setOpenConfirm(false);
    }
  };

  useEffect(() => {
    getProductsData();
  }, [refetch]);

  return (
    <div className="Products">
      <div className="info">
        <h1>Productos registrados</h1>
        <button onClick={() => setOpen(true)} className="button">
          Agregar producto
        </button>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <DataTableProduct
          slug="Products"
          columns={columns}
          rows={Products.map((product) => ({
            ...product,
            brandName: "",
          }))}
          onShowEdit={onShowEdit}
          onDelete={onDelete}
        />
      )}
      {open && (
        <AddProduct
          slug="marca"
          columns={columns}
          setOpen={setOpen}
          onRefetch={onRefetch}
        />
      )}
      {openEdit && (
        <EditProduct
          slug="marca"
          columns={columns}
          setOpenEdit={setOpenEdit}
          onRefetch={onRefetch}
          Product={Product}
        />
      )}
      {openConfirm && (
        <Confirm
          open={openConfirm}
          onClose={closeConfirm}
          onConfirm={() => deleteProductConfirm()}
          object={Product}
        />
      )}
    </div>
  );
};

export default Products;
