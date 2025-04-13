# 🔗 Link Shortener

A minimal, dark-themed URL shortener with click tracking, expiration handling, and beautiful UI — built using **ExpressJS + MongoDB** for the backend, and **Next.js (App Router)** for the frontend.

---

## ✨ Features

- ✅ Shorten any long URL in one click
- 📊 Track click count for each short link
- 🕒 Handle expired links gracefully
- ❌ Custom 404 and Expired pages
- 🌙 Beautiful **dark mode** design (black & white)
- 📱 Fully responsive UI for mobile and desktop
- ⚡ Redirect via `/go/:code` routes using Next.js dynamic routing

---

## ⚙️ Tech Stack

### 🧠 Backend
- Node.js + ExpressJS
- MongoDB (Mongoose ORM)
- RESTful API
- URL expiration logic
- Click count tracking

### 🎨 Frontend
- React (Next.js 14, App Router)
- TailwindCSS
- Axios for API calls
- Loader animations & error handling

---

## 🚀 How It Works

1. Paste your long URL
2. Click "Shorten"
3. Get a short link like `https://yourdomain.com/go/abc123`
4. Each visit updates the click count
5. If the link is expired or not found, the user is redirected to a custom error page

---

## 👨🏻‍💻 Author

**Backend** by [@saidnurmuhammadulloxon](https://t.me/saidnurmuhammadulloxon)  
**Frontend** and open-source UI by the community

---

## 📸 Screenshot

<table>
  <tr>
    <td><img src="https://i.imgur.com/mtKMXtU.png" width="100%" /></td>
    <td><img src="https://i.imgur.com/vgktOR7.png" width="100%" /></td>
  </tr>
  <tr>
    <td><img src="https://i.imgur.com/ZtjqzTi.png" width="100%" /></td>
    <td><img src="https://i.imgur.com/lWQjYJZ.png" width="100%" /></td>
  </tr>
</table>
