import { IconType } from 'react-icons';
import { IconButton } from '../IconButton';

export interface Action {
	id: string;
	icon: IconType;
	hint: string;
	isDisabled?: boolean;
	onClick: () => void;
}

interface ToolsProps {
	actions: Action[];
}

export function Tools(props: ToolsProps) {
	return (
		<div style={{ display: 'flex', width: 'auto', height: '48px' }}>
			{props.actions.map((action) => (
				<IconButton
					key={action.id}
					isLightColor={false}
					onClick={action.onClick}
					color="#757575"
					label={action.hint}
				>
					<action.icon size={24} color="#757575" />
				</IconButton>
			))}
		</div>
	);
}
