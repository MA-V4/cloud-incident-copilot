# Zero-Cost Constraints

These rules are non-negotiable for this project. Both developers must agree to them before deploying anything.

## Allowed Services

| Service | Tier | Notes |
|---------|------|-------|
| AWS SQS | Free Tier | 1M requests/month free — stay well below this |
| AWS DynamoDB | Free Tier | 25GB storage, 25 RCU/WCU free |
| AWS Lambda | Free Tier | 1M invocations/month free |
| AWS CloudWatch | Free Tier | Basic metrics only |
| Render | Free | Backend API — expect cold starts |
| Vercel | Hobby | Frontend — no custom domains needed |

## Forbidden Services (will incur costs)

- EC2 (any instance type)
- RDS or Aurora
- NAT Gateway
- ElastiCache
- OpenSearch / Elasticsearch
- MSK (Managed Kafka)
- Any paid LLM API (OpenAI, Anthropic, etc.)

## AWS Safety Rules

1. **Create an AWS Budget alert before creating any resource** — set threshold to $0.01
2. **Use one region only** — eu-west-2 (London)
3. **Document every resource created** so we can tear it all down
4. **Keep event volumes low** — this is a demo system, not production load
5. **Read the teardown plan before deploying** — it must exist before any resource goes live

## AI Rules

- The hosted deployment must work with the **mock AI report generator** — no paid API required
- Local Ollama integration is optional and for local demos only
- Never hardcode or commit any AI API keys

## Cost Monitoring

Before and after any AWS deployment session, check the AWS Cost Explorer and confirm the running total is $0.
