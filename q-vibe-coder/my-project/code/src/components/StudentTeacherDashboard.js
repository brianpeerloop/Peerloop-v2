import React, { useState } from 'react';
import {
  FaChevronDown,
  FaVideo,
  FaCalendarAlt,
  FaTimes,
  FaPlus,
  FaSave
} from 'react-icons/fa';

const StudentTeacherDashboard = ({ isDarkMode = true, currentUser }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timezone, setTimezone] = useState('America/Chicago');

  // Availability state - each day has an array of time slots
  const [availability, setAvailability] = useState({
    monday: [],
    tuesday: [
      { start: '10:00 AM', end: '12:00 PM' },
      { start: '2:00 PM', end: '5:00 PM' }
    ],
    wednesday: [
      { start: '7:00 PM', end: '9:00 PM' }
    ],
    thursday: [],
    friday: [
      { start: '10:00 AM', end: '12:00 PM' }
    ],
    saturday: [],
    sunday: []
  });

  // Student-Teacher info - use currentUser if available
  const stInfo = {
    name: currentUser?.name || "Marcus Chen",
    courseName: "AI Prompting Mastery",
    initials: currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('') : "MC"
  };

  // Navigation tabs for this dashboard
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'availability', label: 'Availability' },
    { id: 'profile', label: 'Profile' }
  ];

  // Quick stats
  const quickStats = [
    { value: 4, label: 'Students', sublabel: 'Assigned' },
    { value: 6, label: 'Sessions', sublabel: 'This Week' },
    { value: 24, label: 'Sessions', sublabel: 'Total' }
  ];

  // My Students data
  const myStudents = [
    { name: 'Sarah Johnson', progress: 40, nextSession: 'Dec 10, 7:00 PM' },
    { name: 'Mike Chen', progress: 60, nextSession: 'Dec 11, 2:00 PM' },
    { name: 'Alex Rivera', progress: 40, nextSession: 'Dec 12, 10:00 AM' },
    { name: 'Jordan Lee', progress: 60, nextSession: null }
  ];

  // Upcoming sessions
  const upcomingSessions = [
    {
      date: 'Dec 10, 7:00 PM',
      student: 'Sarah Johnson',
      module: 'Module 3: Advanced Patterns',
      canJoin: true
    },
    {
      date: 'Dec 11, 2:00 PM',
      student: 'Mike Chen',
      module: 'Module 4: Specialization',
      canJoin: false
    }
  ];

  // Days of the week
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Timezone options
  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Phoenix',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  // Get timezone abbreviation
  const getTimezoneAbbr = (tz) => {
    const abbrs = {
      'America/New_York': 'EST',
      'America/Chicago': 'CST',
      'America/Denver': 'MST',
      'America/Los_Angeles': 'PST',
      'America/Phoenix': 'MST',
      'Europe/London': 'GMT',
      'Europe/Paris': 'CET',
      'Asia/Tokyo': 'JST',
      'Asia/Shanghai': 'CST',
      'Australia/Sydney': 'AEDT'
    };
    return abbrs[tz] || 'UTC';
  };

  // Add time slot to a day
  const addTimeSlot = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: [...prev[day], { start: '9:00 AM', end: '10:00 AM' }]
    }));
  };

  // Remove time slot from a day
  const removeTimeSlot = (day, index) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  // Colors
  const bgPrimary = isDarkMode ? '#000' : '#fff';
  const bgSecondary = isDarkMode ? '#16181c' : '#f8fafc';
  const bgCard = isDarkMode ? '#16181c' : '#fff';
  const textPrimary = isDarkMode ? '#e7e9ea' : '#0f172a';
  const textSecondary = isDarkMode ? '#71767b' : '#64748b';
  const borderColor = isDarkMode ? '#2f3336' : '#e2e8f0';
  const accentBlue = '#1d9bf0';
  const accentGreen = '#00ba7c';

  // Progress bar component
  const ProgressBar = ({ percent }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 80,
        height: 8,
        background: isDarkMode ? '#2f3336' : '#e2e8f0',
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percent}%`,
          height: '100%',
          background: accentBlue,
          borderRadius: 4
        }} />
      </div>
      <span style={{ fontSize: 13, color: textSecondary }}>{percent}%</span>
    </div>
  );

  // Render Availability Tab
  const renderAvailabilityTab = () => (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontSize: 24,
          fontWeight: 700,
          color: textPrimary,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span style={{ fontSize: 24 }}>⚙️</span> My Availability
        </h1>
        <p style={{
          fontSize: 15,
          color: textSecondary,
          margin: '8px 0 0 0'
        }}>
          Set your weekly teaching schedule
        </p>
      </div>

      {/* Timezone Selector */}
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 14, color: textSecondary }}>Timezone: </span>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${borderColor}`,
            background: bgSecondary,
            color: textPrimary,
            fontSize: 14,
            cursor: 'pointer'
          }}
        >
          {timezones.map(tz => (
            <option key={tz} value={tz}>
              {tz} ({getTimezoneAbbr(tz)})
            </option>
          ))}
        </select>
      </div>

      {/* Weekly Schedule */}
      <div style={{
        background: bgCard,
        borderRadius: 12,
        border: `1px solid ${borderColor}`,
        overflow: 'hidden',
        marginBottom: 24
      }}>
        {daysOfWeek.map((day, dayIndex) => (
          <div
            key={day}
            style={{
              padding: 16,
              borderBottom: dayIndex < daysOfWeek.length - 1 ? `1px solid ${borderColor}` : 'none'
            }}
          >
            {/* Day Header */}
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: textPrimary,
              textTransform: 'uppercase',
              marginBottom: 12
            }}>
              {day}
            </div>

            {/* Time Slots */}
            {availability[day].map((slot, slotIndex) => (
              <div
                key={slotIndex}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: bgSecondary,
                  borderRadius: 8,
                  marginBottom: 8,
                  border: `1px solid ${borderColor}`
                }}
              >
                <span style={{ fontSize: 14, color: textPrimary }}>
                  {slot.start} - {slot.end}
                </span>
                <button
                  onClick={() => removeTimeSlot(day, slotIndex)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '6px 12px',
                    background: 'transparent',
                    border: `1px solid ${isDarkMode ? '#ef4444' : '#fca5a5'}`,
                    borderRadius: 6,
                    color: '#ef4444',
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  <FaTimes style={{ fontSize: 10 }} />
                  Remove
                </button>
              </div>
            ))}

            {/* Add Time Slot Button */}
            <button
              onClick={() => addTimeSlot(day)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 12px',
                background: 'transparent',
                border: 'none',
                color: accentBlue,
                fontSize: 14,
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              <FaPlus style={{ fontSize: 12 }} />
              Add time slot
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          padding: '14px 24px',
          background: accentBlue,
          border: 'none',
          borderRadius: 12,
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        <FaSave style={{ fontSize: 16 }} />
        Save Availability
      </button>
    </div>
  );

  // Render Dashboard Tab
  const renderDashboardTab = () => (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontSize: 24,
          fontWeight: 700,
          color: textPrimary,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span style={{ fontSize: 28 }}>👋</span> Welcome, {stInfo.name.split(' ')[0]}
        </h1>
        <p style={{
          fontSize: 15,
          color: textSecondary,
          margin: '8px 0 0 0'
        }}>
          Student-Teacher: {stInfo.courseName}
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontSize: 14,
          fontWeight: 600,
          color: textSecondary,
          margin: '0 0 12px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          📊 QUICK STATS
        </h2>
        <div style={{
          display: 'flex',
          gap: 12
        }}>
          {quickStats.map((stat, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                background: bgCard,
                borderRadius: 12,
                padding: 16,
                border: `1px solid ${borderColor}`,
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: textPrimary,
                marginBottom: 4
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: textSecondary }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 12, color: textSecondary, opacity: 0.8 }}>
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Students */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontSize: 14,
          fontWeight: 600,
          color: textSecondary,
          margin: '0 0 12px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          👥 MY STUDENTS
        </h2>
        <div style={{
          background: bgCard,
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 160px',
            padding: '12px 16px',
            borderBottom: `1px solid ${borderColor}`,
            background: bgSecondary
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: textSecondary }}>Student</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: textSecondary }}>Progress</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: textSecondary }}>Next Session</div>
          </div>

          {/* Table Rows */}
          {myStudents.map((student, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 160px',
                padding: '12px 16px',
                borderBottom: index < myStudents.length - 1 ? `1px solid ${borderColor}` : 'none',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 500, color: textPrimary }}>
                {student.name}
              </div>
              <ProgressBar percent={student.progress} />
              <div style={{ fontSize: 13, color: student.nextSession ? textPrimary : textSecondary }}>
                {student.nextSession || 'Not scheduled'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontSize: 14,
          fontWeight: 600,
          color: textSecondary,
          margin: '0 0 12px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          📅 UPCOMING SESSIONS
        </h2>
        <div style={{
          background: bgCard,
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
          overflow: 'hidden'
        }}>
          {upcomingSessions.map((session, index) => (
            <div
              key={index}
              style={{
                padding: 16,
                borderBottom: index < upcomingSessions.length - 1 ? `1px solid ${borderColor}` : 'none'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 4
              }}>
                <FaCalendarAlt style={{ color: accentBlue, fontSize: 14 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>
                  {session.date}
                </span>
                <span style={{ color: textSecondary }}>-</span>
                <span style={{ fontSize: 14, color: textPrimary }}>
                  {session.student}
                </span>
              </div>
              <div style={{
                fontSize: 13,
                color: textSecondary,
                marginBottom: 12,
                marginLeft: 22
              }}>
                {session.module}
              </div>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 16px',
                background: session.canJoin ? accentBlue : bgSecondary,
                border: session.canJoin ? 'none' : `1px solid ${borderColor}`,
                borderRadius: 8,
                color: session.canJoin ? '#fff' : textSecondary,
                fontSize: 14,
                fontWeight: 500,
                cursor: session.canJoin ? 'pointer' : 'default',
                width: '100%',
                justifyContent: 'center'
              }}>
                <FaVideo style={{ fontSize: 14 }} />
                {session.canJoin ? 'Join Session' : 'Join Session (available 5 min before)'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Availability */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontSize: 14,
          fontWeight: 600,
          color: textSecondary,
          margin: '0 0 12px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          ⚙️ MY AVAILABILITY
        </h2>
        <button
          onClick={() => setActiveTab('availability')}
          style={{
            display: 'block',
            width: '100%',
            padding: '16px',
            background: bgCard,
            border: `1px solid ${borderColor}`,
            borderRadius: 12,
            color: accentBlue,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Edit Availability →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      background: bgPrimary,
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Top Navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 56,
        borderBottom: `1px solid ${borderColor}`,
        background: bgSecondary,
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Logo */}
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          color: accentBlue
        }}>
          ∞
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flex: 1,
          marginLeft: 32
        }}>
          {navTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                background: activeTab === tab.id ? (isDarkMode ? '#2f3336' : '#e2e8f0') : 'transparent',
                border: 'none',
                borderRadius: 8,
                color: activeTab === tab.id ? accentBlue : textSecondary,
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* User Dropdown */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'transparent',
          border: `1px solid ${borderColor}`,
          borderRadius: 20,
          color: textPrimary,
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer'
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: accentGreen,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700
          }}>
            {stInfo.initials}
          </div>
          {stInfo.name.split(' ')[0]}
          <FaChevronDown style={{ fontSize: 10, color: textSecondary }} />
        </button>
      </div>

      {/* Main Content - Switch based on active tab */}
      {activeTab === 'dashboard' && renderDashboardTab()}
      {activeTab === 'availability' && renderAvailabilityTab()}
      {activeTab === 'profile' && (
        <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: textPrimary }}>
            Profile
          </h1>
          <p style={{ color: textSecondary }}>Profile settings coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default StudentTeacherDashboard;
