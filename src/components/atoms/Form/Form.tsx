import { Alert } from '../Alert';
import { StyledForm } from './formStyle';

interface FormProps {
	children: React.ReactNode;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
	alertText?: string;
}

export function Form(props: FormProps) {
	return (
		<StyledForm onSubmit={props.onSubmit}>
			{props.alertText ? <Alert>{props.alertText}</Alert> : null}
			{props.children}
		</StyledForm>
	);
}
