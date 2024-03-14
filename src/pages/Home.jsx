import TaskList from '@/components/taskList';
import {
    DatePicker,
    Form
} from 'antd'
import { useDispatch } from 'react-redux';
import { updateFilterDate } from '@/redux/taskList';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function Home(){
    const dispatch = useDispatch()
    const [query, setQuery] = useSearchParams()
    const [form] = Form.useForm()
    const convertQueryToObject = ()=>{
        let queryObj = {}
        query.forEach((value, key)=>{
            queryObj[key] = value
        })
        return queryObj
    }
    const onChangeRangerPicker = (values)=>{
        if(!values){
            values = [null, null]
        }
        let startDate = values[0]?.format('YYYY-MM-DD') 
        let endDate = values[1]?.format('YYYY-MM-DD')
        dispatch(updateFilterDate({
            startDate: startDate,
            endDate: endDate,
        }))
        let queryObj = convertQueryToObject()
        if(startDate && endDate){
            queryObj.startDate = startDate
            queryObj.endDate = endDate
        }else{
            delete queryObj.startDate
            delete queryObj.endDate
        }
        setQuery(queryObj)
    }
    useEffect(()=>{
        let {startDate, endDate} = convertQueryToObject()
        if(startDate && endDate){
            
        }else{
           startDate = null
           endDate = null
        }
        dispatch(updateFilterDate({
            startDate: startDate,
            endDate: endDate,
        }))
        startDate = startDate ? dayjs(startDate) : undefined
        endDate = endDate ? dayjs(endDate) : undefined
        form.setFieldsValue({
            date: [startDate, endDate]
        })
    }, [query])
    return (
        <section className="lists-container">
                <Form
                    form={form}
                >
                    <Form.Item name="date">
                    <RangePicker 
                        onChange={onChangeRangerPicker}
                    />
                    </Form.Item>
                </Form>
                <TaskList title="Đã xong" topic='done'></TaskList>
                <TaskList title="Chưa hoàn thành" topic='doing'></TaskList>
        </section>
    )
}