# 🥤 Shake App

A modern and user-friendly **Shake Management Application** built with **Next.js, React, Supabase, and TanStack Query**. This application allows users to create, view, update, and delete shake recipes with ratings.

## ✨ Features

- ➕ **Create Shakes:** Add new shake recipes with a title, preparation method, and rating.
- 📋 **View Shakes:** Display all available shakes in an organized card layout.
- ✏️ **Edit Shakes:** Update existing shake details.
- 🗑️ **Delete Shakes:** Remove shakes with a confirmation dialog.
- ⭐ **Rating System:** Rate shakes from 1 to 5 stars.
- ✅ **Form Validation:** Validate form inputs using React Hook Form and Yup.
- ⚡ **Optimized Data Fetching:** Manage server state using TanStack Query.
- ☁️ **Cloud Database:** Store and manage shake data using Supabase.
- 📱 **Responsive UI:** User-friendly interface with responsive layouts.
- 🔄 **Loading & Error States:** Display loading indicators and error messages during API operations.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ Next.js | React framework for application development |
| ⚛️ React | Building interactive user interfaces |
| 🟢 Supabase | Backend database and data management |
| 🔄 TanStack Query | Server-state management and data fetching |
| 📝 React Hook Form | Form handling and input management |
| ✅ Yup | Form validation |
| 🎨 Tailwind CSS | Styling and responsive layouts |
| 💎 Material UI | UI components and dialogs |
| 🧩 TypeScript | Type safety and better development experience |
| 🔘 shadcn/ui | Reusable UI components |

## 📸 Application Features

### 🥤 Create Shake
Add a new shake by entering:
- Title
- Preparation Method
- Rating (1–5)

### 📋 Show All Shakes
- View all saved shake recipes.
- Display shake titles, preparation methods, and ratings.
- Navigate to edit or delete individual shakes.

### ✏️ Edit Shake
- Fetch existing shake details using its ID.
- Modify the title, preparation method, and rating.
- Save updated information to Supabase.

### 🗑️ Delete Shake
- Delete unwanted shake recipes.
- Confirm deletion through a confirmation dialog.
- Automatically refresh the shake list after deletion.

## 📂 Project Structure

```text
shake-app/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── showshakes/
│   │   └── editshake/
│   │
│   ├── components/
│   │   └── ui/
│   │
│   ├── config/
│   │   └── supabaseClient.ts
│   │
│   └── types/
│       └── types.ts
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

*Note: The structure above is illustrative. Adjust it to match your actual project folders and routes.*

## 🚀 Getting Started

Follow these instructions to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/DoraemonTrisha/Shake-App.git
```

### 2. Navigate to the Project Directory

```bash
cd Shake-App
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Supabase

Create a project on [Supabase](https://supabase.com/).

Create a table named `shakes` with the following columns:

| Column | Type | Description |
|---|---|---|
| id | int8 | Primary key, auto-generated |
| title | text | Shake name |
| method | text | Preparation method |
| rating | int4 | Rating between 1 and 5 |

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project's API settings.

**Important:** Never expose your Supabase service role key in client-side code. Enable appropriate Row Level Security (RLS) policies for your database.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Important Dependencies

Install the main dependencies if they are not already included:

```bash
npm install @supabase/supabase-js
npm install @tanstack/react-query
npm install react-hook-form yup @hookform/resolvers
npm install @mui/material @emotion/react @emotion/styled
npm install @heroicons/react
```

## 🔄 TanStack Query Implementation

TanStack Query is used to manage server-side data operations.

- `useQuery()` – Fetch all shakes from Supabase.
- `useMutation()` – Create, update, and delete shake records.
- `useQueryClient()` – Invalidate and refresh cached shake data after mutations.

## 🗄️ Database Integration

Supabase is used as the backend database.

The application performs the following database operations:

- `INSERT` – Create a new shake.
- `SELECT` – Retrieve shake records.
- `UPDATE` – Modify existing shake details.
- `DELETE` – Remove shake records.

## 📝 Form Validation

React Hook Form manages form state and submission, while Yup provides validation rules.

Validation includes:

- Title is required.
- Method is required.
- Rating is required.
- Rating must be between 1 and 5.

## 🎯 Future Improvements

- 🔐 User authentication and authorization.
- 🖼️ Upload and display shake images using Supabase Storage.
- 🔍 Search and filter shakes.
- ⭐ Advanced rating and review functionality.
- 📊 Dashboard with shake statistics.

## 👩‍💻 Author

**Trisha Dutta**

- GitHub: [@DoraemonTrisha](https://github.com/DoraemonTrisha)

## 📄 License

This project is open-source and available for learning and personal development.

---

⭐ If you like this project, consider giving it a star on GitHub!
