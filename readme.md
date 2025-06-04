# 🛠️ Mini CRM Backend – Xeno SDE Internship Assignment

This is the **backend** for the Mini CRM Platform, responsible for secure data ingestion, user authentication via Google, audience segmentation, campaign creation, delivery simulation, and logging. It also includes a **publisher-subscriber** architecture for decoupled processing of large CSV uploads.


## 🧠 Core Responsibilities

- Secure REST APIs for data ingestion and campaign management.
- Authentication using Google OAuth 2.0.
- Rule-based audience segmentation logic.
- Pub-Sub architecture for asynchronous CSV processing.
- Communication logging and dummy campaign delivery.
- AI integration for campaign message suggestions (via frontend proxy).

---

## ✅ Features

### 🔐 Authentication
- Google OAuth 2.0 token verification using Google API.
- Middleware to restrict access to protected endpoints.

### 📥 Data Ingestion
- CSV upload APIs for **customers** and **orders**.
- Data is **validated**, then **published** to a Redis Stream.
- A **subscriber (worker)** listens to the stream and inserts records into MongoDB.

### 📦 Publisher-Subscriber Architecture

| Component      | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| API Layer      | Receives CSV uploads, parses and validates entries, pushes them to a stream |
| Redis Stream   | Stores validated CSV records asynchronously                                 |
| Worker         | Continuously listens to the stream, consumes records, and persists in DB    |
| MongoDB        | Stores customer and order collections                                       |

💡 **Why this architecture?**  
Improves responsiveness of API layer and allows batch/background processing of heavy uploads.

### 📊 Segment Rule Engine
- Supports rule conditions like:  
  `spend > 10000 AND visits < 3`  
- Dynamically filters customer collection based on defined rules.

### 📤 Campaign APIs
- Create campaign with name, message, intent, and segment rule.
- Link to matching customers.
- Simulate message delivery to each customer using a **dummy vendor API**.

### 📄 Communication Logs
- Track per-customer campaign delivery attempts.
- Store logs with campaignId, customerId, status (`sent`, `failed`), and timestamp.

### 🔁 Delivery Receipt API
- Dummy external vendor API sends callbacks to `/api/receipt`.
- Delivery status is updated in `communication_log` accordingly.

---

## 🧱 Tech Stack

| Layer             | Technology                        |
|------------------|------------------------------------|
| Runtime           | Node.js                           |
| Framework         | Express.js                        |
| Language          | JavaScript                        |
| Database          | MongoDB + Mongoose                |
| Authentication    | Google OAuth 2.0                  |
| Pub-Sub           | Redis Streams                     |
---

## 🧬 Data Models

### 🧑 Customer
```js
userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: String,

    location: String,

    customer_external_id: { 
        type: String, 
        index: true, 
        sparse: true 
    },
    spend: {
        type: Number,
        default: 0,
        min: 0
    },

    visits: {
        type: Number,
        default: 0,
        min: 0
    },

    lastActive: {
        type: Date,
        default: Date.now
    }

```
## 📦 Order
```js
customer_external_id: {
        type: String, 
        ref: 'Customer', 
        required: true 
    },
    userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
         required: true 
        }, 
    amount: {
        type: Number, 
        required: true 
    },
    items: [String],

    orderDate: { 
        type: Date, 
        required: true 
    },
    order_external_id: { // if of the external order 
        type: String, 
        index: true, 
        sparse: true 
    }
```
## 📜 SegmentRule
```js
serId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    rule : {
        type : String,
        required : true,
    }

```
## 📣 Campaign
```js
userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    intent: { 
        type: String 
    },
    rule: { 
        type : String
    },
    audienceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }], 
    audienceSize : {
        type : Number,
    },
    
    status: { 
        type: String, 
        enum: ['draft', 'sent', 'error'], 
        default: 'draft' 
    },
    sentAt: Date,
```
## ## 📄 CommunicationLog
```js
campaignId: mongoose.Types.ObjectId,
  customerId: mongoose.Types.ObjectId,
  message: String,
  status: { type: String, enum: ['SENT', 'FAILED','PENDING'], default: 'PENDING' },
```

## 📦 Endpoints Overview
👤 Auth
POST /api/v1/user/oauth – Google OAuth login

📥 Data Upload
POST /api/v1/upload/customers – Upload customers CSV

POST /api/v1/upload/orders – Upload orders CSV

🧠 Segment Rules
POST /api/v1/segment – Create rule

GET /api/v1/segment – List rules

📣 Campaigns
POST /api/v1/compaigns – Create campaign

GET /api/v1/compaigns/getCompaign – List campaigns



📥 Receipt
POST /api/v1/deliveryReceipt – Callback API to log delivery from dummy vendor


## 🚀 Getting Started

## Prerequisites
- Node.js v18+

- MongoDB (local or Atlas)

- Redis (for pub-sub)

- Google Cloud OAuth credentials

## Environment variable setup
Create .env file in root:
```
CLIENT_ID = 

CLIENT_SECRET = 

DB_URL = 


JWT_SECRET =

JWT_TIMEOUT = 

GEMINI_API_KEY = 

```


## 🔨 Install Dependencies
```
npm install
```

### Run the server
```
npm start
```
And also do not forget to run the worker of orders and customers


### 🔁 Pub-Sub Flow (Redis Stream)
    A[CSV Upload via API] --> B[Validate & Publish to Redis Stream]
    B --> C[Subscriber Worker Listens to Stream]
    C --> D[Insert Validated Data into MongoDB]
Publisher: 
Uses Redis XADD to enqueue data to csv_ingestion_stream.

Subscriber:
Uses XREADGROUP to read stream entries and insert to MongoDB in batches.

