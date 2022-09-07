module.exports = {
  style: {
    postcssOptions: {},
  },
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "fs": false,
          "tls": false,
          "net": false,
          "path": false,
          "zlib": false,
          "http": false,
          "https": false,
          "stream": false,
          "crypto": false,
          "child_process": false,
          "os": false,
        } 
      },
      ignoreWarnings: [{ message: /Failed to parse source map/ }],
    },
  },
};
