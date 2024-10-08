import styled from 'styled-components';
import { Translations } from '../../types';
import { Labels } from '../Labels';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';

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

const StyledTab = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	border: 1px solid #f0f0f0;
	border-radius: 0.5rem;
	padding: 1rem;
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

	const removeTab = (index: number) => {
		const updatedTabs = props.tabs.filter((_, i) => i !== index);
		props.setTabs(updatedTabs);
	};

	return (
		<StyledContainer>
			{props.tabs.length === 0 ? (
				<Button
					onClick={() => addTab(0)}
					label="Wstaw zakładkę"
					variant="secondary"
				/>
			) : (
				props.tabs.map((tab, index) => (
					<StyledTab key={index}>
						<Labels
							label={`Zakładka ${index}`}
							value={tab}
							onChange={(value) => {
								props.setTabs(
									props.tabs.map((t, i) => (i === index ? value : t))
								);
							}}
						/>
						<ButtonContainer>
							{index > 0 && (
								<Button
									onClick={() => moveTab(index, index - 1)}
									label="↑"
									variant="secondary"
								/>
							)}
							{index < props.tabs.length - 1 && (
								<Button
									onClick={() => moveTab(index, index + 1)}
									label="↓"
									variant="secondary"
								/>
							)}
							<Button
								onClick={() => addTab(index)}
								label="Wstaw"
								variant="secondary"
							/>
							<Button
								onClick={() => removeTab(index)}
								label="Usuń"
								variant="secondary"
							/>
						</ButtonContainer>
					</StyledTab>
				))
			)}
		</StyledContainer>
	);
}
