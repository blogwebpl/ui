import { Translations } from '../../types';
import { Labels } from '../Labels';

interface TabsEditorProps {
	tabs: Translations[];
	setTabs: (tabs: Translations[]) => void;
}

export function TabsEditor(props: TabsEditorProps) {
	return (
		<div>
			{props.tabs.map((tab, index) => (
				<Labels
					label={''}
					key={index}
					value={tab}
					onChange={(value) => {
						props.setTabs(props.tabs.map((t, i) => (i === index ? value : t)));
					}}
				/>
			))}
		</div>
	);
}
