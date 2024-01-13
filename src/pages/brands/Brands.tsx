import { GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useBrand from "../../hooks/useBrand";
import AddBrand from "../../components/add/AddBrand";
import DataTableBrand from "../../components/dataTable/DataTableBrand";
import EditBrand from "../../components/edit/EditBrand";
import { Brand } from "../../types/brand";
import Confirm from "../../components/confirm/Confirm";
import { toast } from "react-toastify";
// import { useQuery } from "@tanstack/react-query";

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
    field: "name",
    type: "string",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "country",
    type: "string",
    headerName: "Pais",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Fecha de creacion",
    width: 200,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "Fecha de actualizacion",
    width: 200,
    type: "string",
  },
];

const Brands = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { loading, brands, getBrandsData, deleteBrand } = useBrand();
  const [refetch, setRefetch] = useState(false);
  const [brand, setBrand] = useState({} as Brand);
  const [openConfirm, setOpenConfirm] = useState(false);

  const onRefetch = () => {
    setRefetch((prev) => !prev);
  };

  const onShowEdit = (brand: Brand) => {
    setBrand(brand);
    setOpenEdit(true);
  };

  const onDelete = (brand: Brand) => {
    setBrand(brand);
    console.log(brand);
    setOpenConfirm(true);
  };

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const deleteBrandConfirm = async () => {
    const response = await deleteBrand(brand._id);
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
    getBrandsData();
  }, [refetch]);

  return (
    <div className="brands">
      <div className="info">
        <h1>Marcas registradas</h1>
        <button onClick={() => setOpen(true)} className="button">
          Agregar marca
        </button>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <DataTableBrand
          slug="brands"
          columns={columns}
          rows={brands}
          onShowEdit={onShowEdit}
          onDelete={onDelete}
        />
      )}
      {open && (
        <AddBrand
          slug="marca"
          columns={columns}
          setOpen={setOpen}
          onRefetch={onRefetch}
        />
      )}
      {openEdit && (
        <EditBrand
          slug="marca"
          columns={columns}
          setOpenEdit={setOpenEdit}
          onRefetch={onRefetch}
          brand={brand}
        />
      )}
      {openConfirm && (
        <Confirm
          open={openConfirm}
          onClose={closeConfirm}
          onConfirm={() => deleteBrandConfirm()}
          object={brand}
        />
      )}
    </div>
  );
};

export default Brands;
