import propTypes from 'prop-types';
import { ErrorProvider } from './errorContext';
import { I18nProvider } from './i18nContext';
import { ThemeProvider } from './themeContext';
import { BeaconProvider } from './beaconContext';
import { KolibriProvider } from './kolibriContext';
import { PushProvider } from './pushContext';
import { ModalProvider } from './modalContext';

const AppContextProvider = ({ children }) => {
  return (
    <ModalProvider>
      <ErrorProvider>
        <ThemeProvider>
          <I18nProvider>
            <BeaconProvider>
              <KolibriProvider>
                <PushProvider>{children}</PushProvider>
              </KolibriProvider>
            </BeaconProvider>
          </I18nProvider>
        </ThemeProvider>
      </ErrorProvider>
    </ModalProvider>
  );
};

export default AppContextProvider;

AppContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};
