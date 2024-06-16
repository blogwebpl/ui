import { StyledMain } from './mainStyle';

interface MainProps {
	/**
	 * Elements in main window.
	 */
	children: React.ReactNode;
	/**
	 * Is it covered by the drawer ?
	 */
	isCovered: boolean;
	/**
	 * Is the drawer open ?
	 */
	isDrawerOpen: boolean;
	/**
	 * Set the drawer open state.
	 */
	setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	/**
	 * Background image
	 */
	background?: string;
}

/**
 * Main element under Appbar. Next to the drawer or under the drawer.
 */

export function Main(props: MainProps) {
	return (
		<StyledMain
			$background={props.background}
			$isdraweropen={props.isDrawerOpen}
			$iscovered={props.isCovered}
			onClick={() => {
				if (props.isDrawerOpen && props.isCovered) {
					props.setIsDrawerOpen(false);
				}
			}}
		>
			{props.children}
		</StyledMain>
	);
}
