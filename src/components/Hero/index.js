import { h, render, Component } from 'preact';

const HERO_URL = '//localhost:6060/offers/category';
const HEADERS = { headers: { 'X-ApiKey': 'letmein!' } };


class Hero extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    fetch(HERO_URL, HEADERS)
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
        <p>Error loading hero data: { error }</p>
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
      <div className="Hero">
        <p>Hero Component</p>
      </div>
    );
  }
}

export default Hero;
