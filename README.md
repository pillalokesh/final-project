# Lokesh Waffle - AWS 3-Tier Architecture

Production-ready 3-tier architecture on AWS using Terraform for **lokeshwaffle.in**

## Architecture Overview

### Infrastructure Components

**VPC & Networking:**
- Custom VPC (10.0.0.0/16) in ap-south-1
- 2 Public Subnets (10.0.1.0/24, 10.0.2.0/24)
- 2 Private Subnets (10.0.3.0/24, 10.0.4.0/24)
- Internet Gateway + NAT Gateway
- Multi-AZ deployment across 2 availability zones

**Application Layer:**
- ECS Fargate cluster
- Frontend: React app (Nginx) - 2 tasks
- Backend: Node.js API - 2 tasks
- Application Load Balancer with path-based routing

**Database Layer:**
- RDS MySQL (db.t3.micro)
- Multi-AZ enabled
- 20GB storage
- Private subnet only

**Security:**
- 3 Security Groups (ALB, ECS, RDS)
- SSL/TLS via ACM
- HTTPS enforced
- No public database access

**DNS & SSL:**
- Route53 hosted zone
- ACM SSL certificate
- HTTPS redirect from HTTP

## Prerequisites

- AWS Account
- Terraform >= 1.0
- AWS CLI configured
- Domain: lokeshwaffle.in

## Deployment Steps

### 1. Clone Repository

```bash
git clone <repository-url>
cd final-project
```

### 2. Configure Variables

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` and set your database password:

```hcl
db_password = "YourSecurePassword123!"
```

### 3. Initialize Terraform

```bash
terraform init
```

### 4. Plan Infrastructure

```bash
terraform plan
```

### 5. Deploy Infrastructure

```bash
terraform apply
```

Type `yes` when prompted.

### 6. Update Domain Nameservers

After deployment, update your domain registrar with Route53 nameservers:

```bash
terraform output route53_nameservers
```

### 7. Build and Push Docker Images

**Frontend:**
```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com

docker build -t lokesh-frontend ./frontend
docker tag lokesh-frontend:latest <ecr-frontend-url>:latest
docker push <ecr-frontend-url>:latest
```

**Backend:**
```bash
docker build -t lokesh-backend ./backend
docker tag lokesh-backend:latest <ecr-backend-url>:latest
docker push <ecr-backend-url>:latest
```

### 8. Update ECS Services

```bash
aws ecs update-service --cluster lokesh-cluster --service lokesh-frontend-service --force-new-deployment
aws ecs update-service --cluster lokesh-cluster --service lokesh-backend-service --force-new-deployment
```

## CI/CD Setup (GitHub Actions)

### 1. Create OIDC Provider in AWS

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### 2. Create IAM Role for GitHub Actions

Create role with trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:<github-username>/<repo-name>:*"
        }
      }
    }
  ]
}
```

Attach policies:
- AmazonEC2ContainerRegistryPowerUser
- AmazonECS_FullAccess

### 3. Add GitHub Secret

Add `AWS_ROLE_ARN` to GitHub repository secrets with the IAM role ARN.

### 4. Push to Main Branch

```bash
git add .
git commit -m "Deploy infrastructure"
git push origin main
```

## Architecture Diagram

```
Internet
    |
    v
[Route53] --> [ACM Certificate]
    |
    v
[Application Load Balancer]
    |
    +-- / --> [Frontend Target Group]
    |            |
    |            v
    |         [ECS Fargate - Frontend x2]
    |
    +-- /api/* --> [Backend Target Group]
                      |
                      v
                   [ECS Fargate - Backend x2]
                      |
                      v
                   [RDS MySQL - Multi-AZ]
```

## Outputs

After deployment, retrieve important values:

```bash
terraform output alb_dns_name
terraform output ecr_frontend_repository_url
terraform output ecr_backend_repository_url
terraform output rds_endpoint
```

## Security Features

- Private subnets for application and database
- Security groups with least privilege
- No hardcoded credentials
- IAM roles for ECS tasks
- SSL/TLS encryption
- Multi-AZ for high availability
- HTTPS enforced

## Monitoring

- CloudWatch Container Insights enabled
- ECS task logs in CloudWatch
- ALB access logs
- RDS automated backups (7 days retention)

## Cost Optimization

- NAT Gateway: ~$32/month
- ALB: ~$16/month
- ECS Fargate: ~$30/month (4 tasks)
- RDS db.t3.micro Multi-AZ: ~$30/month
- Route53: ~$0.50/month

**Estimated Total: ~$110/month**

## Cleanup

To destroy all resources:

```bash
terraform destroy
```

Type `yes` when prompted.

## Troubleshooting

**ECS tasks not starting:**
- Check CloudWatch logs: `/ecs/lokesh-cluster`
- Verify ECR images exist
- Check security group rules

**Database connection issues:**
- Verify RDS endpoint in backend environment variables
- Check RDS security group allows ECS security group
- Ensure RDS is in private subnets

**SSL certificate not validating:**
- Verify DNS records in Route53
- Wait 5-10 minutes for DNS propagation
- Check ACM certificate status

## Support

For issues or questions, contact the DevOps team.
