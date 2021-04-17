import React , { Component } from 'react';
import axios from 'axios';

export default class DeleteTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodoDelete = this.onChangeTodoDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_delete: "No",
            todos: {},
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    onChangeTodoDelete(e) {
        this.setState({
            todo_delete: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.todo_delete === 'Yes') {
            axios.post('http://localhost:4000/todos/delete/'+this.props.match.params.id).then(res => console.log(res.data));
            
            this.props.history.push('/');
        } else {
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3 align="center">Delete Todo</h3>

                <div align="center">Are you sure you want to delete this item?</div>
                <div style={{marginBottom: 30}}>
                Description: {this.state.todos.todo_description}
                <br/>
                Responsible: {this.state.todos.todo_responsible}

                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                                <input  className="form-check-input" 
                                        type="radio" 
                                        name="deleteOptions" 
                                        id="deleteYes" 
                                        value="Yes"
                                        checked={this.state.todo_delete==='Yes'} 
                                        onChange={this.onChangeTodoDelete}
                                        />
                                <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input  className="form-check-input" 
                                        type="radio" 
                                        name="deleteOptions" 
                                        id="deleteNo" 
                                        value="No" 
                                        checked={this.state.todo_delete==='No'} 
                                        onChange={this.onChangeTodoDelete}
                                        />
                                <label className="form-check-label">No</label>
                            </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>

              
            </div>
        )
    }
}