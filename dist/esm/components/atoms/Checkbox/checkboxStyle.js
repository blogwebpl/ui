import styled from 'styled-components';
export const StyledCheckBox = styled.div `
	align-items: center;
	display: flex;
	& > .checked {
		display: none;
	}
	& > .unchecked {
		display: block;
	}
	&:checked > .checked {
		disblay: block;
	}
	&:checked > .unchecked {
		disblay: none;
	}
`;
export const StyledLabel = styled.label `
	user-select: none;
`;
//# sourceMappingURL=checkboxStyle.js.map