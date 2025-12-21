import React from 'react';
import { FaHeart, FaComment, FaAt, FaRetweet, FaUser, FaCalendar, FaGraduationCap, FaStar, FaDollarSign, FaBullhorn, FaClock, FaCheckCircle } from 'react-icons/fa';

const Notifications = ({ isDarkMode }) => {
  // X.com style notifications for PeerLoop interactions
  const notifications = [
    // Likes
    {
      id: 1,
      type: 'like',
      icon: <FaHeart style={{ color: '#e11d48' }} />,
      users: [
        { name: 'Sarah Chen', avatar: 'https://via.placeholder.com/32x32/FF6B6B/ffffff?text=SC' },
        { name: 'Mike Rodriguez', avatar: 'https://via.placeholder.com/32x32/4ECDC4/ffffff?text=MR' },
        { name: 'Emma Wilson', avatar: 'https://via.placeholder.com/32x32/9B59B6/ffffff?text=EW' }
      ],
      content: 'liked your post',
      postPreview: '"Just completed my Student-Teacher certification in Node.js! Ready to help others learn"',
      timestamp: '2m',
      unread: true
    },
    // Comment/Reply
    {
      id: 2,
      type: 'reply',
      icon: <FaComment style={{ color: '#1d9bf0' }} />,
      users: [
        { name: 'Alex Thompson', avatar: 'https://via.placeholder.com/32x32/00D2FF/ffffff?text=AT' }
      ],
      content: 'replied to your post',
      postPreview: '"Congrats! I just enrolled in your course. Looking forward to our first session!"',
      timestamp: '15m',
      unread: true
    },
    // Mention
    {
      id: 3,
      type: 'mention',
      icon: <FaAt style={{ color: '#1d9bf0' }} />,
      users: [
        { name: 'Jane Doe', avatar: 'https://via.placeholder.com/32x32/FF6B6B/ffffff?text=JD' }
      ],
      content: 'mentioned you in a post',
      postPreview: '"Shoutout to @alexstudent for being an amazing Student-Teacher! Best 1-on-1 session I\'ve had"',
      timestamp: '1h',
      unread: true
    },
    // Repost
    {
      id: 4,
      type: 'repost',
      icon: <FaRetweet style={{ color: '#1d9bf0' }} />,
      users: [
        { name: 'David Park', avatar: 'https://via.placeholder.com/32x32/FFD93D/000000?text=DP' },
        { name: 'Lisa Wang', avatar: 'https://via.placeholder.com/32x32/6C5CE7/ffffff?text=LW' }
      ],
      content: 'reposted your post',
      postPreview: '"The PeerLoop model is genius - Learn, Teach, Earn. Already made $420 this week teaching!"',
      timestamp: '2h',
      unread: true
    },
    // New Follower
    {
      id: 5,
      type: 'follow',
      icon: <FaUser style={{ color: '#1d9bf0' }} />,
      users: [
        { name: 'Marcus Chen', avatar: 'https://via.placeholder.com/32x32/FF9900/ffffff?text=MC' }
      ],
      content: 'followed you',
      postPreview: null,
      timestamp: '3h',
      unread: true
    },
    // Session Booked
    {
      id: 6,
      type: 'session',
      icon: <FaCalendar style={{ color: '#1d9bf0' }} />,
      users: [
        { name: 'Rachel Green', avatar: 'https://via.placeholder.com/32x32/00B894/ffffff?text=RG' }
      ],
      content: 'booked a session with you',
      postPreview: 'Node.js Backend Development - Tomorrow at 2:00 PM',
      timestamp: '4h',
      unread: false
    },
    // Course Enrollment
    {
      id: 7,
      type: 'enrollment',
      icon: <FaGraduationCap style={{ color: '#1d9bf0' }} />,
      users: [
        { name: 'Tom Bradley', avatar: 'https://via.placeholder.com/32x32/74B9FF/ffffff?text=TB' },
        { name: 'Amy Foster', avatar: 'https://via.placeholder.com/32x32/FF7675/ffffff?text=AF' },
        { name: 'Chris Lee', avatar: 'https://via.placeholder.com/32x32/636e72/ffffff?text=CL' }
      ],
      content: 'enrolled in your course',
      postPreview: 'AI for Product Managers',
      timestamp: '6h',
      unread: false
    },
    // Certification Achievement
    {
      id: 8,
      type: 'achievement',
      icon: <FaStar style={{ color: '#fbbf24' }} />,
      users: [],
      content: 'Congratulations! You\'ve been certified as a Student-Teacher',
      postPreview: 'Cloud Architecture with AWS - You can now teach and earn 70% commission',
      timestamp: '1d',
      unread: false
    },
    // Earnings Notification
    {
      id: 9,
      type: 'earnings',
      icon: <FaDollarSign style={{ color: '#1d9bf0' }} />,
      users: [],
      content: 'You earned $245 this week',
      postPreview: '7 sessions completed - 70% of $350 total tuition',
      timestamp: '1d',
      unread: false
    },
    // Creator Announcement
    {
      id: 10,
      type: 'announcement',
      icon: <FaBullhorn style={{ color: '#1d9bf0' }} />,
      users: [
        { name: 'Albert Einstein', avatar: 'https://via.placeholder.com/32x32/4ECDC4/ffffff?text=AE' }
      ],
      content: 'posted an announcement in Node.js Backend Development',
      postPreview: '"New module added: Advanced Authentication with JWT! Check it out"',
      timestamp: '2d',
      unread: false
    },
    // Multiple Likes
    {
      id: 11,
      type: 'like',
      icon: <FaHeart style={{ color: '#e11d48' }} />,
      users: [
        { name: 'Jordan Smith', avatar: 'https://via.placeholder.com/32x32/e17055/ffffff?text=JS' },
        { name: 'Taylor Brown', avatar: 'https://via.placeholder.com/32x32/fdcb6e/000000?text=TB' }
      ],
      content: 'and 12 others liked your post',
      postPreview: '"Week 3 of teaching on PeerLoop: 15 students taught, $1,050 earned. This platform is changing education!"',
      timestamp: '2d',
      unread: false
    },
    // Comment on your comment
    {
      id: 12,
      type: 'reply',
      icon: <FaComment style={{ color: '#1d9bf0' }} />,
      users: [
        { name: 'Nina Patel', avatar: 'https://via.placeholder.com/32x32/0984e3/ffffff?text=NP' }
      ],
      content: 'replied to your comment',
      postPreview: '"Thanks for the tip! The 2 Sigma explanation really helped me understand the PeerLoop model."',
      timestamp: '3d',
      unread: false
    },
    // Session Reminder
    {
      id: 13,
      type: 'reminder',
      icon: <FaClock style={{ color: '#f59e0b' }} />,
      users: [],
      content: 'Reminder: You have a session starting in 30 minutes',
      postPreview: 'Deep Learning Fundamentals with Jane Doe - 2:00 PM',
      timestamp: '3d',
      unread: false
    },
    // Payout Processed
    {
      id: 14,
      type: 'payout',
      icon: <FaCheckCircle style={{ color: '#1d9bf0' }} />,
      users: [],
      content: 'Your weekly payout has been processed',
      postPreview: '$682.50 deposited to your bank account',
      timestamp: '5d',
      unread: false
    }
  ];

  // Dark mode colors for notifications - X.com pure black
  const notifBg = isDarkMode ? '#000000' : '#fff';
  const notifBgHover = isDarkMode ? '#16181c' : '#f8fafc';
  const notifHeaderBg = isDarkMode ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)';
  const notifBorder = isDarkMode ? '#334155' : '#e2e8f0';
  const notifTextPrimary = isDarkMode ? '#f1f5f9' : '#0f1419';
  const notifTextSecondary = isDarkMode ? '#94a3b8' : '#536471';

  return (
    <div className="main-content">
      <div className="three-column-layout">
        {/* Center Column - Uses same CSS as Browse */}
        <div className="center-column">
          <div style={{
            position: 'sticky',
            top: 0,
            background: notifHeaderBg,
            backdropFilter: 'saturate(180%) blur(20px)',
            borderBottom: `1px solid ${notifBorder}`,
            padding: '16px 20px',
            zIndex: 100
          }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: notifTextPrimary, margin: 0 }}>Notifications</h1>
          </div>

          {/* Notification Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: `1px solid ${notifBorder}`,
            background: notifBg
          }}>
            <button style={{
              flex: 1,
              padding: '16px',
              background: 'none',
              border: 'none',
              fontWeight: 600,
              color: notifTextPrimary,
              borderBottom: '2px solid #1d9bf0',
              cursor: 'pointer'
            }}>All</button>
            <button style={{
              flex: 1,
              padding: '16px',
              background: 'none',
              border: 'none',
              fontWeight: 500,
              color: notifTextSecondary,
              cursor: 'pointer'
            }}>Mentions</button>
          </div>

          {/* Notifications List */}
          <div style={{ background: notifBg }}>
            {notifications.map(notification => (
              <div
                key={notification.id}
                style={{
                  display: 'flex',
                  padding: '16px 20px',
                  borderBottom: `1px solid ${notifBorder}`,
                  background: notifBg,
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = notifBgHover}
                onMouseLeave={(e) => e.currentTarget.style.background = notifBg}
              >
                {/* Icon */}
                <div style={{
                  width: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: 4,
                  fontSize: 18
                }}>
                  {notification.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, marginLeft: 12 }}>
                  {/* User Avatars - Using colored circles with initials instead of images */}
                  {notification.users.length > 0 && (
                    <div style={{ display: 'flex', marginBottom: 8, height: 32 }}>
                      {notification.users.slice(0, 3).map((user, idx) => {
                        const colors = ['#2f3336', '#3a3f44', '#4a5056', '#5a6167', '#6a7178'];
                        const colorIndex = user.name.charCodeAt(0) % colors.length;
                        const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                        return (
                          <div
                            key={idx}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              marginLeft: idx > 0 ? -8 : 0,
                              border: isDarkMode ? '2px solid #000' : '2px solid #fff',
                              background: colors[colorIndex],
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: 700,
                              flexShrink: 0
                            }}
                            title={user.name}
                          >
                            {initials}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Notification Text */}
                  <div style={{ fontSize: 15, color: notifTextPrimary, lineHeight: 1.4 }}>
                    {notification.users.length > 0 && (
                      <span style={{ fontWeight: 700 }}>
                        {notification.users.length === 1
                          ? notification.users[0].name
                          : notification.users.length === 2
                            ? `${notification.users[0].name} and ${notification.users[1].name}`
                            : `${notification.users[0].name}, ${notification.users[1].name}`}
                      </span>
                    )}
                    {' '}{notification.content}
                  </div>

                  {/* Post Preview */}
                  {notification.postPreview && (
                    <div style={{
                      marginTop: 8,
                      color: notifTextSecondary,
                      fontSize: 14,
                      lineHeight: 1.4
                    }}>
                      {notification.postPreview}
                    </div>
                  )}
                </div>

                {/* Timestamp & Unread Dot */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ fontSize: 13, color: notifTextSecondary }}>{notification.timestamp}</span>
                  {notification.unread && (
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#1d9bf0',
                      marginTop: 6
                    }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
