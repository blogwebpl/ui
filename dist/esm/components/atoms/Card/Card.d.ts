/// <reference types="react" />
interface CardProps {
    children: React.ReactNode;
    minWidth: string;
    padding?: boolean;
    opacity?: boolean;
    isPending?: boolean;
}
/**
 * Renders a styled card component with optional padding, opacity, and pending state.
 * @param {string} minWidth - The minimum width of the card.
 * @param {boolean} [padding] - Determines if the card should have padding.
 * @param {boolean} [opacity] - Determines if the card should have reduced opacity.
 * @param {boolean} [isPending] - Determines if the card should show a waiting cursor.
 * @returns {JSX.Element} The styled card component.
 */
export declare function Card(props: CardProps): import("react/jsx-runtime").JSX.Element;
export {};
