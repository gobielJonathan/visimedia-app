import { node } from "prop-types";
import { createContext, useCallback, useContext, useState } from "react";

const AsideContext = createContext({
  setVisible: (_key, _value) => {},
  visible: {
    menu: false,
    filter: false,
  },
  toggleVisible: (_key) => {},
});

const DEFAULT_VISIBLE = {
  menu: false,
  filter: false,
};

const AsideProvider = ({ children }) => {
  const [visible, _setVisible] = useState(DEFAULT_VISIBLE);

  /**
   * @notes key should only contain menu, filter
   */
  const toggleVisible = useCallback((key) => {
    _setVisible((f) => ({ ...DEFAULT_VISIBLE, [key]: !f[key] }));
  }, []);

  const setVisible = useCallback((key, value) => {
    _setVisible((f) => ({ ...f, [key]: value }));
  }, []);

  return (
    <AsideContext.Provider
      value={{
        visible,
        setVisible,
        toggleVisible,
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

AsideProvider.propTypes = {
  children: node.isRequired,
};

export default AsideProvider;

export const useAside = () => useContext(AsideContext);
