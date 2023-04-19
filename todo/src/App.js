import React, { useState /* useEffect */ } from 'react';
import './App.css';

let nextId = 0;

function App() {
  const [item, setItem] = useState('');
  let [items, setItems] = useState([]);

  //let [Filter, setFilter] = useState('all');
  /*let [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) 
  );*/

  /*useEffect(() => {
    localStorage.setItem('items', JSON.stringify('items'));
  }, [items]);*/

  const newItem = () => {
    const newItem = {
      id: nextId++,
      todo: item,
      status: false,
    };
    setItems((items) => [...items, newItem]);
    setItem('');
  };

  /*const changeFilter = () => {
    let filterItem = items;
    if (Filter === 'active') {
      filterItem = items.filter((t) => t.status === false);
    }

    if (Filter === 'complete') {
      filterItem = items.filter((t) => t.status === true);
    }
    setFilter(filterItem);
  };*/

  const changeStatus = (Status) => {
    if (Status) {
      Status = false;
    } else {
      Status = true;
    }
  };

  const removeItem = (id) => {
    items = items.filter((t) => t.id !== id);
    setItems(items);
  };

  return (
    <div className="App">
      <h1>Список задач: </h1>
      <div className="Input_Field">
        <input
          className="Field"
          type="text"
          placeholder="Введите задачу..."
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        <button className="Button_Save" onClick={() => newItem()}>
          Добавить
        </button>
        <div>
          <button className="Buttons">Все</button>
          <button className="Buttons">Текущие</button>
          <button className="Buttons">Завершенные</button>
        </div>
        <ul>
          <div className="Item">
            {items.map((items) => (
              <li key={items.id}>
                <input
                  type="checkbox"
                  checked={items.status}
                  onClick={changeStatus(items.status)}
                />
                <span>{items.todo}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => removeItem(items.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;
