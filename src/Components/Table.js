import React from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const options = {
    print: false,
    download: false,
    selectableRowsHideCheckboxes: true,
    responsive: "standard",
    filterType: "dropdown",
    viewColumns: false,
    rowsPerPage: 3,
    rowsPerPageOptions: [3,6,15]
}

class Table extends React.Component {
    getMuiTheme = () =>
        createTheme({
            components: {
                MUIDataTable: {
                    styleOverrides: {
                        root: {
                            backgroundColor: '#red',
                        },
                        paper: {
                            boxShadow: 'none',
                        },
                    },
                },
                MuiTableCell: {
                    styleOverrides: {
                        head: {
                            backgroundColor: 'var(--primary-color)',
                            color: "var(--text-color)",
                            fontWeight: "bold"
                        },
                        root: {
                            backgroundColor: 'var(--secondary-color)',
                            color: "var(--text-color)",
                            fontWeight: "bold"
                        }
                    },
                },
                MUIDataTableSelectCell: {
                    styleOverrides: {
                        headerCell: {
                            backgroundColor: 'blue',
                        },
                    },
                }
            }
        });
    render() {
        
        return (
            <div>
                <ThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        data={this.props.data}
                        columns={this.props.columns}
                        options={options}
                        title={this.props.title}
                    />
                </ThemeProvider>
            </div>
        )
    }
}

export default Table