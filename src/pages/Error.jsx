import { useRouteError } from "react-router-dom";
import { Button, Result } from "antd";
export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
           <>
                <h1>{error.statusText || error.message}</h1>
                <Button type="primary" style={{marginTop: 10}}>Back Home</Button>
           </>
        }
    />
  );
}