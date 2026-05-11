resource "aws_ecs_task_definition" "backend" {
  family                   = "lokesh-backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = "${aws_ecr_repository.backend.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = 5000
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "PORT"
          value = "5000"
        },
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "MONGO_URI"
          value = var.mongo_uri
        },
        {
          name  = "JWT_SECRET"
          value = var.jwt_secret
        },
        {
          name  = "CLIENT_URL"
          value = "https://${var.domain_name}"
        },
        {
          name  = "SMTP_USER"
          value = var.smtp_user
        },
        {
          name  = "SMTP_PASS"
          value = var.smtp_pass
        },
        {
          name  = "FROM_EMAIL"
          value = var.smtp_user
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "backend"
        }
      }
    }
  ])

  tags = {
    Name = "lokesh-backend-task"
  }
}

resource "aws_ecs_service" "backend" {
  name            = "lokesh-backend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.private_1.id, aws_subnet.private_2.id]
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "backend"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.https]

  tags = {
    Name = "lokesh-backend-service"
  }
}
