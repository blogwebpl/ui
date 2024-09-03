import styled from 'styled-components';
import { Translations } from '../../types';
import { Labels } from '../Labels';

interface TabsEditorProps {
	tabs: Translations[];
	setTabs: (tabs: Translations[]) => void;
}

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	border: 1px solid #f0f0f0;
	border-radius: 0.5rem;
	padding: 1.5rem;
`;

export function TabsEditor(props: TabsEditorProps) {
	if (!props.tabs) {
		return null;
	}

	const moveTab = (fromIndex: number, toIndex: number) => {
		const updatedTabs = [...props.tabs];
		const [movedTab] = updatedTabs.splice(fromIndex, 1);
		updatedTabs.splice(toIndex, 0, movedTab);
		props.setTabs(updatedTabs);
	};

	const addTab = (index: number) => {
		const newTab = {
			/* default values for a new tab */
			en: '',
			pl: '',
		};
		const updatedTabs = [...props.tabs];
		updatedTabs.splice(index + 1, 0, newTab);
		props.setTabs(updatedTabs);
	};

	return (
		<StyledContainer>
			{props.tabs.map((tab, index) => (
				<div key={index}>
					<Labels
						label={`Zakładka ${index}`}
						value={tab}
						onChange={(value) => {
							props.setTabs(
								props.tabs.map((t, i) => (i === index ? value : t))
							);
						}}
					/>
					<div>
						{index > 0 && (
							<button onClick={() => moveTab(index, index - 1)}>Move Up</button>
						)}
						{index < props.tabs.length - 1 && (
							<button onClick={() => moveTab(index, index + 1)}>
								Move Down
							</button>
						)}
						<button onClick={() => addTab(index)}>Add Tab</button>
					</div>
				</div>
			))}
			<button onClick={() => addTab(props.tabs.length - 1)}>Add New Tab</button>
		</StyledContainer>
	);
}
