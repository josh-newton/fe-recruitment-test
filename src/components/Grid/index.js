import { h, render, Component } from 'preact';
import './index.scss';

const POPULAR_URL = '/offers/popular';
const HEADERS = { headers: { 'X-ApiKey': 'letmein!' } };


class Grid extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      isLoaded: false,
      error: null,
      offers: null
    }
  }

  componentDidMount() {
    fetch(POPULAR_URL, HEADERS)
      .then(response => response.json())
      .then((data) => this.setState({ data: data, isLoaded: true, offers: data.offers }))
      .catch((error) => this.setState({ error: error }));
  }

  render() {
    const { data, offers, isLoaded, error } = this.state;
    console.log(data);

    // Something went wrong
    if (error !== null) {
      return (
        <p>Error loading grid data: { error }</p>
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
      <div className="Grid">
      {offers.map( (item, index) =>
        <div key={index} className="grid-item">
          <img className="img" src={item.offerMedia[1].mediaUrl.replace(/{{options}}/g, 'w_250,')}/>
          <div className="content">
            <div className="left">
              <h2 className="merchant">{item.merchant.merchantName}</h2>
              <p className="title">
                {
                  item.isExclusive &&
                  <span className="exclusive">Groupon Exclusive: </span>
                }
                {item.offerTitle}
              </p>
              <p className="stats">
                <span className="redemptionCount">{item.offerStatistics.redemptionCount7Day}</span> used | Expires&nbsp;
                <span className="Expiry">{new Date(item.expiryDateTime).getDate()}/{new Date(item.expiryDateTime).getMonth()}/{new Date(item.expiryDateTime).getFullYear()}</span>
              </p>
            </div>
            <div className="right">
              <img className="merchant-logo" src={item.merchant.merchantMedia[0].mediaUrl.replace(/{{options}}/g, 'w_75,')} />
              <button>See Code</button>
            </div>
          </div>
        </div>
      )}
      </div>
    );
  }
}

export default Grid;
