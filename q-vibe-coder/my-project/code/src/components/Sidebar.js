import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';
import {  FaSearch,  FaBell,  FaEnvelope,  FaUser,  FaUsers,  FaChalkboardTeacher,  FaBook,  FaInfoCircle} from 'react-icons/fa';
import useDeviceDetect from '../hooks/useDeviceDetect';

/**
 * Sidebar Component
 * 
 * This component renders the left navigation sidebar with menu items and user profile.
 * It handles navigation between different sections of the application and displays
 * the current user's profile information.
 * 
 * @param {Function} onMenuChange - Callback function to handle menu item clicks
 * @param {string} activeMenu - The currently active menu item
 */
const Sidebar = ({ onMenuChange, activeMenu }) => {
  // Track which tooltip is visible (by index)
  const [visibleTooltip, setVisibleTooltip] = useState(null);
  const timerRef = useRef(null);
  
  // Detect device type - collapse sidebar on non-desktop devices
  const { isWindows, isMac, isDesktop } = useDeviceDetect();
  const isDesktopComputer = (isWindows || isMac) && isDesktop;
  const shouldCollapse = !isDesktopComputer;

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  /**
   * Shows tooltip for 5 seconds then hides it
   * @param {number} index - The index of the menu item
   */
  const showTooltipTemporarily = (index) => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Show the tooltip
    setVisibleTooltip(index);
    
    // Hide after half a second
    timerRef.current = setTimeout(() => {
      setVisibleTooltip(null);
    }, 500);
  };

  /**
   * Primary menu items (top section)
   */
  const primaryItems = [
    { icon: <FaUsers />, label: 'Feeds', displayLabel: 'Feeds' }, // Feeds (was My Communities)
    { icon: <FaSearch />, label: 'Discover', displayLabel: 'Discover' }, // Discover (unified search for communities & courses)
    // Courses menu item removed - functionality still available via Discover
    // { icon: <FaBook />, label: 'Courses', displayLabel: 'Courses' }, // Browse courses
  ];

  /**
   * Personal menu items (middle section)
   */
  const personalItems = [
    { icon: <FaBook />, label: 'My Courses', displayLabel: 'My Courses' }, // User's enrolled courses
    { icon: <FaBell />, label: 'Notifications', displayLabel: 'Notifications' }, // Notification center
    { icon: <FaChalkboardTeacher />, label: 'Dashboard', displayLabel: 'Dashboard' }, // User dashboard (varies by role)
    { icon: <FaEnvelope />, label: 'Messages', displayLabel: 'Messages' }, // Messaging system
    { icon: <FaUser />, label: 'Profile', displayLabel: 'Profile' }, // User profile
  ];

  /**
   * Footer menu items (bottom section)
   */
  const footerItems = [
    { icon: <FaInfoCircle />, label: 'About', displayLabel: 'How It Works' }, // How PeerLoop works
  ];


  /**
   * Handles clicks on main navigation menu items
   * @param {string} label - The label of the clicked menu item
   */
  const handleMenuClick = (label) => {
    if (label === 'About') {
      onMenuChange('About');
    } else if (label === 'Courses') {
      onMenuChange('Browse_Courses');
    } else if (label === 'Discover') {
      onMenuChange('Discover');
    } else if (label === 'Feeds') {
      onMenuChange('My Community'); // Feeds maps to existing My Community view
    } else {
      onMenuChange(label);
    }
  };

  return (
    <div className={`sidebar ${shouldCollapse ? 'sidebar-collapsed' : ''}`}>
      {/* Header section with logo */}
      <div className="sidebar-header" style={{ padding: '4px 8px', marginBottom: '0px' }}>
        <div className="logo" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '6px 4px 4px 4px',
          gap: '0px'
        }}>
          <span style={{ 
            fontSize: '26px', 
            color: '#1d9bf0',
            lineHeight: 1
          }}>
            ∞
          </span>
          <span style={{ 
            fontSize: '9px', 
            fontWeight: '600', 
            color: '#94a3b8',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            PeerLoop
          </span>
        </div>
      </div>
      
      {/* Main navigation menu */}
      <nav className="sidebar-nav">
        {/* Primary items - Feeds, Discover */}
        {primaryItems.map((item, index) => {
          const isActive =
            (item.label === 'Feeds' && activeMenu === 'My Community') ||
            (item.label === 'Discover' && activeMenu === 'Discover');
          return (
            <div
              key={index}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                showTooltipTemporarily(index);
                handleMenuClick(item.label);
              }}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-label">{item.displayLabel || item.label}</span>
              <span className={`nav-tooltip ${visibleTooltip === index ? 'tooltip-visible' : ''}`}>
                {item.displayLabel || item.label}
              </span>
            </div>
          );
        })}

        {/* Divider */}
        <div className="nav-section-divider"></div>

        {/* Personal items - My Courses, Notifications, Dashboard, Messages, Profile */}
        {personalItems.map((item, index) => (
          <div
            key={index + primaryItems.length}
            className={`nav-item ${activeMenu === item.label ? 'active' : ''}`}
            onClick={() => {
              showTooltipTemporarily(index + primaryItems.length);
              handleMenuClick(item.label);
            }}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.displayLabel || item.label}</span>
            <span className={`nav-tooltip ${visibleTooltip === index + primaryItems.length ? 'tooltip-visible' : ''}`}>
              {item.displayLabel || item.label}
            </span>
          </div>
        ))}

        {/* Divider */}
        <div className="nav-section-divider"></div>

        {/* Footer items - How It Works */}
        {footerItems.map((item, index) => (
          <div
            key={index + primaryItems.length + personalItems.length}
            className={`nav-item ${activeMenu === 'About' ? 'active' : ''}`}
            onClick={() => {
              showTooltipTemporarily(index + primaryItems.length + personalItems.length);
              handleMenuClick(item.label);
            }}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.displayLabel || item.label}</span>
            <span className={`nav-tooltip ${visibleTooltip === index + primaryItems.length + personalItems.length ? 'tooltip-visible' : ''}`}>
              {item.displayLabel || item.label}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  onMenuChange: PropTypes.func.isRequired,
  activeMenu: PropTypes.string.isRequired
};

export default Sidebar; 