import React from 'react';
import { FaSearch, FaUserGraduate, FaBookOpen, FaUsers } from 'react-icons/fa';

const NewUserDashboard = ({ isDarkMode, currentUser, onMenuChange }) => {
  return (
    <div style={{
      padding: '24px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Dashboard Label */}
      <div style={{
        background: 'linear-gradient(135deg, #1d9bf0 0%, #1a8cd8 100%)',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '24px',
        color: 'white'
      }}>
        <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>
          DASHBOARD TYPE
        </div>
        <div style={{ fontSize: '20px', fontWeight: '700' }}>
          New User Dashboard
        </div>
        <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>
          Logged in as: {currentUser?.name || 'New User'}
        </div>
      </div>

      {/* Welcome Message */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: isDarkMode ? '#16181c' : '#f7f9fa',
        borderRadius: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          👋
        </div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: isDarkMode ? '#e7e9ea' : '#0f1419',
          marginBottom: '8px'
        }}>
          Welcome to PeerLoop!
        </h2>
        <p style={{
          fontSize: '15px',
          color: isDarkMode ? '#71767b' : '#536471',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          You're all set up. Let's find some courses to get you started on your learning journey.
        </p>
      </div>

      {/* Get Started Actions */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '15px',
          fontWeight: '700',
          color: isDarkMode ? '#e7e9ea' : '#0f1419',
          marginBottom: '12px'
        }}>
          Get Started
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Browse Courses */}
          <button
            onClick={() => onMenuChange && onMenuChange('Browse')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              background: isDarkMode ? '#1d9bf015' : '#1d9bf010',
              border: `1px solid ${isDarkMode ? '#1d9bf030' : '#1d9bf025'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#1d9bf0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px'
            }}>
              <FaSearch />
            </div>
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: isDarkMode ? '#e7e9ea' : '#0f1419'
              }}>
                Browse Courses
              </div>
              <div style={{
                fontSize: '13px',
                color: isDarkMode ? '#71767b' : '#536471'
              }}>
                Explore courses from expert creators
              </div>
            </div>
          </button>

          {/* Find Creators */}
          <button
            onClick={() => onMenuChange && onMenuChange('Browse_Communities')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              background: isDarkMode ? '#16181c' : '#f7f9fa',
              border: `1px solid ${isDarkMode ? '#2f3336' : '#eff3f4'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: isDarkMode ? '#2f3336' : '#eff3f4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDarkMode ? '#e7e9ea' : '#0f1419',
              fontSize: '20px'
            }}>
              <FaUsers />
            </div>
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: isDarkMode ? '#e7e9ea' : '#0f1419'
              }}>
                Find Creators
              </div>
              <div style={{
                fontSize: '13px',
                color: isDarkMode ? '#71767b' : '#536471'
              }}>
                Follow creators and join their communities
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Empty Stats */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          flex: 1,
          padding: '16px',
          background: isDarkMode ? '#16181c' : '#f7f9fa',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: isDarkMode ? '#e7e9ea' : '#0f1419'
          }}>
            0
          </div>
          <div style={{
            fontSize: '13px',
            color: isDarkMode ? '#71767b' : '#536471'
          }}>
            Courses
          </div>
        </div>
        <div style={{
          flex: 1,
          padding: '16px',
          background: isDarkMode ? '#16181c' : '#f7f9fa',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: isDarkMode ? '#e7e9ea' : '#0f1419'
          }}>
            0
          </div>
          <div style={{
            fontSize: '13px',
            color: isDarkMode ? '#71767b' : '#536471'
          }}>
            Following
          </div>
        </div>
        <div style={{
          flex: 1,
          padding: '16px',
          background: isDarkMode ? '#16181c' : '#f7f9fa',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: isDarkMode ? '#e7e9ea' : '#0f1419'
          }}>
            0
          </div>
          <div style={{
            fontSize: '13px',
            color: isDarkMode ? '#71767b' : '#536471'
          }}>
            Certificates
          </div>
        </div>
      </div>

      {/* Tip */}
      <div style={{
        padding: '16px',
        background: isDarkMode ? '#1c1f23' : '#fffbeb',
        border: `1px solid ${isDarkMode ? '#3d4144' : '#fef3c7'}`,
        borderRadius: '12px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start'
      }}>
        <span style={{ fontSize: '20px' }}>💡</span>
        <div>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: isDarkMode ? '#e7e9ea' : '#0f1419',
            marginBottom: '4px'
          }}>
            Tip: Follow creators first
          </div>
          <div style={{
            fontSize: '13px',
            color: isDarkMode ? '#71767b' : '#536471'
          }}>
            When you follow a creator, their posts will appear in your Community feed. You can then enroll in specific courses when you're ready.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserDashboard;
