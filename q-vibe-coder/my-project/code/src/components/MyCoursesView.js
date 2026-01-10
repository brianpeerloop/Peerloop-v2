import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaBook, FaSearch, FaCheckCircle, FaPlay } from 'react-icons/fa';
import { AiOutlineStar, AiOutlineTeam, AiOutlineClockCircle } from 'react-icons/ai';
import { getInstructorById } from '../data/database';

/**
 * MyCoursesView - Displays the user's purchased courses with progress tracking
 * Similar layout to BrowseView but only shows purchased courses
 */
const MyCoursesView = ({
  isDarkMode,
  currentUser,
  onMenuChange,
  purchasedCourses,
  indexedCourses,
  onViewCourse
}) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'inprogress', or 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  // Get full course data for purchased courses
  const myCoursesData = purchasedCourses.map(purchasedId => {
    const course = indexedCourses.find(c => c.id === purchasedId);
    if (!course) return null;

    // Mock progress data - in a real app this would come from user data
    const mockProgress = {
      [purchasedId]: Math.floor(Math.random() * 100)
    };

    return {
      ...course,
      progress: mockProgress[purchasedId] || Math.floor(Math.random() * 100),
      lessonsCompleted: Math.floor(Math.random() * 20),
      totalLessons: 20,
      lastAccessed: '2 days ago'
    };
  }).filter(Boolean);

  // Separate in-progress and completed (before search filter for counts)
  const allInProgressCourses = myCoursesData.filter(c => c.progress < 100);
  const allCompletedCourses = myCoursesData.filter(c => c.progress === 100);

  // Filter courses based on tab and search
  const filteredCourses = myCoursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'inprogress') {
      return matchesSearch && course.progress < 100;
    }
    if (activeTab === 'completed') {
      return matchesSearch && course.progress === 100;
    }
    return matchesSearch;
  });

  // Separate in-progress and completed for display
  const inProgressCourses = filteredCourses.filter(c => c.progress < 100);
  const completedCourses = filteredCourses.filter(c => c.progress === 100);

  const renderCourseCard = (course) => {
    const instructorData = getInstructorById(course.instructorId);
    const isCompleted = course.progress === 100;

    return (
      <div
        key={course.id}
        className="course-post"
        onClick={() => onViewCourse && onViewCourse(course.id)}
        style={{
          background: isDarkMode ? '#16181c' : '#fff',
          borderRadius: 16,
          border: isDarkMode ? '1px solid #2f3336' : '1px solid #e5e7eb',
          padding: 0,
          marginBottom: 0,
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {/* Left Column - Course Info */}
        <div style={{ flex: 1, padding: 16, minWidth: 0 }}>
          {/* Status Badge */}
          <span style={{
            display: 'inline-block',
            background: isCompleted
              ? (isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7')
              : (isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe'),
            color: isCompleted ? '#22c55e' : '#3b82f6',
            padding: '4px 10px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            width: 'fit-content'
          }}>
            {isCompleted ? (
              <>
                <FaCheckCircle style={{ fontSize: 12 }} />
                COMPLETED
              </>
            ) : (
              <>
                <FaPlay style={{ fontSize: 10 }} />
                IN PROGRESS
              </>
            )}
          </span>

          {/* Title */}
          <h3 style={{
            fontSize: 18,
            fontWeight: 700,
            color: isDarkMode ? '#e7e9ea' : '#111827',
            margin: '0 0 4px 0',
            lineHeight: 1.3
          }}>
            {course.title}
          </h3>

          {/* Instructor + Duration + Go to Community */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            color: isDarkMode ? '#9ca3af' : '#6b7280',
            marginBottom: 8
          }}>
            <span>{instructorData?.name}</span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <AiOutlineClockCircle style={{ fontSize: 14 }} />
              {course.duration}
            </span>
            <span>·</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                localStorage.setItem('pendingCommunityCreator', JSON.stringify({
                  id: `creator-${course.instructorId}`,
                  name: instructorData?.name || 'Creator'
                }));
                if (onMenuChange) onMenuChange('My Community');
              }}
              style={{
                color: '#10b981',
                cursor: 'pointer',
                fontWeight: 500
              }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >
              Go to Community →
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: isDarkMode ? '#d1d5db' : '#374151',
            margin: '0 0 10px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {course.description}
          </p>

          {/* Stats Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 12
          }}>
            {/* Rating Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[...Array(5)].map((_, i) => (
                <AiOutlineStar
                  key={i}
                  style={{
                    color: i < Math.floor(course.rating) ? '#fbbf24' : (isDarkMode ? '#4b5563' : '#d1d5db'),
                    fontSize: 16
                  }}
                />
              ))}
              <span style={{
                marginLeft: 4,
                fontSize: 14,
                color: isDarkMode ? '#9ca3af' : '#6b7280'
              }}>
                {course.rating}
              </span>
            </div>

            {/* Students */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 14,
              color: isDarkMode ? '#9ca3af' : '#6b7280'
            }}>
              <AiOutlineTeam style={{ fontSize: 16 }} />
              {course.students?.toLocaleString()} students
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: 12 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6
            }}>
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: isDarkMode ? '#e7e9ea' : '#374151'
              }}>
                Progress: {course.progress}%
              </span>
              <span style={{
                fontSize: 12,
                color: isDarkMode ? '#9ca3af' : '#6b7280'
              }}>
                {course.lessonsCompleted}/{course.totalLessons} lessons
              </span>
            </div>
            <div style={{
              width: '100%',
              height: 8,
              background: isDarkMode ? '#374151' : '#e5e7eb',
              borderRadius: 4,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${course.progress}%`,
                height: '100%',
                background: isCompleted
                  ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                  : 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                borderRadius: 4,
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {isCompleted ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle review
                  }}
                  style={{
                    background: isDarkMode ? '#374151' : '#f3f4f6',
                    color: isDarkMode ? '#e7e9ea' : '#374151',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  Review
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle certificate
                  }}
                  style={{
                    background: '#22c55e',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  Get Certificate
                </button>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewCourse && onViewCourse(course.id);
                }}
                style={{
                  background: '#1d9bf0',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: 20,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                Continue →
              </button>
            )}
          </div>
        </div>

        {/* Right Column - About the Community */}
        <div
          className="course-card-creator-sidebar"
          style={{
            width: 280,
            flexShrink: 0,
            padding: 24,
            background: isDarkMode ? '#1f2937' : '#f9fafb',
            borderLeft: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <h4 style={{
            fontSize: 13,
            fontWeight: 600,
            color: isDarkMode ? '#9ca3af' : '#6b7280',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            About the Community
          </h4>

          {/* Bio Quote */}
          <p style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: isDarkMode ? '#d1d5db' : '#374151',
            fontStyle: 'italic',
            margin: '0 0 16px 0',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            "{instructorData?.bio || 'Expert instructor dedicated to helping students master new skills.'}"
          </p>

          {/* Creator Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 'auto'
          }}>
            <img
              src={instructorData?.avatar}
              alt={instructorData?.name}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                objectFit: 'cover',
                border: isDarkMode ? '2px solid #374151' : '2px solid #e5e7eb'
              }}
            />
            <div>
              <div style={{
                fontWeight: 600,
                fontSize: 15,
                color: isDarkMode ? '#e7e9ea' : '#111827'
              }}>
                {instructorData?.name}
              </div>
              <div style={{
                fontSize: 13,
                color: isDarkMode ? '#9ca3af' : '#6b7280',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {instructorData?.title || 'Expert Instructor'}
              </div>
            </div>
          </div>

          {/* View Profile Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to creator profile
            }}
            style={{
              marginTop: 12,
              padding: '8px 20px',
              borderRadius: 20,
              background: 'transparent',
              color: '#1d9bf0',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid #1d9bf0',
              transition: 'all 0.2s ease'
            }}
          >
            View Profile
          </button>
        </div>
      </div>
    );
  };

  // Empty state
  if (myCoursesData.length === 0) {
    return (
      <div className="main-content">
        <div className="three-column-layout browse-layout">
          <div className="center-column">
            <div style={{
              padding: '60px 20px',
              textAlign: 'center'
            }}>
              <FaBook style={{
                fontSize: 64,
                color: isDarkMode ? '#374151' : '#d1d5db',
                marginBottom: 16
              }} />
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                color: isDarkMode ? '#e7e9ea' : '#111827',
                marginBottom: 8
              }}>
                No courses yet
              </h2>
              <p style={{
                fontSize: 16,
                color: isDarkMode ? '#9ca3af' : '#6b7280',
                marginBottom: 24
              }}>
                Browse our catalog and enroll in your first course!
              </p>
              <button
                onClick={() => onMenuChange && onMenuChange('Browse')}
                style={{
                  background: '#1d9bf0',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: 24,
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer'
                }}
              >
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="three-column-layout browse-layout">
        <div className="center-column">
          {/* Header Tabs */}
          <div className="top-menu-section" style={{
            borderBottom: isDarkMode ? '1px solid #2f3336' : '1px solid #eff3f4',
            padding: '0 16px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: isDarkMode ? '#000' : '#fff',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            flexWrap: 'nowrap',
            minHeight: 52
          }}>
            {/* Left spacer */}
            <div style={{ flex: '1 1 0', minWidth: 0, maxWidth: 150 }} />

            {/* Centered tabs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flex: '0 0 auto'
            }}>
              <button
                onClick={() => setActiveTab('all')}
                style={{
                  flex: '0 0 auto',
                  padding: '16px 12px',
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === 'all'
                    ? (isDarkMode ? '#e7e9ea' : '#0f1419')
                    : (isDarkMode ? '#71767b' : '#536471'),
                  fontWeight: activeTab === 'all' ? 700 : 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  position: 'relative',
                  borderBottom: activeTab === 'all'
                    ? '4px solid #1d9bf0'
                    : '4px solid transparent',
                  marginBottom: -1,
                  whiteSpace: 'nowrap'
                }}
              >
                <span>All Courses ({myCoursesData.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('inprogress')}
                style={{
                  flex: '0 0 auto',
                  padding: '16px 12px',
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === 'inprogress'
                    ? (isDarkMode ? '#e7e9ea' : '#0f1419')
                    : (isDarkMode ? '#71767b' : '#536471'),
                  fontWeight: activeTab === 'inprogress' ? 700 : 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  position: 'relative',
                  borderBottom: activeTab === 'inprogress'
                    ? '4px solid #1d9bf0'
                    : '4px solid transparent',
                  marginBottom: -1,
                  whiteSpace: 'nowrap'
                }}
              >
                <span>In Progress ({allInProgressCourses.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                style={{
                  flex: '0 0 auto',
                  padding: '16px 12px',
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === 'completed'
                    ? (isDarkMode ? '#e7e9ea' : '#0f1419')
                    : (isDarkMode ? '#71767b' : '#536471'),
                  fontWeight: activeTab === 'completed' ? 700 : 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  position: 'relative',
                  borderBottom: activeTab === 'completed'
                    ? '4px solid #1d9bf0'
                    : '4px solid transparent',
                  marginBottom: -1,
                  whiteSpace: 'nowrap'
                }}
              >
                <span>Completed ({allCompletedCourses.length})</span>
              </button>
            </div>

            {/* Search box on right */}
            <div style={{
              flex: '1 1 0',
              minWidth: 80,
              maxWidth: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
              <div className="search-container" style={{ width: '100%', marginLeft: 0 }}>
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          {/* Course List */}
          <div className="browse-content">
            <div className="courses-feed">
              {activeTab === 'all' ? (
                <>
                  {/* In Progress Section */}
                  {inProgressCourses.length > 0 && (
                    <>
                      {inProgressCourses.map(course => renderCourseCard(course))}
                    </>
                  )}

                  {/* Completed Section */}
                  {completedCourses.length > 0 && (
                    <>
                      {completedCourses.map(course => renderCourseCard(course))}
                    </>
                  )}
                </>
              ) : activeTab === 'inprogress' ? (
                <>
                  {inProgressCourses.length > 0 ? (
                    inProgressCourses.map(course => renderCourseCard(course))
                  ) : (
                    <div style={{
                      padding: '40px 20px',
                      textAlign: 'center',
                      color: isDarkMode ? '#9ca3af' : '#6b7280'
                    }}>
                      <FaPlay style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }} />
                      <p>No courses in progress. Start a new course!</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {completedCourses.length > 0 ? (
                    completedCourses.map(course => renderCourseCard(course))
                  ) : (
                    <div style={{
                      padding: '40px 20px',
                      textAlign: 'center',
                      color: isDarkMode ? '#9ca3af' : '#6b7280'
                    }}>
                      <FaCheckCircle style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }} />
                      <p>No completed courses yet. Keep learning!</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyCoursesView.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  onMenuChange: PropTypes.func,
  purchasedCourses: PropTypes.array.isRequired,
  indexedCourses: PropTypes.array.isRequired,
  onViewCourse: PropTypes.func
};

export default MyCoursesView;
