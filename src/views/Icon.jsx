// import f_logo from '../../assets/f_logo.png';

// const f_logo = require('../../assets/f_logo.png')

export const Icon = ({
  width,
  height,
  type,
  values
}) => (
// {/* <div className="docsie-social-share-icons">
// { type == "facebook" ? 
//   <img className="f_logo" src={f_logo} alt="f_logo" />  :  */}
  <svg viewBox="0 0 20 20" width={width} height={height} className={`docsie-icon-${type}`}>
    {(() => {
      switch (type) {
        // case "menu": return <path fill="none" stroke="currentColor"
        //   d={values.expanded ?
        //     "M16 16L4 4m12 0L4 16" :
        //     "M3 4.5h14m-14 5h14m-14 5h14"} />;
        // case "link": return <path fill="none" stroke="currentColor" d="M10.6 12.4l-3 3c-.8.8-1.7.8-2.4 0l-.7-.6c-.7-.7-.7-1.6 0-2.3l3.1-3.1M9.3 7.4l3.1-3.1c.7-.7 1.6-.7 2.3 0l.7.7c.7.7.7 1.6 0 2.3l-3 3M8 11.9l4-4" />;
        // case "searchtop": return <path fill="none" stroke="currentColor" d="M5 12l4-4 4 4M5 9l4-4 4 4m1 5l4 4zm2-5a7 7 0 0 1-7 7 7 7 0 0 1-7-7 7 7 0 0 1 7-7 7 7 0 0 1 7 7z" />;
        // case "left": return <polyline fill="none" stroke="currentColor" points="13 16 7 10 13 4" />;
        // case "right": return <polyline fill="none" stroke="currentColor" points="7 4 13 10 7 16" />;
        // case "search": return <path fill="none" stroke="currentColor" d="M14 14l4 4zm2-5a7 7 0 0 1-7 7 7 7 0 0 1-7-7 7 7 0 0 1 7-7 7 7 0 0 1 7 7z" />;
        case "twitter": return <path className="twitter-svg cls-2" d="M19 4.74a7.587 7.587 0 0 1-2.119.58 3.715 3.715 0 0 0 1.622-2.04 7.331 7.331 0 0 1-2.344.89A3.682 3.682 0 0 0 13.464 3a3.698 3.698 0 0 0-3.596 4.539 10.482 10.482 0 0 1-7.614-3.86c-.318.54-.5 1.181-.5 1.86 0 1.281.651 2.411 1.643 3.071a3.654 3.654 0 0 1-1.674-.461v.04a3.71 3.71 0 0 0 2.963 3.631 4.083 4.083 0 0 1-1.668.06 3.701 3.701 0 0 0 3.451 2.569 7.467 7.467 0 0 1-4.587 1.57 6.44 6.44 0 0 1-.882-.05 10.439 10.439 0 0 0 5.662 1.66c6.792 0 10.508-5.629 10.508-10.5 0-.16-.004-.32-.013-.48A7.533 7.533 0 0 0 19 4.74" />
        case "facebook": return <path className="fb-svg" d="M11 10h2.6l.4-3h-3V5.3c0-.9.2-1.5 1.5-1.5H14V1.1c-.3 0-1-.1-2.1-.1C9.6 1 8 2.4 8 5v2H5.5v3H8v8h3v-8z" />
        // case "x": return <path fill="none" stroke="currentColor" d="M16 16L4 4M16 4L4 16" />;
      }
    })()}
    {/* <div className="svg">

  <a className="twitter-share-button"
    href={this.state.twitterLink}
    data-size="large" target="_blank">
    <svg className="icon-twitter" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path className="cls-2" d="M19 4.74a7.587 7.587 0 0 1-2.119.58 3.715 3.715 0 0 0 1.622-2.04 7.331 7.331 0 0 1-2.344.89A3.682 3.682 0 0 0 13.464 3a3.698 3.698 0 0 0-3.596 4.539 10.482 10.482 0 0 1-7.614-3.86c-.318.54-.5 1.181-.5 1.86 0 1.281.651 2.411 1.643 3.071a3.654 3.654 0 0 1-1.674-.461v.04a3.71 3.71 0 0 0 2.963 3.631 4.083 4.083 0 0 1-1.668.06 3.701 3.701 0 0 0 3.451 2.569 7.467 7.467 0 0 1-4.587 1.57 6.44 6.44 0 0 1-.882-.05 10.439 10.439 0 0 0 5.662 1.66c6.792 0 10.508-5.629 10.508-10.5 0-.16-.004-.32-.013-.48A7.533 7.533 0 0 0 19 4.74" />
    </svg>
  </a>

  <a href={this.state.fbLink} target="_blank"><img className="f_logo" src={f_logo} alt="f_logo" /></a>

  </div> */}
  </svg>
//   }
// </div>
);
Icon.defaultProps = {
  width: 20,
  height: 20
};
