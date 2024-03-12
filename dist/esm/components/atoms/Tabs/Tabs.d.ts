import { Language, Translations } from '../../types';
interface TabsProps {
    tabs: Translations[];
    setActiveTab: (index: number) => void;
    language: Language;
    activeTab: number;
}
export declare function Tabs({ tabs, language, activeTab, setActiveTab }: TabsProps): import("react/jsx-runtime").JSX.Element;
export {};
