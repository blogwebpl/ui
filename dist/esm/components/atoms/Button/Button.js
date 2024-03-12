import { jsx as _jsx } from "react/jsx-runtime";
import { StyledButton } from './buttonStyle';
export function Button(props) {
    return (_jsx(StyledButton, Object.assign({}, props, { disabled: undefined, variant: undefined, width: undefined, "$variant": props.variant, "$width": props.width, disabled: props.disabled, className: props.className, children: props.label })));
}
//# sourceMappingURL=Button.js.map