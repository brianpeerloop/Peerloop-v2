import React from 'react';
import PropTypes from 'prop-types';
import { FaBook, FaChalkboardTeacher, FaDollarSign } from 'react-icons/fa';
import './AboutView.css';

/**
 * AboutView Component
 *
 * Displays information about PeerLoop's Learn-Teach-Earn approach
 * and explains how to navigate the site.
 */
const AboutView = ({ isDarkMode, onMenuChange }) => {
  return (
    <div className={`about-view ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-logo">∞</div>
        <h1 className="about-title">PEERLOOP</h1>
        <h2 className="about-tagline">Learn. Teach. Earn.</h2>
        <p className="about-subtitle">Master any skill, then help others do the same</p>
      </div>

      {/* Three Column Flow */}
      <div className="about-flow">
        <div className="flow-card">
          <div className="flow-icon">
            <FaBook />
          </div>
          <h3 className="flow-title">LEARN</h3>
          <p className="flow-description">
            Find a course, pick a student-teacher who recently passed the course.
          </p>
        </div>

        <div className="flow-arrow">→</div>

        <div className="flow-card">
          <div className="flow-icon">
            <FaChalkboardTeacher />
          </div>
          <h3 className="flow-title">TEACH</h3>
          <p className="flow-description">
            After passing the course, become a student-teacher. Help others through their journey.
          </p>
        </div>

        <div className="flow-arrow">→</div>

        <div className="flow-card">
          <div className="flow-icon">
            <FaDollarSign />
          </div>
          <h3 className="flow-title">EARN</h3>
          <p className="flow-description">
            Earn 70% of your session fee while helping others and reinforcing your own knowledge.
          </p>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="about-howto">
        <h2 className="howto-title">HOW TO USE PEERLOOP</h2>

        <div className="howto-steps">
          <div className="howto-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>DISCOVER</h3>
              <p>
                Browse <strong>Courses</strong> and <strong>Communities</strong> in the left menu.
                Find topics you want to learn or communities you want to join.
              </p>
            </div>
          </div>

          <div className="howto-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>JOIN</h3>
              <p>
                Enroll in courses. Join communities to access
                discussions and get updates.
              </p>
            </div>
          </div>

          <div className="howto-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>MY STUFF</h3>
              <p>
                Everything you join appears in <strong>My Stuff</strong>:
              </p>
              <ul>
                <li><strong>My Courses</strong> - your enrolled courses</li>
                <li><strong>My Communities</strong> - communities you joined</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="about-cta">
        <button
          className="cta-button"
          onClick={() => onMenuChange('Browse_Courses')}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
};

AboutView.propTypes = {
  isDarkMode: PropTypes.bool,
  onMenuChange: PropTypes.func.isRequired
};

AboutView.defaultProps = {
  isDarkMode: false
};

export default AboutView;
