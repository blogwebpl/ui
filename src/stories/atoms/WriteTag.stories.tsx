import { WriteTag } from '../../components/atoms/WriteTag';


const writeTagFunction = async (data:any): boolean => {
	console.log(data);
	alert('WriteTagFunction');
	return true;
}

const Template = () => {
	return <WriteTag writeTagFunction={writeTagFunction}/>;
};

export default { title: 'atoms/WriteTag', component: Template };
export const Default = {};
