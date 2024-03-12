import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Button } from '../atoms/Button';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Card } from '../atoms/Card';
import { Checkbox } from '../atoms/Checkbox';
import { FieldContainer } from '../atoms/FieldContainer';
import { Form } from '../atoms/Form';
import { Logo } from '../atoms/Logo';
import { TextField } from '../atoms/TextField';
import { Typography } from '../atoms/Typography';
export function Login(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const rememberEmailRef = useRef(null);
    const storedEmail = localStorage.getItem('email');
    useEffect(() => {
        if (storedEmail) {
            rememberEmailRef.current.checked = true;
            emailRef.current.value = storedEmail;
            passwordRef.current.focus();
        }
        else {
            emailRef.current.focus();
        }
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const isRememberEmailChecked = rememberEmailRef.current.value;
        if (!email || !password)
            return;
        if (isRememberEmailChecked)
            localStorage.setItem('email', email);
        else
            localStorage.removeItem('email');
        props.handleSubmit({ email, password });
    };
    return (_jsxs(Card, { padding: true, minWidth: "32rem", opacity: true, children: [props.logo && (_jsx(Logo, { src: props.logo, height: props.logoheight || '6.4rem', margin: props.logomargin || '0 auto 0.8rem' })), _jsx(Typography, { component: "h6", userSelect: "none", color: "#000000", children: "Zaloguj si\u0119" }), _jsxs(Form, { alertText: props.error, onSubmit: handleSubmit, children: [_jsx(FieldContainer, { children: _jsx(TextField, { id: "email", label: "E-mail", required: true, type: "email", forwardedRef: emailRef, onKeyPress: (event) => {
                                if (event.key === 'Enter' && passwordRef.current) {
                                    event.preventDefault();
                                    passwordRef.current.focus();
                                }
                            }, autoComplete: "username" }) }), _jsx(FieldContainer, { children: _jsx(TextField, { id: "password", label: "Has\u0142o", required: true, type: "password", forwardedRef: passwordRef, autoComplete: "current-password" }) }), _jsx(FieldContainer, { children: _jsx(Checkbox, { id: "checkbox", label: "Zapami\u0119taj e-mail", forwardedRef: rememberEmailRef }) }), _jsx(ButtonContainer, { children: _jsx(Button, { className: "w100", label: "ZALOGUJ SI\u0118", variant: "primary", type: "submit", disabled: props.isPending }) })] })] }));
}
//# sourceMappingURL=Login.js.map