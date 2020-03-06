import { h, render, Component } from 'preact';

import Tile from '../Tile/';
import './index.scss';

const HERO_URL = '/offers/category';
const HEADERS = { headers: { 'X-ApiKey': 'letmein!' } };


class Hero extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      isLoaded: false,
      error: false
    }
  }

  componentDidMount() {
    fetch(HERO_URL, HEADERS)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        data = data.category.premiumOffers[0];
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
      return ( <p>Loading hero data...</p> );
    }

    // Everything is working...
    return (
      <div className="Hero">
        <Tile
          key={ data.offerId }
          merchantName={ data.merchant.merchantName }
          merchantLogo={ data.merchant.merchantMedia[0].mediaUrl }
          img={ data.offerMedia[1].mediaUrl }
          imgOptions=""
          title={ data.offerTitle }
          callout={ data.calloutValue }
          isExclusive={ data.isExclusive }
          redeemCount={ data.offerStatistics.redemptionCount7Day }
          expiry={ data.expiryDateTime }
        />

      </div>
    );
  }
}

export default Hero;
