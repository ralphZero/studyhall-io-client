import React, { useEffect, useState } from 'react';

interface Greeting {
  success: boolean;
  result: []
}

function App() {
  const [greeting, setGreeting] = useState<Greeting>();

  useEffect(() => {
    fetch('https://studyhall-io-api.web.app/Feo17UUTHDRzte0spE0V5QbUivE2')
    .then((res: Response): Promise<Greeting> => res.json())
    .then((data) => console.table(data))
  }, []);

  return (
    <div>
      { greeting && greeting.result }
    </div>
  );
}

export default App;
