interface PlayerProps {
    isPlaying: boolean;
    position: number;
    length: number;
    time: Date;
    onButtonClick: (button: string) => void;
    onChange: (newPosition: number) => void;
}
export declare function Player({ isPlaying, time, position, length, onChange, onButtonClick, }: PlayerProps): import("react/jsx-runtime").JSX.Element;
export {};
