import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert } from '../Alert';
import { StyledForm } from './formStyle';
export function Form(props) {
    return (_jsxs(StyledForm, { onSubmit: props.onSubmit, children: [props.alertText ? _jsx(Alert, { children: props.alertText }) : null, props.children] }));
}
//# sourceMappingURL=Form.js.map