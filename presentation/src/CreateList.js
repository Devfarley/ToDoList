import React from 'react';


 class CreateList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: "",
            tasks: [],
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.setState({
                [event.target.name]: event.target.value
            }
        )
        
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const {...data} = this.state
        const api_url = process.env.REACT_APP_API_URL
        fetch(`${api_url}/todo`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        }).then(() => this.setState({ list: ""}))
        .then(this.props.refresh)
    }
    render(){
        return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <h1>Create New List</h1>
                <label htmlFor="listName">List Name: </label>
                <input type="text" name='list' id="listName" value={this.state.list} onChange={this.handleChange}/>
                <input type="submit" value="submit" />
            </form>
        </div>
        );
    }
}

export default CreateList;