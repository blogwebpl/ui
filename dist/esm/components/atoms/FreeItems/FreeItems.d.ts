import { Language } from '../../types';
import { IInventoryItem } from '../InventoryItems';
export interface ITags {
    id: string;
    dgId: number;
    tagId: string;
    itemNumber: number;
    note?: string;
}
interface FreeItemsProps {
    language?: Language;
    items: IInventoryItem[];
    tags: ITags[];
    cancelFunction: () => void;
    scanFunction: () => void;
    assignFunction: (tag: ITags) => void;
    searchText?: string;
    itemNumber?: number;
    tagId: string;
}
export declare function FreeItems(props: FreeItemsProps): import("react/jsx-runtime").JSX.Element;
export {};
