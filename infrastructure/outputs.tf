output "load_balancer_url" {
  description = "Load Balancer URL"
  value       = "http://${aws_lb.main.dns_name}"
}

output "ecr_frontend_url" {
  description = "ECR Frontend Repository URL"
  value       = aws_ecr_repository.frontend.repository_url
}

output "ecr_backend_url" {
  description = "ECR Backend Repository URL"
  value       = aws_ecr_repository.backend.repository_url
}

output "ecs_cluster_name" {
  description = "ECS Cluster Name"
  value       = aws_ecs_cluster.main.name
}
