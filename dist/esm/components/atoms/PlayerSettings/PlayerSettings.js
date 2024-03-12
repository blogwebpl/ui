import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';
import { Card } from '../Card';
import { FieldContainer } from '../FieldContainer';
import { Select } from '../Select';
import { TextField } from '../TextField';
import { Typography } from '../Typography';
const today = new Date();
const todayStart = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
const todayEnd = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59));
export function PlayerSettings({ devices, onLoad, onClose }) {
    const dateFromRef = useRef(null);
    const dateToRef = useRef(null);
    const options = devices
        .map((device) => ({
        label: device.name,
        value: device.deviceId,
    }))
        .sort((device1, device2) => (device1.label < device2.label ? -1 : 1));
    const [device, setDevice] = useState(options);
    const singleDevice = Array.isArray(device)
        ? device[0].value
        : device.value;
    return (_jsxs(Card, { minWidth: "46rem", padding: true, children: [_jsx(Typography, { component: "h6", userSelect: "none", color: "#000000", children: "Ustawienia trasy" }), _jsxs(FieldContainer, { isMulti: true, children: [_jsx(TextField, { label: "Od:", type: "datetime-local", value: todayStart.toISOString().slice(0, 16), forwardedRef: dateFromRef }), _jsx(TextField, { label: "Do:", type: "datetime-local", value: todayEnd.toISOString().slice(0, 16), forwardedRef: dateToRef })] }), _jsx(FieldContainer, { children: _jsx(Select, { label: "Pojazd", options: options, value: device, onChange: setDevice, isMulti: false, isClearable: false, isRequired: true }) }), _jsxs(ButtonContainer, { children: [_jsx(Button, { label: "Zako\u0144cz", variant: "secondary", onClick: onClose }), _jsx(Button, { label: "Wczytaj", variant: "primary", onClick: () => {
                            const vid = singleDevice;
                            const dateFrom = dateFromRef.current.value;
                            const dateTo = dateToRef.current.value;
                            onLoad({ vid, dateFrom, dateTo });
                        } })] })] }));
}
//# sourceMappingURL=PlayerSettings.js.map