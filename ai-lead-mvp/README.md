# AI Lead Classifier

A full-stack MVP application that automatically classifies business leads into categories (Sales, Support, Other) using OpenAI's GPT-3.5 Turbo API.

## Features

- **Lead Submission Form**: Simple, responsive form to collect name, email, and message
- **AI Classification**: Automatically classify messages using OpenAI API
- **Dashboard**: View all submitted leads with their classifications
- **SQLite Database**: Persistent storage for all submissions
- **Tailwind CSS**: Modern, responsive UI design

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS

**Backend:**
- Node.js
- Express
- SQLite3
- OpenAI API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (get one at https://platform.openai.com/api-keys)

## Setup & Installation

### 1. Clone and Install Dependencies

```bash
cd ai-lead-mvp
npm install
```

### 2. Create Environment File

Copy `.env.example` to `.env` and add your OpenAI API key:

```bash
cp .env.example .env
```

Edit `.env` and update:

```
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=3001
```

### 3. Build the Frontend

```bash
npm run build
```

## Running the Application

### Option 1: Development Mode (Recommended for testing)

**Terminal 1 - Start the Backend Server:**
```bash
npm run server
```

This starts the Express server on `http://localhost:3001`

**Terminal 2 - Start the Frontend Dev Server:**
```bash
npm run dev
```

This starts Vite dev server (usually on `http://localhost:5173`)

The Vite dev server will proxy API calls to the backend via the configured proxy.

### Option 2: Production Mode

Build and run everything together:

```bash
npm run build
npm run server
```

Then visit `http://localhost:3001` in your browser.

## API Endpoints

### POST /api/submit
Submit a new lead for classification.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your product..."
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your product...",
  "classification": "Sales",
  "created_at": "2024-04-22T12:00:00.000Z"
}
```

### GET /api/dashboard
Retrieve all submitted leads.

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "...",
    "classification": "Sales",
    "created_at": "2024-04-22T12:00:00.000Z"
  },
  ...
]
```

## Project Structure

```
ai-lead-mvp/
├── src/
│   ├── components/
│   │   ├── SubmissionForm.jsx    # Lead submission form
│   │   └── Dashboard.jsx         # Submissions dashboard
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── server.js                     # Express server
├── database.js                   # SQLite operations
├── classifier.js                 # OpenAI integration
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env                          # Environment variables (create this)
└── .env.example                  # Environment template
```

## How It Works

1. **Submit Lead**: User fills out the form with name, email, and message
2. **Backend Processing**: Express server receives the form data
3. **AI Classification**: Message is sent to OpenAI GPT-3.5 Turbo for classification
4. **Database Storage**: Results are stored in SQLite database
5. **Display**: Dashboard shows all submissions with their classifications

## Classification Categories

- **Sales**: Messages about purchasing, pricing, product inquiries, business deals
- **Support**: Technical issues, help requests, complaints, troubleshooting
- **Other**: Messages that don't fit Sales or Support

## Error Handling

The application includes error handling for:
- Missing required fields
- OpenAI API failures (falls back to "Other" classification)
- Database errors
- Network failures

## Notes

- The SQLite database (`leads.db`) is created automatically on first run
- All timestamps are stored in UTC format
- The app uses CORS to allow frontend-backend communication
- Classification failures gracefully fall back to "Other" category

## Future Enhancements

- User authentication
- Export to CSV/JSON
- Advanced filtering and sorting
- Batch classification
- Custom classification categories
- Analytics dashboard
- Email notifications

## License

MIT

## Support

For issues or questions, please check the `.env` configuration and ensure your OpenAI API key is valid.
