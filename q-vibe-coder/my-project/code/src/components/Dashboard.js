import React, { useState } from 'react';
import './Dashboard.css';
import { FaArrowLeft, FaVideo, FaComment, FaTimes, FaCalendarAlt, FaGraduationCap, FaEnvelope, FaSearch } from 'react-icons/fa';
import { getCourseById, getInstructorById } from '../data/database';

const Dashboard = ({ isDarkMode, currentUser, onMenuChange, purchasedCourses = [], onViewCourse }) => {
  const [activeView, setActiveView] = useState('learning'); // 'learning' or 'teaching'
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'students', 'earnings', 'availability'
  const [isAvailable, setIsAvailable] = useState(true);
  const [availabilitySlots, setAvailabilitySlots] = useState({});

  // Handle course click - navigate to course detail
  const handleCourseClick = (courseId) => {
    if (onViewCourse) {
      onViewCourse(courseId);
    }
  };

  // Check if user is new (no courses purchased)
  const isNewUser = currentUser?.isNewUser || false;
  const hasPurchasedCourses = purchasedCourses && purchasedCourses.length > 0;

  // Build courses in progress from purchased courses
  const coursesInProgress = purchasedCourses.map((courseId, index) => {
    const course = getCourseById(courseId);
    if (!course) return null;
    const instructor = getInstructorById(course.instructorId);
    return {
      id: course.id,
      title: course.title,
      instructor: instructor?.name || 'Unknown Instructor',
      progress: 0, // New purchases start at 0%
      module: 1,
      totalModules: course.modules?.length || 6
    };
  }).filter(Boolean);

  // Learning stats based on purchased courses
  const learningStats = {
    inProgress: coursesInProgress.length,
    completed: 0,
    certificates: 0
  };

  // For new users with no purchases, teaching data is empty
  // For existing users, use demo data
  const teachingStats = (isNewUser && !hasPurchasedCourses) ? {
    pendingEarnings: 0,
    studentCount: 0,
    sessionsThisWeek: 0
  } : {
    pendingEarnings: 420,
    studentCount: 4,
    sessionsThisWeek: 8
  };

  const myStudents = (isNewUser && !hasPurchasedCourses) ? [] : [
    { id: 1, name: 'John Miller', initials: 'JM', course: 'Python Basics', module: 3, totalModules: 6, progress: 50, color: 'blue' },
    { id: 2, name: 'Sarah Kim', initials: 'SK', course: 'Data Analysis', module: 6, totalModules: 6, progress: 100, complete: true, color: 'pink' },
    { id: 3, name: 'Emily Zhang', initials: 'EZ', course: 'Python Basics', module: 1, totalModules: 6, progress: 17, color: 'green' },
    { id: 4, name: 'Michael Roberts', initials: 'MR', course: 'Data Analysis', module: 4, totalModules: 6, progress: 67, color: 'orange' },
  ];

  const teachingSessions = (isNewUser && !hasPurchasedCourses) ? {
    today: [],
    upcoming: []
  } : {
    today: [
      { id: 1, time: '2:00 PM', title: 'Python Basics', student: 'John Miller', module: 'Module 3' }
    ],
    upcoming: [
      { id: 2, time: 'Thu 4pm', title: 'Data Analysis Fundamentals', type: 'Group Session', students: 4 },
      { id: 3, time: 'Sat 11am', title: 'Python Basics', student: 'Emily Zhang', module: 'Module 1' }
    ]
  };

  // Learning sessions - empty for new users (no scheduled sessions yet)
  const learningSessions = [];

  const earningsData = (isNewUser && !hasPurchasedCourses) ? {
    pending: 0,
    thisMonth: 0,
    allTime: 0,
    nextPayoutDate: null,
    nextPayoutAmount: 0,
    commissionRate: 70,
    transactions: []
  } : {
    pending: 420,
    thisMonth: 1680,
    allTime: 2520,
    nextPayoutDate: 'Dec 20, 2025',
    nextPayoutAmount: 380,
    commissionRate: 70,
    transactions: [
      { id: 1, type: '1-on-1', course: 'Python', student: 'John Miller', amount: 70, date: 'Dec 7, 2025' },
      { id: 2, type: 'Group', course: 'Data Analysis', students: 4, amount: 140, date: 'Dec 5, 2025' },
      { id: 3, type: '1-on-1', course: 'Python', student: 'Sarah Kim', amount: 70, date: 'Dec 3, 2025' }
    ]
  };

  const alerts = (isNewUser && !hasPurchasedCourses) ? [] : [
    { id: 1, icon: '🎓', text: 'Sarah Kim ready for certification', action: 'Review', actionType: 'students' },
    { id: 2, icon: '💬', text: '2 unread messages', action: 'View', actionType: 'messages' }
  ];

  // Check if dashboard should show empty state
  const hasNoLearningContent = coursesInProgress.length === 0;
  const hasNoTeachingContent = teachingSessions.today.length === 0 && teachingSessions.upcoming.length === 0 && myStudents.length === 0;

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const toggleSlot = (day, hour) => {
    const key = `${day}-${hour}`;
    setAvailabilitySlots(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const formatHour = (hour) => {
    if (hour === 12) return '12pm';
    return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
  };

  // Render sub-pages
  if (currentPage === 'students') {
    return (
      <div className={`dashboard-container ${isDarkMode ? 'dark' : ''}`}>
        <div className="back-link" onClick={() => setCurrentPage('main')}>
          <FaArrowLeft /> Dashboard
        </div>
        <div className="page-title">My Students</div>
        <div className="section">
          <div className="section-header">
            <span className="section-title-label">{myStudents.length} Active Students</span>
          </div>
          {myStudents.map(student => (
            <div key={student.id} className="student-card">
              <div className={`student-avatar ${student.color}`}>{student.initials}</div>
              <div className="student-info">
                <div className="student-name">{student.name}</div>
                <div className="student-course">
                  {student.course} · {student.complete ? 'Complete ✓' : `Module ${student.module} of ${student.totalModules} · ${student.progress}%`}
                </div>
              </div>
              <div className="student-actions">
                {student.complete ? (
                  <button className="btn btn-cert btn-sm">Recommend for Cert</button>
                ) : (
                  <button className="btn btn-secondary btn-sm">Message</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentPage === 'earnings') {
    return (
      <div className={`dashboard-container ${isDarkMode ? 'dark' : ''}`}>
        <div className="back-link" onClick={() => setCurrentPage('main')}>
          <FaArrowLeft /> Dashboard
        </div>
        <div className="page-title">Earnings</div>
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value money">${earningsData.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">${earningsData.thisMonth.toLocaleString()}</div>
            <div className="stat-label">This Month</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">${earningsData.allTime.toLocaleString()}</div>
            <div className="stat-label">All Time</div>
          </div>
        </div>
        <div className="section">
          <div className="section-header">
            <span className="section-title-label">Payout Info</span>
          </div>
          <div className="earnings-card">
            <div className="earnings-row">
              <span className="earnings-label">Commission Rate</span>
              <span className="earnings-value">{earningsData.commissionRate}%</span>
            </div>
            <div className="earnings-row">
              <span className="earnings-label">Next Payout Date</span>
              <span className="earnings-value">{earningsData.nextPayoutDate}</span>
            </div>
            <div className="earnings-row">
              <span className="earnings-label">Next Payout Amount</span>
              <span className="earnings-value highlight">${earningsData.nextPayoutAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="section-header">
            <span className="section-title-label">Recent Transactions</span>
          </div>
          {earningsData.transactions.map(tx => (
            <div key={tx.id} className="earnings-card" style={{ marginBottom: 8 }}>
              <div className="earnings-row">
                <span className="earnings-label">
                  {tx.type} · {tx.course} · {tx.student || `${tx.students} students`}
                </span>
                <span className="earnings-value highlight">+${tx.amount}</span>
              </div>
              <div className="payout-info">{tx.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentPage === 'availability') {
    return (
      <div className={`dashboard-container ${isDarkMode ? 'dark' : ''}`}>
        <div className="back-link" onClick={() => setCurrentPage('main')}>
          <FaArrowLeft /> Dashboard
        </div>
        <div className="page-title">Set Availability</div>
        <div className="section">
          <p className="availability-instructions">
            Click time slots to toggle availability. Students can only book during green times.
          </p>
          <div className="weekly-grid">
            <div className="week-header">
              <div className="time-label"></div>
              {dayLabels.map(day => (
                <div key={day} className="day-label">{day}</div>
              ))}
            </div>
            {hours.map(hour => (
              <div key={hour} className="time-row">
                <div className="time-label">{formatHour(hour)}</div>
                {days.map(day => (
                  <div
                    key={`${day}-${hour}`}
                    className={`slot ${availabilitySlots[`${day}-${hour}`] ? 'available' : ''}`}
                    onClick={() => toggleSlot(day, hour)}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="availability-legend">
            <div className="legend-item">
              <div className="legend-box available"></div>
              Available
            </div>
            <div className="legend-item">
              <div className="legend-box"></div>
              Unavailable
            </div>
          </div>
          <button className="btn btn-primary btn-full" onClick={() => setCurrentPage('main')}>
            Save Availability
          </button>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Header with Toggle */}
      <div className="dashboard-header-v4">
        <div className="header-top">
          <div className="header-title">Dashboard</div>
          <div
            className={`availability-toggle ${!isAvailable ? 'unavailable' : ''}`}
            onClick={() => setIsAvailable(!isAvailable)}
          >
            <span className="availability-dot"></span>
            <span className="availability-text">{isAvailable ? 'Available' : 'Unavailable'}</span>
          </div>
        </div>
        <div className="toggle-container">
          <button
            className={`toggle-btn ${activeView === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveView('learning')}
          >
            Learning
          </button>
          <button
            className={`toggle-btn ${activeView === 'teaching' ? 'active' : ''}`}
            onClick={() => setActiveView('teaching')}
          >
            Teaching
          </button>
        </div>
      </div>

      <div className="scroll-area">
        {/* Teaching View */}
        {activeView === 'teaching' && (
          <div className="content-view">
            {/* Empty State for New Users */}
            {hasNoTeachingContent ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FaGraduationCap />
                </div>
                <h3 className="empty-state-title">No teaching activity yet</h3>
                <p className="empty-state-text">
                  Once you start teaching, your students and scheduled sessions will appear here.
                </p>
                <button
                  className="btn btn-primary btn-large"
                  onClick={() => setCurrentPage('availability')}
                >
                  Set Your Availability
                </button>
              </div>
            ) : (
              <>
                {/* Stats - Text Style */}
                <div className="stats-text">
                  <span className="stat-item">
                    <strong className="stat-num money">${teachingStats.pendingEarnings}</strong> pending
                  </span>
                  <span className="stat-divider">·</span>
                  <span className="stat-item">
                    <strong className="stat-num">{teachingStats.studentCount}</strong> students
                  </span>
                  <span className="stat-divider">·</span>
                  <span className="stat-item">
                    <strong className="stat-num">{teachingStats.sessionsThisWeek}</strong> sessions this week
                  </span>
                </div>

                {/* Availability Card - Prominent */}
                <div className="section" style={{ paddingBottom: 0 }}>
                  <div className="availability-card" onClick={() => setCurrentPage('availability')}>
                    <div className="avail-card-left">
                      <div className="avail-card-icon"><FaCalendarAlt /></div>
                      <div className="avail-card-content">
                        <div className="avail-card-title">Weekly Availability</div>
                        <div className="avail-card-desc">Set when students can book sessions with you</div>
                      </div>
                    </div>
                    <button className="btn btn-primary">Set Hours</button>
                  </div>
                </div>

                {/* Action Needed */}
                {alerts.length > 0 && (
                  <div className="alert-section">
                    <div className="section-label-alert">Action Needed</div>
                    {alerts.map(alert => (
                      <div key={alert.id} className="alert-card">
                        <span className="alert-icon">{alert.icon}</span>
                        <span className="alert-text">{alert.text}</span>
                        <button
                          className="alert-action"
                          onClick={() => alert.actionType === 'students' && setCurrentPage('students')}
                        >
                          {alert.action}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Today's Sessions */}
                {teachingSessions.today.length > 0 && (
                  <div className="section">
                    <div className="section-header">
                      <span className="section-title-label">Today's Sessions</span>
                    </div>
                    {teachingSessions.today.map(session => (
                      <div key={session.id} className="session-card today">
                        <div className="session-top">
                          <span className="session-time">{session.time}</span>
                          <div className="session-indicator teaching"></div>
                          <div className="session-info">
                            <div className="session-title">{session.title}</div>
                            <div className="session-with">{session.student} · {session.module}</div>
                          </div>
                        </div>
                        <div className="session-actions">
                          <button className="btn btn-primary"><FaVideo style={{ marginRight: 6 }} />Join BBB</button>
                          <button className="btn btn-secondary"><FaComment style={{ marginRight: 6 }} />Message</button>
                          <button className="btn btn-danger"><FaTimes style={{ marginRight: 6 }} />Cancel</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upcoming */}
                {teachingSessions.upcoming.length > 0 && (
                  <div className="section">
                    <div className="section-header">
                      <span className="section-title-label">Upcoming</span>
                    </div>
                    {teachingSessions.upcoming.map(session => (
                      <div key={session.id} className="session-card">
                        <div className="session-top">
                          <span className="session-time">{session.time}</span>
                          <div className="session-indicator teaching"></div>
                          <div className="session-info">
                            <div className="session-title">{session.title}</div>
                            <div className="session-with">
                              {session.type ? `${session.type} · ${session.students} students` : `${session.student} · ${session.module}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* My Students */}
                {myStudents.length > 0 && (
                  <div className="section">
                    <div className="section-header">
                      <span className="section-title-label">My Students</span>
                      <span className="section-link" onClick={() => setCurrentPage('students')}>View All →</span>
                    </div>
                    {myStudents.slice(0, 3).map(student => (
                      <div key={student.id} className="student-card">
                        <div className={`student-avatar ${student.color}`}>{student.initials}</div>
                        <div className="student-info">
                          <div className="student-name">{student.name}</div>
                          <div className="student-course">
                            {student.course} · {student.complete ? 'Complete ✓' : `Module ${student.module} of ${student.totalModules}`}
                          </div>
                        </div>
                        <div className="student-actions">
                          {student.complete ? (
                            <button className="btn btn-cert btn-sm">Recommend</button>
                          ) : (
                            <button className="btn btn-secondary btn-sm">Message</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Earnings */}
                {earningsData.allTime > 0 && (
                  <div className="section">
                    <div className="section-header">
                      <span className="section-title-label">Earnings</span>
                      <span className="section-link" onClick={() => setCurrentPage('earnings')}>View All →</span>
                    </div>
                    <div className="earnings-card">
                      <div className="earnings-row">
                        <span className="earnings-label">Pending Balance</span>
                        <span className="earnings-value highlight">${earningsData.pending.toFixed(2)}</span>
                      </div>
                      <div className="earnings-row">
                        <span className="earnings-label">This Month</span>
                        <span className="earnings-value">${earningsData.thisMonth.toLocaleString()}.00</span>
                      </div>
                      <div className="earnings-row">
                        <span className="earnings-label">All Time</span>
                        <span className="earnings-value">${earningsData.allTime.toLocaleString()}.00</span>
                      </div>
                      <div className="earnings-divider"></div>
                      <div className="payout-info">
                        Next payout: {earningsData.nextPayoutDate} · ${earningsData.nextPayoutAmount.toFixed(2)} ({earningsData.commissionRate}%)
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Learning View */}
        {activeView === 'learning' && (
          <div className="content-view">
            {/* Empty State for New Users */}
            {hasNoLearningContent ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FaSearch />
                </div>
                <h3 className="empty-state-title">No courses yet</h3>
                <p className="empty-state-text">
                  Browse courses and enroll to start learning. Your scheduled sessions will appear here.
                </p>
                <button
                  className="btn btn-primary btn-large"
                  onClick={() => onMenuChange && onMenuChange('Browse')}
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <>
                {/* Stats - Text Style */}
                <div className="stats-text">
                  <span className="stat-item">
                    <strong className="stat-num">{learningStats.inProgress}</strong> in progress
                  </span>
                  <span className="stat-divider">·</span>
                  <span className="stat-item">
                    <strong className="stat-num">{learningStats.completed}</strong> completed
                  </span>
                  <span className="stat-divider">·</span>
                  <span className="stat-item">
                    <strong className="stat-num">{learningStats.certificates}</strong> certificates
                  </span>
                </div>

                {/* Upcoming Learning Sessions */}
                {learningSessions.length > 0 && (
                  <div className="section">
                    <div className="section-header">
                      <span className="section-title-label">Upcoming Sessions</span>
                    </div>
                    {learningSessions.map(session => (
                      <div key={session.id} className="session-card">
                        <div className="session-top">
                          <span className="session-time">{session.time}</span>
                          <div className="session-indicator learning"></div>
                          <div className="session-info">
                            <div className="session-title">{session.title}</div>
                            <div className="session-with">with {session.instructor} · {session.module}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Courses in Progress */}
                {coursesInProgress.length > 0 && (
                  <div className="section">
                    <div className="section-header">
                      <span className="section-title-label">Courses in Progress</span>
                    </div>
                    {coursesInProgress.map(course => (
                      <div
                        key={course.id}
                        className="course-card clickable"
                        onClick={() => handleCourseClick(course.id)}
                      >
                        <div className="course-header">
                          <div>
                            <div className="course-title">{course.title}</div>
                            <div className="course-instructor">by {course.instructor}</div>
                          </div>
                          <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); handleCourseClick(course.id); }}>Continue</button>
                        </div>
                        <div className="dashboard-progress-bar">
                          <div className="dashboard-progress-fill" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <div className="dashboard-progress-text">Module {course.module} of {course.totalModules} · {course.progress}%</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
