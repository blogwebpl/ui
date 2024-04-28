import { IconType } from 'react-icons';
import { IconButton } from '../IconButton';
import { Language } from '../../types';

export interface Action {
	id: string;
	icon: IconType;
	hint: Record<Language, string>;
	disabled?: boolean;
	onClick: () => void;
}

interface ToolsProps {
	actions: Action[];
	language: Language;
}

export function Tools(props: ToolsProps) {
	return (
		<div style={{ display: 'flex', width: 'auto', height: '4.8rem' }}>
			{props.actions.map((action) => (
				<IconButton
					key={action.id}
					isLightColor={false}
					onClick={action.onClick}
					color="#757575"
					label={action.hint[props.language]}
					disabled={action.disabled}
				>
					<action.icon size="2.4rem" color="#757575" />
				</IconButton>
			))}
		</div>
	);
}
