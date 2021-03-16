import React, { useState } from 'react'
import useReactRouter from 'use-react-router'

// 初期値(todos)の型を定義　リスト一覧画面（TodoList）でも使えるようにexport
export type Items = {
    id: number;
    date: string;
    title:string;
    detail:string;
}

const NewTodo = () => {
    // state定義 useState→初期値
    const [todos, setTodos] = useState<Items[]>([]);
    const [date,setDate] = useState("");
    const [title,setTitle] = useState("");
    const [detail,setDetail] = useState("");

    // クリックイベント（todoSubmitHandler）で使用する遷移機能
    const {history} = useReactRouter();

    // テキスト入力で発火するイベント　入力値を各stateにセット
    const dateChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value)
    }
    const titleChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const detailChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setDetail(event.target.value)
    }

    // useEffect(() => {
    //     const getTodos = localStorage.getItem('todos');
    //         if(getTodos !== null) {
    //             todos.push(...JSON.parse(getTodos));
    //         }
    // });

    // ボタンクリックで発火するイベント
    const todoSubmitHandler = () => {
        //空配列生成　push（追加）は連想配列×、配列○
        // const list = Object.assign({}, todos);
        // const list = [];
        // list.push({id: Math.random(),date: date,title: title, detail: detail});

        // state(型:Items[]）に要素を追加
        todos.push({id: Math.random(),date: date,title: title, detail: detail});

        // prevTodosで現在のstateの値を取得
        // スプレット演算子(...)で連想配列を展開し、新たな各要素をstateにセット
        setTodos(prevTodos => {
            return [
                ...prevTodos,
                {id:Math.random(),date: date,title: title,detail: detail},
            ];
        });
        // 各入力値を空に
        setDate("");
        setTitle("");
        setDetail("");
        // localstrageにstateを保存
        localStorage.setItem('todos',JSON.stringify(todos))
        // リスト一覧画面に遷移
        history.push('/components/TodoList');
    }

    return (
        <div className="NewTodo">
            <h1>New ToDo</h1>
            <form>
                {/* 日付、タイトル、詳細の入力欄　onChange→入力でイベント発火 */}
                <label>【Date】</label>
                <input type="text" name="date" onChange={dateChangeHandler} />
                <label>【Title】</label>
                <input type="text" name="title" onChange={titleChangeHandler} />
                <label>【Detail】</label>
                <input type="text" name="detail" onChange={detailChangeHandler} />
                {/* inputタグ× submitタイプ×（リロードされるため）onClick→クリックでイベント発火 */}
                <button type="button" onClick={todoSubmitHandler}>Add</button>
            </form>
        </div>
    )
}

export default NewTodo;