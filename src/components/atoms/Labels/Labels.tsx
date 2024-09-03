import styled from 'styled-components';
import { TextField } from '../TextField';
import { Language, Translations, labelsDefault, languages } from '../../types';

const StyledLabel = styled.div`
	user-select: none;
	padding: 0rem 1.4rem 1rem 1.4rem;
	display: flex;
	flex-direction: column;
	border: 1px solid #c0c0c0;
	border-radius: 0.4rem;
	input:first-child {
		margin-bottom: 1.6rem;
	}
	label:first-child {
		padding: 0.6rem 0.4rem;
		background-color: white;
		top: -1.3rem;
		left: -0.2rem;
		position: relative;
		font-size: 1.2rem;
		color: #00000080;
		display: inline-block;
		width: fit-content;
	}
`;

interface LabelsProps {
	value: Translations;
	onChange?: (value: Translations) => void;
	label?: string;
}

export function Labels(props: LabelsProps) {
	return (
		<StyledLabel>
			<label>{props.label}</label>
			{languages.map((language: Language) => {
				return (
					<TextField
						key={language}
						label={language.toUpperCase()}
						type="text"
						value={props.value?.[language] || labelsDefault[language]}
						onChange={(e) =>
							props.onChange &&
							props.onChange({ ...props.value, [language]: e.target.value })
						}
						controlled
					/>
				);
			})}
		</StyledLabel>
	);
}
