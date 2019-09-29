module.exports = api => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        modules: false,
        corejs: 2,
        useBuiltIns: "usage",
      },
    ],
  ];

  const plugins = ["@babel/plugin-syntax-dynamic-import"];

  const env = {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: { node: "current" },
          },
        ],
      ],
    },
  };

  return {
    presets,
    plugins,
    env,
  };
};
