import React, { useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './TodoList.module.less';

interface TodoItem {
  text: string;
  completed: boolean;
}

function Todo ({ index, item, completeTask, uncompleteTask, removeTask }: {
  index: number, item: TodoItem,
  completeTask: (index: number) => void
  uncompleteTask: (index: number) => void
  removeTask: (index: number) => void
}) {
  return (
    <div className={styles['todo-item']}>
      <span
        className={styles.text}
        style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
      >
        {item.text}
      </span>
      <Button
        type='primary'
        onClick={() => completeTask(index)}
        disabled={item.completed}
      >
        完成
      </Button>
      <Button
        type='primary'
        onClick={() => uncompleteTask(index)}
        disabled={!item.completed}
      >
        标记为未完成
      </Button>
      <Button type='primary' onClick={() => removeTask(index)}>X</Button>
    </div>
  );
}

function TodoForm ({ addTodo }: {addTodo: (text: string) => void}) {
  const [value, setValue] = useState('');
  const onValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const validateForm = () => {
    if (value.length < 1) throw '待办事项不能为空';
    if (value.length > 100) throw '待办事项至多100个字符';
  };
  const onSubmit = () => {
    try {
      validateForm();
      addTodo(value);
      message.success('添加成功');
    } catch (e) {
      message.warning(e as any);
    }
  };
  return (
    <div className={styles['todo-form']}>
      <Input value={value} onChange={onValChange} onPressEnter={onSubmit} />
      <Button type='primary' onClick={onSubmit}>添加</Button>
    </div>
  );
}

export default function TodoList () {
  const [todos, setTodos] = useState([
    { text: '吃饭', completed: false },
    { text: '睡觉', completed: false }
  ] as TodoItem[]);

  const completeTask = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    setTodos(newTodos);
  };

  const uncompleteTask = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = false;
    setTodos(newTodos);
  };

  const removeTask = async (index: number) => {
    // 保证这里没有永久 pending 的 Promise
    try {
      await new Promise<void>((resolve, reject) => Modal.confirm({
        title: `确认删除待办事项"${todos[index].text}"嘛QAQ`,
        icon: <ExclamationCircleOutlined />,
        content: '',
        okText: '残忍删除',
        okType: 'danger',
        cancelText: '我再想想',
        onOk: () => resolve(),
        onCancel: () => reject()
      }));
    } catch (e) {
      return;
    }
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    message.success('删除成功');
  };

  const addTodo = (text: string) => {
    if (~todos.map(todo => todo.text).indexOf(text)) {
      throw '重复的待办事项';
    }
    const newTodos = [...todos];
    newTodos.push({ text, completed: false });
    setTodos(newTodos);
  };

  return (
    <div className={styles.todo}>
      {
        todos.length ?
          todos.map((todo, index) => {
            return (
              <Todo
                index={index}
                key={todo.text}
                item={todo}
                completeTask={completeTask}
                uncompleteTask={uncompleteTask}
                removeTask={removeTask}
              />
            );
          })
          : <span>还没有待办事项QAQ</span>
      }
      <TodoForm addTodo={addTodo} />
    </div>
  );
}
