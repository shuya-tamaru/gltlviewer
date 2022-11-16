import { useState } from 'react';

function useCurrentView() {
  const [currentView, setCurrentView] = useState<boolean>(true);

  return { currentView, setCurrentView };
}

export default useCurrentView;
