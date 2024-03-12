import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledContainer } from './textFieldStyle';
export function TextField(props) {
    if (props.controlled)
        return (_jsxs(StyledContainer, { "$icon": props.icon !== undefined, "$slim": props.slim, children: [_jsx("input", { id: props.id, type: props.type, value: props.value, onChange: props.onChange
                        ? props.onChange
                        : (e) => {
                            if (props.type === 'number') {
                                props.setValue(Number(e.target.value));
                            }
                            else {
                                props.setValue(e.target.value);
                            }
                        }, required: props.required, ref: props.forwardedRef, onKeyPress: props.onKeyPress, onFocus: props.onFocus, onBlur: props.onBlur, autoComplete: props.autoComplete, autoFocus: props.autoFocus, disabled: props.disabled, placeholder: " ", spellCheck: "false", min: props.min }), _jsxs("label", { htmlFor: props.id, children: [props.label, props.required ? ' *' : null] }), props.icon && _jsx(props.icon, { size: "2.4rem", className: "icon" })] }));
    return (_jsxs(StyledContainer, { "$icon": props.icon !== undefined, "$slim": props.slim, children: [_jsx("input", { id: props.id, type: props.type, defaultValue: props.value, className: props.value ? 'used' : '', required: props.required, ref: props.forwardedRef, onKeyPress: props.onKeyPress, onFocus: props.onFocus, onBlur: props.onBlur, autoComplete: props.autoComplete, autoFocus: props.autoFocus, disabled: props.disabled, placeholder: " ", spellCheck: "false", min: props.min }), _jsxs("label", { htmlFor: props.id, children: [props.label, props.required ? ' *' : null] }), props.icon && _jsx(props.icon, { size: "2.4rem", className: "icon" })] }));
}
//# sourceMappingURL=TextField.js.map