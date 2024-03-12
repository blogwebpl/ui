import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-alert */
import { useRef, useState } from 'react';
import { MdPerson as IconPerson } from 'react-icons/md';
import styled from 'styled-components';
import { Button } from '../atoms/Button';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Card } from '../atoms/Card';
import { FieldContainer } from '../atoms/FieldContainer';
import { Form } from '../atoms/Form';
import { TextField } from '../atoms/TextField';
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
export function ChangePassword(props) {
    const [isPending, setIsPending] = useState(false);
    const passwordRef1 = useRef(null);
    const passwordRef2 = useRef(null);
    const handleSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const password1 = passwordRef1.current.value;
        const password2 = passwordRef2.current.value;
        if (!password1 || !password2)
            return;
        setIsPending(true);
        yield props.onSubmit(password1, password2);
        setIsPending(false);
    });
    return (_jsxs(Card, { padding: true, minWidth: "32rem", isPending: isPending, children: [_jsx(Typography, { component: "h6", userSelect: "none", color: "#000000", children: "Zmiana has\u0142a" }), _jsxs(Form, { alertText: props.error, onSubmit: handleSubmit, children: [_jsxs(StyledEmailContainer, { children: [_jsx(IconPerson, { size: "2.4rem" }), _jsx("span", { children: props.email })] }), _jsx(FieldContainer, { children: _jsx(TextField, { id: "new-password", label: "Nowe has\u0142o", required: true, type: "password", forwardedRef: passwordRef1, autoFocus: true, onKeyPress: (event) => {
                                if (event.key === 'Enter' && passwordRef2.current) {
                                    event.preventDefault();
                                    passwordRef2.current.focus();
                                }
                            }, disabled: isPending }) }), _jsx(FieldContainer, { children: _jsx(TextField, { id: "repeat-password", label: "Powt\u00F3rz has\u0142o", required: true, type: "password", forwardedRef: passwordRef2, disabled: isPending }) }), _jsxs(ButtonContainer, { children: [_jsx(Button, { label: "ANULUJ", variant: "secondary", type: "button", disabled: isPending, onClick: props.onCancel }), _jsx(Button, { label: "ZAPISZ", variant: "primary", type: "submit", disabled: isPending })] })] })] }));
}
//# sourceMappingURL=ChangePassword.js.map