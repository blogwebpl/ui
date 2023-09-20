/* eslint-disable no-param-reassign */
import React from 'react';
import { Tabs } from '../../components/atoms/Tabs';

const Template = () => {
	const [tabs, setTabs] = React.useState([
		{ label: 'Tab 1', active: true },
		{ label: 'Tab 2', active: false },
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
	return <Tabs tabs={tabs} setActiveTab={setActiveTab} />;
};

export default { component: Template, title: 'Atoms/Tabs' };

export const Primary = {
	args: {},
};
