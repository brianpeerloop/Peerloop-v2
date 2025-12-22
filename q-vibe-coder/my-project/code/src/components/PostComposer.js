import React from 'react';
import { FaImage, FaLink, FaPaperclip } from 'react-icons/fa';

/**
 * PostComposer Component
 * Text box for creating new posts in the community feed
 *
 * @param {Object} currentUser - Current user data
 * @param {string} newPostText - Current text in the composer
 * @param {Function} setNewPostText - Update text callback
 * @param {boolean} isComposerFocused - Focus state
 * @param {Function} setIsComposerFocused - Update focus callback
 * @param {boolean} isPosting - Loading state
 * @param {string} postError - Error message if any
 * @param {Function} onSubmit - Submit callback
 * @param {boolean} isDarkMode - Dark mode flag
 * @param {string} communityMode - 'hub' or 'creators'
 * @param {Array} selectedCourseFilters - Selected course filters
 */
const PostComposer = ({
  currentUser = null,
  newPostText = '',
  setNewPostText,
  isComposerFocused = false,
  setIsComposerFocused,
  isPosting = false,
  postError = null,
  onSubmit,
  isDarkMode = false,
  communityMode = 'hub',
  selectedCourseFilters = []
}) => {
  // Get user initials from currentUser name
  const getUserInitials = () => {
    if (!currentUser?.name) return 'AS';
    return currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getPlaceholder = () => {
    if (communityMode === 'hub') {
      return "What's on your mind? Share with the community...";
    }
    if (selectedCourseFilters.length > 0) {
      return `Discuss ${selectedCourseFilters[0].name}...`;
    }
    return "Ask a question or share an insight...";
  };

  return (
    <div
      className="post-composer"
      style={{
        borderBottom: isDarkMode ? '1px solid #2f3336' : '1px solid #eff3f4',
        padding: '12px 16px 16px 16px',
        background: isDarkMode ? 'rgba(29, 155, 240, 0.03)' : 'rgba(29, 155, 240, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Input Card */}
      <div style={{
        border: isDarkMode ? '1px solid #2f3336' : '1px solid #cfd9de',
        borderRadius: 12,
        background: isDarkMode ? '#0a0a0a' : '#fff',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        {/* Text Area with Avatar */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          padding: '12px 14px',
          gap: 10
        }}>
          {/* User Avatar */}
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
                marginTop: 2
              }}
            />
          ) : (
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#1d9bf0',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0,
              marginTop: 2
            }}>
              {getUserInitials()}
            </div>
          )}
          <textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            onFocus={() => setIsComposerFocused(true)}
            placeholder={getPlaceholder()}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: 15,
              fontWeight: 400,
              lineHeight: 1.5,
              background: 'transparent',
              color: isDarkMode ? '#e7e9ea' : '#0f1419',
              padding: 0,
              minHeight: 50,
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              display: 'block'
            }}
          />
        </div>

        {/* Bottom Action Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            borderTop: isDarkMode ? '1px solid #2f3336' : '1px solid #eff3f4',
            background: isDarkMode ? '#16181c' : '#f7f9f9',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Media Icons */}
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              style={{
                background: isDarkMode ? 'rgba(29, 155, 240, 0.1)' : 'rgba(29, 155, 240, 0.08)',
                border: 'none',
                color: '#1d9bf0',
                cursor: 'pointer',
                padding: '6px 8px',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                transition: 'background 0.2s'
              }}
              title="Add image"
              onMouseEnter={e => e.currentTarget.style.background = isDarkMode ? 'rgba(29, 155, 240, 0.2)' : 'rgba(29, 155, 240, 0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = isDarkMode ? 'rgba(29, 155, 240, 0.1)' : 'rgba(29, 155, 240, 0.08)'}
            >
              <FaImage />
            </button>
            <button
              style={{
                background: isDarkMode ? 'rgba(29, 155, 240, 0.1)' : 'rgba(29, 155, 240, 0.08)',
                border: 'none',
                color: '#1d9bf0',
                cursor: 'pointer',
                padding: '6px 8px',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                transition: 'background 0.2s'
              }}
              title="Add link"
              onMouseEnter={e => e.currentTarget.style.background = isDarkMode ? 'rgba(29, 155, 240, 0.2)' : 'rgba(29, 155, 240, 0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = isDarkMode ? 'rgba(29, 155, 240, 0.1)' : 'rgba(29, 155, 240, 0.08)'}
            >
              <FaLink />
            </button>
            <button
              style={{
                background: isDarkMode ? 'rgba(29, 155, 240, 0.1)' : 'rgba(29, 155, 240, 0.08)',
                border: 'none',
                color: '#1d9bf0',
                cursor: 'pointer',
                padding: '6px 8px',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                transition: 'background 0.2s'
              }}
              title="Attach file"
              onMouseEnter={e => e.currentTarget.style.background = isDarkMode ? 'rgba(29, 155, 240, 0.2)' : 'rgba(29, 155, 240, 0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = isDarkMode ? 'rgba(29, 155, 240, 0.1)' : 'rgba(29, 155, 240, 0.08)'}
            >
              <FaPaperclip />
            </button>
          </div>

          {/* Post Button */}
          <button
            disabled={!newPostText.trim() || isPosting}
            onClick={onSubmit}
            style={{
              background: '#1d9bf0',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '8px 20px',
              fontWeight: 600,
              fontSize: 14,
              cursor: (newPostText.trim() && !isPosting) ? 'pointer' : 'not-allowed',
              opacity: (newPostText.trim() && !isPosting) ? 1 : 0.5,
              transition: 'opacity 0.2s'
            }}
          >
            {isPosting ? 'Posting...' : 'Post'}
          </button>
        </div>
        {postError && (
          <div style={{ color: '#f44', fontSize: 12, padding: '0 12px 8px' }}>{postError}</div>
        )}
      </div>
    </div>
  );
};

export default PostComposer;
