module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/index.scss";`,
      },
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#0077c7",
            "border-color-base": "#ABB5BA",
            "border-radius-base": "4px",
            "font-size-base": "15px",
          },
          javascriptEnabled: true,
        },
      },
    },
  },

  devServer: {
    proxy: "http://localhost:8081",
  },
};
