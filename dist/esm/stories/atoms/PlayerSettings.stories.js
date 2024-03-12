import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable no-alert */
import { Main } from '../../components/atoms/Main';
import { devicesList } from './devicesList';
import { PlayerSettings } from '../../components/atoms/PlayerSettings';
const Template = () => {
    return (_jsx(Main, { isCovered: false, isDrawerOpen: false, setIsDrawerOpen: undefined, children: _jsx(PlayerSettings, { devices: devicesList, onLoad: () => {
                alert('on load');
            }, onClose: () => {
                alert('on close');
            } }) }));
};
export default { component: Template, title: 'Atoms/PlayerSettings' };
export const Default = {};
//# sourceMappingURL=PlayerSettings.stories.js.map