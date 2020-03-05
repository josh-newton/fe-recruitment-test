import { h, render, Component } from 'preact';

const POPULAR_URL = '//localhost:6060/offers/popular';
const HEADERS = { headers: { 'X-ApiKey': 'letmein!' } };


class Grid extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    fetch(POPULAR_URL, HEADERS)
      .then(response => response.json())
      .then((data) => this.setState({ data: data, isLoading: false }))
      .catch((error) => this.setState({ error: error }));
  }

  render() {
    const { data, isLoaded, error } = this.state;
    console.log(data);

    // Something went wrong
    if (error !== null) {
      return (
        <p>Error loading grid data: { error }</p>
      );
    }
    // Display loading until fetch data has finished
    if (isLoaded) {
      return (
        <p>Loading animation here!</p>
      );
    }

    // Everything is working...
    return (
      <div className="Grid">
        <p>Grid Component</p>
      </div>
    );
  }
}

export default Grid;
