import { h, render, Component } from 'preact';

import './index.scss';


class Tile extends Component {

  constructor(props) {
    super(props);
  }

  // Utility - Returns date string from server in d/m/yyyy format
  formatDate(dateString) {
    let date = new Date(dateString);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  }

  // Utility - Replaces {{options}} part of image url with options string
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
      <div key={ key } className="Tile">

        <div
          className="img"
          style={ 'background-image: url("' + this.getImageSrc(img, imgOptions) + '");' }>

          <div className="logo">
            <img
              className="merchant-logo"
              src={ this.getImageSrc(merchantLogo, 'w_75,') } />
          </div>

        </div>

        <div className="offer-details">

          <div className="header">
            <h2 className="merchant-name">{ merchantName }</h2>
            <p className="callout">{ callout }</p>
          </div>

          <p className="title">{ title }</p>

          <div className="footer">
            <a className="link" href="">See Code</a>
            <p className="statistics">
              Expires { this.formatDate(expiry) }
            </p>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Tile;
