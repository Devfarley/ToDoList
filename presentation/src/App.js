import React from 'react';
import './App.css';
import CreateList from './CreateList'
import AddTask from './AddTask'

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state={
      lists: []
    }
  };

  getLists = () => {
    const api_url = process.env.REACT_APP_API_URL
    fetch(`${api_url}/todo`)
        .then(response => response.json())
        .then(data => {this.setState({lists:data})})
  }
  componentDidMount(){
    this.getLists();
};

  deleteList = (id) => {
  const api_url = process.env.REACT_APP_API_URL
  fetch(`${api_url}/todo/${id}`, {
      method: "DELETE"
  }).then(response => response.json())
  .then(() => this.getLists())
};

deleteTask = (event) => {
  const api_url = process.env.REACT_APP_API_URL
  const id = event.target.id
  const data = event.target.taskid
  fetch(`${api_url}/todo/${id}`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data)
  }).then(response => response.json())
  .then(() => this.getLists())
};


  render() {
    const displaybutton = this.state.lists.map(ele =><button id={ele._id} taskid={ele.tasks.map((ele, i) => [i])} onClick={this.deleteTask}>X</button>)

    const displayList = this.state.lists.map(ele=> <ul 
      key={ele._id} 
      value={ele.completed}>{ele.list}
    <button onClick={() => this.deleteList(ele._id)}>Delete List</button>
        {ele.tasks.map((ele, i) => <div> <li key={1 + Math.random()}>{ele.task} <button taskid={[i]} onClick={this.deleteTask}>X</button></li> </div>)} 
        <AddTask 
          list={ele.list} 
          task={ele.task} 
          listid={ele._id} 
          refresh={this.getLists}/> 
        </ul>)

    return (
      <div className="App">
      <div>
        <CreateList refresh={this.getLists}/>
      </div>
        <div>
          <div>
            {displayList}
          </div>
      </div>
    </div>
    );
  }
}

export default App;
