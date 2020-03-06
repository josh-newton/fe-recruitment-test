import { h, render, Component } from 'preact';

import './index.scss';

class Filters extends Component {

  render() {
    const { searchVal, onSearchChange } = this.props;

    return(
      <div className="Filters">
        <h3>Filters:</h3>
        <div className="search">
          <label>
            <i class="fas fa-search"></i>
            <input
              type="text"
              value={searchVal}
              onKeyup={onSearchChange}
              placeholder="Search"
            />
          </label>
        </div>
      </div>
    );
  }
}


export default Filters;
