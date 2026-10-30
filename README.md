# Doctor Tracker

A responsive doctor and patient management application designed to help administrators manage doctors, organize patient records, and monitor healthcare activities from one centralized dashboard. Doctor Tracker provides a clean, user-friendly interface with responsive navigation, doctor management, patient record management, and secure authentication for efficient administration across desktop and mobile devices.

## Live Demo

- **Frontend:** https://doctor-tracker-client-seven.vercel.app/
- **Backend:** https://doctor-tracker-server-ten.vercel.app/


## Features

- Responsive design for desktop, tablet, and mobile devices.
- Secure authentication with email/password and Google login.
- Admin dashboard for managing doctors and patients.
- View and manage doctor records.
- Create and manage patient records.
- Update and delete patient information.
- Filter patient records by doctor.
- RESTful API integration.
- MongoDB database integration.
- JWT-based API authentication.
- Clean and user-friendly interface.
- Separate frontend and backend architecture.

## Technology Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Better Auth
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- JOSE (JWT/JWKS verification)
- CORS
- dotenv

## Screenshots

### Desktop View

https://drive.google.com/file/d/1talmhDEpN5DfJf_EcxXPFJKvMsYmP3HB/view?usp=sharing

### Mobile View

https://drive.google.com/file/d/1DC3r8i4og-sIja_r-NTP3NhBYLeSn_cO/view?usp=sharing

## Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account or local MongoDB
- Google OAuth credentials (for Google login)

### 1. Clone the repositories

Clone the frontend and backend repositories separately.

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
git clone <YOUR_BACKEND_REPOSITORY_URL>
```

### 2. Install dependencies

Frontend:

```bash
cd doctor-tracker-client
npm install
```

Backend:

```bash
cd doctor-tracker-server
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

### 4. Configure Frontend Environment Variables

Create a `.env.local` file in the frontend root directory.

```env
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Note:** Use the exact environment variable names referenced in your source code. Never commit real credentials or secret keys to GitHub.

### 5. Run the Backend

```bash
npm run dev
```

Backend server:

```
http://localhost:5000
```

### 6. Run the Frontend

Open another terminal:

```bash
npm run dev
```

Frontend application:

```
http://localhost:3000
```

## Environment Example Files

Create a `.env.example` file in both repositories.

**Backend .env.example**

```env
PORT=5000
MONGODB_URI=
CLIENT_URL=http://localhost:3000
```

**Frontend .env.example**

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Only include variables actually used by your application.

## System Architecture

Doctor Tracker follows a separate frontend and backend architecture.

```text
             Administrator
                   |
                   v
          Next.js Frontend
                   |
          Authentication
                   |
              Better Auth
                   |
             API Requests
            (Bearer Token)
                   |
                   v
             Express.js API
                   |
             JWT Verification
               (JOSE/JWKS)
                   |
                   v
                MongoDB
                   |
          -------------------
          |        |        |
        Users   Doctors  Patients
```

### Data Flow

1. The administrator accesses the Next.js frontend.
2. Users authenticate through Better Auth.
3. The frontend sends API requests with a Bearer token.
4. The Express backend verifies the JWT using JOSE and JWKS.
5. The backend communicates with MongoDB.
6. MongoDB returns the requested records.
7. The backend sends JSON responses to the frontend.
8. The frontend displays the updated information.

## Database Collections

The application uses MongoDB for data storage.

| Collection | Description |
|---|---|
| user | Stores user authentication information. |
| DoctorCollection | Stores doctor information. |
| PatientCollection | Stores patient information and doctor relationships. |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Server welcome response |
| GET | /health | Health check |
| GET | /api/Doctors | Get all doctors |
| POST | /api/Doctors | Add a doctor |
| GET | /api/Patiens | Get all patients |
| POST | /api/Patiens | Add a patient |
| PATCH | /api/Patiens/:id | Update a patient |
| DELETE | /api/Patiens/:id | Delete a patient |

**Note:** The current patient API route is spelled `Patiens`. Keep the frontend and backend route names consistent.

## Technical Decisions

### 1. Separate Frontend and Backend Architecture

**Decision:** Next.js is used for the frontend, while Express.js handles backend API operations.

**Why this approach?**

- Separation of concerns makes the application easier to maintain.
- Frontend and backend can be developed independently.
- Backend APIs can be reused by other applications.
- Independent deployment makes scaling and debugging easier.
- Database operations remain separated from UI components.

**Trade-off:** Separate deployments require proper CORS configuration and environment variable management.

### 2. JWT Authentication with JWKS

**Decision:** The backend uses JOSE to verify JWT tokens through the authentication provider's JWKS endpoint.

**Why this approach?**

- Protects API endpoints from unauthorized access.
- Allows the backend to verify signed tokens independently.
- Avoids sharing private signing keys between frontend and backend.
- Supports independently deployed frontend and backend applications.
- Provides a consistent authentication verification mechanism.

**Trade-off:** Authentication URLs, token configuration, and JWKS settings must be correctly configured in production.

## Deployment

The application is deployed using Vercel.

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Vercel |
| Database | MongoDB |

### Production URLs

- Frontend: https://doctor-tracker-client-seven.vercel.app
- Backend: https://doctor-tracker-server-ten.vercel.app

Make sure all production environment variables are configured in Vercel before deployment.

## Future Improvements

- Advanced search and filtering.
- Pagination for large datasets.
- Role-based access control.
- Improved form validation.
- Automated testing.
- Enhanced analytics and reporting.
- Better loading and error handling.

## Author

**Symun Hossain Shifat**

- GitHub: https://github.com/Symun-Hossain-Shifat
- LinkedIn: https://linkedin.com/in/symun-hossain-shifat-35612338b
- Portfolio: https://my-portofolio-with-next-js.vercel.app

---

If you have any suggestions or find an issue, feel free to open an issue in the repository.

**Thank you for checking out Doctor Tracker!**
