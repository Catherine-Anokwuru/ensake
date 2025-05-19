
---

### Authentication
The API functionality is written in a utils file (/src/utils/api.ts) and called whenever API functionality is needed.

- On first load, a unique device ID is generated.
- This ID is persisted in localStorage under the key ensake-device-id.
- On subsequent loads, the stored ID is reused to maintain device consistency.
- This header is automatically included in all authenticated API requests.

User login is handled via a POST /login request. On successful authentication:
- A token is stored in localStorage under ensake-token
- The token’s expiry timestamp is saved as ensake-token-expiry
- A "keep me logged in" flag is saved if selected
- On success, user is redirected to the rewards page.

---

### State Management
Valtio and localStorage are used for state management. The user name and email are stored in a Valtio store and updated in localStorage to persist state across reloads.

---

### Session Handling

A custom `useSessionManager()` hook manages:

- Token and expiry are saved in `localStorage` as:
  - `ensake-token`
  - `ensake-token-expiry`
  - `ensake-keep-logged-in`
- Token expiry: token expires after 5 minutes (or 7 days if "Keep me logged in" is set)
- Auto logout on idle: the user is logged out if page is idle for over 5 minutes
- Clears all sensitive data and redirects to the login page on session expiry

NB - This doesn't reflect on rewards page as the token expires after 5 minutes and logs the user out, this is solved if a refresh token is provided from the backend.

---

### Localization setup

This app supports localized routing using Next.js App Router with dynamic segments.
Currently, the app supports:
en – English
de – German
These are configured in the [locale] dynamic route and handled through layout validation.
This is currently implemented only on the login page.
Visiting /en/login renders the login page in English, while /de/login renders the German version.

---

## Environment Variable

NEXT_PUBLIC_BASE_API=https://core-main-lgmkhu.laravel.cloud/assessment

---

## 📦 Installation

```bash
git clone https://github.com/Catherine-Anokwuru/ensake.git
cd ensake
npm install
npm run dev