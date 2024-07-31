import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TablePaginationActionsProps } from "../../interfaces/TablePaginationActionsProps";
import { DataPerMakat } from "../../interfaces/DataPerMakat";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeContext } from "../../store/ThemeModeCtx";
import ThemeObj from "../../interfaces/ThemeObj";
import setTheme from "../../functions/style/setTheme";
//import EditAutoComplete from "./EditAutoComplete";
let Theme: ThemeObj;

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        sx={{ ".MuiSvgIcon-root": { color: Theme.fontColor } }}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        sx={{ ".MuiSvgIcon-root": { color: Theme.fontColor } }}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        sx={{ ".MuiSvgIcon-root": { color: Theme.fontColor } }}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        sx={{ ".MuiSvgIcon-root": { color: Theme.fontColor } }}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(carNumber: string, status: string) {
  if (status === "1") return { carNumber, status: "כשיר" };
  else return { carNumber, status: "לא כשיר" };
}

function createRows(props: {
  Makat: string | undefined;
  KshirotPerMakat: DataPerMakat[];
}) {
  let rows = [];
  for (let i = 0; i < props.KshirotPerMakat.length; i++) {
    if (props.KshirotPerMakat[i].makat === props.Makat) {
      for (
        let j = 0;
        j < props.KshirotPerMakat[i].kshirotPerNumber.length;
        j++
      ) {
        rows.push(
          createData(
            props.KshirotPerMakat[i].kshirotPerNumber[j].CarNumber,
            props.KshirotPerMakat[i].kshirotPerNumber[j].kshirot
          )
        );
      }
    }
  }
  return rows;
}
const TableMakat: React.FC<{
  Makat: string | undefined;
  KshirotPerMakat: DataPerMakat[];
}> = (props) => {
  const { mode, setMode } = React.useContext(ThemeContext);
  const [isEditing, setEditing] = React.useState(false);
  const rows = createRows(props);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function handleEdit() {
    setEditing(!isEditing);
  }
  async function handleSubmmiton() {}

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (mode === "light") {
    Theme = setTheme("light");
  } else {
    Theme = setTheme("dark");
  }

  return (
    <TableContainer
      sx={{
        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0)",
        backgroundColor: "transparent",
      }}
      component={Paper}
    >
      <Table
        sx={{
          ".css-1yhpg23-MuiTableCell-root": { color: Theme.fontColor },
          minWidth: 450,
        }}
        aria-label="custom pagination table"
      >
        <TableBody sx={{ backgroundColor: Theme.componentColor }}>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.carNumber}>
              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{ width: 200 }}
              >
                <IconButton
                  onClick={handleEdit}
                  sx={{ height: "5px", width: "5px" }}
                >
                  <EditIcon
                    sx={{
                      padding: 2,
                      fontSize: "20px",
                      color: Theme.fontColor,
                    }}
                  />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {row.carNumber}
              </TableCell>
              <TableCell style={{ width: 300 }} align="center">
                {isEditing
                  ? row.status /*<EditAutoComplete className="TableAutoComplete" />*/
                  : row.status}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter
          sx={{
            ".css-fikjyc-MuiTableCell-root-MuiTablePagination-root": {
              color: Theme.fontColor,
            },
            backgroundColor: Theme.componentColor,
          }}
        >
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[3, 6, 12, { label: "הכל", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "שורות לעמוד",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
export default TableMakat;

/* edit button is currently on maintenance */
//"base-TablePagination-menuItem"