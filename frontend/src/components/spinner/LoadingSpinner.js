import { Space, Spin } from 'antd';
const LoadingSpinner = () => {
    return (
        <Space className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
            <Spin size='large' />
        </Space>
    )
};
export default LoadingSpinner;