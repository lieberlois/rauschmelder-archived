import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/variables.css';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { CurrentUserProvider } from './CurrentUserProvider';
import { AuthRouting } from './AuthRouting';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <IonApp>
      <CurrentUserProvider>
        <BrowserRouter>
          <Sidebar />
          <IonSplitPane contentId="main">
            <IonRouterOutlet id="main">
              <AuthRouting />
            </IonRouterOutlet>
          </IonSplitPane>
        </BrowserRouter>
      </CurrentUserProvider>
    </IonApp>
  );
};

export default App;
