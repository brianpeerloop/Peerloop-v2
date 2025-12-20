import React from 'react';
import PropTypes from 'prop-types';
import { FaBook, FaUser, FaSearch, FaVideo, FaCertificate, FaMoneyBillWave, FaGraduationCap, FaQuestionCircle, FaHandshake, FaRocket, FaLightbulb, FaStar, FaComments } from 'react-icons/fa';
import { AiOutlineStar, AiOutlineTeam, AiOutlineClockCircle, AiOutlineBarChart } from 'react-icons/ai';
import CourseDetailView from './CourseDetailView';
import EnrollmentFlow from './EnrollmentFlow';
import { getInstructorById, getCourseById, getInstructorWithCourses } from '../data/database';

/**
 * BrowseView - Displays the Browse page with Course Listings and Creator Profiles tabs
 * Extracted from MainContent.js for better code organization
 */
const BrowseView = ({
  isDarkMode,
  currentUser,
  onMenuChange,
  // State
  activeTopMenu,
  setActiveTopMenu,
  searchQuery,
  setSearchQuery,
  selectedCourse,
  setSelectedCourse,
  selectedInstructor,
  setSelectedInstructor,
  previousBrowseContext,
  setPreviousBrowseContext,
  creatorProfileTab,
  setCreatorProfileTab,
  currentInstructorForCourse,
  setCurrentInstructorForCourse,
  showEnrollmentFlow,
  setShowEnrollmentFlow,
  enrollingCourse,
  setEnrollingCourse,
  openCreatorFollowDropdown,
  setOpenCreatorFollowDropdown,
  isFollowingLoading,
  // Data
  indexedCourses,
  indexedInstructors,
  followedCommunities,
  setFollowedCommunities,
  purchasedCourses,
  // Handlers
  handleCoursePurchase,
  isCoursePurchased,
  isCourseFollowed,
  hasAnyCreatorCourseFollowed,
  handleFollowInstructor,
  handleFollowCourse
}) => {
  // Render instructor profile detail view
  const renderInstructorProfile = () => {
    const creator = selectedInstructor;
    const creatorCourses = creator.courses
      ? creator.courses.map(c => typeof c === 'object' ? c : indexedCourses.find(course => course.id === c)).filter(Boolean)
      : [];

    return (
      <div style={{ background: isDarkMode ? '#000' : '#f8fafc', minHeight: '100vh', padding: '0' }}>
        {/* Back Button */}
        <button
          onClick={() => {
            setCreatorProfileTab('courses');
            if (previousBrowseContext?.type === 'course' && previousBrowseContext.course) {
              setSelectedInstructor(null);
              setSelectedCourse(previousBrowseContext.course);
              setActiveTopMenu('courses');
              setPreviousBrowseContext(null);
            } else if (previousBrowseContext?.type === 'courseList') {
              setSelectedInstructor(null);
              setActiveTopMenu('courses');
              setPreviousBrowseContext(null);
            } else {
              setSelectedInstructor(null);
              setPreviousBrowseContext(null);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'transparent',
            border: 'none',
            padding: '12px 16px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 16,
            color: isDarkMode ? '#71767b' : '#64748b'
          }}
        >
          ← {previousBrowseContext?.type === 'course' ? 'Back to Course' : previousBrowseContext?.type === 'courseList' ? 'Back to Courses' : 'Back'}
        </button>

        {/* Creator Header with Action Buttons - Floating Card */}
        <div style={{
          background: isDarkMode ? '#0a0a0a' : '#fff',
          borderRadius: 16,
          padding: '20px',
          margin: '12px 16px',
          position: 'relative',
          zIndex: 1,
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: isDarkMode
            ? '0 0 0 1px rgba(255, 255, 255, 0.05), 0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 30px 60px -15px rgba(0, 0, 0, 0.6)'
            : '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}>
          {/* Top Row: Avatar + Name + Buttons */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
            <img
              src={creator.avatar}
              alt={creator.name}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: isDarkMode ? '#e7e9ea' : '#0f1419' }}>{creator.name}</h1>
                <span style={{ background: isDarkMode ? 'rgba(29, 155, 240, 0.2)' : '#e0f2fe', color: '#1d9bf0', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 12 }}>CREATOR</span>
              </div>
              <p style={{ margin: '2px 0 0 0', color: isDarkMode ? '#71767b' : '#536471', fontSize: 17 }}>{creator.title}</p>
              {/* Inline Stats */}
              <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 17, color: isDarkMode ? '#71767b' : '#536471', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><AiOutlineStar /> {creator.stats?.averageRating || '4.8'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><AiOutlineTeam /> {(creator.stats?.studentsTaught || 0).toLocaleString()} students</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FaBook style={{ fontSize: 14 }} /> {creator.stats?.coursesCreated || creatorCourses.length} courses</span>
              </div>
            </div>

            {/* Action Buttons - Top Right */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              {/* Go to Community Link */}
              <span
                onClick={() => {
                  localStorage.setItem('pendingCommunityCreator', JSON.stringify({
                    id: `creator-${creator.id}`,
                    name: creator.name
                  }));
                  if (onMenuChange) onMenuChange('My Community');
                }}
                style={{
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.7';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Go to Community
              </span>

              {/* Follow Button */}
              {(() => {
                const purchasedCreatorCourses = creatorCourses.filter(course => isCoursePurchased(course.id));
                const hasPurchasedCourses = purchasedCreatorCourses.length > 0;
                const isFollowing = hasAnyCreatorCourseFollowed(creator.id);

                if (!hasPurchasedCourses) {
                  return (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollowInstructor(creator.id);
                      }}
                      disabled={isFollowingLoading}
                      style={{
                        background: isFollowing ? (isDarkMode ? '#2f3336' : '#eff3f4') : '#1d9bf0',
                        color: isFollowing ? (isDarkMode ? '#e7e9ea' : '#0f1419') : '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 20,
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {isFollowing ? '✓ Following' : 'Follow'}
                    </button>
                  );
                }

                return (
                  <div className="creator-follow-dropdown-wrapper" style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenCreatorFollowDropdown(openCreatorFollowDropdown === `detail-${creator.id}` ? null : `detail-${creator.id}`);
                      }}
                      disabled={isFollowingLoading}
                      style={{
                        background: isFollowing ? (isDarkMode ? '#2f3336' : '#eff3f4') : '#1d9bf0',
                        color: isFollowing ? (isDarkMode ? '#e7e9ea' : '#0f1419') : '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 20,
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {isFollowing ? '✓ Following' : 'Follow'}
                      <span style={{ fontSize: 10 }}>▼</span>
                    </button>

                    {openCreatorFollowDropdown === `detail-${creator.id}` && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: 4,
                        background: isDarkMode ? '#16181c' : '#fff',
                        border: isDarkMode ? '1px solid #2f3336' : '1px solid #e2e8f0',
                        borderRadius: 12,
                        boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                        minWidth: 220,
                        padding: '4px 0'
                      }}>
                        <button
                          type="button"
                          style={{
                            padding: '10px 16px',
                            cursor: 'pointer',
                            fontSize: 14,
                            color: isFollowing ? '#f4212e' : '#1d9bf0',
                            fontWeight: 500,
                            background: 'transparent',
                            border: 'none',
                            width: '100%',
                            textAlign: 'left',
                            display: 'block'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleFollowInstructor(creator.id);
                            setOpenCreatorFollowDropdown(null);
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#2f3336' : '#f8fafc'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          {isFollowing ? 'Unfollow Creator' : 'Follow Creator'}
                        </button>
                        <div style={{ borderTop: isDarkMode ? '1px solid #2f3336' : '1px solid #eff3f4', margin: '4px 0' }} />
                        {purchasedCreatorCourses.map(course => {
                          const isFollowed = isCourseFollowed(course.id);
                          return (
                            <div
                              key={course.id}
                              style={{
                                padding: '10px 16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: 14,
                                color: isFollowed ? '#1d9bf0' : (isDarkMode ? '#e7e9ea' : '#0f1419'),
                                fontWeight: isFollowed ? 500 : 400
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleFollowCourse(course.id);
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#2f3336' : '#f8fafc'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.title}</span>
                              {isFollowed && <span>✓</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Bio */}
          {creator.bio && (
            <p style={{
              margin: '0 0 12px 0',
              color: isDarkMode ? '#e7e9ea' : '#0f1419',
              fontSize: 17,
              lineHeight: 1.5
            }}>
              {creator.bio}
            </p>
          )}

          {/* Credentials */}
          {creator.qualifications && creator.qualifications.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {creator.qualifications.slice(0, 3).map((qual, index) => (
                <span key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 17,
                  color: isDarkMode ? '#71767b' : '#536471'
                }}>
                  <span style={{ color: '#1d9bf0' }}>✓</span>
                  {qual.sentence}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Section Header */}
        <div style={{
          padding: '12px 16px',
          background: isDarkMode ? '#000' : '#f8fafc',
          borderBottom: isDarkMode ? '1px solid #2f3336' : '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <FaBook style={{ fontSize: 14, color: '#1d9bf0' }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: isDarkMode ? '#e7e9ea' : '#0f1419' }}>
            COURSES BY {creator.name.toUpperCase()} ({creatorCourses.length})
          </span>
        </div>

        {/* Courses List */}
        <div style={{ padding: '0' }}>
          {creatorCourses.length > 0 ? (
            creatorCourses.map(course => {
              const isFollowed = isCourseFollowed(course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course);
                    setCurrentInstructorForCourse(creator);
                  }}
                  style={{
                    background: isDarkMode ? '#000' : '#fff',
                    padding: '16px',
                    cursor: 'pointer',
                    borderBottom: isDarkMode ? '1px solid #2f3336' : '1px solid #eff3f4',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start'
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{ width: 120, height: 68, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: isDarkMode ? '#e7e9ea' : '#0f1419' }}>{course.title}</h3>
                      {course.badge && (
                        <span style={{
                          background: course.badge === 'Bestseller' ? '#fbbf24' :
                                     course.badge === 'Popular' ? '#1d9bf0' :
                                     course.badge === 'New' ? '#22c55e' :
                                     course.badge === 'Featured' ? '#a855f7' : '#6b7280',
                          color: course.badge === 'Bestseller' ? '#000' : '#fff',
                          padding: '2px 6px',
                          borderRadius: 10,
                          fontSize: 10,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          flexShrink: 0
                        }}>
                          {course.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 15, color: isDarkMode ? '#71767b' : '#536471', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><AiOutlineStar /> {course.rating} ({course.ratingCount || 0})</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><AiOutlineTeam /> {course.students?.toLocaleString()}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><AiOutlineBarChart /> {course.level}</span>
                      <span style={{ color: '#1d9bf0', fontWeight: 700 }}>{course.price}</span>
                      <span
                        onClick={(e) => { e.stopPropagation(); setSelectedCourse(course); }}
                        style={{ color: '#1d9bf0', cursor: 'pointer', fontWeight: 500 }}
                        onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={e => e.target.style.textDecoration = 'none'}
                      >
                        View course →
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        localStorage.setItem('pendingCommunityCreator', JSON.stringify({
                          id: `creator-${creator.id}`,
                          name: creator.name
                        }));
                        if (onMenuChange) onMenuChange('My Community');
                      }}
                      style={{
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: 13,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'opacity 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7';
                        e.currentTarget.style.textDecoration = 'underline';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.textDecoration = 'none';
                      }}
                    >
                      Go to Community
                    </span>
                    {isCoursePurchased(course.id) ? (
                      <button
                        onClick={e => { e.stopPropagation(); handleFollowCourse(course.id); }}
                        disabled={isFollowingLoading}
                        style={{
                          background: isFollowed ? 'transparent' : '#1d9bf0',
                          color: isFollowed ? (isDarkMode ? '#e7e9ea' : '#0f1419') : '#fff',
                          border: isFollowed ? (isDarkMode ? '1px solid #536471' : '1px solid #cfd9de') : 'none',
                          padding: '6px 16px',
                          borderRadius: 20,
                          fontWeight: 700,
                          fontSize: 13,
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                      >
                        {isFollowed ? 'Following' : 'Follow'}
                      </button>
                    ) : (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setEnrollingCourse(course);
                          setShowEnrollmentFlow(true);
                        }}
                        style={{
                          background: '#f97316',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 16px',
                          borderRadius: 20,
                          fontWeight: 700,
                          fontSize: 13,
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                      >
                        Enroll
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: isDarkMode ? '#71767b' : '#536471' }}>
              No courses available yet.
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render instructor summary list (Creator Profiles tab)
  const renderInstructorSummary = () => {
    const filteredInstructors = indexedInstructors.filter(instructor =>
      instructor.searchIndex.includes(searchQuery.toLowerCase())
    );

    return (
      <div className="creators-feed" style={{ padding: 0, margin: 0 }}>
        {filteredInstructors.map(creator => {
          return (
            <div key={creator.id} className="creator-card" onClick={() => {
              const fullCreatorData = getInstructorWithCourses(creator.id);
              setPreviousBrowseContext({ type: 'creatorList' });
              setSelectedInstructor(fullCreatorData || creator);
            }} style={{
              background: isDarkMode ? '#000' : '#fff',
              borderRadius: 0,
              padding: '14px 16px',
              marginBottom: 0,
              border: 'none',
              borderBottom: isDarkMode ? '1px solid #2f3336' : '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              gap: 12
            }}>
              {/* Left Box - Profile Card */}
              <div style={{
                background: isDarkMode ? '#16181c' : '#f8fafc',
                borderRadius: 12,
                padding: '12px',
                width: 135,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: isDarkMode ? '1px solid #2f3336' : '1px solid #e2e8f0'
              }} onClick={e => e.stopPropagation()}>
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: 8,
                    border: '2px solid #1d9bf0'
                  }}
                />
                <div style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: isDarkMode ? '#e7e9ea' : '#0f1419',
                  marginBottom: 1,
                  lineHeight: 1.2
                }}>
                  {creator.name}
                </div>
                <div style={{
                  color: isDarkMode ? '#9ca3af' : '#536471',
                  fontSize: 10,
                  marginBottom: 8,
                  lineHeight: 1.3
                }}>
                  {creator.title?.split(' ').slice(0, 4).join(' ')}
                </div>

                {/* Follow Button */}
                {(() => {
                  const creatorData = getInstructorWithCourses(creator.id);
                  const courses = creatorData?.courses || [];
                  const purchasedCreatorCourses = courses.filter(course => isCoursePurchased(course.id));
                  const hasPurchasedCourses = purchasedCreatorCourses.length > 0;
                  const isFollowing = hasAnyCreatorCourseFollowed(creator.id);

                  if (!hasPurchasedCourses) {
                    return (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFollowInstructor(creator.id);
                        }}
                        disabled={isFollowingLoading}
                        style={{
                          background: isFollowing ? 'transparent' : '#1d9bf0',
                          color: isFollowing ? '#1d9bf0' : '#fff',
                          border: isFollowing ? '1px solid #1d9bf0' : 'none',
                          padding: '6px 16px',
                          borderRadius: 20,
                          fontWeight: 600,
                          fontSize: 12,
                          cursor: 'pointer',
                          width: '100%'
                        }}
                      >
                        {isFollowing ? '✓ Following' : 'Follow'}
                      </button>
                    );
                  }

                  return (
                    <div className="creator-follow-dropdown-wrapper" style={{ position: 'relative', width: '100%' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenCreatorFollowDropdown(openCreatorFollowDropdown === creator.id ? null : creator.id);
                        }}
                        disabled={isFollowingLoading}
                        style={{
                          background: isFollowing ? 'transparent' : '#1d9bf0',
                          color: isFollowing ? '#1d9bf0' : '#fff',
                          border: isFollowing ? '1px solid #1d9bf0' : 'none',
                          padding: '6px 12px',
                          borderRadius: 20,
                          fontWeight: 600,
                          fontSize: 12,
                          cursor: 'pointer',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 4
                        }}
                      >
                        {isFollowing ? '✓ Following' : 'Follow'}
                        <span style={{ fontSize: 8 }}>▼</span>
                      </button>
                      {openCreatorFollowDropdown === creator.id && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          marginTop: 4,
                          background: isDarkMode ? '#16181c' : '#fff',
                          border: isDarkMode ? '1px solid #2f3336' : '1px solid #e2e8f0',
                          borderRadius: 8,
                          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                          zIndex: 1000,
                          minWidth: 160,
                          padding: '4px 0'
                        }}>
                          <button
                            type="button"
                            style={{
                              padding: '8px 12px',
                              cursor: 'pointer',
                              fontSize: 12,
                              color: isFollowing ? '#dc2626' : '#1d9bf0',
                              fontWeight: 500,
                              background: 'transparent',
                              border: 'none',
                              width: '100%',
                              textAlign: 'left'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFollowInstructor(creator.id);
                              setOpenCreatorFollowDropdown(null);
                            }}
                          >
                            {isFollowing ? 'Unfollow Creator' : 'Follow Creator'}
                          </button>
                          <div style={{ borderTop: isDarkMode ? '1px solid #2f3336' : '1px solid #f1f5f9' }}>
                            {purchasedCreatorCourses.map(course => {
                              const isFollowed = isCourseFollowed(course.id);
                              return (
                                <div
                                  key={course.id}
                                  style={{
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    fontSize: 11,
                                    color: isFollowed ? '#1d9bf0' : (isDarkMode ? '#e7e9ea' : '#475569'),
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFollowCourse(course.id);
                                  }}
                                >
                                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.title}</span>
                                  {isFollowed && <span>✓</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Right Side - About the Creator */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: isDarkMode ? '#f3f4f6' : '#0f1419', marginBottom: 1 }}>
                      About the Creator
                    </div>
                    <div style={{ fontSize: 15, color: isDarkMode ? '#d1d5db' : '#536471' }}>
                      {creator.title}
                    </div>
                  </div>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      localStorage.setItem('pendingCommunityCreator', JSON.stringify({
                        id: `creator-${creator.id}`,
                        name: creator.name
                      }));
                      if (onMenuChange) onMenuChange('My Community');
                    }}
                    style={{
                      color: '#1d9bf0',
                      fontWeight: 500,
                      fontSize: 13,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Go to Community
                  </span>
                </div>

                {/* Bio */}
                <div style={{
                  color: isDarkMode ? '#e5e7eb' : '#4b5563',
                  fontSize: 16,
                  lineHeight: 1.4,
                  marginBottom: 8,
                  fontStyle: 'italic'
                }}>
                  "{creator.bio}"
                </div>

                {/* Tags */}
                {creator.expertise && creator.expertise.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                    {creator.expertise.slice(0, 4).map((tag, idx) => (
                      <span key={idx} style={{
                        background: isDarkMode ? '#2f3336' : '#e5e7eb',
                        color: isDarkMode ? '#d1d5db' : '#4b5563',
                        padding: '3px 8px',
                        borderRadius: 12,
                        fontSize: 13,
                        fontWeight: 500
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 14, color: isDarkMode ? '#d1d5db' : '#536471' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <AiOutlineTeam style={{ fontSize: 14 }} />
                    {(creator.stats?.studentsTaught || 0).toLocaleString()}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <AiOutlineStar style={{ fontSize: 14 }} />
                    {creator.stats?.averageRating || 0}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FaBook style={{ fontSize: 11 }} />
                    {creator.stats?.coursesCreated || 0} courses
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Mock social proof posts (in production, these would come from the community feed)
  const socialProofPosts = [
    { id: 1, author: 'Sarah M.', avatar: 'https://i.pravatar.cc/40?img=1', text: 'Just passed my Python certification! Ready to start teaching! 🎉', type: 'achievement' },
    { id: 2, author: 'Mike T.', avatar: 'https://i.pravatar.cc/40?img=3', text: 'Module 3 was challenging but the 1-on-1 session made it click!', type: 'feedback' },
    { id: 3, author: 'Dr. Chen', avatar: 'https://i.pravatar.cc/40?img=5', text: 'Earned $1,200 teaching this month. Love this platform! 💰', type: 'earning' },
  ];

  // Social Proof Section Component
  const SocialProofSection = () => (
    <div style={{
      margin: '24px 16px',
      padding: '16px',
      background: isDarkMode ? '#16181c' : '#f8fafc',
      borderRadius: 12,
      border: isDarkMode ? '1px solid #2f3336' : '1px solid #e2e8f0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
      }}>
        <h3 style={{
          margin: 0,
          fontSize: 14,
          fontWeight: 600,
          color: isDarkMode ? '#71767b' : '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          📣 From the Community
        </h3>
        <button
          onClick={() => onMenuChange('My Community')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#1d9bf0',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          See all →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {socialProofPosts.map(post => (
          <div key={post.id} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            padding: '10px 12px',
            background: isDarkMode ? '#000' : '#fff',
            borderRadius: 8,
            border: isDarkMode ? '1px solid #2f3336' : '1px solid #e5e7eb'
          }}>
            <img
              src={post.avatar}
              alt={post.author}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{
                fontWeight: 600,
                fontSize: 13,
                color: isDarkMode ? '#e7e9ea' : '#0f1419'
              }}>
                {post.author}
              </span>
              <p style={{
                margin: '2px 0 0 0',
                fontSize: 14,
                color: isDarkMode ? '#d1d5db' : '#374151',
                lineHeight: 1.4
              }}>
                {post.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="main-content">
      <div className="three-column-layout browse-layout">
        <div className="center-column">
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

            {/* Centered tabs - pill style */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flex: '0 0 auto',
              background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
              padding: '6px',
              borderRadius: 30
            }}>
              <button
                onClick={() => setActiveTopMenu('howitworks')}
                style={{
                  flex: '0 0 auto',
                  padding: '10px 20px',
                  border: 'none',
                  background: activeTopMenu === 'howitworks'
                    ? '#1d9bf0'
                    : 'transparent',
                  color: activeTopMenu === 'howitworks'
                    ? '#fff'
                    : (isDarkMode ? '#9ca3af' : '#64748b'),
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderRadius: 24,
                  whiteSpace: 'nowrap',
                  boxShadow: activeTopMenu === 'howitworks'
                    ? '0 2px 8px rgba(29, 155, 240, 0.4)'
                    : 'none'
                }}
              >
                <FaQuestionCircle style={{ fontSize: 16, flexShrink: 0 }} />
                <span>How It Works</span>
              </button>
              <button
                onClick={() => setActiveTopMenu('courses')}
                style={{
                  flex: '0 0 auto',
                  padding: '10px 20px',
                  border: 'none',
                  background: activeTopMenu === 'courses'
                    ? '#1d9bf0'
                    : 'transparent',
                  color: activeTopMenu === 'courses'
                    ? '#fff'
                    : (isDarkMode ? '#9ca3af' : '#64748b'),
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderRadius: 24,
                  whiteSpace: 'nowrap',
                  boxShadow: activeTopMenu === 'courses'
                    ? '0 2px 8px rgba(29, 155, 240, 0.4)'
                    : 'none'
                }}
              >
                <FaBook style={{ fontSize: 16, flexShrink: 0 }} />
                <span>Course Listings</span>
              </button>
              <button
                onClick={() => setActiveTopMenu('instructors')}
                style={{
                  flex: '0 0 auto',
                  padding: '10px 20px',
                  border: 'none',
                  background: activeTopMenu === 'instructors'
                    ? '#1d9bf0'
                    : 'transparent',
                  color: activeTopMenu === 'instructors'
                    ? '#fff'
                    : (isDarkMode ? '#9ca3af' : '#64748b'),
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderRadius: 24,
                  whiteSpace: 'nowrap',
                  boxShadow: activeTopMenu === 'instructors'
                    ? '0 2px 8px rgba(29, 155, 240, 0.4)'
                    : 'none'
                }}
              >
                <FaUser style={{ fontSize: 16, flexShrink: 0 }} />
                <span>Creator Profiles</span>
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
          <div className="browse-content">
            {/* Show Enrollment Flow when active */}
            {showEnrollmentFlow && enrollingCourse ? (
              <EnrollmentFlow
                course={enrollingCourse}
                instructor={getInstructorById(enrollingCourse.instructorId)}
                isDarkMode={isDarkMode}
                onClose={() => {
                  setShowEnrollmentFlow(false);
                  setEnrollingCourse(null);
                }}
                onComplete={(booking) => {
                  console.log('Booking complete:', booking);
                  handleCoursePurchase(enrollingCourse.id);
                  setShowEnrollmentFlow(false);
                  setEnrollingCourse(null);
                  onMenuChange('Dashboard');
                }}
              />
            ) : activeTopMenu === 'howitworks' ? (
              <div className="how-it-works-section" style={{ padding: '24px 16px' }}>
                {/* Hero Section */}
                <div style={{
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 20,
                  padding: '40px 32px',
                  marginBottom: 32,
                  textAlign: 'center'
                }}>
                  <h1 style={{
                    color: '#fff',
                    fontSize: 32,
                    fontWeight: 800,
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12
                  }}>
                    <FaGraduationCap /> Welcome to PeerLoop
                  </h1>
                  <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: 18,
                    margin: 0,
                    maxWidth: 600,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    The peer-to-peer learning platform where you learn from experts, get certified, and then teach others to earn.
                  </p>
                </div>

                {/* What Makes Us Different */}
                <div style={{
                  background: isDarkMode ? '#16181c' : '#fff',
                  borderRadius: 16,
                  padding: '24px',
                  marginBottom: 24,
                  border: isDarkMode ? '1px solid #2f3336' : '1px solid #e5e7eb'
                }}>
                  <h2 style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: isDarkMode ? '#e7e9ea' : '#111827',
                    margin: '0 0 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    <FaLightbulb style={{ color: '#fbbf24' }} /> What Makes PeerLoop Different?
                  </h2>
                  <p style={{
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: isDarkMode ? '#d1d5db' : '#4b5563',
                    margin: 0
                  }}>
                    Unlike traditional online courses where you watch pre-recorded videos alone, PeerLoop connects you with real instructors for <strong>live 1-on-1 sessions</strong>. Research shows that personalized instruction leads to <strong>90% knowledge retention</strong> compared to just 10% with passive video watching. Plus, once you master a skill, you can become a certified instructor yourself and earn money teaching others.
                  </p>
                </div>

                {/* The 4-Step Journey */}
                <h2 style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: isDarkMode ? '#e7e9ea' : '#111827',
                  margin: '0 0 20px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}>
                  <FaRocket style={{ color: '#1d9bf0' }} /> Your Learning Journey
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 16,
                  marginBottom: 32
                }}>
                  {[
                    {
                      icon: <FaBook style={{ fontSize: 28, color: '#1d9bf0' }} />,
                      title: '1. Browse & Choose',
                      description: 'Explore our catalog of expert-created courses. Each course is taught by verified professionals who have real-world experience in their field.'
                    },
                    {
                      icon: <FaVideo style={{ fontSize: 28, color: '#22c55e' }} />,
                      title: '2. Learn 1-on-1',
                      description: 'Schedule live video sessions with your instructor at times that work for you. Get personalized feedback, ask questions in real-time, and learn at your own pace.'
                    },
                    {
                      icon: <FaCertificate style={{ fontSize: 28, color: '#a855f7' }} />,
                      title: '3. Get Certified',
                      description: 'Complete all modules and pass your assessment to earn a verified certificate. This proves your expertise and qualifies you to teach the course.'
                    },
                    {
                      icon: <FaMoneyBillWave style={{ fontSize: 28, color: '#f97316' }} />,
                      title: '4. Teach & Earn',
                      description: 'Become a certified instructor and start teaching others. Keep 70% of every session fee. The more students you help, the more you earn.'
                    }
                  ].map((step, idx) => (
                    <div key={idx} style={{
                      background: isDarkMode ? '#16181c' : '#fff',
                      borderRadius: 16,
                      padding: '24px',
                      border: isDarkMode ? '1px solid #2f3336' : '1px solid #e5e7eb',
                      position: 'relative'
                    }}>
                      <div style={{ marginBottom: 12 }}>{step.icon}</div>
                      <h3 style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: isDarkMode ? '#e7e9ea' : '#111827',
                        margin: '0 0 8px 0'
                      }}>
                        {step.title}
                      </h3>
                      <p style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: isDarkMode ? '#9ca3af' : '#6b7280',
                        margin: 0
                      }}>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Why 1-on-1 Learning */}
                <div style={{
                  background: isDarkMode ? '#16181c' : '#f0fdf4',
                  borderRadius: 16,
                  padding: '24px',
                  marginBottom: 24,
                  border: isDarkMode ? '1px solid #2f3336' : '1px solid #bbf7d0'
                }}>
                  <h2 style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: isDarkMode ? '#e7e9ea' : '#111827',
                    margin: '0 0 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    <FaHandshake style={{ color: '#22c55e' }} /> Why 1-on-1 Learning Works
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 16
                  }}>
                    {[
                      { stat: '90%', label: 'Knowledge retention with live instruction' },
                      { stat: '3x', label: 'Faster learning than self-paced courses' },
                      { stat: '100%', label: 'Personalized to your learning style' },
                      { stat: '24/7', label: 'Schedule sessions when it suits you' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: 32,
                          fontWeight: 800,
                          color: '#22c55e',
                          marginBottom: 4
                        }}>
                          {item.stat}
                        </div>
                        <div style={{
                          fontSize: 14,
                          color: isDarkMode ? '#9ca3af' : '#6b7280'
                        }}>
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* For Creators Section */}
                <div style={{
                  background: isDarkMode ? '#16181c' : '#fef3c7',
                  borderRadius: 16,
                  padding: '24px',
                  marginBottom: 24,
                  border: isDarkMode ? '1px solid #2f3336' : '1px solid #fcd34d'
                }}>
                  <h2 style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: isDarkMode ? '#e7e9ea' : '#111827',
                    margin: '0 0 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    <FaStar style={{ color: '#f59e0b' }} /> Become a Creator
                  </h2>
                  <p style={{
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: isDarkMode ? '#d1d5db' : '#4b5563',
                    margin: '0 0 16px 0'
                  }}>
                    Have expertise to share? Create your own course on PeerLoop and build a community of learners. As a creator, you:
                  </p>
                  <ul style={{
                    margin: 0,
                    paddingLeft: 24,
                    color: isDarkMode ? '#d1d5db' : '#4b5563',
                    fontSize: 15,
                    lineHeight: 1.8
                  }}>
                    <li><strong>Design your curriculum</strong> - Structure your course into modules that build on each other</li>
                    <li><strong>Set your rates</strong> - You decide how much to charge for your expertise</li>
                    <li><strong>Build your brand</strong> - Create a following and community around your courses</li>
                    <li><strong>Scale with certified instructors</strong> - Your top students become certified to teach your course, expanding your reach</li>
                    <li><strong>Earn passively</strong> - Get a percentage when your certified instructors teach your course</li>
                  </ul>
                </div>

                {/* Community Section */}
                <div style={{
                  background: isDarkMode ? '#16181c' : '#eff6ff',
                  borderRadius: 16,
                  padding: '24px',
                  marginBottom: 24,
                  border: isDarkMode ? '1px solid #2f3336' : '1px solid #bfdbfe'
                }}>
                  <h2 style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: isDarkMode ? '#e7e9ea' : '#111827',
                    margin: '0 0 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    <FaComments style={{ color: '#3b82f6' }} /> Join the Community
                  </h2>
                  <p style={{
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: isDarkMode ? '#d1d5db' : '#4b5563',
                    margin: 0
                  }}>
                    Every course has its own community where students and instructors connect. Share your progress, ask questions, celebrate wins, and help fellow learners. Learning is better together, and our community features make it easy to stay connected with your peers and mentors throughout your journey.
                  </p>
                </div>

                {/* CTA */}
                <div style={{
                  textAlign: 'center',
                  padding: '32px 0'
                }}>
                  <button
                    onClick={() => setActiveTopMenu('courses')}
                    style={{
                      background: '#1d9bf0',
                      color: '#fff',
                      border: 'none',
                      padding: '16px 40px',
                      borderRadius: 30,
                      fontSize: 18,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10
                    }}
                  >
                    <FaBook /> Browse Courses
                  </button>
                  <p style={{
                    marginTop: 16,
                    fontSize: 14,
                    color: isDarkMode ? '#71767b' : '#6b7280'
                  }}>
                    Start your learning journey today
                  </p>
                </div>
              </div>
            ) : activeTopMenu === 'courses' ? (
              <div className="courses-section">
                {selectedCourse ? (
                  <CourseDetailView
                    course={getCourseById(selectedCourse.id)}
                    onBack={() => setSelectedCourse(null)}
                    isDarkMode={isDarkMode}
                    followedCommunities={followedCommunities}
                    setFollowedCommunities={setFollowedCommunities}
                    isCoursePurchased={isCoursePurchased(selectedCourse.id)}
                    currentUser={currentUser}
                    onViewInstructor={(instructorId) => {
                      const instructor = getInstructorById(instructorId);
                      if (instructor) {
                        setSelectedInstructor(instructor);
                        setActiveTopMenu('creators');
                      }
                    }}
                    onEnroll={(course) => {
                      setEnrollingCourse(course);
                      setShowEnrollmentFlow(true);
                    }}
                  />
                ) : (
                  <>
                    <div className="browse-header">
                      <h1></h1>
                    </div>
                    <div className="courses-feed">
                      {indexedCourses.filter(course =>
                        course.searchIndex.includes(searchQuery.toLowerCase())
                      ).map(course => {
                        const instructorData = getInstructorById(course.instructorId);
                        const isFollowed = isCourseFollowed(course.id);
                        return (
                          <div
                            key={course.id}
                            className="course-post"
                            onClick={() => setSelectedCourse(course)}
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
                              {/* Badge */}
                              {course.badge && (
                                <span style={{
                                  display: 'inline-block',
                                  background: course.badge === 'Bestseller' ? '#fef3c7' :
                                             course.badge === 'Popular' ? '#dbeafe' :
                                             course.badge === 'New' ? '#dcfce7' :
                                             course.badge === 'Featured' ? '#f3e8ff' : '#f3f4f6',
                                  color: course.badge === 'Bestseller' ? '#92400e' :
                                         course.badge === 'Popular' ? '#1e40af' :
                                         course.badge === 'New' ? '#166534' :
                                         course.badge === 'Featured' ? '#7c3aed' : '#374151',
                                  padding: '4px 10px',
                                  borderRadius: 4,
                                  fontSize: 11,
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  marginBottom: 8
                                }}>
                                  {course.badge}
                                </span>
                              )}

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
                                <span
                                  onClick={e => {
                                    e.stopPropagation();
                                    const fullCreatorData = getInstructorWithCourses(course.instructorId);
                                    setPreviousBrowseContext({ type: 'courseList' });
                                    setSelectedInstructor(fullCreatorData || instructorData);
                                    setActiveTopMenu('instructors');
                                  }}
                                  style={{ cursor: 'pointer' }}
                                  onMouseEnter={e => e.target.style.color = '#1d9bf0'}
                                  onMouseLeave={e => e.target.style.color = isDarkMode ? '#9ca3af' : '#6b7280'}
                                >
                                  {instructorData?.name}
                                </span>
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
                                WebkitLineClamp: 3,
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
                                flexWrap: 'wrap'
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
                                    {course.rating})
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

                                {/* Level Badge */}
                                <span style={{
                                  background: isDarkMode ? '#374151' : '#e0f2fe',
                                  color: isDarkMode ? '#9ca3af' : '#0369a1',
                                  padding: '4px 12px',
                                  borderRadius: 20,
                                  fontSize: 12,
                                  fontWeight: 500
                                }}>
                                  {course.level || 'Intermediate'}
                                </span>
                              </div>
                            </div>

                            {/* Right Column - About the Creator */}
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
                              }}>
                              <h4 style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: isDarkMode ? '#9ca3af' : '#6b7280',
                                margin: '0 0 12px 0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}>
                                About the Creator
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
                                "{instructorData?.bio || 'Expert instructor dedicated to helping students master new skills and advance their careers.'}"
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
                                  onClick={e => {
                                    e.stopPropagation();
                                    const fullCreatorData = getInstructorWithCourses(course.instructorId);
                                    setPreviousBrowseContext({ type: 'courseList' });
                                    setSelectedInstructor(fullCreatorData || instructorData);
                                    setActiveTopMenu('instructors');
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

                              {/* Follow Creator Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const creatorCommunityId = `creator-${instructorData?.id}`;
                                  const isCurrentlyFollowed = followedCommunities.some(c => c.id === creatorCommunityId);

                                  if (isCurrentlyFollowed) {
                                    setFollowedCommunities(prev => prev.filter(c => c.id !== creatorCommunityId));
                                  } else {
                                    const courseIds = instructorData?.courses || [];
                                    setFollowedCommunities(prev => [...prev, {
                                      id: creatorCommunityId,
                                      type: 'creator',
                                      name: instructorData?.name,
                                      instructorId: instructorData?.id,
                                      instructorName: instructorData?.name,
                                      courseIds: courseIds,
                                      followedCourseIds: [],
                                      description: instructorData?.bio,
                                      avatar: instructorData?.avatar
                                    }]);
                                  }
                                }}
                                style={{
                                  marginTop: 12,
                                  padding: '8px 20px',
                                  borderRadius: 20,
                                  background: followedCommunities.some(c => c.id === `creator-${instructorData?.id}`)
                                    ? 'transparent'
                                    : '#1d9bf0',
                                  color: followedCommunities.some(c => c.id === `creator-${instructorData?.id}`)
                                    ? '#1d9bf0'
                                    : '#fff',
                                  fontSize: 14,
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  border: followedCommunities.some(c => c.id === `creator-${instructorData?.id}`)
                                    ? '1px solid #1d9bf0'
                                    : '1px solid transparent',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {followedCommunities.some(c => c.id === `creator-${instructorData?.id}`) ? 'Following' : 'Follow'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Social Proof Section - after course listings */}
                    {!selectedCourse && <SocialProofSection />}
                  </>
                )}
              </div>
            ) : (
              <div className="creators-section">
                {/* If viewing a course from instructor profile, show course detail */}
                {selectedCourse ? (
                  <CourseDetailView
                    course={getCourseById(selectedCourse.id)}
                    onBack={() => setSelectedCourse(null)}
                    isDarkMode={isDarkMode}
                    followedCommunities={followedCommunities}
                    setFollowedCommunities={setFollowedCommunities}
                    isCoursePurchased={isCoursePurchased(selectedCourse.id)}
                    currentUser={currentUser}
                    onViewInstructor={(instructorId) => {
                      const instructor = getInstructorById(instructorId);
                      if (instructor) {
                        setSelectedCourse(null);
                        setSelectedInstructor(instructor);
                      }
                    }}
                    onEnroll={(course) => {
                      setEnrollingCourse(course);
                      setShowEnrollmentFlow(true);
                    }}
                  />
                ) : selectedInstructor ? (
                  renderInstructorProfile()
                ) : (
                  renderInstructorSummary()
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BrowseView.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  onMenuChange: PropTypes.func,
  activeTopMenu: PropTypes.string.isRequired,
  setActiveTopMenu: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  selectedCourse: PropTypes.object,
  setSelectedCourse: PropTypes.func.isRequired,
  selectedInstructor: PropTypes.object,
  setSelectedInstructor: PropTypes.func.isRequired,
  previousBrowseContext: PropTypes.object,
  setPreviousBrowseContext: PropTypes.func.isRequired,
  creatorProfileTab: PropTypes.string,
  setCreatorProfileTab: PropTypes.func.isRequired,
  currentInstructorForCourse: PropTypes.object,
  setCurrentInstructorForCourse: PropTypes.func.isRequired,
  showEnrollmentFlow: PropTypes.bool.isRequired,
  setShowEnrollmentFlow: PropTypes.func.isRequired,
  enrollingCourse: PropTypes.object,
  setEnrollingCourse: PropTypes.func.isRequired,
  openCreatorFollowDropdown: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setOpenCreatorFollowDropdown: PropTypes.func.isRequired,
  isFollowingLoading: PropTypes.bool,
  indexedCourses: PropTypes.array.isRequired,
  indexedInstructors: PropTypes.array.isRequired,
  followedCommunities: PropTypes.array.isRequired,
  setFollowedCommunities: PropTypes.func.isRequired,
  purchasedCourses: PropTypes.array.isRequired,
  handleCoursePurchase: PropTypes.func.isRequired,
  isCoursePurchased: PropTypes.func.isRequired,
  isCourseFollowed: PropTypes.func.isRequired,
  hasAnyCreatorCourseFollowed: PropTypes.func.isRequired,
  handleFollowInstructor: PropTypes.func.isRequired,
  handleFollowCourse: PropTypes.func.isRequired
};

export default BrowseView;
