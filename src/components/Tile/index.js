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
      callout,
      isExclusive,
      redeemCount,
      expiry,
    } = this.props;

    return (
      <div key={key} className="Tile">
        <img className="img" src={this.getImageSrc(img, imgOptions)} />
        <div className="content">
          <div className="header">
            <h2 className="merchant-name">{merchantName}</h2>
            <p className="callout">{callout}</p>
          </div>
          <p className="title">
            {title}
          </p>
          <div className="footer">
            <button className="link">See Code</button>
            <p className="statistics">
              Expires {this.formatDate(expiry)}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Tile;
