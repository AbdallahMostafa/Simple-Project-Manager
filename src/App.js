import React, { Component } from 'react';
import uuid from 'uuid';
import Projects from './Components/Project';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import $ from 'jquery'
import './App.css';

class App extends Component {
constructor(){
  super();
  this.state = {
    projects : [],
    todos :[]
  }
}
getTodos(){
  $.ajax({
    url:'https://jsonplaceholder.typicode.com/todos',
    dataType:'json',
    cache:false,
    success: function (data) {
      this.setState({todos : data}, function () {
          console.log(this.state);
      })
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(err);
    }
  })
};
getProjects()
{
  this.setState({
    projects: [
      {
        id:uuid.v4(),
        title: 'Business Website',
        category: 'Web Design',
      },
      {
        id:uuid.v4(),
        title: 'Social App',
        category: 'Mobile Development',
      },
      {
        id:uuid.v4(),
        title: 'E-commerce Shopping Cart',
        category: 'Web Development',
      }
    ]});
}
componentWillMount(){
    this.getProjects();
    this.getTodos();
}
componentDidMount(){
  this.getTodos();
}
handelAddProject(project){
  let projects = this.state.projects;
  projects.push(project);
  this.setState({projects:projects})
}

handelDeleteProject(id){
  let projects = this.state.projects;
  let index = projects.findIndex(x => x.id === id);
  projects.splice(index, 1);
  this.setState({projects:projects});
}
  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handelAddProject.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handelDeleteProject.bind(this)} />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
