import React from 'react'

const ToDoItem = ({title, description, isCompleted}) => {
  return (
    <div className='todo'>
        {/* Contains task title and description */}
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>

    {/* Contains checkbox and delete button */}
    <div>
        {/* Update button */}
        <label>
            <input type='checkbox'></input>
            <span></span>
        </label>
        {/* Delete button */}
        <button>Delete</button>
    </div>
  </div>
  )
}

export default ToDoItem