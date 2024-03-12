import { Language, Translations } from '../../types';
export interface ICardMenuItem {
    id: string;
    icon?: string | null;
    label: Translations;
    onClick?: () => void;
}
interface CardMenuProps {
    items: ICardMenuItem[];
    language: Language;
}
export declare function CardMenu(props: CardMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
