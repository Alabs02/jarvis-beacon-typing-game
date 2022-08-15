import React, { Fragment } from 'react';

const TextAreaField = (props: any) => {
  return (
    <Fragment>
      <textarea {...props}> 
      </textarea>
    </Fragment>
  );
}

export { TextAreaField as default };