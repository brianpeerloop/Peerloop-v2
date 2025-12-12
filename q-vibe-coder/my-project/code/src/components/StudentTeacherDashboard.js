import React, { useState } from 'react';
import { 
  FaChartLine,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaComments,
  FaUser,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaVideo,
  FaGraduationCap,
  FaClock,
  FaArrowUp
} from 'react-icons/fa';

const StudentTeacherDashboard = ({ isDarkMode = true }) => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // December 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 8)); // Dec 8, 2025 selected by default
  
  // Student-Teacher info
  const stInfo = {
    name: "Alex Sanders",
    courseName: "AI Prompting Mastery",
    initials: "AS"
  };
  
  // Navigation tabs
  const navTabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'calendar', label: 'Calendar', icon: FaCalendarAlt },
    { id: 'students', label: 'Students', icon: FaUsers, badge: 4 },
    { id: 'earnings', label: 'Earnings', icon: FaDollarSign },
    { id: 'messages', label: 'Messages', icon: FaComments, badge: 2 },
    { id: 'profile', label: 'Profile', icon: FaUser }
  ];
  
  // Quick stats
  const quickStats = [
    { value: 8, label: 'sessions', sublabel: 'this week', icon: '⚡', color: '#1d9bf0' },
    { value: 4, label: 'students', sublabel: 'active', icon: '👥', color: '#1d9bf0' },
    { value: '$2,520', label: 'earned', sublabel: 'total', icon: '💰', color: '#00ba7c' },
    { value: 1, label: 'cert ready', sublabel: 'to review', icon: '🎓', color: '#f97316', action: 'Review →' }
  ];
  
  // Sessions data organized by date (key: "YYYY-MM-DD")
  const sessionsByDate = {
    '2025-12-03': [
      { time: '10:00 AM', student: 'Sarah Johnson', initials: 'SJ', module: 'Module 3: Advanced Applications', progress: 100, status: 'ready_for_cert' }
    ],
    '2025-12-05': [
      { time: '2:00 PM', student: 'Mike Chen', initials: 'MC', module: 'Module 4: Specialization', progress: 60, status: 'on_track' },
      { time: '4:00 PM', student: 'Emma Wilson', initials: 'EW', module: 'Module 1: Foundations', progress: 20, status: 'new' }
    ],
    '2025-12-06': [
      { time: '11:00 AM', student: 'David Kim', initials: 'DK', module: 'Module 2: Intermediate', progress: 40, status: 'on_track' }
    ],
    '2025-12-08': [
      { time: '10:00 AM', student: 'Sarah Johnson', initials: 'SJ', module: 'Module 3: Advanced Applications', progress: 100, status: 'ready_for_cert', canJoin: true, startsIn: '45 min' },
      { time: '11:00 AM', student: 'Mike Chen', initials: 'MC', module: 'Module 4: Specialization', progress: 60, status: 'on_track', startsIn: '1hr 45min' },
      { time: '2:00 PM', student: 'Emma Wilson', initials: 'EW', module: 'Module 1: Foundations', progress: 20, status: 'new', startsIn: '4 hours' },
      { time: '7:00 PM', student: 'Alex Rivera', initials: 'AR', module: 'Module 5: Certification Prep', progress: 80, status: 'final_module', startsIn: '9 hours' }
    ],
    '2025-12-09': [
      { time: '10:00 AM', student: 'David Kim', initials: 'DK', module: 'Module 2: Intermediate', progress: 40, status: 'on_track' }
    ],
    '2025-12-11': [
      { time: '2:00 PM', student: 'Sarah Johnson', initials: 'SJ', module: 'Module 3: Advanced Applications', progress: 100, status: 'ready_for_cert' },
      { time: '5:00 PM', student: 'Mike Chen', initials: 'MC', module: 'Module 4: Specialization', progress: 60, status: 'on_track' }
    ],
    '2025-12-13': [
      { time: '11:00 AM', student: 'Emma Wilson', initials: 'EW', module: 'Module 1: Foundations', progress: 20, status: 'new' }
    ],
    '2025-12-15': [
      { time: '3:00 PM', student: 'Alex Rivera', initials: 'AR', module: 'Module 5: Certification Prep', progress: 80, status: 'final_module' }
    ],
    '2025-12-16': [
      { time: '10:00 AM', student: 'David Kim', initials: 'DK', module: 'Module 2: Intermediate', progress: 40, status: 'on_track' },
      { time: '2:00 PM', student: 'Sarah Johnson', initials: 'SJ', module: 'Module 3: Advanced Applications', progress: 100, status: 'ready_for_cert' }
    ],
    '2025-12-18': [
      { time: '11:00 AM', student: 'Mike Chen', initials: 'MC', module: 'Module 4: Specialization', progress: 60, status: 'on_track' }
    ],
    '2025-12-19': [
      { time: '2:00 PM', student: 'Emma Wilson', initials: 'EW', module: 'Module 1: Foundations', progress: 20, status: 'new' },
      { time: '4:00 PM', student: 'Alex Rivera', initials: 'AR', module: 'Module 5: Certification Prep', progress: 80, status: 'final_module' }
    ],
    '2025-12-23': [
      { time: '10:00 AM', student: 'David Kim', initials: 'DK', module: 'Module 2: Intermediate', progress: 40, status: 'on_track' }
    ],
    '2025-12-26': [
      { time: '3:00 PM', student: 'Sarah Johnson', initials: 'SJ', module: 'Module 3: Advanced Applications', progress: 100, status: 'ready_for_cert' }
    ],
    '2025-12-29': [
      { time: '11:00 AM', student: 'Mike Chen', initials: 'MC', module: 'Module 4: Specialization', progress: 60, status: 'on_track' },
      { time: '2:00 PM', student: 'Emma Wilson', initials: 'EW', module: 'Module 1: Foundations', progress: 20, status: 'new' }
    ],
    '2025-12-30': [
      { time: '10:00 AM', student: 'Alex Rivera', initials: 'AR', module: 'Module 5: Certification Prep', progress: 80, status: 'final_module' }
    ]
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
  const accentOrange = '#f97316';

  // Helper functions
  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getSessionsForDate = (date) => {
    const key = formatDateKey(date);
    return sessionsByDate[key] || [];
  };

  const getMonthName = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()];
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
    setSelectedDate(null);
  };

  const goToToday = () => {
    const today = new Date(2025, 11, 8); // Simulated "today"
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(clickedDate);
  };

  const isToday = (day) => {
    const today = new Date(2025, 11, 8); // Simulated "today"
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && 
           currentMonth.getMonth() === selectedDate.getMonth() && 
           currentMonth.getFullYear() === selectedDate.getFullYear();
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[selectedDate.getDay()]}, ${months[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
  };

  // Build calendar grid
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get sessions for selected date
  const selectedSessions = selectedDate ? getSessionsForDate(selectedDate) : [];

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
          fontSize: 20, 
          fontWeight: 700, 
          color: accentBlue,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          ∞ <span style={{ color: textPrimary }}>Teaching</span>
        </div>
        
        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 4,
          flex: 1,
          marginLeft: 32,
          overflowX: 'auto'
        }}>
          {navTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                background: activeTab === tab.id ? (isDarkMode ? '#2f3336' : '#e2e8f0') : 'transparent',
                border: 'none',
                borderRadius: 8,
                color: activeTab === tab.id ? accentBlue : textSecondary,
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              <tab.icon style={{ fontSize: 14 }} />
              {tab.label}
              {tab.badge && (
                <span style={{
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 10,
                  marginLeft: 4
                }}>
                  {tab.badge}
                </span>
              )}
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
          {stInfo.name}
          <FaChevronDown style={{ fontSize: 10, color: textSecondary }} />
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: 24 }}>
        {/* Page Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaCalendarAlt style={{ color: accentBlue, fontSize: 24 }} />
            <div>
              <h1 style={{ 
                fontSize: 22, 
                fontWeight: 700, 
                color: textPrimary, 
                margin: 0 
              }}>
                My Schedule
              </h1>
              <p style={{ 
                fontSize: 14, 
                color: textSecondary, 
                margin: '4px 0 0 0' 
              }}>
                {stInfo.courseName}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <select style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${borderColor}`,
              background: bgSecondary,
              color: textPrimary,
              fontSize: 13,
              cursor: 'pointer'
            }}>
              <option>Month</option>
              <option>Week</option>
            </select>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button 
                onClick={() => navigateMonth(-1)}
                style={{
                  padding: 8,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 8,
                  background: bgSecondary,
                  color: textSecondary,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <FaChevronLeft style={{ fontSize: 12 }} />
              </button>
              <span style={{ 
                padding: '8px 16px',
                fontSize: 15,
                fontWeight: 600,
                color: textPrimary,
                minWidth: 160,
                textAlign: 'center'
              }}>
                {getMonthName(currentMonth)} {currentMonth.getFullYear()}
              </span>
              <button 
                onClick={() => navigateMonth(1)}
                style={{
                  padding: 8,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 8,
                  background: bgSecondary,
                  color: textSecondary,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <FaChevronRight style={{ fontSize: 12 }} />
              </button>
            </div>
            
            <button 
              onClick={goToToday}
              style={{
                padding: '8px 16px',
                border: `1px solid ${borderColor}`,
                borderRadius: 8,
                background: bgSecondary,
                color: textPrimary,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Today
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ 
          display: 'flex', 
          gap: 12, 
          marginBottom: 20,
          flexWrap: 'wrap'
        }}>
          {quickStats.map((stat, index) => (
            <div 
              key={index}
              style={{
                flex: '1 1 200px',
                background: bgCard,
                borderRadius: 12,
                padding: '16px 20px',
                border: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: stat.action ? 'pointer' : 'default'
              }}
            >
              <span style={{ fontSize: 24 }}>{stat.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: 24, 
                  fontWeight: 700, 
                  color: stat.color || textPrimary 
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: textSecondary }}>
                  {stat.label} <span style={{ opacity: 0.7 }}>{stat.sublabel}</span>
                </div>
              </div>
              {stat.action && (
                <span style={{ 
                  fontSize: 13, 
                  color: accentBlue, 
                  fontWeight: 500 
                }}>
                  {stat.action}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{
          background: bgCard,
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
          overflow: 'hidden',
          marginBottom: 20
        }}>
          {/* Day Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            borderBottom: `1px solid ${borderColor}`,
            background: bgSecondary
          }}>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div 
                key={day}
                style={{
                  padding: '12px 8px',
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  color: textSecondary,
                  letterSpacing: '0.5px'
                }}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)'
          }}>
            {calendarDays.map((day, index) => {
              if (day === null) {
                return (
                  <div 
                    key={`empty-${index}`}
                    style={{
                      minHeight: 80,
                      borderBottom: `1px solid ${borderColor}`,
                      borderRight: index % 7 !== 6 ? `1px solid ${borderColor}` : 'none',
                      background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
                    }}
                  />
                );
              }

              const dateForDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const sessions = getSessionsForDate(dateForDay);
              const hasSession = sessions.length > 0;
              const dayIsToday = isToday(day);
              const dayIsSelected = isSelected(day);

              return (
                <div 
                  key={day}
                  onClick={() => handleDateClick(day)}
                  style={{
                    minHeight: 80,
                    padding: 8,
                    borderBottom: `1px solid ${borderColor}`,
                    borderRight: index % 7 !== 6 ? `1px solid ${borderColor}` : 'none',
                    cursor: 'pointer',
                    background: dayIsSelected 
                      ? (isDarkMode ? 'rgba(29, 155, 240, 0.15)' : 'rgba(29, 155, 240, 0.1)')
                      : dayIsToday 
                        ? (isDarkMode ? 'rgba(29, 155, 240, 0.08)' : 'rgba(29, 155, 240, 0.05)')
                        : 'transparent',
                    transition: 'background 0.2s',
                    position: 'relative'
                  }}
                >
                  {/* Day Number */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    fontSize: 14,
                    fontWeight: dayIsToday || dayIsSelected ? 700 : 500,
                    color: dayIsToday ? '#fff' : dayIsSelected ? accentBlue : textPrimary,
                    background: dayIsToday ? accentBlue : 'transparent',
                    marginBottom: 4
                  }}>
                    {day}
                  </div>
                  
                  {/* Session Dots */}
                  {hasSession && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 4,
                      marginTop: 4
                    }}>
                      {sessions.slice(0, 4).map((session, idx) => (
                        <div 
                          key={idx}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: session.status === 'ready_for_cert' ? accentGreen 
                                      : session.status === 'final_module' ? accentOrange 
                                      : accentBlue
                          }}
                          title={`${session.time} - ${session.student}`}
                        />
                      ))}
                      {sessions.length > 4 && (
                        <span style={{ fontSize: 10, color: textSecondary }}>+{sessions.length - 4}</span>
                      )}
                    </div>
                  )}

                  {/* Today Label */}
                  {dayIsToday && (
                    <div style={{
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 9,
                      fontWeight: 600,
                      color: accentBlue,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Today
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details */}
        <div style={{
          background: bgCard,
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
          overflow: 'hidden'
        }}>
          {selectedDate ? (
            <>
              {/* Details Header */}
              <div style={{
                padding: '16px 20px',
                borderBottom: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: bgSecondary
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaClock style={{ color: accentBlue }} />
                  <span style={{ 
                    fontSize: 16, 
                    fontWeight: 700, 
                    color: textPrimary 
                  }}>
                    📆 {formatSelectedDate()}
                  </span>
                </div>
                <span style={{ 
                  fontSize: 14, 
                  color: textSecondary 
                }}>
                  {selectedSessions.length} session{selectedSessions.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {/* Session Cards */}
              <div style={{ padding: 16 }}>
                {selectedSessions.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {selectedSessions.map((session, index) => (
                      <div 
                        key={index}
                        style={{
                          background: bgSecondary,
                          borderRadius: 12,
                          padding: 16,
                          border: `1px solid ${borderColor}`
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 16
                        }}>
                          {/* Avatar */}
                          <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: session.status === 'ready_for_cert' ? accentGreen 
                                      : session.status === 'final_module' ? accentOrange 
                                      : accentBlue,
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 14,
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {session.initials}
                          </div>
                          
                          {/* Info */}
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 8,
                              marginBottom: 4
                            }}>
                              <span style={{ 
                                fontSize: 16, 
                                fontWeight: 700, 
                                color: textPrimary 
                              }}>
                                {session.time}
                              </span>
                              <span style={{ 
                                fontSize: 16, 
                                fontWeight: 600, 
                                color: textPrimary 
                              }}>
                                {session.student}
                              </span>
                            </div>
                            <div style={{ 
                              fontSize: 14, 
                              color: textSecondary,
                              marginBottom: 12
                            }}>
                              {session.module}
                            </div>
                            
                            {/* Progress Bar */}
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 12,
                              marginBottom: 8
                            }}>
                              <span style={{ fontSize: 12, color: textSecondary }}>Progress:</span>
                              <div style={{
                                flex: 1,
                                maxWidth: 200,
                                height: 8,
                                background: isDarkMode ? '#2f3336' : '#e2e8f0',
                                borderRadius: 4,
                                overflow: 'hidden'
                              }}>
                                <div style={{
                                  width: `${session.progress}%`,
                                  height: '100%',
                                  background: session.progress === 100 ? accentGreen : accentBlue,
                                  borderRadius: 4
                                }} />
                              </div>
                              <span style={{ 
                                fontSize: 13, 
                                fontWeight: 600,
                                color: session.progress === 100 ? accentGreen : textSecondary
                              }}>
                                {session.progress}%
                              </span>
                              
                              {/* Status Badge */}
                              {session.status === 'ready_for_cert' && (
                                <span style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: accentGreen,
                                  background: isDarkMode ? 'rgba(0, 186, 124, 0.15)' : 'rgba(0, 186, 124, 0.1)',
                                  padding: '4px 10px',
                                  borderRadius: 6
                                }}>
                                  📝 Ready for certification
                                </span>
                              )}
                              {session.status === 'on_track' && (
                                <span style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: accentBlue,
                                  background: isDarkMode ? 'rgba(29, 155, 240, 0.15)' : 'rgba(29, 155, 240, 0.1)',
                                  padding: '4px 10px',
                                  borderRadius: 6
                                }}>
                                  📚 On track
                                </span>
                              )}
                              {session.status === 'final_module' && (
                                <span style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: accentOrange,
                                  background: 'rgba(249, 115, 22, 0.15)',
                                  padding: '4px 10px',
                                  borderRadius: 6
                                }}>
                                  🎯 Final module
                                </span>
                              )}
                              {session.status === 'new' && (
                                <span style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: '#a855f7',
                                  background: 'rgba(168, 85, 247, 0.15)',
                                  padding: '4px 10px',
                                  borderRadius: 6
                                }}>
                                  🆕 New student
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 8,
                            flexShrink: 0
                          }}>
                            {session.startsIn && (
                              <span style={{ 
                                fontSize: 12, 
                                color: session.canJoin ? accentGreen : textSecondary,
                                fontWeight: session.canJoin ? 600 : 400
                              }}>
                                {session.canJoin ? '🟢 ' : ''}Starts in {session.startsIn}
                              </span>
                            )}
                            <div style={{ display: 'flex', gap: 8 }}>
                              {session.canJoin ? (
                                <button style={{
                                  padding: '10px 20px',
                                  background: accentGreen,
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: 8,
                                  fontSize: 13,
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 6
                                }}>
                                  <FaVideo style={{ fontSize: 12 }} />
                                  Join Session
                                </button>
                              ) : (
                                <button style={{
                                  padding: '10px 20px',
                                  background: 'transparent',
                                  color: textSecondary,
                                  border: `1px solid ${borderColor}`,
                                  borderRadius: 8,
                                  fontSize: 13,
                                  fontWeight: 500,
                                  cursor: 'pointer'
                                }}>
                                  Prepare
                                </button>
                              )}
                              <button style={{
                                padding: '10px 16px',
                                background: 'transparent',
                                color: accentBlue,
                                border: `1px solid ${borderColor}`,
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 500,
                                cursor: 'pointer'
                              }}>
                                View Student
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: textSecondary
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>No sessions scheduled</div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>This day is open for new bookings</div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: textSecondary
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>👆</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Click on a day to view session details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentTeacherDashboard;
