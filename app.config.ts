export default {
  "expo": {
    "name": "MiniStrava",
    "slug": "MiniStrava",
    "version": "1.0.1",
    "scheme": "MiniStrava",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      [
        "expo-build-properties",
        {
          "android": {
            "usesCleartextTraffic": true
          }
        }
      ],
      "expo-sqlite"
    ],
    "experiments": {
      "typedRoutes": true,
      "tsconfigPaths": true
    },
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0b0d12"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "pl.mrrgroup.ministrava",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0b0d12"
      }
    },
    "extra": {
      "apiBaseUrl": process.env.API_BASE_URL,
    }
  }
}
