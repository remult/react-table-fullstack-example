import React, { useEffect } from "react";
import styled from "styled-components";
import { useTable, usePagination, useFilters, useSortBy } from "react-table";
import { RemultReactTableOptions, useRemultReactTable } from "./react-table-utils/remult-react-table";
import { remult } from "./common";
import { Person } from "./shared/Person";



const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}: {
  column: {
    filterValue: any,
    preFilteredRows: any,
    setFilter: any
  }
}) {
  return (
    <input size={10}
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    />
  );
}

function Table({ options }: { options: RemultReactTableOptions<any> }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state
  } = useTable(
    {
      ...options,
      defaultColumn,
      stateReducer: s => s
    },
    useFilters,
    useSortBy,
    usePagination
  );
  useEffect(() => { options.setReactTableState(state) }, [state]);
  const { pageIndex, pageSize } = state;


  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div onClick={e => e.stopPropagation()}>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            {options.loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan={10000}>Loading...</td>
            ) : (
              <td colSpan={10000}>
                Showing {page.length * pageIndex + 1} - {page.length * (pageIndex + 1)} of {options.count}{" "}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}


function App() {
  const tableOptions = useRemultReactTable(remult.repo(Person));
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          tableOptions.fields.firstName,
          tableOptions.fields.lastName
        ]
      },
      {
        Header: "Info",
        columns: [
          tableOptions.fields.age,
          tableOptions.fields.visits,
          tableOptions.fields.status,
          tableOptions.fields.progress
        ]
      }
    ],
    []
  );

  // We'll start our table without any data



  return (
    <Styles>
      <Table
        options={{ ...tableOptions, columns }}
      />
    </Styles>
  );
}

export default App;
