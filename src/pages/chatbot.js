import React from 'react';
import Link from 'next/link';
import NavigationBar from "@/components/NavigationBar";

const ExampleComponent = () => {
  const iframeStyle = {
    height: 'calc(100vh - 50px)',
    width: '100%',
  };

  return (
    <div className="relative">
      <NavigationBar />
      <iframe 
        src="https://console.dialogflow.com/api-client/demo/embedded/b17d9010-2f94-428b-b6fb-27e8c8fd0c4a"
        style={iframeStyle}
      >
      </iframe>

    </div>
  );
};

export default ExampleComponent;