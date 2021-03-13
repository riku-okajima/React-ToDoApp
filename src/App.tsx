import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

// ルート設定とリンクのみ
function App() {
  return (
    <div className="App">
      <h1>React ToDo App</h1>
      <Router>
        <div className="link">
          {/* リンク to→pathで指定したコンポーネントに遷移 */}
          {/* リスト一覧画面 */}
          <Link to="/components/TodoList" className="link1">TodoList</Link>
          {/* リスト追加画面 */}
          <Link to="/components/NewTodo" className="link2">NewTodo</Link>
        </div>
        {/* Router子要素にSwitch */}
        <Switch>
          {/* Switch子要素にRoute
              exact→path指定を厳密化
              path→URLを指定 
              component→描画したいコンポーネントを設定*/}
          <Route exact={true} path='/components/TodoList' component={TodoList} />
          <Route exact={true} path='/components/NewTodo' component={NewTodo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
