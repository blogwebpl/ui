/// <reference types="react" />
export declare const StyledSVG: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").FastOmit<import("react").SVGProps<SVGSVGElement>, never>>;
export interface DeviceItemProps {
    deviceId: string;
    name: string;
    time: Date;
    handleNameClick: (id: string, pos: [number, number]) => void;
    show: boolean;
    handleShowClick: (id: string, show: boolean) => void;
    info: boolean;
    handleInfoClick: (id: string, info: boolean) => void;
    follow: boolean;
    handleFollowClick: (id: string, follow: boolean) => void;
    io?: [number, number][];
    pos: [number, number];
}
export interface Gps {
    pos: [number, number];
    alt: number;
    ang: number;
    sat: number;
    spd: number;
}
export interface Device {
    deviceId: string;
    name: string;
    show: boolean;
    info: boolean;
    follow: boolean;
    gps: Gps;
    io: [number, number][];
    st: Date;
    time: Date;
}
export declare function DeviceItem(props: DeviceItemProps): import("react/jsx-runtime").JSX.Element;
