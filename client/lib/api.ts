/**
 * API Service Layer
 * 
 * This file centralizes ALL backend communication.
 * 
 * ARCHITECTURE DECISION:
 * - Authentication/CRUD → Direct to Supabase (already handled by supabaseClient.ts)
 * - AI/Analytics → Through Python FastAPI
 * 
 * FUTURE IMPROVEMENTS:
 * - Add request caching (react-query)
 * - Add retry logic for failed requests
 * - Add request/response logging
 * - Add authentication headers when needed
 */

// ============================================
// CONFIGURATION
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

// Validate environment variable exists
if (typeof window !== 'undefined' && !API_BASE_URL.startsWith('http')) {
    console.error('❌ Invalid API_BASE_URL. Check your .env.local file!');
}

// ============================================
// TYPES (for TypeScript safety)
// ============================================

export interface Post {
    id: number;
    content: string;
    platform: string;
}

export interface SentimentResult {
    status: string;
    summary: string;
    metrics: {
        average_score: number;
        positive_count: number;
        negative_count: number;
        neutral_count: number;
    };
}


interface Message {
  id: string; // Unique ID is better for React keys than index
    role: Role;
    text: string;
    timestamp: number;
}

// ============================================
// HELPER: Generic Fetch Wrapper
// ============================================

/**
 * Wraps fetch() with error handling and JSON parsing
 * FUTURE: Add retry logic, timeout handling, request cancellation
 */
async function apiFetch<T>(
    endpoint: string, 
    options: RequestInit = {}
): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            // FUTURE: Parse error details from response body
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        // FUTURE: Send errors to logging service (Sentry, LogRocket)
        console.error('API Error:', error);
        throw error;
    }
}

// ============================================
// API ENDPOINTS (Organized by feature)
// ============================================

export const api = {
    /**
     * POSTS API
     * Handles social media post data
     * 
     * FUTURE:
     * - Add pagination (limit, offset)
     * - Add filtering by platform
     * - Add search functionality
     */
    posts: {
        /**
         * Fetch all posts from backend
         * 
         * WHEN TO USE: Dashboard, Analytics page
         * ALTERNATIVE: Fetch directly from Supabase for real-time updates
         */
        getAll: async (): Promise<Post[]> => {
            return apiFetch<Post[]>('/api/posts');
        },

        /**
         * FUTURE: Add CRUD operations
         * create: async (data) => apiFetch('/api/posts', { method: 'POST', body: JSON.stringify(data) })
         * update: async (id, data) => apiFetch(`/api/posts/${id}`, { method: 'PUT', ... })
         * delete: async (id) => apiFetch(`/api/posts/${id}`, { method: 'DELETE' })
         */
    },

    /**
     * SENTIMENT ANALYSIS API
     * Uses VADER sentiment analysis from Python backend
     * 
     * WHEN TO USE: Analytics page, individual post analysis
     * PERFORMANCE: ~10ms per text, so batch requests when possible
     */
    sentiment: {
        /**
         * Analyze sentiment of multiple texts
         * 
         * @param texts - Array of strings to analyze
         * @returns Sentiment metrics and summary
         * 
         * FUTURE IMPROVEMENTS:
         * - Add caching (same texts = same result)
         * - Add progress tracking for large batches
         * - Support streaming results for real-time feedback
         */
        analyze: async (texts: string[]): Promise<SentimentResult> => {
            return apiFetch<SentimentResult>('/api/analyze-sentiment', {
                method: 'POST',
                body: JSON.stringify({ texts }),
            });
        },
    },

    /**
     * AI CHAT API
     * Connects to Google Gemini for conversational AI
     * 
     * WHEN TO USE: AI Assistant page
     * PERFORMANCE: ~2-5 seconds per response (network dependent)
     */
    ai: {
        /**
         * Send message to AI assistant
         * 
         * @param message - User's question/prompt
         * @returns AI-generated response
         * 
         * FUTURE IMPROVEMENTS:
         * - Add conversation history context
         * - Stream responses word-by-word (better UX)
         * - Add system prompts for personality customization
         * - Implement rate limiting (user can't spam)
         */
        chat: async (message: string): Promise<ChatResponse> => {
            return apiFetch<ChatResponse>('/api/ai/chat', {
                method: 'POST',
                body: JSON.stringify({ message }),
            });
        },

        /**
         * FUTURE: Add specialized AI functions
         * generateCaption: async (imageUrl) => ...
         * suggestHashtags: async (content) => ...
         * analyzeCompetitors: async (handles) => ...
         */
    },

    /**
     * ANALYTICS API
     * Generates performance reports and metrics
     * 
     * WHEN TO USE: Analytics dashboard, scheduled reports
     */
    report: {
        /**
         * Get performance report for all posts
         * 
         * RETURNS: Aggregate metrics (total likes, views, top post)
         * 
         * FUTURE IMPROVEMENTS:
         * - Add date range filtering
         * - Add platform-specific reports
         * - Cache reports (5-minute TTL)
         * - Export to PDF/CSV
         */
        get: async (): Promise<PerformanceReport> => {
            return apiFetch<PerformanceReport>('/api/report');
        },
    },

    /**
     * HEALTH CHECK
     * Verify backend is reachable
     * 
     * WHEN TO USE: App startup, status page
     */
    health: {
        check: async (): Promise<{ status: string; message: string }> => {
            return apiFetch('/');
        },
    },
};

/**
 * FUTURE ENHANCEMENTS TO ADD:
 * 
 * 1. REQUEST INTERCEPTORS
 *    - Add JWT tokens to headers automatically
 *    - Log all requests for debugging
 * 
 * 2. RESPONSE INTERCEPTORS
 *    - Handle 401 (redirect to login)
 *    - Refresh expired tokens
 * 
 * 3. CACHING LAYER
 *    - Use react-query or SWR
 *    - Cache GET requests for 5 minutes
 * 
 * 4. WEBSOCKETS
 *    - Real-time notifications
 *    - Live analytics updates
 * 
 * 5. OFFLINE SUPPORT
 *    - Queue requests when offline
 *    - Sync when connection restored
 */