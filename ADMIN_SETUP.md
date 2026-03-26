# How to Access User Management in Dashboard

## Issue
The "Manage Users" tab doesn't appear in the dashboard navigation because you're logged in as a regular user. Only **admin** users can access user management features.

---

## Solution: Make Your User an Admin

### Option 1: Using the Helper Script (Recommended)

If you already have a user account that you want to promote to admin:

```bash
# Navigate to backend directory
cd backend

# Run the helper script with your email
node scripts/make-admin.js your@email.com
```

Example:
```bash
node scripts/make-admin.js john@company.com
```

Then logout and log back in. The "Manage Users" tab should now appear.

---

### Option 2: Using ADMIN_REGISTRATION_SECRET

Register a new admin account during registration:

1. **Set Environment Variable** (in `backend/.env`):
   ```
   ADMIN_REGISTRATION_SECRET=your_secure_secret_key
   ```

2. **Register as Admin**:
   - Go to Login page
   - Use the Register page (if available) OR use the API endpoint directly
   - Enter email, username, and password
   - In the "Admin Secret" field, enter the secret you set above
   - If correct, you'll be registered as an admin

3. **Login** with your new admin account

---

### Option 3: Direct Database Update

If you have database access:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

Then logout and log back in.

---

## Verify Admin Access

After promoting a user to admin:

1. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for console messages:
     - `Current user: {...}`
     - `User role: admin`
     - `Is admin? true`

2. **Check UI**:
   - You should see:
     - "Manage Users" link in the navbar
     - "Admin" badge next to your username
     - User management button in Dashboard Quick Actions

---

## User Management Features (Admin Only)

Once you're an admin, you can:

- ✅ View all users (ID, username, email, role, created date)
- ✅ Create new users (set email, username, password, role)
- ✅ Change user roles (user ↔ admin)
- ✅ Delete users
- ✅ Access via `/admin/users` route

---

## Troubleshooting

**"Manage Users" still not showing?**

1. Clear browser cache and localStorage:
   - Open DevTools (F12)
   - Application → Storage → Clear All
   - Reload page

2. Verify in console:
   - You should see `Is admin? true`
   - If `false`, the user role wasn't updated properly

3. Check backend logs:
   - Ensure database update was successful

---

## Default Setup (First Time)

To set up an initial admin account:

1. Create a regular user account via login/register
2. Run: `node scripts/make-admin.js <email>`
3. Logout and login again
4. "Manage Users" will now appear

---

For more help, check `QUICKSTART.md` or `README.md` in the project root.
