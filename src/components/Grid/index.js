import { h, render, Component } from 'preact';

// Components
import Tile from '../Tile/';
import Filters from '../Filters/';

// Styles
import './index.scss';

// Setup globals
const POPULAR_URL = '/offers/popular';
const HEADERS = { headers: { 'X-ApiKey': 'letmein!' } };


class Grid extends Component {

  constructor() {
    super();
    this.state = {
      // will store original data returned from server
      data: null,
      // false while we wait for data to load
      isLoaded: false,
      // if error returned when we try to fetch data
      error: false,
      // List of offers filtered by search and sorted
      filteredData: null,
      // current filter values
      searchVal: '',
      sortVal: 'none'
    }

    // on change events
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }

  componentDidMount() {
    // Grab the data from server
    fetch(POPULAR_URL, HEADERS)
      .then(response => response.json())
      .then((data) => {
        // On success, save the data we need, use spread so to clone data and avoid modifying original
        data = data.offers;
        this.setState({ data: [...data], filteredData: [...data], isLoaded: true })
      })
      .catch((error) => {
        // Output error to console, set error to true so we can display it to user
        console.error('Error loading Grid data: ', error);
        this.setState({ error: true })
      });
  }

  onSearchChange(event) {
    const { sortVal } = this.state;
    this.setState({ searchVal: event.target.value });
    this.filterAndSort(event.target.value, sortVal);
  }

  onSortChange(event) {
    const { searchVal } = this.state;
    this.setState({ sortVal: event.target.value });
    this.filterAndSort(searchVal, event.target.value);
  }

  filterAndSort(search, sort) {
    const { data } = this.state;
    // create store for data without modifying original
    let updated = [...data];
    // Search
    updated = this.filterItems(search, updated);
    // then sort
    updated = this.sortItems(sort, updated);
    // update state
    this.setState({ filteredData: updated });
  }

  filterItems(search, data) {
    if (search !== ''){
      // Convert query to uppercase so we can ignore case when searching
      search = search.toUpperCase();
      data = data.filter( item => item.merchant.merchantName.toUpperCase().match(search));
    }
    return data;
  }

  sortItems(sort, data) {
    switch(sort) {
      case 'none':
        break;
      case 'recent':
        data = data.sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime());
        break;
      default:
        break;
    }
    return data;
  }

  render() {
    const { filteredData, isLoaded, error, searchVal, sortVal } = this.state;

    // Something went wrong, or still loading
    if (error) {
      return ( <p>Something seems to be wrong. Please refresh and try again.</p> );
    } else if (!isLoaded) {
      return ( <p>Loading grid data...</p> );
    }

    // Everything is working...
    return (
      <div className="Grid">

        <Filters
          searchVal={ searchVal }
          sortVal={ sortVal }
          onSearchChange={ this.onSearchChange }
          onSortChange={ this.onSortChange }
        />

        <div className="grid-items">
          {filteredData.length === 0 &&
            <p>Filters returned no results.</p>
          }
          {filteredData.length > 0 && filteredData.map( (item, index) =>
            <Tile
              key={ item.offerId }
              merchantName={ item.merchant.merchantName }
              merchantLogo={ item.merchant.merchantMedia[0].mediaUrl }
              img={ item.offerMedia[1].mediaUrl }
              imgOptions="w_600,"
              title={ item.offerTitle }
              callout={ item.calloutValue }
              isExclusive={ item.isExclusive }
              redeemCount={ item.offerStatistics.redemptionCount7Day }
              expiry={ item.expiryDateTime }
            />
          )}

        </div>
      </div>
    );
  }
}

export default Grid;
