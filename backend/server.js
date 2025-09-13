const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes
app.get('/api/status', (req, res) => {
    res.json({
        message: 'Cloud Portfolio API is running!',
        version: '1.0.0',
        author: 'Toan Dao',
        description: 'Containerized Node.js API with CI/CD pipeline'
    });
});

// Portfolio projects endpoint
app.get('/api/projects', (req, res) => {
    const projects = [
        {
            id: 1,
            name: 'Cloud Resume Challenge',
            description: 'Serverless resume website with visitor counter',
            technologies: ['AWS Lambda', 'DynamoDB', 'S3', 'CloudFront', 'Terraform'],
            url: 'http://toandao-cloud-resume-1757695759.s3-website-us-east-1.amazonaws.com',
            github: 'https://github.com/toandaocloud/aws-cloud-resume-challenge'
        },
        {
            id: 2,
            name: 'CI/CD Containerized Application',
            description: 'Full-stack application with automated deployment pipeline',
            technologies: ['Docker', 'ECS Fargate', 'ECR', 'GitHub Actions', 'Terraform'],
            status: 'In Development'
        }
    ];
    
    res.json({
        projects,
        total: projects.length
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: 'The requested resource does not exist'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong!'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 API Status: http://localhost:${PORT}/api/status`);
});

module.exports = app;
