import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-alert */
import '@total-typescript/ts-reset';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdSearch as SearchIcon, MdMoreVert as DotsIcon, MdCreate as EditIcon, MdRemoveRedEye as ViewIcon, MdOutlineChevronRight as NextIcon, MdOutlineChevronLeft as PrevIcon, MdDelete as TrashIcon, } from 'react-icons/md';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card } from '../Card';
import { TextField } from '../TextField';
import { Typography } from '../Typography';
import { Tools } from '../Tools';
import { IconButton } from '../IconButton';
import { Checkbox } from '../Checkbox';
import { StyledHeader, StyledTitleContainer, StyledFilterContainer, StyledIconContainer, StyledTable, StyledFooter, StyledFooterContainer, StyledFooterItem, } from './tableStyle';
function getFontSizeFromBody() {
    const bodyElement = document.body;
    if (bodyElement) {
        const styles = window.getComputedStyle(bodyElement);
        const fontSize = styles.getPropertyValue('font-size');
        return parseFloat(fontSize);
    }
    return 16;
}
const mergeColumns = ({ columns, collection }) => {
    const collectionColumns = localStorage.getItem(`collection-${collection}-columns`);
    if (collectionColumns) {
        const userColumns = JSON.parse(collectionColumns);
        const userColumnsMap = new Map(userColumns.map((uc) => [uc.field, uc]));
        return columns.map((column) => {
            const userColumn = userColumnsMap.get(column.field);
            if (userColumn) {
                return Object.assign(Object.assign({}, column), { sort: userColumn.sort, sortOrder: userColumn.sortOrder, width: userColumn.width });
            }
            return column;
        });
    }
    return columns;
};
export function Table(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const mergedColumns = mergeColumns({ columns: props.columns, collection: props.collection });
    const { data } = props;
    const [columns, setColumns] = useState(mergedColumns);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= (props.mobileWidth || 416));
    const [fontSize, setFontSize] = useState(getFontSizeFromBody());
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage || 0);
    const [pageNumber, setPageNumber] = useState(props.pageNumber || 1);
    const [searchText, setSearchText] = useState(searchParam || '');
    const [searchTextForInput, setSearchTextForInput] = useState(searchParam || '');
    const [searchDelayTimer, setSearchDelayTimer] = useState(null);
    const [checkedRows, setCheckedRows] = useState({});
    const [allChecked, setAllChecked] = useState(false);
    const numberOfCheckedRows = Object.values(checkedRows).filter((checked) => checked).length;
    useEffect(() => {
        setColumns(mergedColumns);
    }, [props.columns]);
    const filteredData = useMemo(() => {
        if (searchText.length > 0) {
            return data.filter((item) => Object.entries(item).some(([key, value]) => {
                if (key === 'id') {
                    return false;
                }
                if (typeof value === 'object') {
                    return Object.entries(value).some(([objKey, objValue]) => {
                        const isKeyInColumns = columns.some((column) => column.field === `${key}.${objKey}`);
                        if (!isKeyInColumns) {
                            return false;
                        }
                        return String(objValue).toLowerCase().includes(searchText.toLowerCase());
                    });
                }
                if (typeof value === 'number') {
                    return String(value).includes(searchText);
                }
                return value.toLowerCase().includes(searchText.toLowerCase());
            }));
        }
        return data;
    }, [data, columns, searchText]);
    useEffect(() => {
        if (numberOfCheckedRows === 0) {
            setAllChecked(false);
        }
        const numberOfRow = filteredData.length;
        setAllChecked(numberOfCheckedRows === numberOfRow && numberOfRow > 0);
    }, [checkedRows]);
    useEffect(() => {
        let debounceTimer;
        function handleResize() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                setIsMobile(window.innerWidth <= (props.mobileWidth || 416));
                setViewportHeight(window.innerHeight);
                setFontSize(() => getFontSizeFromBody());
            }, 200);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        };
    }, [props.mobileWidth]);
    const handleSearchTextChange = useCallback((text) => {
        if (searchDelayTimer) {
            clearTimeout(searchDelayTimer);
        }
        setSearchDelayTimer(setTimeout(() => {
            setPageNumber(1);
            navigate(`/${props.collection}/page/1?search=${encodeURIComponent(text)}`, {
                replace: true,
            });
            setSearchText(text);
        }, 450));
    }, [props.collection, searchDelayTimer]);
    const handleCheckboxChange = (rowId) => {
        setCheckedRows((prevCheckedRows) => (Object.assign(Object.assign({}, prevCheckedRows), { [rowId]: !prevCheckedRows[rowId] || false })));
    };
    const handleAllCheckboxChange = () => {
        setAllChecked((prevAllChecked) => {
            const newAllChecked = !prevAllChecked;
            if (newAllChecked) {
                const newCheckedRows = {};
                data.forEach((row) => {
                    newCheckedRows[row.id] = true;
                });
                setCheckedRows(newCheckedRows);
            }
            else {
                setCheckedRows({});
            }
            return newAllChecked;
        });
    };
    const changeSortOrder = (id) => {
        const column = columns.find((col) => col.field === id);
        if (column) {
            column.sort = column.sort === 'asc' ? 'desc' : 'asc';
            setColumns((prevColumns) => prevColumns.map((col) => (col.field === id ? column : col)));
            localStorage.setItem(`collection-${props.collection}-columns`, JSON.stringify(columns));
        }
    };
    let computedRowsPerPage = rowsPerPage;
    if (rowsPerPage === 0 && !isMobile) {
        const headerHeight = 7.5 * fontSize;
        const footerHeight = 3 * fontSize;
        const rowHeight = 3.25 * fontSize;
        const appbarHeight = 4 * fontSize;
        computedRowsPerPage = Math.floor((viewportHeight - headerHeight - footerHeight - appbarHeight - 8) / rowHeight);
        computedRowsPerPage = Math.max(computedRowsPerPage, 0);
    }
    if (isMobile)
        computedRowsPerPage = Math.min(25, data.length); // 25 or data.length;
    const startIndex = (pageNumber - 1) * computedRowsPerPage;
    const endIndex = startIndex + computedRowsPerPage;
    const transformData = useCallback((dataToTransform) => {
        return dataToTransform.map((row) => {
            const transformedRow = Object.assign({}, row);
            columns.forEach((column) => {
                if (column.field.includes('.')) {
                    const keys = column.field.split('.');
                    const currentNode = keys.reduce((current, key) => {
                        return Object.prototype.hasOwnProperty.call(current, key) ? current[key] : current;
                    }, transformedRow);
                    transformedRow[column.field] = currentNode;
                }
            });
            return transformedRow;
        });
    }, [columns]);
    const sortFunction = (a, b, column) => {
        const aValue = a[column.field] || '';
        const bValue = b[column.field] || '';
        if (column.type === 'text') {
            if (column.sort === 'asc') {
                return aValue.toString().localeCompare(bValue.toString(), 'pl', { sensitivity: 'base' });
            }
            return bValue.toString().localeCompare(aValue.toString(), 'pl', { sensitivity: 'base' });
        }
        if (column.type === 'number') {
            if (column.sort === 'asc') {
                return Number(aValue) - Number(bValue);
            }
            return Number(bValue) - Number(aValue);
        }
        if (column.type === 'boolean') {
            if (column.sort === 'asc') {
                return aValue ? -1 : 1;
            }
            return !aValue ? -1 : 1;
        }
        return 0;
    };
    const multiSortFunction = (a, b) => {
        const primarySortColumn = columns.find((col) => col.sortOrder === 1);
        if (primarySortColumn) {
            const primarySortResult = sortFunction(a, b, primarySortColumn);
            if (primarySortResult !== 0) {
                return primarySortResult;
            }
        }
        return columns
            .filter((col) => col.sortOrder > 1)
            .sort((col1, col2) => col1.sortOrder - col2.sortOrder)
            .reduce((result, column) => {
            if (result !== 0) {
                return result;
            }
            return sortFunction(a, b, column);
        }, 0);
    };
    const transformedData = useMemo(() => {
        return transformData(filteredData);
    }, [filteredData]);
    const sortedData = useMemo(() => {
        return [...transformedData].sort((a, b) => {
            return multiSortFunction(a, b);
        });
    }, [transformedData, columns]);
    const dataForPage = sortedData.slice(startIndex, endIndex);
    const fromRow = (pageNumber - 1) * computedRowsPerPage + 1;
    const toRow = Math.min((pageNumber - 1) * computedRowsPerPage + computedRowsPerPage, filteredData.length);
    const trArray = Array.from({ length: computedRowsPerPage - (toRow - fromRow + 1) }, (_, index) => index);
    let tableActions = props.actions;
    const canDelete = (props.crud & 1) !== 0;
    const canUpdate = (props.crud & 2) !== 0;
    const canRead = (props.crud & 4) !== 0;
    const canCreate = (props.crud & 8) !== 0;
    if (numberOfCheckedRows && canDelete) {
        tableActions = props.actions.map((action) => {
            if (action.id === 'add') {
                const a = {
                    id: 'del',
                    icon: TrashIcon,
                    hint: 'usuń',
                    disabled: false,
                    onClick: () => {
                        Swal.fire({
                            title: 'Pytanie',
                            html: numberOfCheckedRows > 1
                                ? 'Czy chcesz usunąć wybrane wiersze?'
                                : 'Czy chcesz usunąć wybrany wiersz?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#e91e63',
                            cancelButtonColor: '#3f51b5',
                            confirmButtonText: 'Tak',
                            cancelButtonText: 'Nie',
                        }).then((result) => __awaiter(this, void 0, void 0, function* () {
                            if (result.isConfirmed && props.deleteAction) {
                                yield props.deleteAction(Object.keys(checkedRows));
                                setCheckedRows({});
                            }
                        }));
                    },
                };
                return a;
            }
            return action;
        });
    }
    if (!canCreate) {
        tableActions = props.actions.map((action) => {
            if (action.id === 'add') {
                const a = Object.assign(Object.assign({}, action), { onClick: () => {
                        alert('Brak uprawnień do dodawania');
                    } });
                return a;
            }
            return action;
        });
    }
    if (columns.length === 0) {
        return null;
    }
    if (!canRead)
        return null;
    const navigateToRow = (id) => {
        if (props.readOnly || !canUpdate) {
            navigate(`/${props.collection}/view/${id}`);
        }
        else {
            navigate(`/${props.collection}/edit/${id}`);
        }
    };
    return (_jsxs(Card, { minWidth: props.width, padding: false, children: [_jsxs(StyledHeader, { children: [_jsx(StyledTitleContainer, { children: _jsx(Typography, { component: "h6", color: "#000000", userSelect: "none", children: props.title[props.language] }) }), isMobile ? null : (_jsx(StyledFilterContainer, { children: _jsx(TextField, { id: "search", label: "", type: "text", icon: SearchIcon, slim: true, autoFocus: true, onChange: (e) => {
                                handleSearchTextChange(e.target.value);
                                setSearchTextForInput(e.target.value);
                            }, value: searchTextForInput, controlled: true }) })), _jsx(StyledIconContainer, { children: isMobile ? (_jsxs(_Fragment, { children: [_jsx(IconButton, { isLightColor: false, onClick: () => { }, color: "#757575", label: 'Menu', children: _jsx(SearchIcon, { size: "2.4rem", color: "#757575" }) }), _jsx(IconButton, { isLightColor: false, onClick: () => { }, color: "#757575", label: 'Menu', children: _jsx(DotsIcon, { size: "2.4rem", color: "#757575" }) })] })) : (_jsx(Tools, { actions: tableActions })) })] }), _jsxs(StyledTable, { className: isMobile ? 'mobile' : 'desktop', children: [isMobile ? null : (_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: _jsx(Checkbox, { id: "checkAll", checked: allChecked, onChange: handleAllCheckboxChange, controlled: true }) }), mergedColumns.map((column) => (_jsxs("th", { style: { width: column.width }, onClick: () => {
                                        changeSortOrder(column.field);
                                    }, children: [_jsxs("span", { children: [column.label[props.language], "\u00A0\u00A0"] }), _jsx("span", { className: column.sort === 'asc' ? 'asc' : 'desc', children: "\u25B2" })] }, column.field))), _jsx("th", { children: "\u00A0" })] }) })), !isMobile ? (_jsxs("tbody", { className: "tableBody", children: [dataForPage.map((row) => (_jsxs("tr", { onClick: (event) => {
                                    if (!event.target.classList.contains('first-td') &&
                                        event.target.tagName === 'TD') {
                                        navigateToRow(row.id);
                                    }
                                }, children: [_jsx("td", { className: "first-td", children: _jsx(Checkbox, { checked: checkedRows[row.id] || false, onChange: () => {
                                                handleCheckboxChange(row.id);
                                            }, controlled: true }) }), columns.map((column) => {
                                        const pathArray = column.field.split('.');
                                        const cellValue = pathArray.reduce((obj, key) => obj && obj[key], row);
                                        return (_jsx("td", { className: column.type === 'number' ? 'number' : '', children: cellValue != null ? cellValue.toString() : '' }, `${row.id}-${column.field}`));
                                    }), _jsx("td", { children: _jsx(IconButton, { isLightColor: false, onClick: () => navigateToRow(row.id), color: "#757575", label: "", children: props.readOnly || !canUpdate ? (_jsx(ViewIcon, { size: "2.4rem", color: "#757575" })) : (_jsx(EditIcon, { size: "2.4rem", color: "#757575" })) }) })] }, row.id))), trArray.map((_, index) => (_jsx("tr", { className: "emptyRow", children: _jsx("td", { colSpan: mergedColumns.length + 2, children: "\u00A0" }) }, `empty${index}`)))] })) : (_jsx(_Fragment, { children: dataForPage.map((row) => (_jsxs("tbody", { className: "bodyMobile", children: [mergedColumns.map((column, index) => {
                                    const pathArray = column.field.split('.');
                                    return (_jsxs("tr", { className: "innerRow", children: [_jsxs("td", { onClick: () => {
                                                    changeSortOrder(column.field);
                                                }, children: [_jsx("span", { className: column.sort === 'asc' ? 'asc' : 'desc', children: "\u25B2" }), "\u00A0", _jsxs("span", { children: [column.label[props.language], ":"] })] }), _jsx("td", { children: pathArray.reduce((obj, key) => obj && obj[key], row).toString() })] }, `${row.id}-tr-${index}`));
                                }), _jsxs("tr", { className: "options", children: [_jsx("td", { children: "Opcje:" }), _jsxs("td", { className: "options", children: [_jsx(Checkbox, { checked: checkedRows[row.id] || false, onChange: () => handleCheckboxChange(row.id), controlled: true }), "\u00A0", _jsx(IconButton, { isLightColor: false, onClick: () => navigateToRow(row.id), color: "#757575", label: "", children: props.readOnly || !canUpdate ? (_jsx(ViewIcon, { size: "2.4rem", color: "#757575" })) : (_jsx(EditIcon, { size: "2.4rem", color: "#757575" })) })] })] }), _jsxs("tr", { className: "rowGap", children: [_jsx("td", {}), _jsx("td", {})] })] }, `${row.id}-tbody`))) }))] }), isMobile ? null : (_jsx(StyledFooter, { className: 'desktop', children: _jsxs(StyledFooterContainer, { children: [_jsx(StyledFooterItem, { children: "Wierszy na stron\u0119:" }), _jsx(StyledFooterItem, { children: _jsxs("select", { value: rowsPerPage, onChange: (e) => {
                                    setRowsPerPage(Number(e.target.value));
                                }, children: [_jsx("option", { value: 0, children: "auto" }), _jsx("option", { value: 5, children: "5" }), _jsx("option", { value: 6, children: "6" }), _jsx("option", { value: 7, children: "7" }), _jsx("option", { value: 8, children: "8" }), _jsx("option", { value: 9, children: "9" }), _jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 11, children: "11" }), _jsx("option", { value: 12, children: "12" }), _jsx("option", { value: 13, children: "13" }), _jsx("option", { value: 14, children: "14" }), _jsx("option", { value: 15, children: "15" }), _jsx("option", { value: 20, children: "20" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" }), _jsx("option", { value: 200, children: "200" }), _jsx("option", { value: 500, children: "500" })] }) }), _jsx(StyledFooterItem, { className: "w100", children: toRow > 0 ? `${fromRow} - ${toRow} / ${filteredData.length}  ` : null }), _jsx(StyledFooterItem, { children: _jsx(IconButton, { isLightColor: false, onClick: () => {
                                    setPageNumber((pn) => {
                                        const newPn = pn > 1 ? pn - 1 : 1;
                                        navigate(`/${props.collection}/page/${newPn}?search=${encodeURIComponent(searchText)}`, {
                                            replace: true,
                                        });
                                        const searchInput = document.getElementById('search');
                                        if (searchInput)
                                            searchInput.focus();
                                        return newPn;
                                    });
                                }, color: "#757575", label: "", children: _jsx(PrevIcon, { size: "2.4rem", color: "#757575" }) }) }), _jsx(StyledFooterItem, { children: _jsx(IconButton, { isLightColor: false, onClick: () => {
                                    setPageNumber((pn) => {
                                        const newPn = Math.ceil(filteredData.length / computedRowsPerPage) > pn ? pn + 1 : pn;
                                        navigate(`/${props.collection}/page/${newPn}?search=${encodeURIComponent(searchText)}`, {
                                            replace: true,
                                        });
                                        const searchInput = document.getElementById('search');
                                        if (searchInput)
                                            searchInput.focus();
                                        return newPn;
                                    });
                                }, color: "#757575", label: "", children: _jsx(NextIcon, { size: "2.4rem", color: "#757575" }) }) })] }) }))] }));
}
Table.defaultProps = {
    readOnly: false,
    mobileWidth: 768,
};
//# sourceMappingURL=Table.js.map