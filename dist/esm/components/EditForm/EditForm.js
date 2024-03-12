import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Card } from '../atoms/Card';
import { FieldContainer } from '../atoms/FieldContainer';
import { Tabs } from '../atoms/Tabs';
import { TextField } from '../atoms/TextField';
import { Typography } from '../atoms/Typography';
import { Alert } from '../atoms/Alert';
import { labelsDefault } from '../types';
import { Select } from '../atoms/Select';
import { WriteTag } from '../atoms/WriteTag';
import { MenuEditor } from '../MenuEditor';
import { IconSelect } from '../atoms/IconSelect';
import { Labels } from '../atoms/Labels';
import { InventoryItems } from '../atoms/InventoryItems';
import { UserSelect } from '../atoms/UserSelect';
import { Checkbox } from '../atoms/Checkbox';
const StyledVerticalGap = styled.div `
	height: 5.6rem;
`;
const StyledTitle = styled.div `
	background-color: #3f51b5;
	margin: -1.6rem;
	padding: 1.6rem;
	margin-bottom: 0;
`;
export function EditForm({ tabs, activeTab: initialActiveTab, fields, values: initialValues, language, collection, title, mode, roles, permissions, menus, menuItems, saveData, width, writeTagFunction, inventoryItems, users, }) {
    if (fields.length === 0) {
        return null;
    }
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(initialActiveTab);
    const [inputValues, setInputValues] = useState(initialValues || {});
    const [isSaving, setIsSaving] = useState(false);
    useEffect(() => {
        setInputValues(initialValues || {});
    }, [initialValues]);
    const handleSetActiveTab = useCallback((index) => {
        setActiveTab(index);
    }, []);
    const validateForm = useCallback(() => fields.every((field) => !field.required || inputValues[field.field] !== ''), [fields, inputValues]);
    const handleClickSave = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        setIsSaving(true);
        setError('');
        if (!validateForm()) {
            setError(language === 'pl' ? 'Wypełnij wszystkie wymagane pola.' : 'Fill all required fields.');
            setIsSaving(false);
            return;
        }
        const dataToSave = Object.assign({}, ...fields.map((field) => ({ [field.field]: inputValues[field.field] })));
        const resultOk = yield saveData(dataToSave);
        setIsSaving(false);
        if (resultOk) {
            navigate(`/${collection}`);
        }
        else {
            setError(language === 'pl'
                ? 'Wystąpił błąd podczas zapisu danych.'
                : 'An error occurred while saving data.');
        }
    }), [validateForm, fields, inputValues, saveData, collection, navigate, language]);
    const getTitleExtension = useCallback(() => {
        const extensions = {
            pl: { add: ' - dodawanie', edit: ' - edycja', view: ' - podgląd' },
            en: { add: ' - add', edit: ' - edit', view: ' - view' },
        };
        return extensions[language][mode] || '';
    }, [language, mode]);
    const extTitle = getTitleExtension();
    const SpecialSelect = useCallback(({ options, valueIds, fieldName, shouldHide, label, isMulti = false }) => {
        const selectedOptions = options.filter((option) => isMulti ? valueIds.includes(option.value) : option.value === valueIds);
        const value = isMulti ? selectedOptions : selectedOptions[0] || null;
        return (_jsx(FieldContainer, { id: fieldName, hidden: shouldHide, children: _jsx(Select, { label: label, options: options, value: value, onChange: (newValue) => {
                    setInputValues((v) => (Object.assign(Object.assign({}, v), { [fieldName]: isMulti
                            ? newValue.map((item) => item.value)
                            : newValue.value })));
                }, isMulti: isMulti, isClearable: false }) }, fieldName));
    }, [setInputValues]);
    const renderField = useCallback((field, index) => {
        const shouldHide = activeTab !== field.tab;
        const fieldKey = `${field.field}-${index}`;
        const commonProps = {
            label: field.label[language],
            required: field.required,
            id: field.field,
            value: inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field],
            onChange: (e) => {
                const value = field.type === 'number' ? parseFloat(e.target.value) : e.target.value;
                setInputValues((v) => (Object.assign(Object.assign({}, v), { [field.field]: value })));
            },
            autoFocus: index === 0,
            disabled: mode === 'view',
            controlled: true,
        };
        let options = [];
        let isMulti = false;
        switch (field.type) {
            case 'roles':
                options = roles || [];
                isMulti = true;
                break;
            case 'permissions':
                options = permissions || [];
                isMulti = true;
                break;
            case 'menu':
                options = menus || [];
                break;
            default:
        }
        switch (field.type) {
            case 'text':
            case 'number':
            case 'date':
            case 'password':
            case 'email':
            case 'datetime-local':
                return (_jsx(FieldContainer, { id: field.field, hidden: shouldHide, children: _jsx(TextField, Object.assign({ type: field.type }, commonProps, { value: inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field] })) }, fieldKey));
            case 'roles':
            case 'permissions':
            case 'menu':
                return (_jsx(SpecialSelect, { options: options, valueIds: isMulti
                        ? (inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field]) || []
                        : (inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field]) || '', fieldName: field.field, shouldHide: shouldHide, label: field.label[language], isMulti: isMulti }, fieldKey));
            case 'inventoryItems':
                return (_jsx(FieldContainer, { id: field.field, hidden: shouldHide, children: _jsx(InventoryItems, Object.assign({ items: inventoryItems || [], setSelectedItems: (newValue) => {
                            setInputValues((values) => (Object.assign(Object.assign({}, values), { [field.field]: newValue })));
                        } }, commonProps, { selectedItems: (inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field]) || [], language: language })) }, fieldKey));
            case 'writeTag':
                if (writeTagFunction) {
                    return (_jsx(WriteTag, { writeTagFunction: writeTagFunction, data: { id: (inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field]) || '' } }, fieldKey));
                }
                return null;
            case 'menuEditor':
                return (_jsx(MenuEditor, { menuItems: menuItems || [], menuItemsInMenu: inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field], language: language, hidden: shouldHide, onChange: (newValue) => {
                        setInputValues((values) => (Object.assign(Object.assign({}, values), { [field.field]: newValue })));
                    }, label: field.label[language] }, fieldKey));
            case 'icon':
                return (_jsx(FieldContainer, { id: field.field, hidden: shouldHide, children: _jsx(IconSelect, { hidden: shouldHide, label: field.label[language], value: (inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field]) || '', onChange: (newValue) => setInputValues((values) => (Object.assign(Object.assign({}, values), { [field.field]: newValue }))) }, fieldKey) }, fieldKey));
            case 'users':
                return (_jsx(FieldContainer, { id: field.field, hidden: shouldHide, children: _jsx(UserSelect, { hidden: shouldHide, label: field.label[language], value: inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field], onChange: (newValue) => setInputValues((values) => (Object.assign(Object.assign({}, values), { [field.field]: newValue }))), users: users || [] }, fieldKey) }, fieldKey));
            case 'labels':
                return (_jsx(FieldContainer, { id: field.field, hidden: shouldHide, children: _jsx(Labels, { value: (inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field]) || Object.assign({}, labelsDefault), onChange: (newValue) => {
                            setInputValues((values) => (Object.assign(Object.assign({}, values), { [field.field]: newValue })));
                        }, label: field.label[language] }) }, fieldKey));
            case 'checkbox':
                return (_jsx(FieldContainer, { id: field.field, hidden: shouldHide, children: _jsx(Checkbox, { checked: inputValues === null || inputValues === void 0 ? void 0 : inputValues[field.field], onChange: (newValue) => {
                            setInputValues((values) => (Object.assign(Object.assign({}, values), { [field.field]: newValue })));
                        }, label: field.label[language], controlled: true }) }, fieldKey));
            default:
                return null;
        }
    }, [
        activeTab,
        inputValues,
        language,
        mode,
        roles,
        permissions,
        menus,
        menuItems,
        setInputValues,
        writeTagFunction,
        inventoryItems,
    ]);
    const renderedFields = useMemo(() => fields.map(renderField), [fields, renderField]);
    return (_jsxs(Card, { minWidth: width || '48rem', padding: true, isPending: isSaving, children: [_jsx(StyledTitle, { children: _jsx(Typography, { component: "h6", userSelect: "none", color: "#eee", children: title[language] + extTitle }) }), tabs && tabs.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Tabs, { language: language, tabs: tabs, setActiveTab: handleSetActiveTab, activeTab: activeTab }), _jsx(StyledVerticalGap, {})] })), error && _jsx(Alert, { children: error }), renderedFields, _jsxs(ButtonContainer, { children: [_jsx(Button, { label: "Anuluj", variant: "secondary", onClick: () => navigate(-1), disabled: isSaving }), mode !== 'view' && (_jsx(Button, { label: "Zapisz", variant: "primary", onClick: handleClickSave, disabled: isSaving }))] })] }));
}
//# sourceMappingURL=EditForm.js.map