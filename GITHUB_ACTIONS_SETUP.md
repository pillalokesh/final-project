# GitHub Actions OIDC IAM Role Setup

## Step 1: Create OIDC Provider

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

## Step 2: Create IAM Role

Save this as `github-actions-trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/YOUR_REPO_NAME:*"
        }
      }
    }
  ]
}
```

Create the role:

```bash
aws iam create-role \
  --role-name GitHubActionsECSDeployRole \
  --assume-role-policy-document file://github-actions-trust-policy.json
```

## Step 3: Attach Policies

```bash
aws iam attach-role-policy \
  --role-name GitHubActionsECSDeployRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser

aws iam attach-role-policy \
  --role-name GitHubActionsECSDeployRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonECS_FullAccess
```

## Step 4: Get Role ARN

```bash
aws iam get-role --role-name GitHubActionsECSDeployRole --query 'Role.Arn' --output text
```

## Step 5: Add to GitHub Secrets

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. New repository secret
4. Name: `AWS_ROLE_ARN`
5. Value: (paste the ARN from step 4)

## Verification

Test the workflow by pushing to main branch:

```bash
git add .
git commit -m "Test CI/CD pipeline"
git push origin main
```
