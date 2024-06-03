import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [value, setValue] = useState({
    name: '',
    id: 0,
    isCompleted: false,
  });
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setValue({ ...value, name: e?.target?.value });
  };

  const createTask = () => {
    if (value?.name?.trim()?.length) {
      setTasks([
        ...tasks,
        {
          name: value?.name?.trim(),
          id: Math.floor(Math.random() * 10000 + 1),
          isCompleted: value?.isCompleted,
        },
      ]);
      setValue({
        name: '',
        id: 0,
        isCompleted: false,
      });
    }
  };

  const handleDelete = (id) => {
    const newArray = tasks?.filter((task) => task.id !== id);
    setTasks(newArray);
  };

  const handleEdit = (task) => {
    setIsEdit(true);
    setValue(task);
  };

  const editTask = () => {
    const newEditArray = tasks?.map((task) => {
      if (task?.id === value?.id) {
        task.name = value?.name?.trim();
      }
      return task;
    });

    setValue({
      name: '',
      id: 0,
      isCompleted: false,
    });
    setTasks(newEditArray);
    setIsEdit(false);
  };

  const handleComplete = (id, complete) => {
    const newEditArray = tasks?.map((task) => {
      if (task?.id === id) {
        task.isCompleted = complete;
      }
      return task;
    });
    setTasks(newEditArray);
  };

  return (
    <>
      <div>
        <form>
          <input
            type='text'
            placeholder='enter task'
            value={value?.name}
            onChange={handleChange}
          />
          <button
            onClick={(e) => {
              e?.preventDefault();
              if (isEdit) {
                editTask();
              } else {
                createTask();
              }
            }}
          >
            {isEdit ? 'Edit' : 'Create'}
          </button>
        </form>
      </div>

      <div>
        <ul>
          {tasks?.map((task, index) => (
            <div key={task?.id}>
              <li className={`${task?.isCompleted ? 'completed' : ''}`}>
                {task?.name}
              </li>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <label htmlFor='complete'>Mark as complete</label>
              <input
                type='checkbox'
                id='complete'
                checked={task?.isCompleted}
                onChange={(e) => {
                  handleComplete(task?.id, e?.target?.checked);
                }}
              />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
