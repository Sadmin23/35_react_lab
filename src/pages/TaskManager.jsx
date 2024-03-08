import { useState } from 'react';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            if (editIndex === -1) {
                setTasks([...tasks, { title: newTask, description: newDescription }]);
            } else {
                const updatedTasks = [...tasks];
                updatedTasks[editIndex] = { title: newTask, description: newDescription };
                setTasks(updatedTasks);
                setEditIndex(-1);
            }
            setNewTask('');
            setNewDescription('');
        }
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleEditTask = (index) => {
        setNewTask(tasks[index].title);
        setNewDescription(tasks[index].description);
        setEditIndex(index);
    };

    return (
        <div className='w-full mt-20 px-40'>
            <h1 className='text-4xl font-bold mb-10'>Task Manager</h1>
            <div className='justify-between flex'>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter task title..."
                    className='border-2 rounded-lg h-10 w-full px-4'
                />
                <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Enter task description..."
                    className='border-2 rounded-lg h-10 w-full px-4 ml-4'
                />
                <button className='w-80 h-10 ml-10 text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg px-5 text-center' onClick={handleAddTask}>{editIndex === -1 ? 'Add New Task' : 'Update Task'}</button>
            </div>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className='border-2 flex py-6 mt-10 px-6 text-lg font-semibold shadow-lg rounded-lg items-center'>
                        <div>
                            <h3 className='text-2xl font-bold'>{task.title}</h3>
                            <p className='mt-2 font-normal'>{task.description}</p>
                        </div>
                        <div className='ml-auto space-x-4'>
                            <button className='w-16 h-10 text-white bg-primary-600 rounded-md' onClick={() => handleEditTask(index)}>Edit</button>
                            <button className='w-20 h-10 text-white bg-red-600 rounded-md' onClick={() => handleDeleteTask(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
