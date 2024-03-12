import { Language } from '../../types';
export interface IInventoryItem {
    id: string;
    dgId: number;
    inventoryNumber: string;
    itemName: string;
    leadPerson?: string;
    owner: string;
    quantity?: number;
    unitMeasure?: string;
    status: number;
    notes?: string;
}
interface InventoryItemsProps {
    items: IInventoryItem[];
    selectedItems: number[];
    setSelectedItems: (selectedItems: number[]) => void;
    language: Language;
}
export declare function InventoryItems({ selectedItems, items, setSelectedItems, language, }: InventoryItemsProps): import("react/jsx-runtime").JSX.Element;
export {};
