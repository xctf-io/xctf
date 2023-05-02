import React, { FC } from 'react';

interface Props {
  error: string | null;
}

const MyComponent: FC<Props> = ({ error }) => {
  return (
    <div className="my-4">
      {error && (
        <div>
          <h4>There was a problem</h4>
          {error}
        </div>
      )}
    </div>
  );
};

export default MyComponent;