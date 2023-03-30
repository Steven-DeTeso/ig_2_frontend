"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/feed";
exports.ids = ["pages/feed"];
exports.modules = {

/***/ "./pages/feed.js":
/*!***********************!*\
  !*** ./pages/feed.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Feed)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_components_MainFeed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/components/MainFeed */ \"./src/components/MainFeed.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_src_components_MainFeed__WEBPACK_IMPORTED_MODULE_1__]);\n_src_components_MainFeed__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nfunction Feed() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_src_components_MainFeed__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n        fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/pages/feed.js\",\n        lineNumber: 4,\n        columnNumber: 10\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9mZWVkLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWtEO0FBRW5DLFNBQVNDLE9BQU87SUFDN0IscUJBQU8sOERBQUNELGdFQUFRQTs7Ozs7QUFDbEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2lnXzJfZnJvbnRlbmQvLi9wYWdlcy9mZWVkLmpzPzEyNmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1haW5GZWVkIGZyb20gXCIuLi9zcmMvY29tcG9uZW50cy9NYWluRmVlZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGZWVkKCkge1xuICByZXR1cm4gPE1haW5GZWVkIC8+O1xufVxuIl0sIm5hbWVzIjpbIk1haW5GZWVkIiwiRmVlZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/feed.js\n");

/***/ }),

/***/ "./src/components/MainFeed.js":
/*!************************************!*\
  !*** ./src/components/MainFeed.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MainFeed)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var _Post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Post */ \"./src/components/Post.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);\naxios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction MainFeed() {\n    const [posts, setPosts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchPosts = async ()=>{\n            try {\n                const response = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"http://localhost:8000/posts/\", {\n                    headers: {\n                        Authorization: `Bearer ${localStorage.getItem(\"token\")}`\n                    }\n                });\n                setPosts(response.data);\n            } catch (error) {\n                console.error(\"Error fetching posts:\", error);\n            }\n        };\n        fetchPosts();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Main feed page.\"\n            }, void 0, false, {\n                fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/src/components/MainFeed.js\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            posts.map((post)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Post__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    post: post\n                }, post.id, false, {\n                    fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/src/components/MainFeed.js\",\n                    lineNumber: 29,\n                    columnNumber: 9\n                }, this))\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/src/components/MainFeed.js\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9NYWluRmVlZC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUN6QjtBQUNBO0FBRVgsU0FBU0ssV0FBVztJQUNqQyxNQUFNLENBQUNDLE9BQU9DLFNBQVMsR0FBR04sK0NBQVFBLENBQUMsRUFBRTtJQUVyQ0MsZ0RBQVNBLENBQUMsSUFBTTtRQUNkLE1BQU1NLGFBQWEsVUFBWTtZQUM3QixJQUFJO2dCQUNGLE1BQU1DLFdBQVcsTUFBTU4saURBQVMsQ0FBQyxnQ0FBZ0M7b0JBQy9EUSxTQUFTO3dCQUNQQyxlQUFlLENBQUMsT0FBTyxFQUFFQyxhQUFhQyxPQUFPLENBQUMsU0FBUyxDQUFDO29CQUMxRDtnQkFDRjtnQkFDQVAsU0FBU0UsU0FBU00sSUFBSTtZQUN4QixFQUFFLE9BQU9DLE9BQU87Z0JBQ2RDLFFBQVFELEtBQUssQ0FBQyx5QkFBeUJBO1lBQ3pDO1FBQ0Y7UUFFQVI7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ1U7OzBCQUNDLDhEQUFDQzswQkFBRzs7Ozs7O1lBQ0hiLE1BQU1jLEdBQUcsQ0FBQyxDQUFDQyxxQkFDViw4REFBQ2pCLDZDQUFJQTtvQkFBZWlCLE1BQU1BO21CQUFmQSxLQUFLQyxFQUFFOzs7Ozs7Ozs7OztBQUkxQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWdfMl9mcm9udGVuZC8uL3NyYy9jb21wb25lbnRzL01haW5GZWVkLmpzPzNhYjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBQb3N0IGZyb20gXCIuL1Bvc3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFpbkZlZWQoKSB7XG4gIGNvbnN0IFtwb3N0cywgc2V0UG9zdHNdID0gdXNlU3RhdGUoW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZmV0Y2hQb3N0cyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KFwiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3Bvc3RzL1wiLCB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIil9YCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0UG9zdHMocmVzcG9uc2UuZGF0YSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgcG9zdHM6XCIsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZmV0Y2hQb3N0cygpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGgxPk1haW4gZmVlZCBwYWdlLjwvaDE+XG4gICAgICB7cG9zdHMubWFwKChwb3N0KSA9PiAoXG4gICAgICAgIDxQb3N0IGtleT17cG9zdC5pZH0gcG9zdD17cG9zdH0gLz5cbiAgICAgICkpfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJheGlvcyIsIlBvc3QiLCJNYWluRmVlZCIsInBvc3RzIiwic2V0UG9zdHMiLCJmZXRjaFBvc3RzIiwicmVzcG9uc2UiLCJnZXQiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJkYXRhIiwiZXJyb3IiLCJjb25zb2xlIiwiZGl2IiwiaDEiLCJtYXAiLCJwb3N0IiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/MainFeed.js\n");

