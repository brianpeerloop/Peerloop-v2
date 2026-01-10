import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaBook } from 'react-icons/fa';
import { AiOutlineStar, AiOutlineTeam } from 'react-icons/ai';
import { getInstructorWithCourses } from '../data/database';

/**
 * DiscoverView - Unified search for communities and courses
 * Shows communities with their matching courses in a linear format
 */
const DiscoverView = ({
  isDarkMode,
  currentUser,
  onMenuChange,
  indexedCourses,
  indexedInstructors,
  followedCommunities,
  setFollowedCommunities,
  isCoursePurchased,
  isCreatorFollowed,
  handleFollowInstructor,
  onViewCourse,
  onViewCommunity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter pill options
  const filterPills = [
    { id: 'All', label: 'All' },
    { id: 'Live', label: 'Live' },
    { id: 'Self-Paced', label: 'Self-Paced' },
    { id: 'Free', label: 'Free' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Advanced', label: 'Advanced' },
    { id: 'Popular', label: 'Popular' },
    { id: 'New', label: 'New' },
    { id: 'Top Rated', label: 'Top Rated' }
  ];

  // Filter course based on active pill filter
  const filterCourse = (course) => {
    if (activeFilter === 'All') return true;

    // Mock filtering logic - in production would use real course data
    switch (activeFilter) {
      case 'Live':
        return course.sessions && course.sessions > 0;
      case 'Self-Paced':
        return !course.sessions || course.sessions === 0;
      case 'Free':
        return course.price === 'Free' || course.price === '$0';
      case 'Beginner':
        return course.level === 'Beginner' || !course.level;
      case 'Advanced':
        return course.level === 'Advanced';
      case 'Popular':
        return course.students && course.students > 100;
      case 'New':
        // Mock: courses with id > 5 are "new"
        return course.id > 5;
      case 'Top Rated':
        return course.rating && course.rating >= 4.5;
      default:
        return true;
    }
  };

  // Group courses by instructor and filter based on search and active filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      // When no search, show all communities with their courses (filtered)
      return indexedInstructors.map(instructor => {
        const fullData = getInstructorWithCourses(instructor.id);
        const courses = fullData?.courses || [];
        const filteredCourses = courses.filter(filterCourse);
        return {
          instructor: fullData || instructor,
          matchingCourses: filteredCourses.slice(0, 3), // Show first 3 filtered courses
          totalCourses: courses.length,
          filteredTotal: filteredCourses.length,
          matchedByName: false
        };
      }).filter(result => activeFilter === 'All' || result.filteredTotal > 0);
    }

    const query = searchQuery.toLowerCase();
    const results = [];

    indexedInstructors.forEach(instructor => {
      const fullData = getInstructorWithCourses(instructor.id);
      const allCourses = fullData?.courses || [];

      // Check if community name/bio matches
      const communityMatches =
        instructor.name?.toLowerCase().includes(query) ||
        instructor.bio?.toLowerCase().includes(query) ||
        instructor.title?.toLowerCase().includes(query);

      // Find matching courses (search + filter)
      const matchingCourses = allCourses.filter(course =>
        (course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query)) &&
        filterCourse(course)
      );

      // Include community if name matches OR has matching courses
      if (communityMatches || matchingCourses.length > 0) {
        results.push({
          instructor: fullData || instructor,
          matchingCourses: matchingCourses.length > 0 ? matchingCourses : [],
          totalCourses: allCourses.length,
          filteredTotal: matchingCourses.length,
          matchedByName: communityMatches && matchingCourses.length === 0
        });
      }
    });

    return results;
  }, [searchQuery, indexedInstructors, activeFilter]);

  // Highlight matching text
  const highlightMatch = (text, query) => {
    if (!query.trim() || !text) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{
          background: 'rgba(99, 102, 241, 0.3)',
          color: isDarkMode ? '#a5b4fc' : '#6366f1',
          padding: '0 2px',
          borderRadius: 2
        }}>{part}</mark>
      ) : part
    );
  };

  return (
    <div className="main-content">
      <div className="three-column-layout">
        <div className="center-column" style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            padding: '24px 16px',
            borderBottom: isDarkMode ? '1px solid #2f3336' : '1px solid #e5e7eb'
          }}>
            <h1 style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 16,
              color: isDarkMode ? '#f5f5f7' : '#111827'
            }}>
              Discover
            </h1>

            {/* Search Bar */}
            <div style={{ position: 'relative', maxWidth: 600 }}>
              <FaSearch style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: isDarkMode ? '#71717a' : '#9ca3af',
                fontSize: 18
              }} />
              <input
                type="text"
                placeholder="Search communities & courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  fontSize: 16,
                  border: isDarkMode ? '2px solid #27272a' : '2px solid #e5e7eb',
                  borderRadius: 9999,
                  background: isDarkMode ? '#1a1a24' : '#f9fafb',
                  color: isDarkMode ? '#f5f5f7' : '#111827',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = isDarkMode ? '#27272a' : '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Filter Pills - Scrollable Row */}
            <div style={{
              marginTop: 16,
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              paddingBottom: 4,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              <div style={{
                display: 'inline-flex',
                gap: 8
              }}>
                {filterPills.map((pill) => {
                  const isActive = activeFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setActiveFilter(pill.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 20,
                        fontSize: 14,
                        fontWeight: 500,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        flexShrink: 0,
                        background: isActive
                          ? '#6366f1'
                          : isDarkMode ? '#27272a' : '#e5e7eb',
                        color: isActive
                          ? '#fff'
                          : isDarkMode ? '#a1a1aa' : '#6b7280'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = isDarkMode ? '#3f3f46' : '#d1d5db';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = isDarkMode ? '#27272a' : '#e5e7eb';
                        }
                      }}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {searchQuery && (
              <p style={{
                marginTop: 12,
                fontSize: 14,
                color: isDarkMode ? '#71717a' : '#6b7280'
              }}>
                Showing results for "<span style={{ color: '#6366f1' }}>{searchQuery}</span>"
                {activeFilter !== 'All' && (
                  <span> filtered by <span style={{ color: '#6366f1' }}>{activeFilter}</span></span>
                )}
              </p>
            )}
          </div>

          {/* Results */}
          <div style={{ padding: '0' }}>
            {searchResults.length === 0 ? (
              <div style={{
                padding: 48,
                textAlign: 'center',
                color: isDarkMode ? '#71717a' : '#9ca3af'
              }}>
                No communities or courses found matching "{searchQuery}"
              </div>
            ) : (
              searchResults.map((result) => {
                const { instructor, matchingCourses, totalCourses, matchedByName } = result;
                const isFollowing = isCreatorFollowed(instructor.id);

                return (
                  <div
                    key={instructor.id}
                    style={{
                      background: isDarkMode ? '#12121a' : '#fff',
                      borderBottom: isDarkMode ? '1px solid #27272a' : '1px solid #e5e7eb'
                    }}
                  >
                    {/* Community Header */}
                    <div
                      onClick={() => onViewCommunity && onViewCommunity(instructor)}
                      style={{
                        padding: 20,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#1a1a24' : '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Top row: Avatar, Name, Follow button */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        marginBottom: 12
                      }}>
                        <div style={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, #6366f1 0%, #10b981 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24,
                          fontWeight: 700,
                          color: '#fff',
                          flexShrink: 0,
                          overflow: 'hidden'
                        }}>
                          {instructor.avatar ? (
                            <img src={instructor.avatar} alt={instructor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            instructor.name?.charAt(0) || '?'
                          )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: isDarkMode ? '#f5f5f7' : '#111827',
                            marginBottom: 4
                          }}>
                            {highlightMatch(instructor.name, searchQuery)}
                          </div>
                          <div style={{
                            fontSize: 14,
                            color: isDarkMode ? '#a1a1aa' : '#6b7280',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                          }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <AiOutlineTeam /> {(instructor.stats?.studentsTaught || 0).toLocaleString()} followers
                            </span>
                            <span>·</span>
                            <span>{instructor.title}</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollowInstructor(instructor.id);
                          }}
                          style={{
                            padding: '8px 20px',
                            borderRadius: 20,
                            background: isFollowing ? 'transparent' : '#6366f1',
                            color: isFollowing ? '#6366f1' : '#fff',
                            border: isFollowing ? '1px solid #6366f1' : 'none',
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            flexShrink: 0
                          }}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </button>
                      </div>

                      {/* Community Bio/Summary */}
                      {instructor.bio && (
                        <div style={{
                          fontSize: 14,
                          lineHeight: 1.6,
                          color: isDarkMode ? '#a1a1aa' : '#4b5563',
                          paddingLeft: 72,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {highlightMatch(instructor.bio, searchQuery)}
                        </div>
                      )}
                    </div>

                    {/* Matching Courses - Tree Style */}
                    {matchingCourses.length > 0 && (
                      <div style={{
                        paddingLeft: 48,
                        paddingRight: 20,
                        paddingBottom: 8
                      }}>
                        {matchingCourses.map((course, index) => {
                          const isLast = index === matchingCourses.length - 1;
                          return (
                            <div
                              key={course.id}
                              style={{
                                display: 'flex',
                                position: 'relative'
                              }}
                            >
                              {/* Tree Connector */}
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: 24,
                                flexShrink: 0,
                                marginRight: 8
                              }}>
                                {/* Vertical line extending up (for all items) */}
                                <div style={{
                                  width: 2,
                                  height: 20,
                                  background: isDarkMode ? '#4b5563' : '#d1d5db'
                                }} />
                                {/* Horizontal connector */}
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: '100%'
                                }}>
                                  <div style={{
                                    width: 2,
                                    height: isLast ? 0 : 'calc(100% + 20px)',
                                    background: isDarkMode ? '#4b5563' : '#d1d5db',
                                    position: 'absolute',
                                    left: 11,
                                    top: 20
                                  }} />
                                  <div style={{
                                    width: 12,
                                    height: 2,
                                    background: isDarkMode ? '#4b5563' : '#d1d5db',
                                    marginLeft: 11
                                  }} />
                                </div>
                              </div>

                              {/* Course Card */}
                              <div
                                onClick={() => onViewCourse && onViewCourse(course)}
                                style={{
                                  flex: 1,
                                  padding: '12px 16px',
                                  marginBottom: 8,
                                  background: isDarkMode ? '#1a1a24' : '#f9fafb',
                                  borderRadius: 10,
                                  border: isDarkMode ? '1px solid #27272a' : '1px solid #e5e7eb',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = isDarkMode ? '#27272a' : '#f3f4f6';
                                  e.currentTarget.style.borderColor = '#6366f1';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = isDarkMode ? '#1a1a24' : '#f9fafb';
                                  e.currentTarget.style.borderColor = isDarkMode ? '#27272a' : '#e5e7eb';
                                }}
                              >
                                {/* Course Title Row */}
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 10,
                                  marginBottom: 4
                                }}>
                                  <div style={{
                                    width: 28,
                                    height: 28,
                                    background: isDarkMode ? '#27272a' : '#e0e7ff',
                                    borderRadius: 6,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#6366f1',
                                    fontSize: 12,
                                    flexShrink: 0
                                  }}>
                                    <FaBook />
                                  </div>

                                  <div style={{
                                    flex: 1,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: isDarkMode ? '#f5f5f7' : '#111827'
                                  }}>
                                    {highlightMatch(course.title, searchQuery)}
                                  </div>

                                  <div style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: '#10b981',
                                    flexShrink: 0
                                  }}>
                                    {course.price}
                                  </div>
                                </div>

                                {/* Course Description */}
                                <div style={{
                                  fontSize: 13,
                                  lineHeight: 1.5,
                                  color: isDarkMode ? '#a1a1aa' : '#6b7280',
                                  paddingLeft: 38,
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}>
                                  {highlightMatch(course.description, searchQuery)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {matchedByName && matchingCourses.length === 0 && (
                      <div style={{
                        padding: '12px 20px 12px 80px',
                        color: isDarkMode ? '#71717a' : '#9ca3af',
                        fontSize: 13,
                        fontStyle: 'italic'
                      }}>
                        No courses match "{searchQuery}" — community name matches
                      </div>
                    )}

                    {/* See All Link */}
                    {totalCourses > matchingCourses.length && (
                      <div
                        onClick={() => onViewCommunity && onViewCommunity(instructor)}
                        style={{
                          paddingLeft: 80,
                          paddingRight: 20,
                          paddingBottom: 16,
                          paddingTop: matchingCourses.length > 0 ? 0 : 8,
                          color: '#6366f1',
                          fontSize: 14,
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                      >
                        See all {totalCourses} courses →
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

DiscoverView.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  onMenuChange: PropTypes.func,
  indexedCourses: PropTypes.array.isRequired,
  indexedInstructors: PropTypes.array.isRequired,
  followedCommunities: PropTypes.array.isRequired,
  setFollowedCommunities: PropTypes.func.isRequired,
  isCoursePurchased: PropTypes.func.isRequired,
  isCreatorFollowed: PropTypes.func.isRequired,
  handleFollowInstructor: PropTypes.func.isRequired,
  onViewCourse: PropTypes.func,
  onViewCommunity: PropTypes.func
};

export default DiscoverView;
