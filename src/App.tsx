import React, { useEffect, useState } from 'react';

interface Greeting {
  message: string;
}

function App() {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    fetch('https://studyhall-io-api.web.app/')
    .then((res: Response): Promise<Greeting> => res.json())
    .then((data) => setGreeting(data.message))
  }, []);

  return (
    <div>
      { greeting }
    </div>
  );
}

export default App;
