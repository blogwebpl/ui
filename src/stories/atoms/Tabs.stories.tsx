/* eslint-disable no-param-reassign */
import React from 'react';
import { Tabs } from '../../components/atoms/Tabs';

const Template = () => {
	const [tabs, setTabs] = React.useState([
		{ en: 'Tab 1', pl: 'Tab 1' },
		{ en: 'Tab 2', pl: 'Tab 2' },
	]);
	const setActiveTab = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const dataIndex = Number(e.currentTarget.getAttribute('data-index'));
		console.log(dataIndex);
		const newTabs = tabs.map((tab, index) => {
			if (index === dataIndex) {
				return { ...tab, active: true };
			}
			return { ...tab, active: false };
		});
		setTabs(newTabs);
	};
	return <Tabs tabs={tabs} setActiveTab={setActiveTab} language="en" activeTab={0} />;
};

export default { component: Template, title: 'Atoms/Tabs' };

export const Primary = {
	args: {},
};
