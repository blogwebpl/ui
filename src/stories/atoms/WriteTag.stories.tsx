import { WriteTag } from '../../components/atoms/WriteTag';

const writeTagFunction = async (data: any): Promise<boolean> => {
	console.log(data);
	// alert('WriteTagFunction');
	return true;
};

const Template = () => {
	return <WriteTag data={{}} writeTagFunction={writeTagFunction} />;
};

export default { title: 'atoms/WriteTag', component: Template };
export const Default = {};
