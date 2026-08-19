# 🧘 Harmoniq — Твій простір. Твої люди. Твоя гармонія.

<p align="center">
  <img src="public/img/hero-section-preview.png" alt="Harmoniq Preview" width="100%">
</p>

---

## 🎯 Про проєкт

📄 **Live Page:** [Переглянути проєкт](https://frontend-project-final-7.vercel.app/)

**Harmoniq** — це сучасний багатосторінковий fullstack вебдодаток для людей, які хочуть знаходити
цікаві статті, відкривати нових авторів та ділитися власним контентом.

Проєкт поєднує можливості контентної платформи та соціальної взаємодії: користувачі можуть
переглядати статті, знаходити авторів, зберігати публікації в закладки, створювати власні статті та
керувати особистим профілем.

Проєкт розроблений із використанням Next.js 15, React, TypeScript та REST API, має публічні та
приватні маршрути, автоматичну авторизацію, роботу із серверними даними та адаптивний інтерфейс для
мобільних, планшетних і десктопних пристроїв.

---

## 🚀 Ключові можливості

- **🔐 Авторизація:** реєстрація, логін, автоматична авторизація та logout.
- **📝 Статті:** перегляд, фільтрація, пагінація та рекомендації.
- **✍️ Створення та редагування статей:** публікація власних статей із зображенням.
- **🔖 Закладки:** додавання та видалення статей зі збережених.
- **👥 Автори:** список авторів та окремі профілі з їхніми статтями.
- **👤 Профіль:** власні та збережені статті авторизованого користувача.
- **📷 Upload:** завантаження аватара та зображень статей.
- **🔔 Notifications:** push/toast-повідомлення про помилки та успішні операції.
- **⏳ Loading states:** індикатори під час асинхронних запитів.
- **📱 Responsive UI:** адаптивний інтерфейс для mobile, tablet та desktop.

---

## 🛠 Використані технології

[![My Skills](https://skillicons.dev/icons?i=js,html,css,git,github,figma,mongodb,nextjs,nodejs,npm,postman,ts,vercel,vscode&theme=light)](https://skillicons.dev)

| Компонент             | Технологія / Бібліотека       |
| :-------------------- | :---------------------------- |
| **Frontend**          | Next.js 15, React, TypeScript |
| **Routing**           | Next.js App Router            |
| **Styling**           | CSS Modules, modern-normalize |
| **Forms**             | Formik, Yup                   |
| **Rich Text Editor**  | Tiptap                        |
| **Server State**      | TanStack Query                |
| **State Management**  | Zustand                       |
| **HTTP**              | Axios, REST API               |
| **Backend**           | Node.js, Express.js           |
| **Database**          | MongoDB, Mongoose             |
| **Authentication**    | Sessions, Cookies, bcrypt     |
| **Validation**        | Joi, Celebrate                |
| **File Upload**       | Multer                        |
| **API Documentation** | Swagger / OpenAPI             |
| **Code Quality**      | Prettier                      |
| **Deployment**        | Vercel / Render               |

---

## 🔙 Backend

[Backend](https://github.com/SerdiukSerhii/project-backend-final-7) реалізований як RESTful API на базі Node.js та Express.js.

**Основний функціонал:**

- реєстрація та авторизація користувачів;
- session-based authentication;
- робота з cookies та сесіями;
- CRUD-операції зі статтями;
- робота з авторами та профілями;
- збереження статей у закладки;
- пагінація та фільтрація;
- завантаження зображень;
- валідація даних через Joi;
- централізована обробка HTTP-помилок;
- документація API через [Swagger / OpenAPI
](https://fs-125-7-back.onrender.com/api-docs).

Дані зберігаються в MongoDB, а взаємодія з базою реалізована через Mongoose.

---

## 📐 Адаптивність та оптимізація

Проєкт реалізований за принципом Mobile First:

**📱 Mobile:** від 320px, адаптивність від 375px.

**📟 Tablet:** від 768px.

**💻 Desktop:** від 1440px.

Для оптимізації використано Server Components, next/image, TanStack Query для кешування серверного
стану та prefetch для динамічних списків.

---

## 👥 Наша Команда

|                                  Аватар                                   | Учасник команди                                       | Роль                |
| :-----------------------------------------------------------------------: | :---------------------------------------------------- | :------------------ |
|  <img src="https://github.com/SerdiukSerhii.png" width="50" height="50">  | [Сергій Сердюк](https://github.com/SerdiukSerhii)     | **Team Lead Fullstack**       |
| <img src="https://github.com/OlhaBorzhynska.png" width="50" height="50">  | [Ольга Боржинська](https://github.com/OlhaBorzhynska) | **Scrum Master**    |
|   <img src="https://github.com/YuliaKozak.png" width="50" height="50">    | [Юлія Козак](https://github.com/YuliaKozak)           | Fullstack Developer |
|   <img src="https://github.com/Alinavinnik.png" width="50" height="50">   | [Аліна Лужняк](https://github.com/Alinavinnik)        | Fullstack Developer |
|   <img src="https://github.com/alrozental.png" width="50" height="50">    | [Аліна Розенталь](https://github.com/alrozental)      | Fullstack Developer |
|     <img src="https://github.com/amlnkk.png" width="50" height="50">      | [Аліна Мельник](https://github.com/amlnkk)            | Fullstack Developer |
|    <img src="https://github.com/Karina-Ll.png" width="50" height="50">    | [Каріна Лубенська](https://github.com/Karina-Ll)      | Fullstack Developer |
|    <img src="https://github.com/Mary1-com.png" width="50" height="50">    | [Марина Віннікова](https://github.com/Mary1-com)      | Fullstack Developer |
|  <img src="https://github.com/Orest-Stetsyk.png" width="50" height="50">  | [Орест Стецик](https://github.com/Orest-Stetsyk)      | Fullstack Developer |
|   <img src="https://github.com/svetlanagim.png" width="50" height="50">   | [Світлана Гіміш](https://github.com/svetlanagim)      | Fullstack Developer |
|  <img src="https://github.com/vakulahelena.png" width="50" height="50">   | [Олена Вакула](https://github.com/vakulahelena)       | Fullstack Developer |
|  <img src="https://github.com/Yuliia-sketch.png" width="50" height="50">  | [Юлія Карнаух](https://github.com/Yuliia-sketch)      | Fullstack Developer |
|  <img src="https://github.com/YuriiOlesich.png" width="50" height="50">   | [Юрій Олесіч](https://github.com/YuriiOlesich)        | Fullstack Developer |
|     <img src="https://github.com/WKGHSN.png" width="50" height="50">      | [Наталія Коростельова](https://github.com/WKGHSN)     | **Team Lead QA**    |
|    <img src="https://github.com/Uliana-87.png" width="50" height="50">    | [Уляна Гвозд](https://github.com/Uliana-87)           | QA                  |
| <img src="https://github.com/bohdanvykhrenko.png" width="50" height="50"> | [Богдан Вихренко](https://github.com/bohdanvykhrenko) | QA                  |

---

## ⚙️ Як запустити проєкт локально

**Клонувати репозиторій:**

```bash
git clone https://github.com/SerdiukSerhii/frontend_project_final_7.git
```

**Встановити залежності:**

```bash
npm install
```

**Запустити режим розробки:**

```bash
npm run dev
```

## ✨ Harmoniq — Find your harmony in community ✨
