import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
        isLoading : true,
        studentData : [],
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
    
  }
}

export default App;
