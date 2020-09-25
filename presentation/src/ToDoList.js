import React from "react"

export class TodoList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tasks: []
        }
    }
        getTodos = () => {
            const api_url = process.env.REACT_APP_API_URL
            fetch(`${api_url}/todo`)
                .then(response => response.json())
                .then(data => this.setState({tasks:data}))
               
        }

        componentDidMount(){
            this.getTodos();
        }

        render(){
            const display = this.state.tasks.map(ele => <li key={ele._id}>{ele.tasks}</li>)
            console.log(this.state)
            return(
                <ul>
                    {display}
                </ul>
            )
        }
}