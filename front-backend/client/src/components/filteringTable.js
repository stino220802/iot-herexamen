import React, { useMemo, Component } from 'react'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'

import axios from 'axios'



export const FilteringTable =  () => {
	
	//console.log(responseJson);
    console.log(MOCK_DATA);
    //console.log(x);
    //JSON.stringify(x);
    //console.log(x);
	//var a = getData();
	const a = 0; 
	//var obj = 0; 
	
	console.log(a); 
	
	console.log(typeof(MOCK_DATA));
	//console.log(typeof()); 
	//const obj = Object.fromEntries(b); 
	//console.log(typeof(obj));
	//console.log(obj);
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const defaultColumn = React.useMemo(
        () => ({
            Filter: ColumnFilter
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter
    )

    const { globalFilter } = state

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </>
    )
}