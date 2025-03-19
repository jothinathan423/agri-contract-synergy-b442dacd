
# Contract Farming Backend API

This is the backend API for the Contract Farming Management System.

## Setup Instructions

1. **Install dependencies**:
   ```
   npm install
   ```

2. **Environment Variables**:
   Copy the `.env.example` file to `.env` and update the values:
   ```
   cp .env.example .env
   ```

3. **Start the development server**:
   ```
   npm run dev
   ```

4. **Start the production server**:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:resettoken` - Reset password
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/updatepassword` - Update password
- `PUT /api/auth/updateprofile` - Update user profile

### Contracts
- `GET /api/contracts` - Get all contracts for the logged-in user
- `GET /api/contracts/:id` - Get single contract by ID
- `POST /api/contracts` - Create a new contract
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract
- `POST /api/contracts/:id/sign` - Sign a contract
- `POST /api/contracts/:id/dispute` - Raise a dispute
- `PUT /api/contracts/:id/resolve-dispute` - Resolve a dispute
- `POST /api/contracts/:id/messages` - Add a message to contract
- `POST /api/contracts/:id/documents` - Upload document to contract
- `GET /api/contracts/:id/documents` - Get documents for a contract
- `PUT /api/contracts/:id/delivery` - Update delivery status
- `PUT /api/contracts/:id/complete` - Mark contract as complete
- `GET /api/contracts/statistics` - Get contract statistics

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/farmers` - Get all farmers
- `GET /api/users/buyers` - Get all buyers

### Crops
- `GET /api/crops` - Get all crops
- `GET /api/crops/:id` - Get crop by ID
- `POST /api/crops` - Create a new crop (admin only)
- `PUT /api/crops/:id` - Update crop (admin only)
- `DELETE /api/crops/:id` - Delete crop (admin only)

### Payments
- `GET /api/payments` - Get all payments for the logged-in user
- `GET /api/payments/:id` - Get payment by ID
- `POST /api/payments` - Create a new payment
- `GET /api/payments/contract/:contractId` - Get payments for a contract

## Models

1. **User Model**:
   - Personal details (name, email, etc.)
   - Role (farmer, buyer, admin)
   - Farm details (for farmers)
   - Company details (for buyers)
   - Bank details
   - Verification status

2. **Contract Model**:
   - Contract details (title, description, etc.)
   - Farmer and buyer references
   - Crop, quantity, and price details
   - Status and timeline
   - Payment terms
   - Messages and documents
   - Dispute handling

3. **Crop Model**:
   - Crop details (name, category, etc.)
   - Growing conditions
   - Quality parameters
   - Market information

4. **Payment Model**:
   - Contract reference
   - Amount and status
   - Payment method and details
   - Transaction records
