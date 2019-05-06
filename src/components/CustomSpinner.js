import React from 'react';

import {Spinner} from 'react-bootstrap'

const CustomSpinner = (props) => {

  return (
    <div id="login-loader">
      <Spinner
        as={props.type || "div"}
        animation={ props.animation ? props.animation : "grow"}
        size={props.size || "sm"}
        role="status"
      />
      <span>{props.msg}</span>
    </div>
  )
}

export default CustomSpinner;
