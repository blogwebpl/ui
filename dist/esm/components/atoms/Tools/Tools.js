import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from '../IconButton';
export function Tools(props) {
    return (_jsx("div", { style: { display: 'flex', width: 'auto', height: '4.8rem' }, children: props.actions.map((action) => (_jsx(IconButton, { isLightColor: false, onClick: action.onClick, color: "#757575", label: action.hint, disabled: action.disabled, children: _jsx(action.icon, { size: "2.4rem", color: "#757575" }) }, action.id))) }));
}
//# sourceMappingURL=Tools.js.map