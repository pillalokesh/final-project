output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.lokesh_vpc.id
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.main.dns_name
}

output "alb_zone_id" {
  description = "ALB Zone ID"
  value       = aws_lb.main.zone_id
}

output "ecr_frontend_repository_url" {
  description = "ECR Frontend Repository URL"
  value       = aws_ecr_repository.frontend.repository_url
}

output "ecr_backend_repository_url" {
  description = "ECR Backend Repository URL"
  value       = aws_ecr_repository.backend.repository_url
}

output "rds_endpoint" {
  description = "RDS Endpoint"
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}

output "ecs_cluster_name" {
  description = "ECS Cluster Name"
  value       = aws_ecs_cluster.main.name
}

output "route53_nameservers" {
  description = "Route53 Name Servers"
  value       = aws_route53_zone.main.name_servers
}

output "acm_certificate_arn" {
  description = "ACM Certificate ARN"
  value       = aws_acm_certificate.main.arn
}

output "github_actions_role_arn" {
  description = "IAM Role ARN to set as AWS_ROLE_ARN in GitHub Secrets"
  value       = aws_iam_role.github_actions_role.arn
}
