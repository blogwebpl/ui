import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable no-alert */
import { MdSortByAlpha as SortIcon, MdPrint as PrintIcon, MdAddCircle as AddIcon, } from 'react-icons/md';
import { FaFileExcel as ExcelIcon } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Table } from '../../components/atoms/Table';
import { tableData } from './table.data';
const actions = [
    {
        id: 'sort',
        icon: SortIcon,
        hint: 'kol.sort.',
        disabled: false,
        onClick: () => {
            alert('kolejnosc sortowania');
        },
    },
    {
        id: 'print',
        icon: PrintIcon,
        hint: 'drukuj',
        disabled: false,
        onClick: () => {
            alert('drukuj');
        },
    },
    {
        id: 'excel',
        icon: ExcelIcon,
        hint: 'do excela',
        disabled: false,
        onClick: () => {
            alert('excel');
        },
    },
    {
        id: 'add',
        icon: AddIcon,
        hint: 'dodaj',
        disabled: false,
        onClick: () => {
            alert('dodaj');
        },
    },
];
const tableColumns = [
    {
        field: 'firstName',
        label: {
            pl: 'Imię',
            en: 'First name',
        },
        width: '12rem',
        sort: 'asc',
        sortOrder: 2,
        type: 'text',
    },
    {
        field: 'lastName',
        label: { pl: 'Nazwisko', en: 'Last name' },
        width: '15rem',
        sort: 'asc',
        sortOrder: 1,
        type: 'text',
    },
    {
        field: 'age',
        label: { pl: 'Wiek', en: 'Age' },
        width: '12rem',
        sort: 'desc',
        sortOrder: 3,
        type: 'number',
    },
    {
        field: 'user.test2',
        label: { pl: 'Test', en: 'Test' },
        width: '10rem',
        sort: 'desc',
        sortOrder: 4,
        type: 'number',
    },
];
const Template = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setData(tableData);
            setColumns(tableColumns);
        }, 1000);
    }, []);
    return (_jsx(Router, { children: _jsx(Table, { width: "72rem", title: { pl: 'Użytkownicy', en: 'Users' }, actions: actions, columns: columns, data: data, rowsPerPage: 0, pageNumber: 1, readOnly: false, language: "pl", crud: 15, collection: "users", mobileWidth: 660 }) }));
};
export default { component: Template, title: 'Atoms/Table' };
export const Default = {};
//# sourceMappingURL=Table.stories.js.map