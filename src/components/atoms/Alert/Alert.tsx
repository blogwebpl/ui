import { StyledAlert, CloseButton } from './alertStyle';

interface AlertProps {
	children: React.ReactNode;
	centerText?: boolean;
	onClose?: () => void; // Optional onClose prop
}

export function Alert({ children, centerText = false, onClose }: AlertProps) {
	return (
		<StyledAlert centerText={centerText}>
			{children}
			{onClose && <CloseButton onClick={onClose}>X</CloseButton>}
		</StyledAlert>
	);
}
