resource "aws_ecs_cluster" "main" {
  name = "lokesh-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "lokesh-cluster"
  }
}

resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/lokesh-cluster"
  retention_in_days = 7

  tags = {
    Name = "lokesh-ecs-logs"
  }
}
