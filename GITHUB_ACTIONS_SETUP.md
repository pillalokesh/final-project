# GitHub Actions Setup Guide — Amrutha Juice

## Step 1 — GitHub Secrets Set Cheyyali

GitHub Repo → Settings → Secrets and variables → Actions → New repository secret

Add these secrets ONE BY ONE:

| Secret Name     | Value                                          |
|-----------------|------------------------------------------------|
| AWS_ROLE_ARN    | arn:aws:iam::<account-id>:role/lokesh-github-actions-role |
| MONGO_URI       | mongodb+srv://<user>:<pass>@cluster.mongodb.net/amrutha-juice |
| JWT_SECRET      | amrutha_juice_super_secret_2025                |
| SMTP_USER       | pillalokesh3@gmail.com                         |
| SMTP_PASS       | <your_gmail_app_password>                      |

---

## Step 2 — MongoDB Atlas Setup (Free)

1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Database Access → Add user → username + password
4. Network Access → Add IP → 0.0.0.0/0 (allow all)
5. Connect → Drivers → Copy connection string
6. Replace <password> with your password
7. Add as MONGO_URI secret in GitHub

---

## Step 3 — Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Search "App passwords"
4. Select app: Mail → Generate
5. Copy 16-digit password
6. Add as SMTP_PASS secret in GitHub

---

## Step 4 — Push to GitHub

git add .
git commit -m "feat: Amrutha Juice complete platform"
git push origin main

---

## Step 5 — Watch Deploy

GitHub → Actions tab → Watch pipeline run

Steps:
✅ Checkout code
✅ Configure AWS credentials
✅ Login to ECR
✅ Build & push frontend image
✅ Build & push backend image
✅ Inject env vars
✅ Update task definitions
✅ Deploy frontend to ECS
✅ Deploy backend to ECS
✅ Deployment Summary

---

## Step 6 — Verify Live

https://lokeshwaffle.in          → Frontend (Amrutha Juice)
https://lokeshwaffle.in/api/health → Backend health check

---

## Troubleshooting

### ECS Task Failing?
AWS Console → ECS → lokesh-cluster → lokesh-backend-service → Tasks → Stopped reason

### Common Issues:
- MONGO_URI wrong → Check Atlas connection string
- Port mismatch → Backend runs on 5000 (already fixed)
- Image not found → ECR push must complete first

### Check Logs:
AWS Console → CloudWatch → Log groups → /ecs/lokesh
