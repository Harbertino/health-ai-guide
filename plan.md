The user wants to improve the application's frontend, focusing on the chatbot logic, landing page, document upload page, and overall app structure for an investor-demo ready appearance.

**Tasks:**

1.  **Refactor `src/pages/SymptomChecker.tsx`:**
    *   Implement a multi-step chatbot flow:
        *   Step 1: Ask for the primary symptom.
        *   Step 2: Ask for age bracket (fetch from `Profile.tsx` or prompt if unavailable).
        *   Step 3: Ask for symptom duration.
    *   Classify the user's situation into one of four categories:
        1.  Self-care guidance.
        2.  Speak to a pharmacist.
        3.  Book a doctor visit.
        4.  Emergency help now.
    *   Ensure all chatbot responses are short, clear, safe, educational, and strictly avoid definitive diagnoses or exact medication prescribing.
    *   Preserve existing UI elements for chat display, user input, and emergency warning card.

2.  **Update `src/pages/LandingPage.tsx`:**
    *   Change the primary call-to-action button to "Start Health Check".
    *   Incorporate elements for a better onboarding flow.
    *   Preserve the existing headline, description, and disclaimer.

3.  **Update `src/pages/DocumentUpload.tsx`:**
    *   Modify the UI text to clearly display "Upload prescription or test result".
    *   Preserve existing upload functionality.

4.  **Implement Global Layout Enhancements:**
    *   Add a persistent footer (likely in `src/App.tsx` or a new layout component) containing links/sections for: Disclaimer, Privacy Policy, and Contact Support.
    *   Enhance spacing, add appropriate icons, and improve mobile responsiveness across the application to achieve an investor-demo look and feel.
    *   Preserve existing navigation links (Home, Start Check, Upload Document, Profile, Privacy).

**Constraints:**
- Do not modify core document summarization functionality.
- Do not alter user profile data fields.
- Adhere to fundamental safety rules (no diagnosis, no dangerous instructions).

**Agent Assignment:**
- `frontend_engineer` will handle all frontend development tasks.
- `generate_images_bulk` tool should be run by `frontend_engineer` before writing any files.
- `Summarizer` agent will be used at the end if needed.
