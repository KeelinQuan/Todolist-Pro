import { useState, useRef } from 'react'
import { Skeleton, Pagination, Input, Space, Form, Upload, Button, Avatar, Row } from 'antd'
import { useFetching } from '@/customHook/useFetching'
import { render } from '@/common/renderHelper'
import { ReloadOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import {getTasksUnComplete, getTasksComplete, createTask, deleteTask, addImgTask} from '@/services/task'
import TaskDetailModal from '../Modals/TaskDetail'
import { openModal} from '@/redux/modal'
import { reloadTaskList } from '@/redux/taskList'
import { useDispatch } from 'react-redux'
import useNotification from '@/customHook/useNotify'
import UploadImage from '../UploadImage'
import { warningTasksThunk } from '@/redux/taskList/thunk'
const {VITE_ORIGIN} = import.meta.env
export default function TaskList(props){
    const pendingCallAPI = useRef(null)
    const [form] = Form.useForm();
    const [isAddNew, setIsAddNew] = useState(false) 
    const getTasks = props.topic === 'done' ? getTasksComplete : getTasksUnComplete
    const {data, loading, error, page, loadPage, reload} = useFetching(getTasks)
    const dispatch = useDispatch()
    const {contextHolder, infoNotify, errorNotify } = useNotification()
    const [uploadImgTask, setUploadImgTask] = useState({
      base64: '',
      fileOriginObj: null,
    })
    function toggleAddNew(){
      setIsAddNew(!isAddNew)
    }
    async function handleAddNew(values){
      try {
        let {title} = values
        form.resetFields();
        pendingCallAPI.current.disabled = true
        let newTask = await createTask(title)
        newTask = newTask.data
        if(uploadImgTask.fileOriginObj){
          await addImgTask(uploadImgTask.fileOriginObj, newTask.id)
        }
        pendingCallAPI.current.disabled = false
        reload()
        dispatch(warningTasksThunk())
        setIsAddNew(false)
      } catch (error) {
        console.log('loi', error);
        pendingCallAPI.current.disabled = false
      }
    }
    function handleOpenModal(task){
      dispatch(openModal(task))
    }
    const inputNewArea = (
      <Form 
        onFinish={handleAddNew}
        form={form}
      >
        <UploadImage setImg={setUploadImgTask}></UploadImage>
        <Space>
          <Form.Item name='title' style={{marginBottom: 0}}>
            <Input placeholder='Enter Task Title'></Input>
          </Form.Item>
          <Button ref={pendingCallAPI} type='primary' htmlType='submit'>Add</Button>
          <CloseOutlined onClick={toggleAddNew}/>
        </Space>
      </Form>
    )

    const element = (
      <>
        {contextHolder}
        <TaskDetailModal 
          onOk={()=>{
            dispatch(reloadTaskList())
            dispatch(warningTasksThunk())
          }}
          onDelete={()=>{
            dispatch(reloadTaskList())
            dispatch(warningTasksThunk())
          }}
        />
        <div className="list">
          <h3 className="list-title">{props.title}</h3>
          <Pagination 
          showSizeChanger
          onChange={(pageNumber, pageSize)=>{
            loadPage(pageNumber, pageSize)
          }} current={page.page} total={page.total} pageSize={page.pageSize}/>
          <ul className="list-items">
            {
              loading ? Array(10).fill(0).map((item, index)=><Skeleton key={index} active />) : 
              data?.sort((task1, task2)=>{
                let timeTask1 = new Date(task1?.attributes?.createdAt)
                let timeTask2 = new Date(task2?.attributes?.createdAt)
                if(timeTask1 > timeTask2) return 1
                if(timeTask1 < timeTask2) return -1
                if(timeTask1 == timeTask2) return 0
              }).map(item=>{
                return (
                  <li key={item?.id} onClick={()=>{
                    handleOpenModal(item)
                  }}>
                    <Row justify="space-between" align="middle">
                      <Avatar src={VITE_ORIGIN + item?.attributes?.image?.data?.attributes?.url}>
                        {item?.attributes?.title}
                      </Avatar>
                      {item?.attributes?.title}
                      <DeleteOutlined onClick={async (e)=>{
                        try {
                          e.stopPropagation()
                          await deleteTask(item?.id)
                          reload()
                          dispatch(warningTasksThunk())
                        } catch (error) {
                          errorNotify('topRight', 'Không thành công', `Xoá taskID ${item?.id}`)
                        }
                      }}/>
                    </Row>
                  </li>
                )
              })
            }
          </ul>
        
          {
            isAddNew ? 
            inputNewArea : 
            <button className="add-card-btn btn" onClick={toggleAddNew}>Add a card</button>
          }
        </div>
      </>
    )
    

    let btnReload = <Button 
      icon={<ReloadOutlined />} 
      onClick={()=>{
        reload()
      }}>Reload</Button>
    return render(
      loading,
      error,
      element,
      btnReload
    )
}