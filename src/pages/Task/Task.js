import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { TaskSectionTitle } from '../../components/General'
import { FiLayers } from 'react-icons/fi'
import DNDList from '../../components/DNDList/DNDList'
import GlobalContext from '../../context/GlobalContext'
import styled from 'styled-components'
import Details from '../../components/Details'
import SubmitInput from '../../components/SubmitInput/SubmitInput'
import dayjs from 'dayjs'
import PlaceholderInbox from '../../components/General/PlaceholderInbox'
import LabelData from '../../utils/label-data.json'

const Task = ( {type}) => {    
    const patameters = useParams()
    const {savedEvents, dispatchCalEvent} = useContext(GlobalContext)
    const  [items, setItems] = useState([])
    const [completedItems, setCompletedItems] = useState([])
    const [selectItem, setSelectItem] = useState(null)
    const [typePage, setTypePage] = useState()
    const positionAtribute = getPositionAttribute(type)
    
    useEffect(()=>{
        setTypePage(window.location.pathname)
    })

    useEffect(()=>{
        setSelectItem(null)
    }, [typePage])

    function getPositionAttribute(type) {
        if(type === undefined){
            return null
        }
        let parameterSlug = `position-${type}`;
        if(type === 'label'){
            parameterSlug = `position-${patameters.slug}`;
        } 
        return parameterSlug
    }

    const updateSaveEvent = () => {
        if(type === 'pending'){
            return savedEvents.filter(evt => !evt.isChecked)
        } else if (type === 'label') {
            return savedEvents.filter(evt => evt.labels?.label === patameters.slug)
        }
    }

    useEffect(() => {
        const itemList = updateSaveEvent()
        const pendingTasks = itemList.filter(item => { return item.isChecked == false })
        const completedTasks = itemList.filter(item => { return item.isChecked == true })
        setItems(pendingTasks.sort((a,b) => a[positionAtribute] - b[positionAtribute]))
        setCompletedItems(completedTasks.sort((a,b) => a[positionAtribute+'Completed'] - b[positionAtribute+'Completed']))
        // Check if selected item is in the list
        if(selectItem){
            const index = itemList.findIndex(item => item.id === selectItem.id)
            if(index === -1){
                setSelectItem(null)
            }
        }

    }, [savedEvents, typePage])

    const onEndTodo = (list = [])=>{
        const newItems = list.map((item, index) => {
            item[positionAtribute] = index;
            return item;
        })
        dispatchCalEvent({type: 'update', payload: newItems})
    }

    const onEndTodoCompleted = (list = [])=>{
        const newItems = list.map((item, index) => {
            item[positionAtribute+'Completed'] = index;
            return item;
        })
        dispatchCalEvent({type: 'update', payload: newItems})
    }

    const getTitleByType = (type) => {
        switch(type){
            case 'pending':
                return (<><FiLayers style={{"margin-right": "0.5rem"}}/> Pending Tasks</>)
            case 'label':
                const label = LabelData.find(item => item.label === patameters.slug)

                return (<>
                            <CategoryLabel color={label.color}/>
                            {label.title} Label Tasks
                        </>) 
            case 'all':
                return 'All'
            default:
                return 'All'
        }
    }

    const saveHandle = (item) => {
        const newItem = {
            ...item,
            title: item.value,
            id: window.Date.now(),
            isChecked: false,
            date: dayjs().valueOf()
        }
        setItems(items)
        dispatchCalEvent({type: 'push', payload: newItem})
    }    

    return (
        <Wrapper>
            <Main>
                <TaskSectionTitle>
                    {getTitleByType(type)}
                </TaskSectionTitle>
                <ListContainer>
                    {items.length > 0 
                    &&  (<>
                            <StatusLabel>Pending: <NumberOfTasks>{items.length}</NumberOfTasks> </StatusLabel>
                            <DNDList items={items} drop={onEndTodo} toggle={(el) => setSelectItem(el)}/> 
                            <div style={{padding:"5px"}}></div>
                        </>)
                    }
                    
                    {completedItems.length > 0
                    && <>
                        <StatusLabel>Completed: <NumberOfTasks> {completedItems.length} </NumberOfTasks></StatusLabel>
                        <DNDList items={completedItems} drop={onEndTodoCompleted} toggle={(el) => setSelectItem(el)}/>
                    </>
                    }

                    {items.length === 0 && completedItems.length === 0 && <PlaceholderInbox/>}


                </ListContainer>

                <InputContainer>
                    <SubmitInput save={saveHandle}/>
                </InputContainer>
            </Main>
            <Details item={selectItem}/>
        </Wrapper>
    )
}

const ListContainer = styled.div`
    overflow: scroll;
    margin-top: 2rem;
    height: calc(100vh - 12.5rem);
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const Main = styled.div`
    overflow: scroll;
    width: 100%;
`

const InputContainer = styled.div`
    margin-right: 2rem;
    padding: 10px;
    background-color: #0000002b;
    margin-top: 8px;
    border-radius: 5px;    
`

const CategoryLabel = styled.div`
    width: 1.1rem;
    height: 1.1rem ;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 1px solid var(--border-color);
    margin-right: 0.8rem;
    box-shadow: 0px 0px 5px  ${props => props.color};
`

const StatusLabel = styled.div`
    font-size: 12px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    width: fit-content;
    background-color: #00000026;
    padding: 3px 8px;
`

const NumberOfTasks = styled.div`
    text-align: center;
    width: fit-content;
    margin-left: 5px;
`

export default Task