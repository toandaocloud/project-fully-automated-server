variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "frontend_image" {
  description = "Frontend Docker image"
  type        = string
  default     = "nginx:alpine"
}

variable "backend_image" {
  description = "Backend Docker image" 
  type        = string
  default     = "node:18-alpine"
}
