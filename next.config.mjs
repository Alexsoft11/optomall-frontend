/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for development
  reactStrictMode: true,

  // Internationalization
  i18n: {
    locales: ["en", "ru", "uz"],
    defaultLocale: "uz",
  },

  // API Proxy - Forward /api requests to Laravel backend
  // This allows the mobile web app to use the Next.js frontend as a CORS-safe proxy
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },

  // Image Configuration - DISABLED optimization to prevent server cache buildup
  images: {
    // Disable image optimization - prevents caching on server
    unoptimized: true,
    // Remote image patterns (required even when unoptimized)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // Compiler optimizations
  compiler: {
    styledComponents: true,
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // SWC Minification (faster than Terser)
  swcMinify: true,

  // Experimental features for better performance
  experimental: {
    // Optimize package imports - tree-shake large libraries
    optimizePackageImports: [
      "antd",
      "@ant-design/icons",
      "lodash",
      "dayjs",
    ],
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize chunk splitting for faster page loads
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          // Separate vendor chunk for better caching
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          // Separate antd chunk (it's large)
          antd: {
            test: /[\\/]node_modules[\\/](antd|@ant-design|rc-[a-z-]+)[\\/]/,
            name: "antd",
            chunks: "all",
            priority: 20,
          },
          // Common components
          common: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // Transpile packages for compatibility
  transpilePackages: [
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],

  // Production source maps (optional - disable for faster builds)
  productionBrowserSourceMaps: false,

  // Compress responses
  compress: true,

  // Page extensions
  pageExtensions: ["tsx", "ts", "jsx", "js"],

  // Powered by header (disable for security)
  poweredByHeader: false,

  // Generate ETags for caching
  generateEtags: true,
};

export default nextConfig;
