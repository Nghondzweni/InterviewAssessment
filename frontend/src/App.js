import './App.css';
import 'axios'
import axios from 'axios';
import { Component } from 'react';
import  Loading  from './Loading';
import './table.scss'
class App extends Component {
  constructor() {
    super();

    this.state = {
        isLoading : true,
        studentData : [],
        error : false
    }
  }

  componentDidMount() {
    this.setState({
      isLoading : true
    })

    axios.get('http://localhost:3000/').then((response) => {
      console.log(response)
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
    });

  }

  render () {
    var {
      isLoading,
      studentData,
      error
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
    else{
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
        </div>
      </div>
    )
  }
}
}

export default App;
