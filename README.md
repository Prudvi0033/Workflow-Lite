# Workflow Builder Lite

A web application for creating and executing text-processing workflows with sequential steps powered by AI.

**Live Demo**: [https://workflow-lite.vercel.app/](https://workflow-lite.vercel.app/)

<img width="1262" height="603" alt="image" src="https://github.com/user-attachments/assets/1c48ae3a-ef7a-422e-a122-fadf27dcb2d5" />


## Overview

Workflow Builder Lite allows users to create custom text-processing workflows with multiple steps. Each workflow can contain up to sequential steps that perform predefined text-processing actions like cleaning text, summarizing, extracting key points, and categorizing content.

### Key Features

- **User Authentication**: Secure login/signup using Clerk
- **Workflow Management**: Create, edit, and delete workflows
- **Sequential Steps**: Add up to multiple steps per workflow with different processing actions
- **Step Types**:
  - Clean Text
  - Summarize
  - Extract Key Points
  - Tag Category
  - Sentiment Analysis
- **Workflow Execution**: Run workflows on input text and see real-time processing
- **Step-by-Step Output**: View the output of each individual step in the workflow
- **Run History**: Track the last 5 workflow executions (*LIMIT 5*)
- **Health Status**: Monitor backend, database, and LLM connection status
- **Responsive Design**: Clean, modern UI with neomorphic design elements

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun
- MongoDB database (MongoDB Atlas recommended)
- Clerk account for authentication
- Google Gemini API key (for AI-powered step processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prudvi0033/Workflow-Lite.git
   cd Workflow-Lite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=clerk_key
   CLERK_SECRET_KEY=clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   MONGOOSE_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_anthropic_api_key
   WEBHOOK_SECRET=clerk_webhook_secret
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Architecture

### Tech Stack

**Full-Stack Framework:**
- Next.js 14 (App Router with API Routes)
- React
- TypeScript/JavaScript
- Tailwind CSS

**Backend (Next.js API Routes):**
- Next.js API Routes (serverless functions)
- MongoDB (Mongoose)
- Google Gemini 2.5 Flash (LLM for text processing)
- Clerk SDK (Auth verification)

**Frontend:**
- React components
- Clerk (Authentication)
- Axios (API calls)
- Lucide Icons

### Project Structure

```
workflow-lite/
├── app/
│   ├── page.tsx              # Home/Dashboard
│   ├── [id]/
│   │   └── page.tsx          # Workflow detail page
│   ├── runs/
│   │   └── page.tsx          # Workflow runs history
│   ├── status/
│   │   └── page.tsx          # Health status page
│   └── api/                  # API Routes (Backend)
│       ├── workflows/
│       │   └── route.ts      # Workflow CRUD operations
│       ├── nodes/
│       │   └── route.ts      # Step/Node operations
│       ├── execute/
│       │   └── route.ts      # Workflow execution
│       └── status/
│           └── route.ts      # Health checks
├── components/               # Reusable UI components
├── lib/
│   ├── db.ts                # MongoDB connection
│   └── models/              # Mongoose schemas
│       ├── User.ts
│       ├── Workflow.ts
│       ├── Step.ts
│       └── WorkflowRun.ts
├── public/
└── README.md
```

## Usage Guide

### Creating a Workflow

1. Click the **"Create Workflow"** button on the dashboard
2. Enter a workflow title
3. Click **"Create"** to save

### Adding Steps

1. Open a workflow by clicking on it
2. Click **"Add Step"** button
3. Enter step title and select step type:
   - **Clean Text**: Removes extra whitespace and formatting
   - **Summarize**: Creates a concise summary
   - **Extract Key Points**: Identifies main points
   - **Tag Category**: Categorizes the content
   - **Sentiment Analysis**: Analyzes emotional tone
4. Click **"Save"** to add the step

### Running a Workflow

1. Open the workflow
2. Click **"View Runs"**
3. Enter your input text in the text area
4. Click **"Execute Workflow"**
5. View the output of each step as it processes

### Viewing Run History

- Navigate to the **"View Runs"** page
- See the last 5 executions with timestamps and results
- Click on any run to view detailed step outputs

### Checking System Health

- Click **"Status"** in the navigation
- View real-time status of:
  - Backend API connection
  - Database connection
  - LLM (Claude API) connection

## Features Implemented

- User authentication (Clerk)
- Create, edit, delete workflows
- Add/edit/delete workflow steps
- 5 different step types for text processing
- Execute workflows on input text
- View individual step outputs
- Run history (last 5 runs with limit)
- Health status monitoring
- Input validation
- Error handling
- Responsive design
- Loading states
- Rate limiting protection (2 workflows per user)

## Known Limitations

- Maximum 5 workflow runs stored per workflow (hard limit)
- Rate limiting: Users can create maximum 2 workflows
- No export/import functionality
- No workflow templates
- No collaborative features
- Step execution is sequential only (no parallel processing)

## Security Features

- Authentication required for all operations
- API keys stored securely in environment variables
- Input validation on both frontend and backend
- Protected API routes with Clerk middleware
- No sensitive data in client-side code

## Author

**Prudvi**

For more information, see [ABOUTME.md](./ABOUTME.md)

## Acknowledgments

- Clerk for authentication infrastructure
- Google for Gemini AI API
- Vercel for hosting platform
- MongoDB Atlas for database hosting

---

Note: This application uses AI to process text. Results may vary based on input quality and context. The LLM provider (Google Gemini 2.5 Flash) was chosen for its speed, cost-effectiveness, and strong text processing capabilities.
