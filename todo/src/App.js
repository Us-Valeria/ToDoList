import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );
  const [filter, setFilter] = useState(items);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]); // eslint-disable-line

  const addItem = (item) => {
    if (!item.trim()) return;
    const newItem = {
      id: new Date(),
      todo: item,
      completed: false,
    };
    setItems([...items, newItem]);
    setFilter([...filter, newItem]);
  };

  const changeFilter = (status) => {
    if (status === 'active') {
      let filterItem = items.filter((t) => t.completed === false);
      setFilter(filterItem);
    } else if (status === 'completed') {
      let filterItem = items.filter((t) => t.completed === true);
      setFilter(filterItem);
    } else if (status === 'all') {
      setFilter(items);
    }
  };

  const removeItem = (itemId) => {
    setItems(items.filter((t) => t.id !== itemId));
    setFilter(filter.filter((t) => t.id !== itemId));
  };

  const changeStatusItem = (id, completed) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: completed,
        };
      }
      return item;
    });
    setItems(updatedItems);
    changeFilter(filter);
  };

  return (
    <div className="app">
      <h1>Список задач: </h1>
      <div className="input-field">
        <input
          className="field"
          type="text"
          placeholder="Введите задачу..."
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              addItem(item);
              setItem('');
            }
          }}
        />
        <button
          className="button-save"
          onClick={() => {
            addItem(item);
            setItem('');
          }}
        >
          Добавить
        </button>
        <div>
          <button
            className="buttons"
            type="radio"
            onClick={() => changeFilter('all')}
          >
            Все
          </button>
          <button
            className="buttons"
            type="radio"
            onClick={() => changeFilter('active')}
          >
            Текущие
          </button>
          <button
            className="buttons"
            type="radio"
            onClick={() => changeFilter('completed')}
          >
            Завершенные
          </button>
        </div>
        <ul>
          {filter.map(
            (item) =>
              item && (
                <li key={item.id} className="item">
                  <input
                    type="checkbox"
                    checked={item.completed ?? false}
                    onChange={(e) =>
                      changeStatusItem(item.id, e.currentTarget.checked)
                    }
                  />
                  <span>{item.todo}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => removeItem(item.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107
                 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 
                 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 
                 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 
                 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964
                  51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 
                  0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
