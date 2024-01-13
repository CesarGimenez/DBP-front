import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Brand } from "../../types/brand";
import { format } from "date-fns";

type Row = {
  createdAt: string;
  updatedAt: string;
};

type Props = {
  columns: GridColDef[];
  rows: Row[];
  slug: string;
  onShowEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
};

const DataTableBrand = (props: Props) => {
  const { columns, rows, onShowEdit, onDelete } = props;

  const rowsFormatted = rows.map((row) => {
    return {
      ...row,
      createdAt: format(new Date(row.createdAt), "dd/MM/yyyy"),
      updatedAt: format(new Date(row.updatedAt), "dd/MM/yyyy"),
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
    </div>
  );
};

export default DataTableBrand;
