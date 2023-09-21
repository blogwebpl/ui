import styled from 'styled-components';

const StyledTabs = styled.div`
	user-select: none;
	display: flex;
	width: 100%;
	height: 4rem;
	font-size: 1.4rem;
	font-weight: bold;
	color: ${(props: any) => props.theme.palette.text.primary};
	background-color: #eee;
	padding: 0 1.6rem;
	margin-top: 1rem;
	position: absolute;
	left: 0;
	text-transform: uppercase;
	a {
		line-height: 4rem;
		cursor: pointer;
		border-bottom: 0.3rem;
		padding: 0 1rem;
		&:hover {
			border-bottom: 0.3rem solid #ccc;
			background-color: #ddd;
		}
		&.active {
			color: ${(props: any) => props.theme.palette.element.accent.default};
			border-bottom: 0.3rem solid ${(props: any) => props.theme.palette.element.accent.border};
			background-color: #ddd;
		}
	}
`;

export interface Tab {
	active: boolean;
	label: string;
}

interface TabsProps {
	tabs: Tab[];
	setActiveTab: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Tabs({ tabs, setActiveTab }: TabsProps) {
	return (
		<StyledTabs>
			{tabs.map((tab: Tab, index: number) => (
				<a data-index={index} className={tab.active ? 'active' : ''} onClick={setActiveTab}>
					{tab.label}
				</a>
			))}
		</StyledTabs>
	);
}
