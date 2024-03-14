import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, DatePicker, Input, Select, Button } from "antd"
import { closeModal } from "@/redux/modal"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from "react"
import { updateTask, deleteTask, addImgTask } from "@/services/task";
import useNotification from '@/customHook/useNotify'
import UploadImage from "../UploadImage";
dayjs.extend(customParseFormat);
const {VITE_ORIGIN} = import.meta.env

export default function TaskDetailModal(props){
    const showDetailTaskModal = useSelector(state => state.modal.showDetailTaskModal)
    const data = useSelector(state => state.modal.dataDetailTaskModal)
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const {contextHolder, infoNotify, errorNotify } = useNotification()
    const [uploadImgTask, setUploadImgTask] = useState({
        base64: '',
        fileOriginObj: null,
    })
    function handleOk(){
        form.submit()
    }
    function handleCancel(){
        if(typeof props.onCancel == 'function') {props.onCancel()}
        dispatch(closeModal())
    }
    async function handleDeleteTask(){
        try {
            await deleteTask(data?.id)
            dispatch(closeModal())
            if(typeof props.onDelete == 'function') {props.onDelete()}
          } catch (error) {
            errorNotify('topRight', 'Không thành công', `Xoá taskID ${data?.id}`)
        }
    }
    let arrStatus = [
        {
        value: true,
        label: 'Done',
        },
        {
        value: false,
        label: 'Doing',
        },
    ]
    async function handleUpdate(values){
        let id = data?.id
        try {
            await updateTask(id, values)
            if(uploadImgTask.fileOriginObj){await addImgTask(uploadImgTask.fileOriginObj, id)}
            if(typeof props.onOk == 'function') {props.onOk()}
            infoNotify('topRight', 'Cập nhật thành công', `Cập nhật task id: ${id}`)
            dispatch(closeModal())
        } catch (error) {
            errorNotify('topRight', 'Cập nhật thất bại', `Cập nhật task id: ${id}`)
        }
    }
    useEffect(() => {
        let date = data?.attributes?.date ? dayjs(data?.attributes?.date) : undefined
        form.setFieldsValue({
            title: data?.attributes?.title,
            complete: data?.attributes?.complete,
            date: date
        });
    }, [data?.attributes, form]);
    return (
        <>
            {contextHolder}
            <Modal 
                forceRender 
                title={data?.id || "Detail Task"} 
                open={showDetailTaskModal} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={[
                        <Button key="delete" type="dashed" danger onClick={handleDeleteTask}>Xoa</Button>,
                        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                        <Button key="ok" type="primary" onClick={handleOk}>OK</Button>
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleUpdate}
                >   
                    <UploadImage setImg={setUploadImgTask} initSrc={VITE_ORIGIN + data?.attributes?.image?.data?.attributes?.url}></UploadImage>
                    <Form.Item name="title">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name="complete">
                        <Select
                            options={arrStatus}
                        />
                    </Form.Item>
                    <Form.Item name="date">
                        <DatePicker 
                            format="YYYY/MM/DD"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}