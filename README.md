# AI Usage Notes

## AI Tools Used

**Development**: Claude, ChatGPT and GitHub Copilot
**Application LLM**: Google Gemini 2.5 Flash

## What I Used AI For

**UI/UX Design**
- Generated Tailwind CSS layouts and component structures
- Created neomorphic design patterns
- I verified: responsive behavior, color schemes, animations

**Component Architecture**
- Suggested React component patterns and state management
- I verified: component hierarchy, hooks usage, edge cases

**Styling**
- Generated Tailwind classes and animations
- I verified: cross-browser compatibility, performance optimization

## What I Verified Myself

- Authentication and security (Clerk integration, protected routes, API key handling)
- Complete data flow testing (frontend to API to database to LLM)
- All error scenarios (network failures, invalid inputs, API limits)
- Performance with large inputs and concurrent requests
- Business logic (5-run limit, 2-workflow rate limit, sequential execution)
- Cross-browser and responsive design testing

## LLM Provider: Google Gemini 2.5 Flash

**Why Gemini?**
- Fast response times for real-time workflow execution
- Cost-effective (free tier, best price-to-performance)
- Good quality for text summarization and extraction
- Simple SDK integration with Next.js

**Considered Alternatives**
- GPT-4: Too expensive, slower
- Claude: More costly for simple text operations
- Local models: Infrastructure overhead

**Implementation Strategy**
Hybrid approach mixing LLM and non-LLM actions:

Non-LLM (fast, free):
- Clean Text: Regex-based
- Sentiment Analysis: Keyword matching

LLM-powered (quality):
- Summarize
- Extract Key Points
- Extract Action Items
- Tag Category

## My Prompts for Gemini

**Summarize:**
```
Summarize the following text clearly and concisely:
[input]
```

**Extract Key Points:**
```
Extract key points from the following text.
Return them as bullet points:
[input]
```

**Extract Action Items:**
```
Extract actionable tasks from the following text.
Return them as a numbered list:
[input]
```

**Tag Category:**
```
Categorize the following text into one short category label.
Only return the category name:
[input]
```
## Notes
I did not blindly copy AI code. Every function was tested and understood before use. AI accelerated development, but all critical sections (auth, security, data flow, error handling) were manually verified. The hybrid LLM approach was my design decision for performance and cost optimization.