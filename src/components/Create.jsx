import React, { useEffect, useState } from 'react'
import theme from '../assets/images/icon-moon.svg'
import check from '../assets/images/icon-check.svg'
import checksun from '../assets/images/icon-sun.svg'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Task from './Task';

const Create = ({ toggleDarkMode }) => {
    const [inputValue, setValue] = useState("");
    const [enterPressed, setEnterPressed] = useState(false);
    const [items, setItems] = useState(() => {
        // Ładuj dane z localStorage przy inicjalizacji
        const savedItems = localStorage.getItem('items');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const savedItems = localStorage.getItem('items');
        if (savedItems) {
            setItems(JSON.parse(savedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setItems([...items, {id: Date.now(), value: inputValue, status: 'active'}]);
            setEnterPressed(true)
            setValue('');
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
    };

    const clearCompleted = () => {
        const updatedItems = items.filter(item => item.status !== 'completed');
        setItems(updatedItems);
    };
    
    const activeItemsCount = items.filter(item => item.status === 'active').length;
    
    const filteredItems = () => {
        switch (filter) {
        case 'active':
            return items.filter(item => item.status === 'active');
        case 'completed':
            return items.filter(item => item.status === 'completed');
        case 'all':
        default:
            return items; // Wszystkie elementy
        }
    };

    const showAll = () => setFilter('all');
    const showActive = () => setFilter('active');
    const showCompleted = () => setFilter('completed');

    // Funkcja wywoływana po zakończeniu przeciągania
    const onDragEnd = (result) => {
        if (!result.destination) {
        return; // Jeśli upuszczono poza listą, nic nie rób
        }

        const reorderedItems = reorder(
        items, // Używamy pełnej listy items, a nie filtrowanej
        result.source.index,
        result.destination.index
        );
        setItems(reorderedItems);
    };

    // Funkcja do zmiany kolejności elementów w tablicy
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex justify-center'>
            <div className='flex justify-center flex-col items-center'>
                <div className='flex flex-col pt-[70px] max-w-[541px] items-center'>
                    
                    <div className='min-w-[375px] lg:min-w-[541px] font-josefin text-white flex items-center justify-between px-[26px] lg:px-0'>
                        <h1 className='text-[40px] tracking-[15px]'>TODO</h1>
                        <div onClick={toggleDarkMode} className='pb-2 cursor-pointer'>
                            <img src={theme} alt="" />
                        </div>
                    </div>
                    
                    <div className='rounded-[5px] mt-[20px] mb-[10px] bg-white dark:bg-verydarkdesaturatedblue w-full font-josefin text-[18px] flex pt-[20px] pb-[19px] px-[24px] max-w-[360px] lg:max-w-none'>
                        <label className="relative">
                            <input type="checkbox" className="peer hidden" />
                            <span className="relative block w-6 h-6 rounded-full border border-lightgrayishbluehover dark:border-verydark"></span>
                        </label>
                        <input value={inputValue} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} className="w-full outline-none pl-[24px] dark:text-darkgrayishblue" type="text" placeholder='Create a new todo...'/>
                    </div>
                </div>
                <div className='shadow-custom bg-white dark:bg-verydarkdesaturatedblue w-full rounded-[5px] px-[24px] max-w-[360px] lg:max-w-[541px]'>
                    
                    <Droppable droppableId="tasks" isDropDisabled={false}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                            {filteredItems().map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                {(provided) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    >
                                    <Task
                                        value={item.value}
                                        status={item.status}
                                        onStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)}
                                    />
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    
                    <div className='py-[16px] flex justify-between text-[14px] font-josefin flex-col lg:flex-row items-center'>
                        <p className='text-darkgrayishblue'>{activeItemsCount} items left</p>
                        <div className='flex gap-[14px]'>
                            <p onClick={showAll} className={`${filter === 'all' ? 'text-brightblue' : 'text-darkgrayishblue' } cursor-pointer`}>All</p>
                            <p onClick={showActive} className={`${filter === 'active' ? 'text-brightblue' : 'text-darkgrayishblue' } cursor-pointer`}>Active</p>
                            <p onClick={showCompleted} className={`${filter === 'completed' ? 'text-brightblue' : 'text-darkgrayishblue' } cursor-pointer`}>Completed</p>
                        </div>
                        <p onClick={clearCompleted} className='text-darkgrayishblue cursor-pointer'>Clear Completed</p>
                    </div>
                </div>
                <p className={`${items.length > '1' ? 'block' : 'hidden' } pt-[49px] text-darkgrayishblue text-center text-[14px] font-josefin lg:pr-7`}>Drag and drop to reorder list</p>
            </div>
        </div>
    </DragDropContext>
  )
}

export default Create