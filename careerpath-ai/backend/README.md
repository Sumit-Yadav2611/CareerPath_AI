# CareerPath AI — Backend Services & Database

This folder houses the server-side architecture, database models, and service layer powering **CareerPath AI**.

## Structure

```text
backend/
├── db/
│   ├── schema.ts         # PostgreSQL database schema (Drizzle ORM)
│   ├── index.ts          # Neon Serverless connection pool
│   ├── seedJobs.ts       # Automated job catalog seeding
│   └── user-sync.ts      # Clerk authentication user sync
├── services/
│   ├── jobs/
│   │   ├── matchJob.ts   # Skill-matching compatibility algorithm
│   │   ├── syncJobs.ts   # Job sync pipelines
│   │   └── providers/    # External job providers (e.g. Arbeitnow)
│   └── stripe.ts         # Stripe payment gateway integration
└── proxy.ts              # Clerk proxy & JWT clock-skew synchronization
```

## Technologies
- **Neon Serverless PostgreSQL**
- **Drizzle ORM**
- **Clerk Auth Proxy**
- **Stripe Payments**
