import { h, render, Component } from 'preact';
import './index.scss';

const HERO_URL = '//localhost:6060/offers/category';
const HEADERS = { headers: { 'X-ApiKey': 'letmein!' } };


class Hero extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    fetch(HERO_URL, HEADERS)
      .then(response => response.json())
      .then((data) => this.setState({ data: data.category.premiumOffers[0], isLoaded: true }))
      .catch((error) => this.setState({ error: error }));
  }

  render() {
    const { data, isLoaded, error } = this.state;
    const options = 'w_550,';
    let imgSrc;
    if(isLoaded === true){
      imgSrc = data.offerMedia[1].mediaUrl.replace(/{{options}}/g, options);
    } else {
      imgSrc = '';
    }

    console.log(data);

    // Something went wrong
    if (error !== null) {
      return (
        <p>Error loading hero data: { error }</p>
      );
    }
    // Display loading until fetch data has finished
    if (isLoaded === false) {
      return (
        <p>Loading animation here!</p>
      );
    }


    // Everything is working...
    return (
      <div className="Hero">
        <img className="img" src={imgSrc} />
        <div className="content">
          <div className="left">
            <h2 className="merchant">{data.merchant.merchantName}</h2>
            <p className="title">
              {
                data.isExclusive &&
                <span className="exclusive">Groupon Exclusive: </span>
              }
              {data.offerTitle}
            </p>
            <p className="stats">
              <span className="redemptionCount">{data.offerStatistics.redemptionCount7Day}</span> used | Expires&nbsp;
              <span className="Expiry">{new Date(data.expiryDateTime).getDate()}/{new Date(data.expiryDateTime).getMonth()}/{new Date(data.expiryDateTime).getFullYear()}</span>
            </p>
          </div>
          <div className="right">
            <img className="merchant-logo" src={data.merchant.merchantMedia[0].mediaUrl.replace(/{{options}}/g, 'w_75,')} />
            <button>See Code</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
