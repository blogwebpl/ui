import { Language, Translations } from '../types';
import { SelectOption } from '../atoms/Select';
import { IMenuItem } from '../atoms/Menu';
import { IInventoryItem } from '../atoms/InventoryItems';
export interface Field {
    field: string;
    type: string;
    tab: number;
    required: boolean;
    label: Translations;
    defaultValue: unknown;
}
interface EditFormProps {
    tabs: Translations[];
    activeTab: number;
    fields: Field[];
    values: Record<string, unknown>;
    language: Language;
    collection: string;
    title: Translations;
    mode: 'add' | 'edit' | 'view';
    roles?: SelectOption[];
    permissions?: SelectOption[];
    menus?: SelectOption[];
    menuItems?: IMenuItem[];
    inventoryItems?: IInventoryItem[];
    saveData: (formData: Record<string, unknown>) => Promise<boolean>;
    width?: string;
    writeTagFunction?: (data: Record<string, unknown>) => Promise<boolean>;
    users?: {
        id: string;
        name: string;
    }[];
}
export declare function EditForm({ tabs, activeTab: initialActiveTab, fields, values: initialValues, language, collection, title, mode, roles, permissions, menus, menuItems, saveData, width, writeTagFunction, inventoryItems, users, }: EditFormProps): import("react/jsx-runtime").JSX.Element | null;
export {};
