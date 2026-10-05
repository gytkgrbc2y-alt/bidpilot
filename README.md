# BidPilot MVP

A first sellable prototype for an AI RFP/tender analysis product.

## Run it

1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Put a Gemini API key in `GEMINI_API_KEY`.
4. Run:
   npm install
   npm start
5. Open http://localhost:3000

## Product direction

Target customer: small IT/service businesses that respond to RFPs but cannot justify $10k-$30k/year enterprise tooling.

Initial offer:
- Free: 1 analysis
- Pro: $149/mo
- Growth: $399/mo
- Team: $599/mo

The MVP currently proves the core workflow: RFP text + company context -> requirements, risks, readiness score and bid brief.

## Next build milestones

1. PDF/DOCX ingestion
2. Persistent company knowledge base
3. Citation/source tracking
4. Compliance matrix
5. Full response drafting
6. Word export
7. Stripe subscriptions
8. Usage limits
9. Team accounts
10. RFP opportunity feed / alerts

Revenue target math:
- $149/mo: 672 customers = ~$100k MRR
- $399/mo: 251 customers = ~$100k MRR
- $599/mo: 167 customers = ~$100k MRR

This is a target, not a guarantee.
