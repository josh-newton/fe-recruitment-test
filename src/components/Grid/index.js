import { h, render, Component } from 'preact';

import Tile from '../Tile/';
import Filters from '../Filters/';

import './index.scss';

const POPULAR_URL = '/offers/popular';
const HEADERS = { headers: { 'X-ApiKey': 'letmein!' } };


class Grid extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      isLoaded: false,
      error: false,
      filteredData: null,
      searchVal: '',
      sortVal: 'none'
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }

  componentDidMount() {
    fetch(POPULAR_URL, HEADERS)
      .then(response => response.json())
      .then((data) => {
        console.log('Original', data.offers);
        data = data.offers;
        this.setState({ data: [...data], filteredData: data, isLoaded: true })
      })
      .catch((error) => {
        console.error('Error loading Hero data: ', error);
        this.setState({ error: true })
      });
  }

  onSearchChange(event) {
    this.setState({ searchVal: event.target.value });
    this.filterBySearch(event.target.value);
  }

  onSortChange(event) {
    this.setState({ sortVal: event.target.value });
    this.sortItems(event.target.value);
    this.filterBySearch()
  }

  filterBySearch(query) {
    const { data, filteredData, sortVal } = this.state;
    // Ensure query is not empty
    if (query === '') {
      this.setState({ filteredData: [...data] });
      return;
    } else if(query === undefined) {
      return;
    }
    // Convert query to uppercase so we can ignore case when searching
    query = query.toUpperCase();
    let filtered = data.filter( item => item.merchant.merchantName.toUpperCase().match(query));
    this.setState({ filteredData: filtered });
  }

  sortItems(sort) {
    const { data, filteredData, searchVal } = this.state;
    switch(sort) {
      case 'none':
        this.setState({ filteredData: [...data] });
        this.filterBySearch(searchVal);
        break;
      case 'recent':
        this.setState({ filteredData: filteredData.sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()) });
        break;
      default:
        this.setState({ filteredData: [...data] });
        this.filterBySearch(searchVal);
    }
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
          searchVal={searchVal}
          sortVal={sortVal}
          onSearchChange={this.onSearchChange}
          onSortChange={this.onSortChange}
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
