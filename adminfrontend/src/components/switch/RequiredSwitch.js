import { Switch } from 'antd';

const RequiredSwitch = ({onRequiredChange, isRequired}) => {



    return (
        <Switch  checked={isRequired} onChange={onRequiredChange} />
    )
};
export default RequiredSwitch;