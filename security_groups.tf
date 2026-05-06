resource "aws_security_group" "alb_sg" {
  name        = "lokesh-alb-sg"
  description = "Security group for ALB"
  vpc_id      = aws_vpc.lokesh_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "lokesh-alb-sg"
  }
}

resource "aws_security_group" "ecs_sg" {
  name        = "lokesh-ecs-sg"
  description = "Security group for ECS tasks"
  vpc_id      = aws_vpc.lokesh_vpc.id

  ingress {
    from_port       = 0
    to_port         = 65535
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "lokesh-ecs-sg"
  }
}

resource "aws_security_group" "rds_sg" {
  name        = "lokesh-rds-sg"
  description = "Security group for RDS"
  vpc_id      = aws_vpc.lokesh_vpc.id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "lokesh-rds-sg"
  }
}
