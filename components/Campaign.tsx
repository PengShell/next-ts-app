import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import useHttp, { RequestConfig, UseHttpCallbackFunc } from "../hooks/useHttp";
import Apis from "../common/Apis";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

interface IFeatureListRequest {
  featureId?: string;
  campagin?: string;
  makerId?: string;
  status?: number;
  start?: Date;
  end?: Date;
}

interface IFeatureListResponse {
  featureId: string;
  campaign: string;
  makerId: string;
  makerName: string;
  start: Date;
  end: Date;
}

const Campaingn: React.FC = () => {
  const [rows, setRows] = React.useState<GridRowsProp<IFeatureListResponse>>(
    []
  );
  const { isLoading, sendRequest: fetchRows } = useHttp<
    IFeatureListRequest,
    IFeatureListResponse[]
  >();

  React.useEffect(() => {
    //Test request data
    const requestConfig: RequestConfig<IFeatureListRequest> = {
      url: Apis.FEATURE_LIST_URL,
      method: "POST",
      data: {},
    };

    const applyData: UseHttpCallbackFunc<IFeatureListResponse[]> = (
      data: IFeatureListResponse[]
    ) => {
      setRows(data);
    };

    fetchRows(requestConfig, applyData);
  }, [fetchRows]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        loading={isLoading}
      />
    </div>
  );
};

export default Campaingn;
