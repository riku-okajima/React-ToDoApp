import React from 'react';
import { Link } from 'react-router-dom';
import {Items} from './NewTodo'

// stateの型に追加画面(NewTodo)からimportしたItems[]を定義
type State = {
    todos:Items[]
}

// ジェネリクスに<props,state>で型指定
export class TodoList extends React.Component<Items,State>  {
    constructor(props:any) {
        super(props);
        this.state = {
            todos:[]
        }
    }

    // コンポーネントがマウント(配置)された直前に呼び出されるメソッド
    componentDidMount() {
        // タイプガードでnullチェックしてlocalstrageから値を取得し、stateにセット
        const appState = localStorage.getItem('todos');
        if(appState !== null) {
            this.setState({
                todos: JSON.parse(appState)
            })
        }
    }
    
    // 削除イベント
    todoDeleteHandler(todoId: number) {
        // splice→配列の削除 渡されたidから1つ分
        this.state.todos.splice(todoId,1)
        // 削除した内容をstateにセット
        this.setState({
            todos: this.state.todos
        })
        // 削除結果のstateをlocalstrageに保存
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }

    render() {
        // タイプガードで型チェック
        if(this.state.todos !== null || this.state.todos !== undefined) {
            console.log('ok');
        } else {
            console.log('ng');
        }
        return (
            <div>
                <h1>ToDo List</h1>
                <ul>
                    {/* && →return内でのnullチェック map→要素の分割 */}
                    {this.state.todos && this.state.todos.map(todo => (
                        // idをキーに設定して削除イベント(todoDeleteHandler)に渡す
                        <li key={todo.id}>
                            {/* 各要素を描画 &nbsp;→スペース*/}
                            <span　className="date">{todo.date} &nbsp;</span>
                            <span>{todo.title} &nbsp;</span>
                            <span>{todo.detail} &nbsp;</span>
                            {/* クリックで削除イベント(todoDeleteHandler)発火 */}
                            <span className="cmd" onClick={() => this.todoDeleteHandler(todo.id)}>[x]</span>
                        </li>
                    ))}
                    {/* ボタン押下でリスト追加画面へリンク */}
                    <Link to="/components/NewTodo" className="link">
                        <button className="confirm">New ToDo</button>
                    </Link>
                </ul>
            </div>
        )
    }
}

export default TodoList;