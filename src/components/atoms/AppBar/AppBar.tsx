import { IconType } from 'react-icons';
import {
	MdClose as CloseIcon,
	MdLock as LockIcon,
	MdMenu as MenuIcon,
	MdPerson as PersonIcon,
} from 'react-icons/md';
import { IconButton } from '../IconButton';

import { Typography } from '../Typography';
import { StyledAppBar, StyledIconContainer, StyledTitleContainer } from './appBarStyle';

interface AppBarProps {
	/**
	 * Action on 'Profile Icon' click.
	 */
	handleProfileClick?: () => void;
	/**
	 * Action on 'Action Icon' click.
	 */
	handleActionClick?: () => void;
	/**
	 * Drawer state: true - open; false - close.
	 */
	isDrawerOpen?: boolean;
	/**
	 * Menu on the right - state: true - open; false - close.
	 */
	isSidebarOpen?: boolean;
	/**
	 * Is user sign in ?
	 */
	isLoggedIn?: boolean;
	/**
	 * Set Drawer state:  true - open; false - close.
	 */
	setIsDrawerOpen?: (isDrawerOpen: boolean) => void;
	/**
	 * Set menu od the right state:  true - open; false - close.
	 */
	setIsSidebarOpen?: (isSidebarOpen: boolean) => void;
	/**
	 *  Icon - control for sidbar
	 */
	SidebarIcon?: IconType;
	/**
	 *  Icon - control for action
	 */
	ActionIcon?: IconType;
	/**
	 * Appbar title.
	 */
	title: string;
}

export function AppBar(props: AppBarProps) {
	let lastMenuIconClickTime = 0;

	const handleMenuIconClick = () => {
		const now = Date.now();
		if (props.isLoggedIn && props.setIsDrawerOpen && now - lastMenuIconClickTime >= 250) {
			props.setIsDrawerOpen(!props.isDrawerOpen);
			lastMenuIconClickTime = now;
		}
	};
let lastSidebarIconClickTime = 0;

const handleSidebarIconClick = () => {
	const now = Date.now();
	if (props.isLoggedIn && props.setIsSidebarOpen && now - lastSidebarIconClickTime >= 250) {
		props.setIsSidebarOpen(!props.isSidebarOpen);
		lastSidebarIconClickTime = now;
	}
};
	return (
		<StyledAppBar>
			<IconButton
				label=""
				ariaLabel="menu"
				isLightColor={true}
				margin="0 1.6rem 0 -1.2rem"
				onClick={handleMenuIconClick}
				disabled={!props.isLoggedIn}
			>
				{props.isDrawerOpen ? <CloseIcon size="2.4rem" /> : <MenuIcon size="2.4rem" />}
			</IconButton>
			<StyledTitleContainer>
				<Typography component="h6" userSelect="none">
					{props.title}
				</Typography>
			</StyledTitleContainer>
			<StyledIconContainer>
				<IconButton
					label=""
					ariaLabel="profile"
					disabled={!props.isLoggedIn}
					isLightColor={true}
					onClick={props.handleProfileClick || (() => {})}
				>
					{props.isLoggedIn ? <PersonIcon size="2.4rem" /> : <LockIcon size="2.4rem" />}
				</IconButton>

				{props.isLoggedIn && props.ActionIcon && (
					<IconButton
						label=""
						ariaLabel="action"
						isLightColor={true}
						onClick={props.handleActionClick}
					>
						<props.ActionIcon size="2.4rem" />
					</IconButton>
				)}

				{props.isLoggedIn && props.SidebarIcon && (
					<IconButton
						label=""
						data-label="sidebar"
						isLightColor={true}
						onClick={handleSidebarIconClick}
					>
						{props.isSidebarOpen ? (
							<CloseIcon size="2.4rem" />
						) : (
							<props.SidebarIcon size="2.4rem" />
						)}
					</IconButton>
				)}
			</StyledIconContainer>
		</StyledAppBar>
	);
}
