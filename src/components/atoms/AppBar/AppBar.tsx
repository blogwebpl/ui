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
	handleProfileClick: () => void;
	/**
	 * Action on 'Action Icon' click.
	 */
	handleActionClick?: () => void;
	/**
	 * Drawer state: true - open; false - close.
	 */
	isDrawerOpen: boolean;
	/**
	 * Menu on the right - state: true - open; false - close.
	 */
	isSidebarOpen: boolean;
	/**
	 * Is user sign in ?
	 */
	isLoggedin: boolean;
	/**
	 * Set Drawer state:  true - open; false - close.
	 */
	setIsDrawerOpen: (isDrawerOpen: boolean) => void;
	/**
	 * Set menu od the right state:  true - open; false - close.
	 */
	setIsSidebarOpen: (isSidebarOpen: boolean) => void;
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
	const handleMenuIconClick = () => {
		if (props.isLoggedin) {
			props.setIsDrawerOpen(!props.isDrawerOpen);
		}
	};
	const handleSidebarIconClick = () => {
		if (props.isLoggedin) {
			props.setIsSidebarOpen(!props.isSidebarOpen);
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
				isDisabled={!props.isLoggedin}
			>
				{props.isDrawerOpen ? <CloseIcon size="2.4rem" /> : <MenuIcon size="2.4rem" />}
			</IconButton>
			<StyledTitleContainer>
				<Typography component="h6" userSelect="none">
					<span>{props.title}</span>
				</Typography>
			</StyledTitleContainer>
			<StyledIconContainer>
				<IconButton
					label=""
					ariaLabel="profile"
					isDisabled={!props.isLoggedin}
					isLightColor={true}
					onClick={props.handleProfileClick}
				>
					{props.isLoggedin ? <PersonIcon size="2.4rem" /> : <LockIcon size="2.4rem" />}
				</IconButton>

				{props.isLoggedin && props.ActionIcon && (
					<IconButton
						label=""
						ariaLabel="action"
						isLightColor={true}
						onClick={props.handleActionClick}
					>
						<props.ActionIcon size="2.4rem" />
					</IconButton>
				)}

				{props.isLoggedin && props.SidebarIcon && (
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
