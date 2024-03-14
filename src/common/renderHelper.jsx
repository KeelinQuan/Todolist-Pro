import { Button, Result, Spin } from 'antd';
export function render(loading, error, element, btnElement = <Button type="primary">Back Home</Button>){
    if(error){
      return  <Spin tip="Loading" size="large" spinning={loading}>
        <Result
              status="500"
              title="500"
              subTitle={error.message}
              extra={btnElement}
        />
      </Spin>
      
    }
  
    return <Spin tip="Loading" size="large" spinning={loading}>
      {element}
    </Spin>
}