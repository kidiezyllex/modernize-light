/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    // TODO: Consider enabling modularizeImports for material when https://github.com/mui/material-ui/issues/36218 is resolved
    // '@mui/material': {
    //   transform: '@mui/material/{{member}}',
    // },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        "@mui": {
          test: /[\\/]node_modules[\\/](@mui)[\\/]/,
          name: "@mui",
          priority: 10,
          reuseExistingChunk: true,
        },
      };
    }
    return config;
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
