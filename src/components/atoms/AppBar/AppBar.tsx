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
	isLogin: boolean;
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
	 * Appbar title.
	 */
	title: string;
}

export function AppBar(props: AppBarProps) {
	const handleMenuIconClick = () => {
		if (props.isLogin) {
			props.setIsDrawerOpen(!props.isDrawerOpen);
		}
	};
	const handleSidebarIconClick = () => {
		if (props.isLogin) {
			props.setIsSidebarOpen(!props.isSidebarOpen);
		}
	};
	return (
		<StyledAppBar>
			<IconButton
				label=""
				ariaLabel="menu"
				isLightColor={true}
				margin="0 16px 0 -12px"
				onClick={handleMenuIconClick}
				isDisabled={!props.isLogin}
			>
				{props.isDrawerOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
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
					isDisabled={!props.isLogin}
					isLightColor={true}
					onClick={() => {}}
				>
					{props.isLogin ? <PersonIcon size={24} /> : <LockIcon size={24} />}
				</IconButton>
				{props.isLogin && props.SidebarIcon && (
					<IconButton
						label=""
						data-label="sidebar"
						isLightColor={true}
						onClick={handleSidebarIconClick}
					>
						{props.isSidebarOpen ? <CloseIcon size={24} /> : <props.SidebarIcon size={24} />}
					</IconButton>
				)}
			</StyledIconContainer>
		</StyledAppBar>
	);
}
