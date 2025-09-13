import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('Loading...');
  const [projects, setProjects] = useState([]);
  const [health, setHealth] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch API status
    fetch(`${API_BASE}/api/status`)
      .then(res => res.json())
      .then(data => setApiStatus(data.message))
      .catch(err => setApiStatus('API connection failed'));

    // Fetch projects
    fetch(`${API_BASE}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data.projects))
      .catch(err => console.error('Error fetching projects:', err));

    // Fetch health status
    fetch(`${API_BASE}/health`)
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => console.error('Error fetching health:', err));
  }, [API_BASE]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero">
          <h1>🚀 Cloud Portfolio</h1>
          <h2>Toan Dao - Cloud Engineer</h2>
          <p>Containerized Full-Stack Application with CI/CD Pipeline</p>
        </div>
      </header>

      <main className="main-content">
        <section className="status-section">
          <h3>🔗 System Status</h3>
          <div className="status-card">
            <p><strong>API Status:</strong> <span className="status-text">{apiStatus}</span></p>
            {health && (
              <div>
                <p><strong>Health:</strong> {health.status}</p>
                <p><strong>Uptime:</strong> {Math.floor(health.uptime)} seconds</p>
                <p><strong>Environment:</strong> {health.environment}</p>
              </div>
            )}
          </div>
        </section>

        <section className="projects-section">
          <h3>📂 Featured Projects</h3>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Live Demo →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="architecture-section">
          <h3>🏗️ Architecture Overview</h3>
          <div className="arch-card">
            <h4>This Application Demonstrates:</h4>
            <ul>
              <li>✅ Containerized React.js frontend</li>
              <li>✅ Node.js API backend with health checks</li>
              <li>✅ Docker multi-container setup</li>
              <li>✅ AWS ECS Fargate deployment</li>
              <li>✅ ECR container registry</li>
              <li>✅ Application Load Balancer</li>
              <li>✅ Infrastructure as Code (Terraform)</li>
              <li>✅ CI/CD pipeline with GitHub Actions</li>
              <li>✅ Automated testing and deployment</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Toan Dao | Built with React, Node.js, Docker & AWS ECS</p>
        <p>
          <a href="https://github.com/toandaocloud" target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
