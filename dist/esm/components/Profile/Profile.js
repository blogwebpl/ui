import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-alert */
import { MdPerson as IconPerson } from 'react-icons/md';
import styled from 'styled-components';
import { Card } from '../atoms/Card';
import { CardMenu } from '../atoms/CardMenu';
import { FieldContainer } from '../atoms/FieldContainer';
import { Select } from '../atoms/Select';
import { Typography } from '../atoms/Typography';
const StyledEmailContainer = styled.div `
	color: ${(props) => props.theme.palette.text.secondary};
	display: flex;
	align-items: center;
	margin-top: 1.6rem;
	margin-bottom: 0.8rem;
	span {
		padding: 0 0.8rem;
		user-select: none;
	}
`;
export function Profile(props) {
    const menuItems = [
        {
            id: 'changePassword',
            icon: 'Edit',
            label: { pl: 'Zmień hasło', en: 'Change password' },
            onClick: props.changePassword,
        },
        { id: 'lock', icon: 'Lock', label: { pl: 'Wyloguj', en: 'Sign out' }, onClick: props.logout },
    ];
    if (!props.role) {
        return null;
    }
    const options = props.roles || [];
    const value = props.role || null;
    return (_jsxs(Card, { padding: true, minWidth: "32rem", children: [_jsx(Typography, { component: "h6", userSelect: "none", color: "#000000", children: "Profil u\u017Cytkownika" }), _jsxs(StyledEmailContainer, { children: [_jsx(IconPerson, { size: "2.4rem" }), _jsx("span", { children: props.email })] }), _jsx(FieldContainer, { children: _jsx(Select, { label: "Aktywna grupa", options: options, value: value, onChange: props.onChange, isMulti: false, isClearable: false, isRequired: true }) }), _jsx(CardMenu, { items: menuItems, language: "pl" })] }));
}
//# sourceMappingURL=Profile.js.map