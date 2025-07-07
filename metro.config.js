const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Get default config
const config = getDefaultConfig(__dirname);

// Add cjs support to sourceExts
config.resolver.sourceExts.push('cjs');

module.exports = withNativeWind(config, { input: "./styles/Styles.css" });
