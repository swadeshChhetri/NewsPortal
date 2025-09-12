# 📰 NewsPortal

A full-stack web application designed to deliver and manage news articles efficiently.  
The project includes both a **React frontend** and a **Laravel backend**, providing a seamless experience for both readers and administrators.  

---

## 🚀 Features

### User Side
- Browse news across categories.
- Highlighted daily articles with slider.
- Search news by keywords.
- Read article details and post comments (requires login).
- Register & Login with email and password.
- Subscribe with email to receive important updates.
- Fully responsive UI with smooth loaders and skeleton screens.
- Secure logout functionality.

### Admin Side
- Secure login for admins (register allowed for testing).
- Dashboard with statistics:
  - Total News
  - Published News
  - Draft News
  - Categories
- Latest 5 news articles and recent comments.
- **Manage News**: Add, edit, delete, and filter articles.
- **Manage Categories**: Add new categories or filter existing ones.
- **Manage Media** (in progress): Upload and manage videos.
- Logout option.

---

## 🛠️ Technology Stack

**Frontend:**
- React  
- TailwindCSS  
- Toaster Notifications  

**Backend:**
- Laravel 12  
- Sanctum Authentication  
- MySQL Database  

**Deployment:**
- AWS EC2 (Backend)  
- AWS S3 (Frontend hosting)  

**Other Tools:**
- Postman (API testing)  
- GitHub (Version Control)  

---

## 📂 Project Structure

```
NewsPortal/
│
├── frontend/        # React + TailwindCSS
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/         # Laravel + MySQL
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── composer.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/newsportal.git
cd newsportal
```

### 2. Setup Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

- Configure your `.env` file with **MySQL database credentials**.
- Run migrations:
```bash
php artisan migrate
php artisan serve
```

### 3. Setup Frontend (React)
```bash
cd frontend
npm install
npm start
```

---

## 📸 Screenshots

### User Side
- Homepage with News Highlights  
- Category-wise browsing  
- Article details with comments  

### Admin Side
- Dashboard with statistics  
- Manage News & Categories  
- Media upload (coming soon)  

---

## 📌 Roadmap
- [ ] Add bulk upload option for news.  
- [ ] Complete Media Management module.  
- [ ] Add dark mode support.  
- [ ] Deploy CI/CD pipelines with GitHub Actions.  

---

## 🙌 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.  

---

## 📜 License
This project is licensed under the **MIT License**.  

---

## 💡 Author
👤 **Swadesh Chhetri**  
- GitHub: [@SwadeshChhetri](https://github.com/SwadeshChhetri)  
- LinkedIn: www.linkedin.com/in/swadeshchhetri 
- Portfolio: [[Your Portfolio Link]](https://swadeshportfolio.vercel.app/)  

---
