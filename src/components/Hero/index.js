import { h, render, Component } from 'preact';

class Hero extends Component {

  constructor() {
    super();
    this.state = {
      data: 'Hero Component'
    }
  }

  componentDidMount() {}

  render() {
    const { data } = this.state;
    return (
      <div className="Hero">
        <p>{ data }</p>
      </div>
    );
  }
}

export default Hero;
