import { Github, Linkedin } from "lucide-react";
import "./Footer.css"; // Import the CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a
          href="https://github.com/gw-dg"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon">
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/bhaskar-jha-89226a218/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon">
          <Linkedin size={20} />
        </a>
      </div>
      <div className="footer-select">
        <select className="select-trigger">
          <option value="" disabled selected>
            Select Theme
          </option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </footer>
  );
}
