# Selah — Scripture & Worship

A Firebase Spark-plan-safe MVP for worship-song recommendations from selected Bible verses.

## Deliberate no-cost limits

- Uses Firebase Authentication and Cloud Firestore only.
- Does **not** use Cloud Functions, Cloud Run, Firebase Extensions, phone authentication, or Firebase Storage.
- CSV import is parsed in the browser and its rows are written as Firestore drafts after staff review. Firebase Storage currently requires the pay-as-you-go Blaze plan, so it cannot be used under the no-billing requirement.
- No music-provider API keys or lyric scraping are included. The starter catalog links outward to public pages.

## Local setup

1. Install Node.js 22+.
2. Copy `.env.example` to `.env.local` and fill in a Firebase web-app configuration. Leave it empty to run the designed local demo.
3. Run `npm install`, then `npm run dev`.
4. Create a Firestore database in production mode and deploy rules/indexes with `firebase deploy --only firestore`.

## Firebase setup

Enable Anonymous Authentication for reader saves and Google Authentication for staff. To grant staff access, create a `staff/{uid}` document manually in Firestore with `role: "editor"`, `"publisher"`, or `"admin"`. The rules intentionally prevent clients from assigning roles.

The current UI contains a local catalog fallback so it can be reviewed before Firebase is configured.
