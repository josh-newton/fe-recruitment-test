import { h, render, Component } from 'preact';

import Tile from '../Tile/';
import './index.scss';

const POPULAR_URL = '/offers/popular';
const HEADERS = { headers: { 'X-ApiKey': 'letmein!' } };


class Grid extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      isLoaded: false,
      error: false
    }
  }

  componentDidMount() {
    fetch(POPULAR_URL, HEADERS)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        data = data.offers;
        this.setState({ data: data, isLoaded: true })
      })
      .catch((error) => {
        console.error('Error loading Hero data: ', error);
        this.setState({ error: true })
      });
  }

  render() {
    const { data, isLoaded, error } = this.state;

    // Something went wrong, or still loading
    if (error) {
      return ( <p>Something seems to be wrong. Please refresh and try again.</p> );
    } else if (!isLoaded) {
      return ( <p>Loading grid data...</p> );
    }

    // Everything is working...
    return (
      <div className="Grid">
      {data.map( (item, index) =>
        <Tile
          key={item.offerId}
          merchantName={item.merchant.merchantName}
          merchantLogo={item.merchant.merchantMedia[0].mediaUrl}
          img={item.offerMedia[1].mediaUrl}
          imgOptions="h_250,"
          title={item.offerTitle}
          callout={item.calloutValue}
          isExclusive={item.isExclusive}
          redeemCount={item.offerStatistics.redemptionCount7Day}
          expiry={item.expiryDateTime}
        />
      )}
      </div>
    );
  }
}

export default Grid;
