import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Product } from "../../types/product";
import { format } from "date-fns";

type Row = {
  createdAt: string;
  updatedAt: string;
  brandName: string;
  brand: any;
};

type Props = {
  columns: GridColDef[];
  rows: Row[];
  slug: string;
  onShowEdit: (Product: Product) => void;
  onDelete: (Product: Product) => void;
};

const DataTableProduct = (props: Props) => {
  const { columns, rows, onShowEdit, onDelete } = props;
  const rowsFormatted = rows.map((row) => {
    return {
      ...row,
      createdAt: format(new Date(row.createdAt), "dd/MM/yyyy"),
      updatedAt: format(new Date(row.updatedAt), "dd/MM/yyyy"),
      brandName: row.brand?.name || "",
      brand: row.brand?._id || "",
    };
  });

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Accion",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="edit" onClick={() => onShowEdit(params.row)}>
            <img src="/view.svg" alt="" />
          </div>
          <div className="delete" onClick={() => onDelete(params.row)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      {rows && rows.length === 0 ? (
        <div style={{ textAlign: "center", margin: 10 }}>
          <h1>No hay productos registrados</h1>
          <h2>Por favor registre un producto</h2>
        </div>
      ) : (
        <DataGrid
          className="dataGrid"
          rows={rowsFormatted}
          columns={[...columns, actionColumn]}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      )}
    </div>
  );
};

export default DataTableProduct;
