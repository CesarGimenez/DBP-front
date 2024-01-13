import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import "./dataTable.scss";
import { Order } from "../../types/order";
import { format } from "date-fns";

type Row = {
  createdAt: string;
  updatedAt: string;
};

type Props = {
  columns: GridColDef[];
  rows: Order[];
  slug: string;
  onShowEdit: (Order: Order) => void;
  onShowDetail: (Order: Order) => void;
};

const DataTableOrder = (props: Props) => {
  const { columns, rows, onShowEdit, onShowDetail } = props;
  const rowsFormatted = rows.map((row) => {
    return {
      ...row,
      createdAt: format(new Date(row.createdAt ?? ""), "dd/MM/yyyy"),
      updatedAt: format(new Date(row.updatedAt ?? ""), "dd/MM/yyyy"),
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
          <div className="delete" onClick={() => onShowDetail(params.row)}>
            <RemoveRedEyeOutlinedIcon />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      {rows && rows.length === 0 ? (
        <div style={{ textAlign: "center", margin: 10 }}>
          <h1>No hay Ordenes/Ventas registradas</h1>
          <h2>Por favor crea una primera orden/venta</h2>
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

export default DataTableOrder;
