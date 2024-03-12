import { jsx as _jsx } from "react/jsx-runtime";
import { StyledMain } from './mainStyle';
/**
 * Main element under Appbar. Next to the drawer or under the drawer.
 */
export function Main(props) {
    return (_jsx(StyledMain, { "$background": props.background, "$isdraweropen": props.isDrawerOpen, "$iscovered": props.isCovered, onClick: () => {
            if (props.isDrawerOpen && props.isCovered) {
                props.setIsDrawerOpen(false);
            }
        }, children: props.children }));
}
//# sourceMappingURL=Main.js.map