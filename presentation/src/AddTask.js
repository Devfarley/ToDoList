import React from 'react'

class AddTask extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tasks: { task:"", completed: Boolean},
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.setState({
                [event.target.name]:{task: event.target.value, completed: false, id:1 + Math.random()}
            }
        )
        
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const {...data} = this.state
        const api_url = process.env.REACT_APP_API_URL
        fetch(`${api_url}/todo/${this.props.listid}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        }).then(() => this.setState({tasks: {}}))
        .then(this.props.refresh)
    }

    render(){
        return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="addTask">Add Task: </label>
                <input type="text"  id="addTask" name="tasks"  value={this.state.tasks.task} onChange={this.handleChange}/>
                <input type="submit" value="submit" />
            </form>
        </div>
        );
    }
}

export default AddTask;