resource "aws_ecr_repository" "frontend" {
  name                 = "lokesh-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "lokesh-frontend"
  }
}

resource "aws_ecr_repository" "backend" {
  name                 = "lokesh-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "lokesh-backend"
  }
}
