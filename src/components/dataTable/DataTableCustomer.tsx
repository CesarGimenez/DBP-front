import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Customer } from "../../types/customer";
import { format } from "date-fns";

type Row = {
  createdAt: string;
  updatedAt: string;
};

type Props = {
  columns: GridColDef[];
  rows: Customer[];
  slug: string;
  onShowEdit: (Customer: Customer) => void;
  onDelete: (Customer: Customer) => void;
};

const DataTableCustomer = (props: Props) => {
  const { columns, rows, onShowEdit, onDelete } = props;
  const rowsFormatted = rows.map((row) => {
    return {
      ...row,
      createdAt: row.createdAt
        ? format(new Date(row.createdAt), "dd/MM/yyyy")
        : "",
      updatedAt: row.updatedAt
        ? format(new Date(row.updatedAt), "dd/MM/yyyy")
        : "",
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
          <h1>No hay clientes registrados</h1>
          <h2>Por favor registre un cliente</h2>
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

export default DataTableCustomer;
