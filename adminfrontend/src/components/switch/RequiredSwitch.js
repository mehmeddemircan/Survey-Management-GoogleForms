import { Switch } from 'antd';

const RequiredSwitch = ({onRequiredChange, isRequired}) => {

  

    return (
        <Switch defaultChecked={isRequired} onChange={onRequiredChange} />
    )
};
export default RequiredSwitch;