import React, { useState } from 'react';
import { FaBook, FaCalendarAlt, FaUser, FaChevronDown, FaVideo, FaStar, FaArrowRight } from 'react-icons/fa';
import { getCourseById, getInstructorById } from '../data/database';

const StudentDashboard = ({ isDarkMode, currentUser, onMenuChange, purchasedCourses = [], onViewCourse }) => {
  const [activeTab, setActiveTab] = useState('my-course');

  // Check if user has any purchased courses
  const hasCourses = purchasedCourses && purchasedCourses.length > 0;

  // Build all courses with their data
  const allCourses = purchasedCourses.map(courseId => {
    const course = getCourseById(Number(courseId));
    if (!course) return null;
    const instructor = getInstructorById(course.instructorId);
    const courseStudentTeachers = course.studentTeachers || [];
    const assignedST = courseStudentTeachers.length > 0 ? courseStudentTeachers[0] : null;

    return {
      ...course,
      instructorName: instructor?.name || 'Unknown Instructor',
      progress: Math.floor(Math.random() * 60) + 20, // Demo progress 20-80%
      studentTeacher: assignedST ? {
        name: assignedST.name,
        role: 'Certified Student-Teacher',
        rating: 4.9,
        studentsTaught: assignedST.studentsTaught || 0
      } : null
    };
  }).filter(Boolean);

  // Get the first course with a student-teacher for the upcoming session demo
  const courseWithST = allCourses.find(c => c.studentTeacher);
  const upcomingSession = courseWithST ? {
    date: 'Tuesday, December 10',
    time: '7:00 PM CST',
    with: courseWithST.studentTeacher.name,
    courseName: courseWithST.title,
    location: 'Video Session (BigBlueButton)',
    startsIn: '2 days, 4 hours'
  } : null;

  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      {/* Top Sub-Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        borderBottom: `1px solid ${isDarkMode ? '#2f3336' : '#eff3f4'}`,
        background: isDarkMode ? '#16181c' : '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Logo */}
          <div style={{
            fontSize: '24px',
            color: '#1d9bf0',
            fontWeight: '700'
          }}>
            ∞
          </div>

          {/* Nav Items */}
          <button
            onClick={() => setActiveTab('my-course')}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 12px',
              fontSize: '14px',
              fontWeight: activeTab === 'my-course' ? '600' : '400',
              color: activeTab === 'my-course' ? '#1d9bf0' : (isDarkMode ? '#e7e9ea' : '#0f1419'),
              cursor: 'pointer',
              borderBottom: activeTab === 'my-course' ? '2px solid #1d9bf0' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FaBook style={{ fontSize: '12px' }} />
            My Course
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 12px',
              fontSize: '14px',
              fontWeight: activeTab === 'schedule' ? '600' : '400',
              color: activeTab === 'schedule' ? '#1d9bf0' : (isDarkMode ? '#e7e9ea' : '#0f1419'),
              cursor: 'pointer',
              borderBottom: activeTab === 'schedule' ? '2px solid #1d9bf0' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FaCalendarAlt style={{ fontSize: '12px' }} />
            Schedule
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 12px',
              fontSize: '14px',
              fontWeight: activeTab === 'profile' ? '600' : '400',
              color: activeTab === 'profile' ? '#1d9bf0' : (isDarkMode ? '#e7e9ea' : '#0f1419'),
              cursor: 'pointer',
              borderBottom: activeTab === 'profile' ? '2px solid #1d9bf0' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FaUser style={{ fontSize: '12px' }} />
            Profile
          </button>
        </div>

        {/* User Dropdown */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '20px',
          color: isDarkMode ? '#e7e9ea' : '#0f1419'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#1d9bf0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {currentUser?.name?.charAt(0) || 'S'}
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>
            {currentUser?.name?.split(' ')[0] || 'Sarah'}
          </span>
          <FaChevronDown style={{ fontSize: '10px', opacity: 0.7 }} />
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px' }}>
        {/* Welcome Message */}
        <div style={{
          fontSize: '24px',
          fontWeight: '600',
          color: isDarkMode ? '#e7e9ea' : '#0f1419',
          marginBottom: '24px'
        }}>
          👋 Welcome back, {currentUser?.name?.split(' ')[0] || 'Sarah'}
        </div>

        {/* MY COURSES Section */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: isDarkMode ? '#71767b' : '#536471',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📚 MY COURSES ({allCourses.length})
          </div>

          {allCourses.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {allCourses.map(course => (
                <div
                  key={course.id}
                  style={{
                    background: isDarkMode ? '#16181c' : '#fff',
                    border: `1px solid ${isDarkMode ? '#2f3336' : '#eff3f4'}`,
                    borderRadius: '16px',
                    padding: '20px'
                  }}
                >
                  {/* Course Title */}
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: isDarkMode ? '#e7e9ea' : '#0f1419',
                    marginBottom: '4px'
                  }}>
                    {course.title}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: isDarkMode ? '#71767b' : '#536471',
                    marginBottom: '12px'
                  }}>
                    by {course.instructorName}
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px'
                    }}>
                      <span style={{
                        fontSize: '12px',
                        color: isDarkMode ? '#71767b' : '#536471'
                      }}>
                        Progress
                      </span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#1d9bf0'
                      }}>
                        {course.progress}%
                      </span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: isDarkMode ? '#2f3336' : '#eff3f4',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${course.progress}%`,
                        height: '100%',
                        background: '#1d9bf0',
                        borderRadius: '3px'
                      }} />
                    </div>
                  </div>

                  {/* Student-Teacher Section - Only show if course has student-teachers */}
                  {course.studentTeacher && (
                    <div style={{
                      borderTop: `1px solid ${isDarkMode ? '#2f3336' : '#eff3f4'}`,
                      paddingTop: '12px',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: isDarkMode ? '#71767b' : '#536471',
                        marginBottom: '8px',
                        textTransform: 'uppercase'
                      }}>
                        Your Student-Teacher
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {course.studentTeacher.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: isDarkMode ? '#e7e9ea' : '#0f1419'
                          }}>
                            {course.studentTeacher.name}
                          </div>
                          <div style={{
                            fontSize: '11px',
                            color: isDarkMode ? '#71767b' : '#536471',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <FaStar style={{ color: '#f59e0b', fontSize: '10px' }} />
                            {course.studentTeacher.rating} • {course.studentTeacher.studentsTaught} students
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Continue Learning Button */}
                  <button
                    onClick={() => onViewCourse && onViewCourse(course.id)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#1d9bf0',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    Continue Learning
                    <FaArrowRight style={{ fontSize: '11px' }} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State - No courses enrolled */
            <div style={{
              background: isDarkMode ? '#16181c' : '#fff',
              border: `1px solid ${isDarkMode ? '#2f3336' : '#eff3f4'}`,
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                📚
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: '600',
                color: isDarkMode ? '#e7e9ea' : '#0f1419',
                marginBottom: '8px'
              }}>
                No courses yet
              </div>
              <div style={{
                fontSize: '14px',
                color: isDarkMode ? '#71767b' : '#536471',
                marginBottom: '20px'
              }}>
                Browse our catalog and enroll in a course to start learning
              </div>
              <button
                onClick={() => onMenuChange && onMenuChange('Browse')}
                style={{
                  padding: '12px 24px',
                  background: '#1d9bf0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Browse Courses
                <FaArrowRight style={{ fontSize: '12px' }} />
              </button>
            </div>
          )}
        </div>

        {/* UPCOMING SESSION Section - Only show if user has a course */}
        {hasCourses && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: isDarkMode ? '#71767b' : '#536471',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📅 UPCOMING SESSION
            </div>

            {upcomingSession ? (
              <div style={{
                background: isDarkMode ? '#16181c' : '#fff',
                border: `1px solid ${isDarkMode ? '#2f3336' : '#eff3f4'}`,
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '15px',
                  color: isDarkMode ? '#e7e9ea' : '#0f1419'
                }}>
                  📆 {upcomingSession.date} at {upcomingSession.time}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: isDarkMode ? '#71767b' : '#536471'
                }}>
                  👤 with {upcomingSession.with}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  color: isDarkMode ? '#71767b' : '#536471'
                }}>
                  📍 {upcomingSession.location}
                </div>

                <div style={{
                  background: isDarkMode ? '#1c1f23' : '#f7f9fa',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: isDarkMode ? '#e7e9ea' : '#0f1419'
                }}>
                  ⏱️ Starts in {upcomingSession.startsIn}
                </div>

                <button style={{
                  width: '100%',
                  padding: '14px',
                  background: isDarkMode ? '#2f3336' : '#eff3f4',
                  color: isDarkMode ? '#71767b' : '#536471',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <FaVideo />
                  Join Session (available 5 min before)
                </button>
              </div>
            ) : (
              /* No session scheduled */
              <div style={{
                background: isDarkMode ? '#16181c' : '#fff',
                border: `1px solid ${isDarkMode ? '#2f3336' : '#eff3f4'}`,
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '14px',
                  color: isDarkMode ? '#71767b' : '#536471',
                  marginBottom: '16px'
                }}>
                  No upcoming sessions scheduled
                </div>
                <button
                  onClick={() => setActiveTab('schedule')}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: `1px solid ${isDarkMode ? '#2f3336' : '#eff3f4'}`,
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1d9bf0',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  📅 Schedule a Session
                  <FaArrowRight style={{ fontSize: '12px' }} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
