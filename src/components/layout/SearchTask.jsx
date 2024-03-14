import _ from 'lodash'
import { Form, Input } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { searchTask } from '@/services/task'
import ResultTasksList from './ResultTasksList'
export default function SearchTask(){
    const [listTask, setListTask] = useState([])
    useEffect(()=>{
        function closeSearchPopup(e){
            setListTask([])
        }
        window.addEventListener('click', closeSearchPopup)

        return ()=>{
            window.removeEventListener('click', closeSearchPopup)
        }
    }, [])

    const onChange = useCallback(_.debounce(async (e)=>{
        let txt = e.target.value.trim()
        try {
            if(txt){
                let data = await searchTask(txt)
                data = data.data
                
                setListTask(data)
            }
        } catch (error) {
            console.log(error);
        }
    }, 1000))
   
    let result = (
        listTask.length > 0 ? <ResultTasksList 
            listTask = {listTask}
            handleItemClick={(e)=>{
                e.stopPropagation()
                setListTask([])
            }}

        /> : null
    )

    return (
        <Form
            name='searchTaskForm'
        >
            <div className="board-search">
                <Form.Item
                    onChange={onChange}
                    style={{marginBottom: 0, position: 'relative'}}
                >
                    <Input type="search" className="board-search-input" aria-label="Board Search" placeholder='Tìm kiếm ...' />
                </Form.Item>
                <i className="fas fa-search search-icon" aria-hidden="true"></i>
            </div>
            {result}
        </Form>
    )
}