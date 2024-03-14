import { Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { beforeUpload, getBase64 } from '@/common/imageHelper'
import useNotification from '@/customHook/useNotify'

export default function UploadImage(props){
    const {contextHolder, infoNotify, errorNotify } = useNotification()
    
    const [imgObj, setImgObj] = useState({
        base64: props.initSrc || '',
        fileOriginObj: null,
    })
    useEffect(()=>{
        setImgObj({...imgObj, base64: props.initSrc})
    }, [props.initSrc])
    const handleChange = (info) => {
        var errorMess = beforeUpload(info.file)
        if(errorMess){
            errorNotify('topRight', 'File ảnh không hợp lệ', errorMess)
            return;
        }
        getBase64(info.file, (url) => {
            let data = {
                base64: url,
                fileOriginObj: info.file
            }

            setImgObj(data)
            props.setImg(data)
        });
    };
    
    const uploadButton = (
        <div>
           <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
    );
  
    const uploadComponent = (
    <Upload
        name="files"
        showUploadList={false}
        onChange={handleChange}
        beforeUpload={() => false}
        listType="picture-card"
        className="avatar-uploader"
    >
        {imgObj.base64 ? <img
            src={imgObj.base64}
            alt="task img"
            style={{
            width: '100%',
        }}
        /> : uploadButton}
    </Upload>
    )

    return (
        <>
            {contextHolder}
            {uploadComponent}
        </>
    )
}