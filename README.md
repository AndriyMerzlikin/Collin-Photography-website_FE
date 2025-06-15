# ![Logo](public/logo-peacture.jpg)

> **Platform for viewing and purchasing copyrighted photos.**
> Allows users to watch & buy copyrighted photos, made by Collin

# Description

**Collin Photography** is a platform which allows users to view and choose photos for any taste, exclusively author's production with the ability to purchase them.

---

# 📌 Table of Contents

- [📋 Prerequisites](#-prerequisites)
- [⚙️ Installation Guide & Configuration](#-installation-guide--configuration)
- [📂 Directory Structure](#-directory-structure)
- [🌿 Branch Convention](#-branch-convention)

---

## 📋 Prerequisites

Before installing, make sure you have the following components installed
:

- [Node.js](https://nodejs.org/en/download) (v22.14.0 LTS)
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/) or [`npm`](https://www.npmjs.com/)
- [Next.js](https://nextjs.org/)

---

## ⚙️ Installation Guide & Configuration

### 1️⃣ **Cloning the repository**

```sh
  git clone https://github.com/AndriyMerzlikin/Collin-Photography-website_FE.git
  cd collin-photography-website
```

### 2️⃣ **Setting up Node.js version with NVM**

We use **Node.js v22.14.0 LTS** in this project. To ensure compatibility, we recommend using **NVM (Node Version Manager)**.

#### 🔍 Check if NVM is installed:

```sh
  nvm --version
```

If the command is not found, install NVM:

- **Windows:** [Download nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
- **Mac/Linux:** Follow the installation guide [here](https://github.com/nvm-sh/nvm#installing-and-updating)

#### ⚡ Use the correct Node.js version:

```sh
  nvm install 22.14.0
  nvm use 22.14.0
```

### 3️⃣ **Installing dependencies**

```sh
  npm install   # or yarn install
```

### 4️⃣ **Starting the local server**

```sh
  npm run dev   # or yarn dev
```

📌 **By default, the server will start on:** `http://localhost:3000`

### 5️⃣ **Other scripts to run**

- Build the project for production:

  ```sh
  npm run build   # or yarn build
  ```

- Start the production server:

  ```sh
  npm start   # or yarn start
  ```

- Lint the project to check for code style issues:

  ```sh
  npm run lint    # or yarn lint
  ```

- Format the code automatically using Prettier:

  ```sh
  npm run prettier:write    # or yarn prettier:write
  ```

---

## 📂 Directory Structure

```
fe-sniff/
├── public/             # Static files (pictures, icons)
├── src/
│   ├── app/            # App Router
│   ├── components/     # UI-components
│   ├── theme/          # Theme configuration (styles, color palettes, typography)
├── .env.example        # Environment variables configuration file
├── .gitignore          # Git files and folders to ignore
├── eslint.config.mjs   # Configuration file for ESLint
├── next.config.ts      # Configuration file for Next.js
├── next-env.d.ts       # TypeScript declaration file for Next.js
├── package.json        # Dependencies and scripts
├── package-lock.json   # Locks exact versions of installed dependencies
├── README.md           # Documentation
├── tsconfig.json       # Configuration file for TypeScript
```

---

## 🌿 Branch Convention

📌 We follow **Git Flow**:

- `main` → Main stable branch
- `feature/branch-name` → Branches for new features
- `fix/branch-name` → Branches for bug fixes

📌 **Example of branch names:**

- `feature/add-registrer-form`
- `fix/login-bug`

---
