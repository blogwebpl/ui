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
	setIsDrawerOpen: any;
}

/**
 * Main element under Appbar. Next to the drawer or under the drawer.
 */

export function Main(props: MainProps) {
	return (
		<StyledMain
			isDrawerOpen={props.isDrawerOpen}
			isCovered={props.isCovered}
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
