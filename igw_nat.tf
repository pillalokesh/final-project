resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.lokesh_vpc.id

  tags = {
    Name = "lokesh-igw"
  }
}

resource "aws_eip" "nat" {
  domain = "vpc"

  tags = {
    Name = "lokesh-nat-eip"
  }
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_1.id

  tags = {
    Name = "lokesh-nat-gateway"
  }

  depends_on = [aws_internet_gateway.igw]
}