/***/ }),

/***/ "./src/components/Post.js":
/*!********************************!*\
  !*** ./src/components/Post.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Post)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction Post({ post  }) {\n    if (!post.images || !post.images[0] || !post.images[0].signed_image_url) {\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"post-container\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                children: post.author.username\n            }, void 0, false, {\n                fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/src/components/Post.js\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                src: post.images[0].signed_image_url,\n                alt: post.caption,\n                className: \"post-image\"\n            }, void 0, false, {\n                fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/src/components/Post.js\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: post.caption\n            }, void 0, false, {\n                fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/src/components/Post.js\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: [\n                    \"Liked by:\",\n                    \" \",\n                    post.likes.map((like, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {\n                            children: [\n                                like.username,\n                                index !== post.likes.length - 1 && \", \"\n                            ]\n                        }, like.id, true, {\n                            fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/src/components/Post.js\",\n                            lineNumber: 20,\n                            columnNumber: 11\n                        }, this))\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/src/components/Post.js\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/stevendeteso/Desktop/Projects/ig_2_frontend/src/components/Post.js\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9Qb3N0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEwQjtBQUNDO0FBRVosU0FBU0MsS0FBSyxFQUFFQyxLQUFJLEVBQUUsRUFBRTtJQUNyQyxJQUFJLENBQUNBLEtBQUtDLE1BQU0sSUFBSSxDQUFDRCxLQUFLQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUNELEtBQUtDLE1BQU0sQ0FBQyxFQUFFLENBQUNDLGdCQUFnQixFQUFFO1FBQ3ZFLE9BQU8sSUFBSTtJQUNiLENBQUM7SUFDRCxxQkFDRSw4REFBQ0M7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDOzBCQUFJTCxLQUFLTSxNQUFNLENBQUNDLFFBQVE7Ozs7OzswQkFDekIsOERBQUNDO2dCQUNDQyxLQUFLVCxLQUFLQyxNQUFNLENBQUMsRUFBRSxDQUFDQyxnQkFBZ0I7Z0JBQ3BDUSxLQUFLVixLQUFLVyxPQUFPO2dCQUNqQlAsV0FBVTs7Ozs7OzBCQUVaLDhEQUFDUTswQkFBR1osS0FBS1csT0FBTzs7Ozs7OzBCQUNoQiw4REFBQ0M7O29CQUFFO29CQUNTO29CQUNUWixLQUFLYSxLQUFLLENBQUNDLEdBQUcsQ0FBQyxDQUFDQyxNQUFNQyxzQkFDckIsOERBQUNsQix1REFBYzs7Z0NBQ1ppQixLQUFLUixRQUFRO2dDQUNiUyxVQUFVaEIsS0FBS2EsS0FBSyxDQUFDSyxNQUFNLEdBQUcsS0FBSzs7MkJBRmpCSCxLQUFLSSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztBQVF0QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWdfMl9mcm9udGVuZC8uL3NyYy9jb21wb25lbnRzL1Bvc3QuanM/NTkzNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgXCIuL1Bvc3QubW9kdWxlLmNzc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQb3N0KHsgcG9zdCB9KSB7XG4gIGlmICghcG9zdC5pbWFnZXMgfHwgIXBvc3QuaW1hZ2VzWzBdIHx8ICFwb3N0LmltYWdlc1swXS5zaWduZWRfaW1hZ2VfdXJsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3QtY29udGFpbmVyXCI+XG4gICAgICA8aDM+e3Bvc3QuYXV0aG9yLnVzZXJuYW1lfTwvaDM+XG4gICAgICA8aW1nXG4gICAgICAgIHNyYz17cG9zdC5pbWFnZXNbMF0uc2lnbmVkX2ltYWdlX3VybH1cbiAgICAgICAgYWx0PXtwb3N0LmNhcHRpb259XG4gICAgICAgIGNsYXNzTmFtZT1cInBvc3QtaW1hZ2VcIlxuICAgICAgLz5cbiAgICAgIDxwPntwb3N0LmNhcHRpb259PC9wPlxuICAgICAgPHA+XG4gICAgICAgIExpa2VkIGJ5OntcIiBcIn1cbiAgICAgICAge3Bvc3QubGlrZXMubWFwKChsaWtlLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2xpa2UuaWR9PlxuICAgICAgICAgICAge2xpa2UudXNlcm5hbWV9XG4gICAgICAgICAgICB7aW5kZXggIT09IHBvc3QubGlrZXMubGVuZ3RoIC0gMSAmJiBcIiwgXCJ9XG4gICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgKSl9XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJQb3N0IiwicG9zdCIsImltYWdlcyIsInNpZ25lZF9pbWFnZV91cmwiLCJkaXYiLCJjbGFzc05hbWUiLCJoMyIsImF1dGhvciIsInVzZXJuYW1lIiwiaW1nIiwic3JjIiwiYWx0IiwiY2FwdGlvbiIsInAiLCJsaWtlcyIsIm1hcCIsImxpa2UiLCJpbmRleCIsIkZyYWdtZW50IiwibGVuZ3RoIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Post.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/feed.js"));
module.exports = __webpack_exports__;

})();