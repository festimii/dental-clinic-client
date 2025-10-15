const React = require("react");

module.exports = {
  BrowserRouter: ({ children }) => React.createElement(React.Fragment, null, children),
  Routes: ({ children }) => React.createElement(React.Fragment, null, children),
  Route: ({ element }) => element,
  Outlet: ({ children }) => React.createElement(React.Fragment, null, children),
  Link: ({ children, to, ...rest }) =>
    React.createElement("a", { href: to, ...rest }, children),
  useLocation: () => ({ pathname: "/" }),
};
