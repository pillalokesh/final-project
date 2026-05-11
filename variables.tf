variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "domain_name" {
  description = "Domain name"
  type        = string
  default     = "lokeshwaffle.in"
}

variable "db_username" {
  description = "RDS master username"
  type        = string
  default     = "admin"
  sensitive   = true
}

variable "db_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "RDS database name"
  type        = string
  default     = "lokeshdb"
}

variable "github_repo" {
  description = "GitHub repository in format: owner/repo-name"
  type        = string
}

variable "frontend_image" {
  description = "Frontend Docker image"
  type        = string
  default     = "nginx:latest"
}

variable "backend_image" {
  description = "Backend Docker image"
  type        = string
  default     = "node:18-alpine"
}

variable "mongo_uri" {
  description = "MongoDB Atlas connection URI"
  type        = string
  sensitive   = true
  default     = ""
}

variable "jwt_secret" {
  description = "JWT secret key"
  type        = string
  sensitive   = true
  default     = "amrutha_juice_secret_2025"
}

variable "smtp_user" {
  description = "Gmail SMTP user email"
  type        = string
  default     = "pillalokesh3@gmail.com"
}

variable "smtp_pass" {
  description = "Gmail App Password"
  type        = string
  sensitive   = true
  default     = ""
}
