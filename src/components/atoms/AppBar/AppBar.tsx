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
	isSideMenuOpen: boolean;
	/**
	 * Is user sign in ?
	 */
	isSignIn: boolean;
	/**
	 * Set Drawer state:  true - open; false - close.
	 */
	setIsDrawerOpen: (isDrawerOpen: boolean) => void;
	/**
	 * Set menu od the right state:  true - open; false - close.
	 */
	setIsSideMenuOpen: (isSideMenuOpen: boolean) => void;
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
		if (props.isSignIn) {
			props.setIsDrawerOpen(!props.isDrawerOpen);
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
				isDisabled={!props.isSignIn}
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
					isDisabled={!props.isSignIn}
					isLightColor={true}
					onClick={() => {
						if (props.isSignIn) {
							props.handleProfileClick();
						}
					}}
				>
					{props.isSignIn ? <PersonIcon size={24} /> : <LockIcon size={24} />}
				</IconButton>
				{props.isSignIn && props.SidebarIcon && (
					<IconButton
						label=""
						data-label="sidebar"
						isLightColor={true}
						onClick={() => {
							props.setIsSideMenuOpen(!props.isSideMenuOpen);
						}}
					>
						{props.isSideMenuOpen ? <CloseIcon size={24} /> : <props.SidebarIcon size={24} />}
					</IconButton>
				)}
			</StyledIconContainer>
		</StyledAppBar>
	);
}
