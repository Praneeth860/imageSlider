import React from "react";

function Img({ src, alt, className, style }) {
  return <img src={src} className={className} alt={alt} style={style} />;
}

export default Img;
