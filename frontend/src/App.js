import './App.css';
import 'axios'
import axios from 'axios';
import { Component } from 'react';
import  Loading  from './Loading';
import './table.scss'

// function App() {
//   axios.get('http://localhost:3000/student').then((response) => {
//     console.log(response);
//   });
//   return (
//     <div className="App">
//       <header className="App-header">
        
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor() {
    super();

    this.state = {
        isLoading : true,
        studentData : [],
        sortby : "student_id",
        direction : "asc",
        error : false
    }
  }

  componentDidMount() {
    this.setState({
      isLoading : true
    })

    axios.get('http://localhost:3000/').then((response) => {
      if(response.data.success === true){
        this.setState({
          studentData : response.data.data,
          isLoading : false
        })
      } else {
        this.setState({
          error : true,
          isLoading : false
        })
      }
    })
    .catch(error => {
      this.setState({
        error : true,
        isLoading : false
      })
    });
  }

  handleSortChange = (e) => {
    this.setState({
      sortby : e.target.value
    })
  }

  handleDirectionChange = (e) => {
    this.setState({
      direction : e.target.value
    })
  }


  render() {
    var {
      isLoading,
      studentData,
      sortby,
      error,
      direction
    } = this.state;
    
    if(isLoading){
      return (
        <div className="pageContainer">
             <div className="loginContainer">
                  <Loading />
             </div>
        </div>
      );
    }
    else if (error === true) {
      return(
        <div className="pageContainer">
        <div className="loginContainer">
             <h1>There was a problem retrieving some of the student data, Please try again ...</h1>
        </div>
        </div>
      )
    }
    else {
      if(sortby === "student_id"){
        if(direction === "asc")
          studentData.sort((a, b) => (a.student_id > b.student_id) ? 1 : -1)
        else
          studentData.sort((a, b) => (a.student_id > b.student_id) ? -1 : 1)

      }
      else if(sortby === "name"){
        if(direction === "asc")
          studentData.sort((a, b) => (a.name > b.name) ? 1 : -1)
        else
          studentData.sort((a, b) => (a.name > b.name) ? -1 : 1)

      }
      else if(sortby === "university"){
        if(direction === "asc")
          studentData.sort((a, b) => (a.university > b.university) ? 1 : -1)
        else
          studentData.sort((a, b) => (a.university > b.university) ? -1 : 1)

      }
      else if(sortby === "mark"){
        if(direction === "asc")
          studentData.sort((a, b) => (a.mark > b.mark) ? 1 : -1)
        else
          studentData.sort((a, b) => (a.mark > b.mark) ? -1 : 1)

      }

      return(
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1>Registree Interview Assessment</h1>
            <table class="table-latitude">
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>University</th>
                    <th>Mark</th>
                </tr>
                </thead>
              <tbody>
                  {
                      studentData.map((entry) => (
                          <tr key={entry}>
                              <td>{entry.student_id}</td>
                              <td>{entry.name}</td>
                              <td>{entry.university}</td>
                              <td>{entry.mark}</td>
                              <td/>
                          </tr>
                      ))
                  }
              </tbody>
              </table>
            </div>
          </div>
          <div>
            Sort By :     
          <select 
                value={this.state.sortby} 
                onChange={this.handleSortChange} 
              >
              <option value="student_id">StudentID</option>
                <option value="name">Name</option>
                <option value="university">University</option>
                <option value="mark">Mark</option>
          </select>
          </div>
          <div>
            Direction :     
          <select 
                value={this.state.direction} 
                onChange={this.handleDirectionChange} 
              >
              <option value="asc">Ascending</option>
                <option value="desc">Descending</option>

          </select>
          </div>
        </div>
      )
    }
  }
}

export default App;
