import React from 'react';
import Link from 'next/link';

const ExampleComponent = () => {
  const iframeStyle = {
    height: 'calc(100vh - 50px)',
    width: '100%',
  };

  return (
    <div className="relative">
      <Link href="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-5 mt-4 ml-4">
          Back
      </Link>

      <iframe 
        src="https://console.dialogflow.com/api-client/demo/embedded/b17d9010-2f94-428b-b6fb-27e8c8fd0c4a"
        style={iframeStyle}
      >
      </iframe>

    </div>
  );
};

export default ExampleComponent;