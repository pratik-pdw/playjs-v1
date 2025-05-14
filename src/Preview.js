import React from 'react';

export const Preview = ({ iFrameSrc }) => {
  return (
    <iframe
      style={{ width: '100%', height: '100%' }}
      title="iframe-playjs-runner"
      sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
      allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment;"
      allowtransparency="true"
      allowFullScreen={true}
      src={iFrameSrc}
    />
  );
};
