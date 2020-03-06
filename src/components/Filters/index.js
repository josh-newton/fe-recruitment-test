import { h, render, Component } from 'preact';

import './index.scss';

class Filters extends Component {

  render() {
    const { searchVal, onSearchChange, onSortChange } = this.props;

    return(
      <div className="Filters">
        <div class="date">
          <select onChange={onSortChange}>
            <option value="none" selected="selected">
              Sort by...
            </option>
            <option value="recent">Most recent</option>
          </select>
        </div>
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
