# 🛒 Smart Cart

Smart Cart is a modern e-commerce application that enhances the shopping experience with features like real-time location tracking, voice input, smart navigation, and intuitive design.

Designed with a clean MVVM architecture following SOLID principles, promoting separation of concerns, scalability, and testability, along with a native Jetpack Compose–based splash screen (Kotlin) to ensure a smooth and maintainable Android startup experience.

---

## 🚀 Features

* 🗺️ **Map Integration** using MapLibre and React Native Maps
* 🎙️ **Voice to Text** capabilities with custom native modules
* 📍 **Real-time Location** using `react-native-community/geolocation` and Geolocation API
* 📦 **Smart Navigation** with React Navigation (stack and bottom tabs)
* 🧠 **Persistent Storage** using AsyncStorage
* 🎨 **Custom UI** using TailwindCSS (`nativewind`), SVGs, gradients, and Lottie animations
* 📡 **API Integration** using Axios and Supabase
* ✅ **Permissions Handling** with `react-native-permissions`
* 🧪 **Testing Ready** with Jest
* 🧹 **Code Quality** enforced with ESLint and Prettier
* ⚙️ **Splash Screen** designed using **Jetpack Compose (Kotlin)**
* 🧩 **Clean MVVM Architecture**

---

## 🧑‍💻 Languages & Frameworks Used

### Frontend (Android App)
- **Jetpack Compose** – Kotlin-based declarative UI framework used specifically for building a modern, animated splash screen
- **React Native** – React JS-based open-source UI framework used for building the main e-commerce UI, navigation, and feature screens (supports TypeScript)

### Backend
- **Fastify.js** – High-performance Node.js web framework for building APIs
- **Flask** – Python micro web framework for building web applications and APIs
- **Scikit-learn** – Open-source Python machine learning library used for smart recommendations
- **SlimPHP** – Lightweight PHP micro framework for quick API development
- **ASP.NET Core** – Open-source modular C# web application framework for building robust backend services
- **Fiber** – Go web framework built on Fasthttp for fast HTTP servers

---

## 🔑 Key Modules and Features

- **Animated Splash Screen** – Built using Jetpack Compose for a smooth startup experience
- **User Authentication** – Secure login and registration using Fastify.js and Supabase
- **Products API Endpoint** – REST API built with Fastify.js serving product data in JSON format
- **Product Browsing & Filtering** – SlimPHP API integration enabling dynamic search and category filters
- **Shopping Cart & Checkout** – Seamless cart management and secure payment workflow using React Native
- **Smart Recommendations** – Personalized suggestions powered by Scikit-learn with Flask, leveraging user interaction data for real-time delivery
- **Notifications** – Product notifications and reminders handled via Fiber in Go
- **User Profile** – Built with React Native for smooth UI and experience
- **Order History** – Backend services built on ASP.NET Core, integrated with React Native via RESTful APIs

**SmartCart GPT powered by CXgenie** is designed to assist users with various aspects of their shopping experience. It specializes in answering questions related to:

- **Cart**: Managing items in the shopping cart, adding or removing products, and checking cart details.  
- **Location**: Providing information about delivery areas, store locations, and tracking shipments.  
- **Payment**: Assisting with payment methods, processing payments, and resolving payment issues.  
- **Order Placing**: Guiding users through the order placement process, confirming orders, and providing order updates.  
---


## 📸 App Screenshots

<table align="center">
  <tr>
    <td><img src="screenshots/1.png" width="250"></td>
    <td><img src="screenshots/2.png" width="250"></td>
    <td><img src="screenshots/3.png" width="250"></td>
  </tr>
  <tr>
    <td><img src="screenshots/4.png" width="250"></td>
    <td><img src="screenshots/5.png" width="250"></td>
    <td><img src="screenshots/6.png" width="250"></td>
  </tr>
  <tr>
    <td><img src="screenshots/7.png" width="250"></td>
    <td><img src="screenshots/8.png" width="250"></td>
    <td><img src="screenshots/9.png" width="250"></td>
  </tr>
  <tr>
    <td><img src="screenshots/10.png" width="250"></td>
    <td><img src="screenshots/11.png" width="250"></td>
    <td><img src="screenshots/12.png" width="250"></td>
  </tr>
  <tr>
    <td><img src="screenshots/13.png" width="250"></td>
    <td><img src="screenshots/14.png" width="250"></td>
    <td><img src="screenshots/15.png" width="250"></td>
  </tr>
  <tr>
    <td><img src="screenshots/16.png" width="250"></td>
    <td><img src="screenshots/17.png" width="250"></td>
    <td><img src="screenshots/18.png" width="250"></td>
  </tr>
  <tr>
    <td><img src="screenshots/19.png" width="250"></td>
    <td><img src="screenshots/20.png" width="250"></td>
    <td><img src="screenshots/21.png" width="250"></td>
  </tr>
</table>





## 📱 Requirements

* **Node.js** ≥ 18
* **Android Studio** (for building Android apps)
* **Java JDK** (Java 17 recommended)
* **Android emulator or physical device**

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```
git clone https://github.com/San2021331091/Smart-Cart.git
cd smartcart
```

### 2. Install dependencies

```
npm install
```

### 3. Run on Android

Make sure your Android emulator is running or your physical device is connected, then run:

```
npm run android
```

### 4. Start development server

```
npm run start
```

---

## 🔒 Environment Setup

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

> Restart the Metro bundler after updating environment variables.

---

## 🧪 Running Tests

```
npm run test
```



## 📦 Tech Stack

* **React Native** 0.79
* **React** 19
* **TypeScript** 5
* **Supabase**
* **TailwindCSS / NativeWind**
* **Jetpack Compose** (Kotlin splash screen)
* **MVVM Architecture**
* **Jest** (unit testing)


---

## 📄 License

This project is licensed under the **MIT License**.

[Download APK](https://drive.google.com/file/d/1DBfzrEo9_UHvtiriwKTGb10v5og6Ipt7/view?usp=sharing)

Backend link: https://github.com/San2021331091/Smart-Cart-Backend.git


