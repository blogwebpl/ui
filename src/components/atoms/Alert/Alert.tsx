import { StyledAlert, CloseButton } from './alertStyle';

interface AlertProps {
	children: React.ReactNode;
	centerText?: boolean;
	variant?: 'info' | 'error' | 'warning' | 'success';
	onClose?: () => void; // Optional onClose prop
}

export function Alert({
	children,
	centerText = false,
	onClose,
	variant,
}: AlertProps) {
	return (
		<StyledAlert $centerText={centerText} $variant={variant}>
			{children}
			{onClose && <CloseButton onClick={onClose}>X</CloseButton>}
		</StyledAlert>
	);
}
