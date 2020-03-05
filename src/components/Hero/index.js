import { h, render, Component } from 'preact';
import './index.scss';

const HERO_URL = '/offers/category';
const HEADERS = { headers: { 'X-ApiKey': 'letmein!' } };


class Hero extends Component {

  constructor() {
    super();
    this.state = {
      isLoaded: false,
      error: false,
      merchantName: null,
      merchantLogo: null,
      img: null,
      title: null,
      isExclusive: null,
      redeemCount: null,
      expiry: null,
    }
  }

  componentDidMount() {
    fetch(HERO_URL, HEADERS)
      .then(response => response.json())
      .then((data) => {
        data = data.category.premiumOffers[0];
        this.setState({
          merchantName: data.merchant.merchantName,
          merchantLogo: this.getImageSrc(data.merchant.merchantMedia[0].mediaUrl, 'w_75,'),
          img: this.getImageSrc(data.offerMedia[1].mediaUrl, 'w_550,'),
          title: data.offerTitle,
          isExclusive: data.isExclusive,
          redeemCount: data.offerStatistics.redemptionCount7Day,
          expiry: this.formatDate(data.expiryDateTime),
          isLoaded: true
        })
      })
      .catch((error) => {
        console.error('Error loading Hero data: ', error);
        this.setState({ error: true })
      });
  }

  formatDate(dateString) {
    let date = new Date(dateString);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  }

  getImageSrc(srcString, options) {
    return srcString !== null ? srcString.replace(/{{options}}/g, options) : '';
  }

  render() {
    const {
      isLoaded,
      error,
      merchantName,
      merchantLogo,
      img,
      title,
      isExclusive,
      redeemCount,
      expiry,
    } = this.state;

    // Something went wrong, or still loading
    if (error) {
      return ( <p>Something seems to be wrong. Please refresh and try again.</p> );
    } else if (!isLoaded) {
      return ( <p>Loading...</p> );
    }

    // Everything is working...
    return (
      <div className="Hero">
        <img className="hero-img" src={img} />
        <div className="hero-content">
          <div className="information">
            <h2 className="merchant-name">{merchantName}</h2>
            <p className="hero-title">
              { isExclusive && <span className="exclusive">Groupon Exclusive: </span> }
              {title}
            </p>
            <p className="statistics">
              <span className="redemption-count">{redeemCount}</span> used | Expires&nbsp;
              <span className="expiry">{expiry}</span>
            </p>
          </div>
          <div className="link">
            <img className="merchant-logo" src={merchantLogo} />
            <button>See Code</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
