import { Device } from '../DeviceItem';
interface PlayerSettingsProps {
    devices: Device[];
    onLoad: ({ vid, dateFrom, dateTo }: {
        vid: string;
        dateFrom: string;
        dateTo: string;
    }) => void;
    onClose: () => void;
}
export declare function PlayerSettings({ devices, onLoad, onClose }: PlayerSettingsProps): import("react/jsx-runtime").JSX.Element;
export {};
