"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ \"./node_modules/bootstrap/dist/css/bootstrap.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _api_buildClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/buildClient */ \"./api/buildClient.js\");\n/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/header */ \"./components/header.js\");\n\n\n\n\nconst AppComponent = (param)=>{\n    let { Component , pageProps , currentUser  } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                currentUser: currentUser\n            }, void 0, false, {\n                fileName: \"/Users/oladelemoarukhe/Documents/codes/node-js-microservices/ticketing-app/client/pages/_app.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"container\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    currentUser: currentUser,\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/oladelemoarukhe/Documents/codes/node-js-microservices/ticketing-app/client/pages/_app.js\",\n                    lineNumber: 12,\n                    columnNumber: 7\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/oladelemoarukhe/Documents/codes/node-js-microservices/ticketing-app/client/pages/_app.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/oladelemoarukhe/Documents/codes/node-js-microservices/ticketing-app/client/pages/_app.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, undefined);\n};\n_c = AppComponent;\nAppComponent.getInitialProps = async (appContext)=>{\n    const client = (0,_api_buildClient__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(appContext.ctx);\n    const { data  } = await client.get(\"/api/users/currentuser\");\n    let pageProps = {};\n    if (appContext.Component.getInitialProps) {\n        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);\n    }\n    console.log(pageProps);\n    return {\n        pageProps,\n        currentUser: data.currentUser\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppComponent);\nvar _c;\n$RefreshReg$(_c, \"AppComponent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUEwQztBQUNHO0FBQ0g7QUFFMUMsTUFBTUUsZUFBZSxTQUEyQztRQUExQyxFQUFFQyxVQUFTLEVBQUVDLFVBQVMsRUFBRUMsWUFBVyxFQUFFO0lBQ3pELHFCQUNFLDhEQUFDQzs7MEJBQ0MsOERBQUNMLDBEQUFNQTtnQkFBQ0ksYUFBYUE7Ozs7OzswQkFDckIsOERBQUNDO2dCQUFJQyxXQUFVOzBCQUdmLDRFQUFDSjtvQkFBVUUsYUFBYUE7b0JBQWMsR0FBR0QsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJeEQ7S0FYTUY7QUFhTkEsYUFBYU0sZUFBZSxHQUFHLE9BQU9DLGFBQWU7SUFDbkQsTUFBTUMsU0FBU1YsNERBQVdBLENBQUNTLFdBQVdFLEdBQUc7SUFFekMsTUFBTSxFQUFFQyxLQUFJLEVBQUUsR0FBRyxNQUFNRixPQUFPRyxHQUFHLENBQUM7SUFFbEMsSUFBSVQsWUFBWSxDQUFDO0lBRWpCLElBQUlLLFdBQVdOLFNBQVMsQ0FBQ0ssZUFBZSxFQUFFO1FBQ3hDSixZQUFZLE1BQU1LLFdBQVdOLFNBQVMsQ0FBQ0ssZUFBZSxDQUNwREMsV0FBV0UsR0FBRyxFQUNkRCxRQUNBRSxLQUFLUCxXQUFXO0lBRXBCLENBQUM7SUFFRFMsUUFBUUMsR0FBRyxDQUFDWDtJQUVaLE9BQU87UUFDTEE7UUFDQUMsYUFBYU8sS0FBS1AsV0FBVztJQUMvQjtBQUNGO0FBRUEsK0RBQWVILFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcImJvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzXCI7XG5pbXBvcnQgYnVpbGRDbGllbnQgZnJvbSBcIi4uL2FwaS9idWlsZENsaWVudFwiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWFkZXJcIjtcblxuY29uc3QgQXBwQ29tcG9uZW50ID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMsIGN1cnJlbnRVc2VyIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEhlYWRlciBjdXJyZW50VXNlcj17Y3VycmVudFVzZXJ9IC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuXG4gICAgICBcbiAgICAgIDxDb21wb25lbnQgY3VycmVudFVzZXI9e2N1cnJlbnRVc2VyfSB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5BcHBDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKGFwcENvbnRleHQpID0+IHtcbiAgY29uc3QgY2xpZW50ID0gYnVpbGRDbGllbnQoYXBwQ29udGV4dC5jdHgpO1xuXG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgY2xpZW50LmdldChcIi9hcGkvdXNlcnMvY3VycmVudHVzZXJcIik7XG5cbiAgbGV0IHBhZ2VQcm9wcyA9IHt9O1xuXG4gIGlmIChhcHBDb250ZXh0LkNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICBwYWdlUHJvcHMgPSBhd2FpdCBhcHBDb250ZXh0LkNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMoXG4gICAgICBhcHBDb250ZXh0LmN0eCxcbiAgICAgIGNsaWVudCxcbiAgICAgIGRhdGEuY3VycmVudFVzZXJcbiAgICApO1xuICB9XG5cbiAgY29uc29sZS5sb2cocGFnZVByb3BzKTtcblxuICByZXR1cm4ge1xuICAgIHBhZ2VQcm9wcyxcbiAgICBjdXJyZW50VXNlcjogZGF0YS5jdXJyZW50VXNlcixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcENvbXBvbmVudDtcbiJdLCJuYW1lcyI6WyJidWlsZENsaWVudCIsIkhlYWRlciIsIkFwcENvbXBvbmVudCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImN1cnJlbnRVc2VyIiwiZGl2IiwiY2xhc3NOYW1lIiwiZ2V0SW5pdGlhbFByb3BzIiwiYXBwQ29udGV4dCIsImNsaWVudCIsImN0eCIsImRhdGEiLCJnZXQiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n"));

/***/ })

});