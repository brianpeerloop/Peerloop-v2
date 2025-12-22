import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

/**
 * CreatorProfileCard Component
 * Mini profile card shown when a creator is selected in My Creators mode
 * Includes course filter dropdown
 *
 * @param {Object} creator - Creator data from groupedByCreator
 * @param {Object} instructor - Instructor data from database
 * @param {boolean} isDarkMode - Dark mode flag
 * @param {Function} onMenuChange - Callback for navigation
 * @param {Array} selectedCourseFilters - Currently selected course filters
 * @param {Function} setSelectedCourseFilters - Update course filters
 * @param {boolean} showPostingCourseDropdown - Dropdown visibility state
 * @param {Function} setShowPostingCourseDropdown - Update dropdown visibility
 */
const CreatorProfileCard = ({
  creator,
  instructor,
  isDarkMode = false,
  onMenuChange = null,
  selectedCourseFilters = [],
  setSelectedCourseFilters,
  showPostingCourseDropdown = false,
  setShowPostingCourseDropdown
}) => {
  if (!creator || !instructor) return null;

  const availableCourses = creator.allCourses.filter(course =>
    creator.followedCourseIds.includes(course.id)
  );
  const isHubSelected = selectedCourseFilters.length === 0;

  const handleGoToProfile = () => {
    localStorage.setItem('pendingBrowseInstructor', JSON.stringify(instructor));
    localStorage.setItem('browseActiveTopMenu', 'creators');
    if (onMenuChange) {
      onMenuChange('Browse');
    }
  };

  return (
    <div style={{
      background: isDarkMode ? '#1f2937' : '#f9fafb',
      borderRadius: 12,
      padding: '12px 16px',
      margin: '8px 16px 0 16px',
      position: 'relative',
      zIndex: 1,
      border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
      boxShadow: isDarkMode ? '0 4px 25px 10px rgba(80, 80, 80, 0.8)' : 'none'
    }}>
      {/* Creator Info Row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10
      }}>
        {/* Avatar */}
        {instructor.avatar ? (
          <img
            src={instructor.avatar}
            alt={instructor.name}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0
            }}
          />
        ) : (
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#1d9bf0',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 700,
            flexShrink: 0
          }}>
            {instructor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
        )}

        {/* Creator Details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              onClick={handleGoToProfile}
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#1d9bf0',
                cursor: 'pointer',
                display: 'inline-block',
                lineHeight: 1.2
              }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              {instructor.name}
            </div>
            <div
              onClick={handleGoToProfile}
              style={{
                fontSize: 12,
                color: '#1d9bf0',
                cursor: 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              Go to Profile
            </div>
          </div>
          <div style={{
            fontSize: 13,
            color: isDarkMode ? '#9ca3af' : '#536471'
          }}>
            {instructor.title}
          </div>
          <div style={{
            fontSize: 12,
            color: isDarkMode ? '#9ca3af' : '#536471',
            marginTop: 2
          }}>
            {instructor.courses?.length || 0} Courses · {(instructor.stats?.studentsTaught || 0).toLocaleString()} Students · {Math.floor(Math.random() * 200) + 20} Posts
          </div>
          {instructor.bio && (
            <div style={{
              fontSize: 13,
              color: isDarkMode ? '#d1d5db' : '#374151',
              marginTop: 8,
              lineHeight: 1.4
            }}>
              {instructor.bio.length > 150 ? instructor.bio.substring(0, 150) + '...' : instructor.bio}
            </div>
          )}
        </div>
      </div>

      {/* Filter by Courses Dropdown */}
      <div style={{
        marginTop: 12,
        background: 'transparent'
      }}>
        <div style={{
          fontSize: 14,
          fontWeight: 600,
          color: isDarkMode ? '#e7e9ea' : '#0f1419',
          marginBottom: 6
        }}>
          Filter by Course
        </div>

        <div className="filter-courses-dropdown-wrapper" style={{ position: 'relative', maxWidth: 280 }}>
          <button
            onClick={() => setShowPostingCourseDropdown(!showPostingCourseDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '8px 12px',
              borderRadius: 6,
              border: isDarkMode ? '1px solid #2f3336' : '1px solid #cfd9de',
              background: isDarkMode ? '#2f3336' : '#f7f9f9',
              color: isDarkMode ? '#e7e9ea' : '#0f1419',
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
              transition: 'border-color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#1d9bf0'}
            onMouseLeave={e => e.currentTarget.style.borderColor = isDarkMode ? '#2f3336' : '#cfd9de'}
          >
            <span>
              {isHubSelected
                ? `Town Hall for ${instructor.name}`
                : selectedCourseFilters[0].name}
            </span>
            <FaChevronDown style={{ fontSize: 12, color: isDarkMode ? '#71767b' : '#536471' }} />
          </button>

          {/* Dropdown Menu */}
          {showPostingCourseDropdown && (
            <div
              className="posting-course-dropdown"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                minWidth: 200,
                marginTop: 2,
                background: isDarkMode ? '#16181c' : '#fff',
                border: isDarkMode ? '1px solid #2f3336' : '1px solid #cfd9de',
                borderRadius: 6,
                boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 100,
                maxHeight: 200,
                overflowY: 'auto'
              }}
            >
              {/* Community Hub option */}
              <div
                onClick={() => {
                  setSelectedCourseFilters([]);
                  setShowPostingCourseDropdown(false);
                }}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: isHubSelected ? '#1d9bf0' : (isDarkMode ? '#e7e9ea' : '#0f1419'),
                  fontWeight: isHubSelected ? 600 : 400,
                  fontSize: 13,
                  background: 'transparent',
                  transition: 'background 0.15s',
                  borderBottom: isDarkMode ? '1px solid #2f3336' : '1px solid #eff3f4'
                }}
                onMouseEnter={e => e.currentTarget.style.background = isDarkMode ? '#2f3336' : '#f7f9f9'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Town Hall for {instructor.name}
              </div>

              {/* Individual Courses */}
              {availableCourses.map(course => {
                const isSelected = selectedCourseFilters.length === 1 && selectedCourseFilters[0].id === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      setSelectedCourseFilters([{ id: course.id, name: course.title }]);
                      setShowPostingCourseDropdown(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      color: isSelected ? '#1d9bf0' : (isDarkMode ? '#e7e9ea' : '#0f1419'),
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: 13,
                      background: 'transparent',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = isDarkMode ? '#2f3336' : '#f7f9f9'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {course.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorProfileCard;
