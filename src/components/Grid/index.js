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
      filteredData: null
    }

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    fetch(POPULAR_URL, HEADERS)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        data = data.offers;
        this.setState({ data: data, filteredData: data, isLoaded: true })
      })
      .catch((error) => {
        console.error('Error loading Hero data: ', error);
        this.setState({ error: true })
      });
  }

  onSearchChange(event) {
    this.filterBySearch(event.target.value);
  }

  filterBySearch(query) {
    // Ensure query is not empty
    if (query === '') {
      this.setState({ filteredData: this.state.data });
      return;
    }
    // Convert query to uppercase so we can ignore case when searching
    query = query.toUpperCase();
    this.setState({ filteredData: this.state.data.filter( item => item.merchant.merchantName.toUpperCase().match(query)) });
  }

  render() {
    const { filteredData, isLoaded, error, searchVal } = this.state;

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
          onSearchChange={this.onSearchChange}
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
