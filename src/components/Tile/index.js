import { h, render, Component } from 'preact';

import './index.scss';


class Tile extends Component {

  constructor(props) {
    super(props);
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
      key,
      merchantName,
      merchantLogo,
      img,
      imgOptions,
      title,
      isExclusive,
      redeemCount,
      expiry,
    } = this.props;

    return (
      <div key={key} className="Tile">
        <img className="img" src={this.getImageSrc(img, imgOptions)} />
        <div className="content">
          <div className="information">
            <h2 className="merchant-name">{merchantName}</h2>
            <p className="title">
              { isExclusive && <span className="exclusive">Groupon Exclusive: </span> }
              {title}
            </p>
            <p className="statistics">
              <span className="redemption-count">{redeemCount}</span> used | Expires&nbsp;
              <span className="expiry">{this.formatDate(expiry)}</span>
            </p>
          </div>
          <div className="link">
            <img className="merchant-logo" src={this.getImageSrc(merchantLogo, 'w_75,')} />
            <button>See Code</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Tile;
