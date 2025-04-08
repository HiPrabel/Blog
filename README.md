# 📝 Full-Stack Blog Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)

A feature-rich, full-stack blog platform built with modern web technologies — supporting 

- user authentication

- rich text content creation

- dark mode

- performance optimizations

- cleaner modular architecture


## 🌐 Live Demo

🔗 [Live Site](https://blog-by-prabel.vercel.app/)


## 🚀 Features

- 🧑‍💻 **User Authentication** (Sign Up, Sign In, Logout)
- 📝 **Rich Text Editor** using **TinyMCE** — supports:
  - Headings, bold, italic, underline
  - Text/background colors
  - Bullet lists, number lists
  - Text alignment, font size
- 🌙 **Dark Mode** toggle
- 🧩 **Protected Routes** for authenticated users
- 🔒 **Secure form handling** and file uploads
- ⚡ **Performance optimized** with lazy loading, image compression, and memoization
- 🎯 **Preloading** critical assets for faster load times


## 🧠 Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | React, Vite, TailwindCSS      |
| State Mgmt  | Redux                         |
| Rich Editor | TinyMCE                       |
| Backend     | Appwrite (Cloud-hosted)       |
| Deployment  | Vercel                        |

## Performance - Light House Report

![LightHouse Report](https://github.com/user-attachments/assets/22754b99-308c-4757-86f5-2a2ae1ffbf67)

## 📂 Project Structure

```
├── public/
├── src/
│ ├── appwrite/
│ ├── components/
│ ├── config/
│ ├── pages/
│ ├── store/ # redux
│ ├── app.css
│ ├── app.jsx
│ ├── index.css
│ └── main.jsx 
├── .env.sample
├── index.html
├── package.json
└── vite.config.json
```

## 🛠️ Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/blog-app.git
   ```
2. Navigate into the project directory:
   ```sh
   cd blog
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```env
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   VITE_TINYMCE_API=your_tinymce_api
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## 📃 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
  ```sh
  git checkout -b your-feature
  git commit -m "Add new feature"
  git push origin your-feature
  ```

## Contact

For questions or support, please reach out at **Prabel Pandey** - [GitHub](https://github.com/HiPrabel) [prabel397@gmail.com]


