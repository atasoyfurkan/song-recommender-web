const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = override(
  fixBabelImports("antd", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
    style: true
  }),
  fixBabelImports("formik-antd", {
    libraryName: "formik-antd",
    style: "css",
    libraryDirectory: "es",
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...getThemeVariables({ dark: true, compact: false }),
      '@primary-color': '#49aa19'
    },
  })
)