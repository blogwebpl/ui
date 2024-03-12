import '@total-typescript/ts-reset';
import { IconType } from 'react-icons';
import 'sweetalert2/dist/sweetalert2.css';
import { Language, Translations } from '../../types';
export interface TableAction {
    id: string;
    icon: IconType;
    hint: string;
    disabled?: boolean;
    onClick: () => void;
}
export interface TableColumn {
    field: string;
    label: Translations;
    width: string;
    sort: string;
    sortOrder: number;
    type: string;
}
interface DynamicObject {
    [key: string]: any;
}
export interface TableProps {
    title: Translations;
    actions: TableAction[];
    width: string;
    columns: TableColumn[];
    data: DynamicObject[];
    rowsPerPage: number;
    pageNumber: number;
    readOnly?: boolean;
    language: Language;
    crud: number;
    collection: string;
    mobileWidth?: number;
    deleteAction?: (ids: string[]) => Promise<boolean>;
}
export declare function Table(props: TableProps): import("react/jsx-runtime").JSX.Element | null;
export declare namespace Table {
    var defaultProps: {
        readOnly: boolean;
        mobileWidth: number;
    };
}
export {};
