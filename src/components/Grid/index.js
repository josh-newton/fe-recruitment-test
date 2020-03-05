import { h, render, Component } from 'preact';

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      data: 'Grid Component'
    }
  }

  componentDidMount() {}

  render() {
    const { data } = this.state;
    return (
      <div className="Grid">
        <p>{ data }</p>
      </div>
    );
  }
}

export default Grid;
