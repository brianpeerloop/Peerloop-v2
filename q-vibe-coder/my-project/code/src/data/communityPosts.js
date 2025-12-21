// Community mock posts data - extracted from Community.js
// This keeps the component file cleaner while preserving all mock data

  export const fakePosts = [
    // Course 1: AI for Product Managers (Jane Doe)
    {
      id: 1,
      courseId: 1,
      author: 'ProductPioneer42',
      authorAvatar: 'https://i.pravatar.cc/40?img=1',
      authorHandle: '@ProductPioneer42',
      content: 'Just finished AI for Product Managers! Jane Doe\'s teaching style is incredible. Now I can actually talk to engineers about ML without sounding clueless 😂 #PeerLoop',
      timestamp: '2 hours ago',
      likes: 1200,
      replies: 48,
      community: 'AI for Product Managers'
    },
    {
      id: 2,
      courseId: 1,
      author: 'TechPM_Sarah',
      authorAvatar: 'https://i.pravatar.cc/40?img=5',
      authorHandle: '@TechPM_Sarah',
      content: 'Became a Student-Teacher for AI for Product Managers today! 🎉 Already have 2 students booked. The 70% commission is amazing. Thank you @JaneDoe!',
      timestamp: '5 hours ago',
      likes: 890,
      replies: 35,
      community: 'AI for Product Managers'
    },

    // Course 2: Node.js Backend Development (Albert Einstein)
    {
      id: 3,
      courseId: 2,
      author: 'BackendBoss99',
      authorAvatar: 'https://i.pravatar.cc/40?img=8',
      authorHandle: '@BackendBoss99',
      content: 'Node.js Backend Development is 🔥! Built my first REST API in week 2. The 1-on-1 sessions with Student-Teachers make all the difference. #LearnTeachEarn',
      timestamp: '3 hours ago',
      likes: 1100,
      replies: 40,
      community: 'Node.js Backend Development'
    },
    {
      id: 4,
      courseId: 2,
      author: 'CodeNewbie_Mike',
      authorAvatar: 'https://i.pravatar.cc/40?img=12',
      authorHandle: '@CodeNewbie_Mike',
      content: 'Shoutout to my Student-Teacher @BackendBoss99 for explaining Express middleware! Finally clicked after our session. PeerLoop\'s model is genius.',
      timestamp: '1 day ago',
      likes: 650,
      replies: 22,
      community: 'Node.js Backend Development'
    },

    // Course 3: Cloud Architecture with AWS (Albert Einstein)
    {
      id: 5,
      courseId: 3,
      author: 'CloudMaster_Pro',
      authorAvatar: 'https://i.pravatar.cc/40?img=15',
      authorHandle: '@CloudMaster_Pro',
      content: 'Passed my AWS certification after taking Cloud Architecture with AWS! The serverless module was exactly what I needed. Now teaching others and earning 70%! 💰',
      timestamp: '4 hours ago',
      likes: 980,
      replies: 38,
      community: 'Cloud Architecture with AWS'
    },
    {
      id: 6,
      courseId: 3,
      author: 'DevOpsNewbie',
      authorAvatar: 'https://i.pravatar.cc/40?img=18',
      authorHandle: '@DevOpsNewbie',
      content: 'Week 3 of Cloud Architecture with AWS. Lambda functions finally make sense! Booking my first 1-on-1 with a Student-Teacher tomorrow. Excited!',
      timestamp: '2 days ago',
      likes: 420,
      replies: 15,
      community: 'Cloud Architecture with AWS'
    },

    // Course 4: Deep Learning Fundamentals (Jane Doe)
    {
      id: 7,
      courseId: 4,
      author: 'NeuralNetNinja',
      authorAvatar: 'https://i.pravatar.cc/40?img=21',
      authorHandle: '@NeuralNetNinja',
      content: 'Deep Learning Fundamentals changed my career! Built a CNN from scratch in the capstone. The peer teaching model helped me understand backpropagation 10x faster.',
      timestamp: '6 hours ago',
      likes: 1350,
      replies: 52,
      community: 'Deep Learning Fundamentals'
    },
    {
      id: 8,
      courseId: 4,
      author: 'AIStudent_2024',
      authorAvatar: 'https://i.pravatar.cc/40?img=24',
      authorHandle: '@AIStudent_2024',
      content: 'Just certified as a Student-Teacher for Deep Learning Fundamentals! Jane Doe approved my application today. Ready to help others while earning. Win-win! 🚀',
      timestamp: '1 day ago',
      likes: 780,
      replies: 28,
      community: 'Deep Learning Fundamentals'
    },

    // Course 5: Computer Vision with Python (Jane Doe)
    {
      id: 9,
      courseId: 5,
      author: 'VisionCoder25',
      authorAvatar: 'https://i.pravatar.cc/40?img=27',
      authorHandle: '@VisionCoder25',
      content: 'Computer Vision with Python is incredible! Detecting objects in real-time now. The community here is so supportive. Best learning investment ever!',
      timestamp: '2 hours ago',
      likes: 890,
      replies: 32,
      community: 'Computer Vision with Python'
    },
    {
      id: 10,
      courseId: 5,
      author: 'OpenCV_Fan',
      authorAvatar: 'https://i.pravatar.cc/40?img=30',
      authorHandle: '@OpenCV_Fan',
      content: 'Completed my certification for Computer Vision with Python! Already earned back $210 from 1 teaching session. Bloom\'s 2 Sigma is real! #PeerLoop',
      timestamp: '8 hours ago',
      likes: 720,
      replies: 25,
      community: 'Computer Vision with Python'
    },

    // Course 6: Natural Language Processing (Jane Doe)
    {
      id: 11,
      courseId: 6,
      author: 'NLPMastermind',
      authorAvatar: 'https://i.pravatar.cc/40?img=33',
      authorHandle: '@NLPMastermind',
      content: 'Built a sentiment analysis tool after completing Natural Language Processing! Jane Doe\'s curriculum is perfectly structured. Now I\'m teaching others! 🎓',
      timestamp: '3 hours ago',
      likes: 1050,
      replies: 42,
      community: 'Natural Language Processing'
    },
    {
      id: 12,
      courseId: 6,
      author: 'TextMiner_Pro',
      authorAvatar: 'https://i.pravatar.cc/40?img=36',
      authorHandle: '@TextMiner_Pro',
      content: 'NLP course chatbot project was amazing! My Student-Teacher explained transformers so clearly. Earned my cert and joining the teaching pool next week!',
      timestamp: '1 day ago',
      likes: 680,
      replies: 24,
      community: 'Natural Language Processing'
    },

    // Course 7: Data Science Fundamentals (Prof. Maria Rodriguez)
    {
      id: 13,
      courseId: 7,
      author: 'DataDriven_Dan',
      authorAvatar: 'https://i.pravatar.cc/40?img=39',
      authorHandle: '@DataDriven_Dan',
      content: 'Data Science Fundamentals by Prof. Rodriguez is fantastic! Pandas and matplotlib finally make sense. Scheduled 3 peer sessions this week. #DataScience',
      timestamp: '4 hours ago',
      likes: 920,
      replies: 35,
      community: 'Data Science Fundamentals'
    },
    {
      id: 14,
      courseId: 7,
      author: 'AnalyticsAce',
      authorAvatar: 'https://i.pravatar.cc/40?img=42',
      authorHandle: '@AnalyticsAce',
      content: 'Became a certified Student-Teacher for Data Science Fundamentals! Made $350 in my first week teaching. PeerLoop\'s model is revolutionary! 💪',
      timestamp: '2 days ago',
      likes: 1180,
      replies: 48,
      community: 'Data Science Fundamentals'
    },

    // Course 8: Business Intelligence & Analytics (Prof. Maria Rodriguez)
    {
      id: 15,
      courseId: 8,
      author: 'BIDashboardPro',
      authorAvatar: 'https://i.pravatar.cc/40?img=45',
      authorHandle: '@BIDashboardPro',
      content: 'BI & Analytics course transformed how I present data! Built an executive dashboard that my boss loved. Worth every penny at $450!',
      timestamp: '5 hours ago',
      likes: 850,
      replies: 30,
      community: 'Business Intelligence & Analytics'
    },
    {
      id: 16,
      courseId: 8,
      author: 'TableauNewbie',
      authorAvatar: 'https://i.pravatar.cc/40?img=48',
      authorHandle: '@TableauNewbie',
      content: 'Just enrolled in Business Intelligence & Analytics. Prof. Rodriguez\'s intro video already cleared up so much! Can\'t wait for my first 1-on-1 session!',
      timestamp: '1 day ago',
      likes: 420,
      replies: 18,
      community: 'Business Intelligence & Analytics'
    },

    // Course 9: Full-Stack Web Development (James Wilson)
    {
      id: 17,
      courseId: 9,
      author: 'FullStackFiona',
      authorAvatar: 'https://i.pravatar.cc/40?img=49',
      authorHandle: '@FullStackFiona',
      content: 'Full-Stack Web Development is the real deal! Deployed my first React + Node app today. James Wilson\'s course structure is perfect for beginners. 🌐',
      timestamp: '3 hours ago',
      likes: 1020,
      replies: 38,
      community: 'Full-Stack Web Development'
    },
    {
      id: 18,
      courseId: 9,
      author: 'WebDev_Journey',
      authorAvatar: 'https://i.pravatar.cc/40?img=51',
      authorHandle: '@WebDev_Journey',
      content: 'From zero to full-stack in 8 weeks! Now I\'m a certified Student-Teacher earning while helping others learn. PeerLoop changed my life! #LearnTeachEarn',
      timestamp: '6 hours ago',
      likes: 890,
      replies: 34,
      community: 'Full-Stack Web Development'
    },

    // Course 10: DevOps & CI/CD Mastery (James Wilson)
    {
      id: 19,
      courseId: 10,
      author: 'DevOpsDerek',
      authorAvatar: 'https://i.pravatar.cc/40?img=52',
      authorHandle: '@DevOpsDerek',
      content: 'DevOps & CI/CD Mastery course is excellent! Set up my first Jenkins pipeline today. The Student-Teacher who helped me was incredibly patient. 🔧',
      timestamp: '4 hours ago',
      likes: 780,
      replies: 28,
      community: 'DevOps & CI/CD Mastery'
    },
    {
      id: 20,
      courseId: 10,
      author: 'Pipeline_Pro',
      authorAvatar: 'https://i.pravatar.cc/40?img=53',
      authorHandle: '@Pipeline_Pro',
      content: 'Certified and now teaching DevOps & CI/CD Mastery! Already made back my course fee plus $200 extra. The flywheel effect is real! 🚀',
      timestamp: '2 days ago',
      likes: 650,
      replies: 22,
      community: 'DevOps & CI/CD Mastery'
    },

    // Course 11: Microservices Architecture (James Wilson)
    {
      id: 21,
      courseId: 11,
      author: 'MicroservicesMike',
      authorAvatar: 'https://i.pravatar.cc/40?img=54',
      authorHandle: '@MicroservicesMike',
      content: 'Microservices Architecture course helped me understand distributed systems finally! Docker + Kubernetes now make sense. Thanks to my amazing Student-Teacher!',
      timestamp: '5 hours ago',
      likes: 720,
      replies: 26,
      community: 'Microservices Architecture'
    },
    {
      id: 22,
      courseId: 11,
      author: 'ContainerKing',
      authorAvatar: 'https://i.pravatar.cc/40?img=55',
      authorHandle: '@ContainerKing',
      content: 'Week 4 of Microservices Architecture. Just built my first multi-container app! The community here is so helpful. Aiming for certification next month!',
      timestamp: '1 day ago',
      likes: 520,
      replies: 19,
      community: 'Microservices Architecture'
    },

    // Course 12: AI for Robotics Coding Lab (Dr. Priya Nair)
    {
      id: 23,
      courseId: 12,
      author: 'RoboticsGeek29',
      authorAvatar: 'https://i.pravatar.cc/40?img=56',
      authorHandle: '@RoboticsGeek29',
      content: 'AI for Robotics Coding Lab is mind-blowing! Programmed my first path-planning algorithm. Dr. Nair\'s curriculum is cutting-edge! 🤖',
      timestamp: '3 hours ago',
      likes: 980,
      replies: 38,
      community: 'AI for Robotics Coding Lab'
    },
    {
      id: 24,
      courseId: 12,
      author: 'BotBuilder_Pro',
      authorAvatar: 'https://i.pravatar.cc/40?img=57',
      authorHandle: '@BotBuilder_Pro',
      content: 'Just became a Student-Teacher for AI for Robotics! Teaching path planning algorithms and earning 70%. The protégé effect is real—I understand it better now! 🎓',
      timestamp: '8 hours ago',
      likes: 750,
      replies: 28,
      community: 'AI for Robotics Coding Lab'
    },

    // Course 13: AI for Medical Diagnostics Coding (Dr. Priya Nair)
    {
      id: 25,
      courseId: 13,
      author: 'MedTechInnovator',
      authorAvatar: 'https://i.pravatar.cc/40?img=58',
      authorHandle: '@MedTechInnovator',
      content: 'AI for Medical Diagnostics Coding is transforming healthcare! Built a diagnostic model that actually works. Dr. Nair is an incredible teacher! 🏥',
      timestamp: '4 hours ago',
      likes: 1250,
      replies: 52,
      community: 'AI for Medical Diagnostics Coding'
    },
    {
      id: 26,
      courseId: 13,
      author: 'HealthAI_Student',
      authorAvatar: 'https://i.pravatar.cc/40?img=59',
      authorHandle: '@HealthAI_Student',
      content: 'Completed my certification in AI for Medical Diagnostics! Already have 3 students lined up to teach. Making an impact AND earning income! #PeerLoop',
      timestamp: '1 day ago',
      likes: 920,
      replies: 38,
      community: 'AI for Medical Diagnostics Coding'
    },

    // Course 14: AI Coding Bootcamp: Python Projects (Prof. Elena Petrova)
    {
      id: 27,
      courseId: 14,
      author: 'PythonPro88',
      authorAvatar: 'https://i.pravatar.cc/40?img=60',
      authorHandle: '@PythonPro88',
      content: 'AI Coding Bootcamp: Python Projects is exactly what I needed! Built 5 ML projects in 6 weeks. Prof. Petrova\'s teaching style is engaging! 🐍',
      timestamp: '2 hours ago',
      likes: 880,
      replies: 32,
      community: 'AI Coding Bootcamp: Python Projects'
    },
    {
      id: 28,
      courseId: 14,
      author: 'MLBeginner_2024',
      authorAvatar: 'https://i.pravatar.cc/40?img=61',
      authorHandle: '@MLBeginner_2024',
      content: 'From Python newbie to AI developer in 8 weeks! Now I\'m teaching the bootcamp and earning 70% per session. Best investment I ever made! 💪',
      timestamp: '6 hours ago',
      likes: 720,
      replies: 26,
      community: 'AI Coding Bootcamp: Python Projects'
    },

    // ========== TOWN HALL EXCLUSIVE POSTS ==========
    // These posts appear ONLY in the Town Hall view (community-wide content)
    {
      id: 101,
      courseId: null,
      isTownHallExclusive: true,
      isPinned: true,
      author: 'PeerLoop Team',
      authorAvatar: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=100&h=100&fit=crop&crop=center',
      authorHandle: '@peerloop',
      content: 'Welcome to the Town Hall! This is your community-wide space where all PeerLoop members connect. Share your learning journey, ask questions, celebrate wins, and support fellow learners across ALL courses. Let\'s grow together! 🌟',
      timestamp: '1 day ago',
      likes: 2450,
      replies: 128,
      community: 'Town Hall'
    },
    {
      id: 102,
      courseId: null,
      isTownHallExclusive: true,
      author: 'PeerLoop Team',
      authorAvatar: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=100&h=100&fit=crop&crop=center',
      authorHandle: '@peerloop',
      content: 'New Feature: You can now follow creators for FREE Town Hall access! Purchase courses to unlock full content and become a Student-Teacher earning 70% commission. The learn-teach-earn flywheel is now even easier to join!',
      timestamp: '3 hours ago',
      likes: 1820,
      replies: 95,
      community: 'Town Hall'
    },
    {
      id: 103,
      courseId: null,
      isTownHallExclusive: true,
      author: 'Community Highlights',
      authorAvatar: 'https://i.pravatar.cc/40?img=70',
      authorHandle: '@community_highlights',
      content: '🏆 Student-Teacher of the Week: @DataDriven_Dan completed 25 teaching sessions with a 4.9 rating! Dan started as a student in Data Science Fundamentals and now helps others while earning. That\'s the PeerLoop way!',
      timestamp: '5 hours ago',
      likes: 1340,
      replies: 67,
      community: 'Town Hall'
    },
    {
      id: 104,
      courseId: null,
      isTownHallExclusive: true,
      author: 'PeerLoop Tips',
      authorAvatar: 'https://i.pravatar.cc/40?img=65',
      authorHandle: '@peerloop_tips',
      content: 'Pro tip: Book your 1-on-1 sessions 24 hours in advance for better availability. Student-Teachers appreciate the notice, and you\'ll have more time slots to choose from. Quality learning starts with good planning! 📚',
      timestamp: '8 hours ago',
      likes: 890,
      replies: 42,
      community: 'Town Hall'
    },
    {
      id: 105,
      courseId: null,
      isTownHallExclusive: true,
      author: 'PeerLoop Team',
      authorAvatar: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=100&h=100&fit=crop&crop=center',
      authorHandle: '@peerloop',
      content: '🎉 MILESTONE: The PeerLoop community just hit 10,000 completed 1-on-1 sessions! That\'s 10,000 moments of peer-to-peer learning. Thank you for making Bloom\'s 2 Sigma effect real. You\'re all pioneers!',
      timestamp: '1 day ago',
      likes: 3200,
      replies: 185,
      community: 'Town Hall'
    },
    {
      id: 106,
      courseId: null,
      isTownHallExclusive: true,
      author: 'Community Manager',
      authorAvatar: 'https://i.pravatar.cc/40?img=32',
      authorHandle: '@community_mgr',
      content: 'Question for the community: What skills are you combining? We\'re seeing learners mix AI + Business Intelligence, Full-Stack + DevOps, and more. Drop your combo below! Let\'s find study partners with similar goals. 🤝',
      timestamp: '4 hours ago',
      likes: 756,
      replies: 89,
      community: 'Town Hall'
    },
    {
      id: 107,
      courseId: null,
      isTownHallExclusive: true,
      author: 'PeerLoop Events',
      authorAvatar: 'https://i.pravatar.cc/40?img=69',
      authorHandle: '@peerloop_events',
      content: '📅 SAVE THE DATE: Live AMA this Friday at 3pm EST! All 5 creators answering YOUR questions about becoming a Student-Teacher, course selection, and career paths in tech. Drop your questions below! 🎤',
      timestamp: '6 hours ago',
      likes: 1120,
      replies: 156,
      community: 'Town Hall'
    },
    {
      id: 108,
      courseId: null,
      isTownHallExclusive: true,
      author: 'PeerLoop Stories',
      authorAvatar: 'https://i.pravatar.cc/40?img=44',
      authorHandle: '@peerloop_stories',
      content: 'SUCCESS STORY: From student to $500/week teacher in 3 months. @FullStackFiona started with zero coding experience. After completing Full-Stack Web Development, she now teaches 10 sessions/week. Read her full journey in our blog! 🚀',
      timestamp: '12 hours ago',
      likes: 1680,
      replies: 92,
      community: 'Town Hall'
    },
    {
      id: 109,
      courseId: null,
      isTownHallExclusive: true,
      author: 'PeerLoop Team',
      authorAvatar: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=100&h=100&fit=crop&crop=center',
      authorHandle: '@peerloop',
      content: 'Coming Next Week: "AI for Business Leaders" by Prof. Elena Petrova! Perfect for managers who want to understand AI without coding. Follow Prof. Petrova now for Town Hall updates and early access. 📣',
      timestamp: '2 days ago',
      likes: 945,
      replies: 58,
      community: 'Town Hall'
    },
    {
      id: 110,
      courseId: null,
      isTownHallExclusive: true,
      author: 'PeerLoop Team',
      authorAvatar: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=100&h=100&fit=crop&crop=center',
      authorHandle: '@peerloop',
      content: 'Community Guidelines Reminder: This is a supportive learning space. Encourage others, share knowledge, celebrate progress, and ask questions freely. We\'re all here to grow together. Be kind, be curious, be PeerLoop! 💙',
      timestamp: '3 days ago',
      likes: 1250,
      replies: 45,
      community: 'Town Hall'
    },

    // ========== CREATOR-SPECIFIC TOWN HALL POSTS ==========
    // These posts appear in each creator's Town Hall view

    // Albert Einstein (ID: 1) - Node.js, Cloud Architecture
    {
      id: 201,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 1,
      isPinned: true,
      author: 'Albert Einstein',
      authorAvatar: 'https://i.pravatar.cc/120?img=68',
      authorHandle: '@alberteinstein',
      content: 'Welcome to my Town Hall! Here we discuss backend development, cloud architecture, and the beautiful simplicity of well-designed systems. "Everything should be made as simple as possible, but not simpler." Ask questions, share projects, connect with fellow learners!',
      timestamp: '2 days ago',
      likes: 1890,
      replies: 156,
      community: "Einstein's Town Hall"
    },
    {
      id: 202,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 1,
      author: 'Albert Einstein',
      authorAvatar: 'https://i.pravatar.cc/120?img=68',
      authorHandle: '@alberteinstein',
      content: 'Office Hours this Thursday! I\'ll be answering questions about serverless architecture and when to use Lambda vs containers. Drop your questions below and I\'ll address the most upvoted ones live. 🎥',
      timestamp: '4 hours ago',
      likes: 720,
      replies: 89,
      community: "Einstein's Town Hall"
    },
    {
      id: 203,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 1,
      author: 'Albert Einstein',
      authorAvatar: 'https://i.pravatar.cc/120?img=68',
      authorHandle: '@alberteinstein',
      content: 'Proud of this community! 47 of my students became certified Student-Teachers last month. You\'re not just learning—you\'re building the next generation of developers. The relativity of teaching: the more you teach, the more you understand.',
      timestamp: '1 day ago',
      likes: 1450,
      replies: 98,
      community: "Einstein's Town Hall"
    },

    // Jane Doe (ID: 2) - AI for PM, Deep Learning, Computer Vision, NLP
    {
      id: 211,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 2,
      isPinned: true,
      author: 'Jane Doe',
      authorAvatar: 'https://i.pravatar.cc/120?img=32',
      authorHandle: '@janedoe',
      content: 'Welcome to my AI community! Whether you\'re a PM learning to speak AI or a developer diving into deep learning, this is your space. I believe AI should be accessible to everyone. Ask anything—no question is too basic!',
      timestamp: '1 day ago',
      likes: 2340,
      replies: 187,
      community: "Jane's Town Hall"
    },
    {
      id: 212,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 2,
      author: 'Jane Doe',
      authorAvatar: 'https://i.pravatar.cc/120?img=32',
      authorHandle: '@janedoe',
      content: 'Big announcement: I\'m launching a new course on "AI Agents & Automation" next month! Early followers get 20% off. This Town Hall will get exclusive previews and beta access. Stay tuned! 🚀',
      timestamp: '3 hours ago',
      likes: 1680,
      replies: 234,
      community: "Jane's Town Hall"
    },
    {
      id: 213,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 2,
      author: 'Jane Doe',
      authorAvatar: 'https://i.pravatar.cc/120?img=32',
      authorHandle: '@janedoe',
      content: 'Weekly AI News Roundup: GPT-5 rumors, new computer vision breakthroughs, and what it means for your career. Let\'s discuss in the comments—what AI news caught your attention this week?',
      timestamp: '8 hours ago',
      likes: 980,
      replies: 145,
      community: "Jane's Town Hall"
    },

    // Prof. Maria Rodriguez (ID: 3) - Data Science, Business Intelligence
    {
      id: 221,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 3,
      isPinned: true,
      author: 'Prof. Maria Rodriguez',
      authorAvatar: 'https://i.pravatar.cc/120?img=47',
      authorHandle: '@profmaria',
      content: 'Welcome data enthusiasts! This Town Hall is for everyone passionate about turning data into insights. From SQL basics to advanced analytics—we cover it all. Share your dashboards, ask for feedback, and grow together! 📊',
      timestamp: '2 days ago',
      likes: 1560,
      replies: 134,
      community: "Maria's Town Hall"
    },
    {
      id: 222,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 3,
      author: 'Prof. Maria Rodriguez',
      authorAvatar: 'https://i.pravatar.cc/120?img=47',
      authorHandle: '@profmaria',
      content: 'Dashboard Challenge: Create a visualization showing any public dataset and share it here! Best submissions get featured in my next course module. Deadline: End of this week. Who\'s in? 🏆',
      timestamp: '5 hours ago',
      likes: 890,
      replies: 67,
      community: "Maria's Town Hall"
    },
    {
      id: 223,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 3,
      author: 'Prof. Maria Rodriguez',
      authorAvatar: 'https://i.pravatar.cc/120?img=47',
      authorHandle: '@profmaria',
      content: 'Career tip: Companies don\'t just want data scientists who can code—they want storytellers. Practice explaining your insights to non-technical people. That skill alone will set you apart. What\'s your best tip for data storytelling?',
      timestamp: '1 day ago',
      likes: 1120,
      replies: 89,
      community: "Maria's Town Hall"
    },

    // James Wilson (ID: 4) - Full-Stack, DevOps, Microservices
    {
      id: 231,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 4,
      isPinned: true,
      author: 'James Wilson',
      authorAvatar: 'https://i.pravatar.cc/120?img=60',
      authorHandle: '@jameswilson',
      content: 'Hey builders! Welcome to my Town Hall. This is where we talk shop about full-stack development, DevOps, and building things that scale. Share your projects, get code reviews, and let\'s ship some software together! 🛠️',
      timestamp: '1 day ago',
      likes: 1780,
      replies: 145,
      community: "James's Town Hall"
    },
    {
      id: 232,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 4,
      author: 'James Wilson',
      authorAvatar: 'https://i.pravatar.cc/120?img=60',
      authorHandle: '@jameswilson',
      content: 'Hot take: Most developers overcomplicate their CI/CD pipelines. Start simple. GitHub Actions + Vercel/Railway can handle 90% of use cases. What\'s your go-to deployment stack?',
      timestamp: '6 hours ago',
      likes: 1340,
      replies: 178,
      community: "James's Town Hall"
    },
    {
      id: 233,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 4,
      author: 'James Wilson',
      authorAvatar: 'https://i.pravatar.cc/120?img=60',
      authorHandle: '@jameswilson',
      content: 'Code Review Friday! Drop a link to your GitHub repo and I\'ll review 3 projects live on stream this Friday at 2pm EST. Focus areas: React patterns, API design, or Docker configs. First come, first served! 👀',
      timestamp: '12 hours ago',
      likes: 920,
      replies: 56,
      community: "James's Town Hall"
    },

    // Dr. Priya Nair (ID: 5) - AI for Robotics, Medical AI
    {
      id: 241,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 5,
      isPinned: true,
      author: 'Dr. Priya Nair',
      authorAvatar: 'https://i.pravatar.cc/120?img=45',
      authorHandle: '@drpriyanair',
      content: 'Welcome to the frontier of AI! This Town Hall is for those passionate about AI in robotics and healthcare. These fields will transform humanity—and you\'re here to be part of it. Let\'s explore together! 🤖🏥',
      timestamp: '2 days ago',
      likes: 1670,
      replies: 123,
      community: "Priya's Town Hall"
    },
    {
      id: 242,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 5,
      author: 'Dr. Priya Nair',
      authorAvatar: 'https://i.pravatar.cc/120?img=45',
      authorHandle: '@drpriyanair',
      content: 'Exciting news: Our Medical AI research paper got accepted! Three of my students are co-authors. This is what PeerLoop is about—learning that leads to real-world impact. Congratulations team! 🎉',
      timestamp: '4 hours ago',
      likes: 2100,
      replies: 167,
      community: "Priya's Town Hall"
    },
    {
      id: 243,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 5,
      author: 'Dr. Priya Nair',
      authorAvatar: 'https://i.pravatar.cc/120?img=45',
      authorHandle: '@drpriyanair',
      content: 'Ethics discussion: As AI becomes more capable in medical diagnosis, how do we ensure it augments rather than replaces human judgment? I\'d love to hear your thoughts on AI ethics in healthcare.',
      timestamp: '1 day ago',
      likes: 1340,
      replies: 198,
      community: "Priya's Town Hall"
    },

    // Prof. Elena Petrova (ID: 6) - Python Bootcamp
    {
      id: 251,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 6,
      isPinned: true,
      author: 'Prof. Elena Petrova',
      authorAvatar: 'https://i.pravatar.cc/120?img=44',
      authorHandle: '@profpetrova',
      content: 'Welcome Python enthusiasts! From complete beginners to those building AI projects—this Town Hall is your home. Python is the most beginner-friendly language AND powers cutting-edge AI. Best of both worlds! 🐍',
      timestamp: '1 day ago',
      likes: 1450,
      replies: 112,
      community: "Elena's Town Hall"
    },
    {
      id: 252,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 6,
      author: 'Prof. Elena Petrova',
      authorAvatar: 'https://i.pravatar.cc/120?img=44',
      authorHandle: '@profpetrova',
      content: 'Beginner tip: Don\'t memorize syntax. Understand concepts, then Google the syntax. Every professional developer does this. Focus on problem-solving, not memorization. What was your biggest "aha" moment learning Python?',
      timestamp: '7 hours ago',
      likes: 1120,
      replies: 134,
      community: "Elena's Town Hall"
    },
    {
      id: 253,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 6,
      author: 'Prof. Elena Petrova',
      authorAvatar: 'https://i.pravatar.cc/120?img=44',
      authorHandle: '@profpetrova',
      content: 'Project Showcase: Share your Python projects here! Whether it\'s your first "Hello World" or a complex ML model—every project deserves celebration. I\'ll personally comment on each submission this week! 💪',
      timestamp: '10 hours ago',
      likes: 780,
      replies: 89,
      community: "Elena's Town Hall"
    },

    // ========== COMMUNITY MEMBER POSTS IN CREATOR TOWN HALLS ==========
    // Posts from students and community members in each creator's Town Hall

    // Albert Einstein's Town Hall - Community Posts
    {
      id: 301,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 1,
      author: 'ServerSideSam',
      authorAvatar: 'https://i.pravatar.cc/40?img=11',
      authorHandle: '@serversam',
      content: 'Question for the community: I\'m choosing between Lambda and ECS for a new project. ~100 requests/sec, variable load. What would you recommend? Been watching Albert\'s AWS course but want real-world opinions too.',
      timestamp: '2 hours ago',
      likes: 156,
      replies: 34,
      community: "Einstein's Town Hall"
    },
    {
      id: 302,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 1,
      author: 'CloudNovice_Kay',
      authorAvatar: 'https://i.pravatar.cc/40?img=23',
      authorHandle: '@cloudnovice',
      content: 'Just passed my AWS Solutions Architect exam! Huge thanks to this community—your study tips in last week\'s thread were gold. Special shoutout to @BackendBoss99 for the mock exam resources! 🎉',
      timestamp: '5 hours ago',
      likes: 289,
      replies: 42,
      community: "Einstein's Town Hall"
    },
    {
      id: 303,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 1,
      author: 'NodeNinja_Dev',
      authorAvatar: 'https://i.pravatar.cc/40?img=14',
      authorHandle: '@nodeninja',
      content: 'Anyone else struggling with connection pooling in Node.js + PostgreSQL? My app keeps timing out under load. Tried pg-pool but still having issues. Would appreciate any debugging tips!',
      timestamp: '8 hours ago',
      likes: 78,
      replies: 23,
      community: "Einstein's Town Hall"
    },
    {
      id: 304,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 1,
      author: 'BackendBetty',
      authorAvatar: 'https://i.pravatar.cc/40?img=26',
      authorHandle: '@backendbetty',
      content: 'Sharing my notes from Albert\'s serverless module—created a visual diagram of Lambda cold starts vs warm starts. DM me if you want the PDF! Helped me understand it way better.',
      timestamp: '1 day ago',
      likes: 445,
      replies: 67,
      community: "Einstein's Town Hall"
    },

    // Jane Doe's Town Hall - Community Posts
    {
      id: 311,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 2,
      author: 'AIProductLead',
      authorAvatar: 'https://i.pravatar.cc/40?img=19',
      authorHandle: '@aiproductlead',
      content: 'Hot take: Most "AI features" in products are just glorified if-statements. Real AI integration requires understanding the model\'s limitations. Jane\'s course opened my eyes to this. What\'s your experience?',
      timestamp: '3 hours ago',
      likes: 567,
      replies: 89,
      community: "Jane's Town Hall"
    },
    {
      id: 312,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 2,
      author: 'MLNewbie_2024',
      authorAvatar: 'https://i.pravatar.cc/40?img=31',
      authorHandle: '@mlnewbie2024',
      content: 'Feeling imposter syndrome hard today. Everyone here seems so advanced. Is it normal to feel lost in week 3 of Deep Learning? I barely understand backpropagation 😅',
      timestamp: '4 hours ago',
      likes: 234,
      replies: 56,
      community: "Jane's Town Hall"
    },
    {
      id: 313,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 2,
      author: 'ComputerVisionCarl',
      authorAvatar: 'https://i.pravatar.cc/40?img=52',
      authorHandle: '@cvccarl',
      content: 'Built my first object detection model! It can identify 12 types of plants in my garden 🌱 Not perfect but it works! Thanks to everyone who helped debug my YOLO config last week.',
      timestamp: '6 hours ago',
      likes: 678,
      replies: 45,
      community: "Jane's Town Hall"
    },
    {
      id: 314,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 2,
      author: 'NLPNerd_Sophie',
      authorAvatar: 'https://i.pravatar.cc/40?img=29',
      authorHandle: '@nlpsophie',
      content: 'Study group forming! We\'re meeting Tuesdays at 7pm EST to work through Jane\'s NLP course together. Currently 8 people—room for 4 more. Reply if interested!',
      timestamp: '10 hours ago',
      likes: 189,
      replies: 34,
      community: "Jane's Town Hall"
    },

    // Prof. Maria Rodriguez's Town Hall - Community Posts
    {
      id: 321,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 3,
      author: 'DataDrivenDan',
      authorAvatar: 'https://i.pravatar.cc/40?img=39',
      authorHandle: '@datadrivendan',
      content: 'Just got promoted to Senior Data Analyst! My manager specifically mentioned my improved data storytelling skills. Maria\'s course on visualization changed how I present insights. Forever grateful! 📊',
      timestamp: '2 hours ago',
      likes: 890,
      replies: 78,
      community: "Maria's Town Hall"
    },
    {
      id: 322,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 3,
      author: 'SQLStarter_Amy',
      authorAvatar: 'https://i.pravatar.cc/40?img=38',
      authorHandle: '@sqlamy',
      content: 'Can someone explain JOINs like I\'m 5? I\'ve watched the video 3 times and still confused about LEFT vs INNER. Examples with real data would be amazing! 🙏',
      timestamp: '4 hours ago',
      likes: 123,
      replies: 45,
      community: "Maria's Town Hall"
    },
    {
      id: 323,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 3,
      author: 'TableauTom',
      authorAvatar: 'https://i.pravatar.cc/40?img=15',
      authorHandle: '@tableautom',
      content: 'Sharing my submission for Maria\'s Dashboard Challenge! Built a COVID vaccination tracker using public CDC data. Feedback welcome—especially on color choices. Link in bio.',
      timestamp: '7 hours ago',
      likes: 345,
      replies: 28,
      community: "Maria's Town Hall"
    },
    {
      id: 324,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 3,
      author: 'AnalyticsAnna',
      authorAvatar: 'https://i.pravatar.cc/40?img=41',
      authorHandle: '@analyticsanna',
      content: 'Interview tip: I got asked "How would you measure success for a new feature?" in 3 different interviews. Maria\'s framework for defining metrics saved me every time. Write it down!',
      timestamp: '1 day ago',
      likes: 567,
      replies: 34,
      community: "Maria's Town Hall"
    },

    // James Wilson's Town Hall - Community Posts
    {
      id: 331,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 4,
      author: 'ReactRookie_Max',
      authorAvatar: 'https://i.pravatar.cc/40?img=17',
      authorHandle: '@reactmax',
      content: 'Deployed my first full-stack app today! It\'s a todo app (I know, I know 😂) but it has auth, a database, and CI/CD. Baby steps! James\' course made it possible.',
      timestamp: '1 hour ago',
      likes: 456,
      replies: 67,
      community: "James's Town Hall"
    },
    {
      id: 332,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 4,
      author: 'DevOps_Diana',
      authorAvatar: 'https://i.pravatar.cc/40?img=25',
      authorHandle: '@devopsdiana',
      content: 'Docker question: Is it bad practice to run multiple processes in one container? My mentor says yes, but I\'ve seen it in production. What\'s the community consensus?',
      timestamp: '5 hours ago',
      likes: 234,
      replies: 56,
      community: "James's Town Hall"
    },
    {
      id: 333,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 4,
      author: 'K8sKyle',
      authorAvatar: 'https://i.pravatar.cc/40?img=53',
      authorHandle: '@k8skyle',
      content: 'Finally understood Kubernetes networking after 3 weeks of confusion! The "aha" moment was realizing Services are just load balancers. Sometimes the simple explanation clicks best.',
      timestamp: '9 hours ago',
      likes: 567,
      replies: 34,
      community: "James's Town Hall"
    },
    {
      id: 334,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 4,
      author: 'MicroservicesMia',
      authorAvatar: 'https://i.pravatar.cc/40?img=43',
      authorHandle: '@microservicesmia',
      content: 'Code review request! Built a REST API for my portfolio project. Would love feedback on error handling and response structure. GitHub link in my profile. Be brutal—I want to learn! 💪',
      timestamp: '12 hours ago',
      likes: 189,
      replies: 23,
      community: "James's Town Hall"
    },

    // Dr. Priya Nair's Town Hall - Community Posts
    {
      id: 341,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 5,
      author: 'RoboticsRaj',
      authorAvatar: 'https://i.pravatar.cc/40?img=56',
      authorHandle: '@roboticsraj',
      content: 'Working on my capstone: autonomous drone navigation in indoor spaces. Stuck on SLAM implementation. Anyone here experienced with ROS2 + ORB-SLAM3? Would love to connect!',
      timestamp: '3 hours ago',
      likes: 234,
      replies: 45,
      community: "Priya's Town Hall"
    },
    {
      id: 342,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 5,
      author: 'MedAI_Michelle',
      authorAvatar: 'https://i.pravatar.cc/40?img=35',
      authorHandle: '@medaimichelle',
      content: 'The ethics discussion last week was incredible. As a nurse transitioning to health tech, it\'s reassuring to see AI developers taking patient safety seriously. This community gets it. ❤️',
      timestamp: '6 hours ago',
      likes: 456,
      replies: 34,
      community: "Priya's Town Hall"
    },
    {
      id: 343,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 5,
      author: 'PathPlanningPete',
      authorAvatar: 'https://i.pravatar.cc/40?img=12',
      authorHandle: '@pathpete',
      content: 'A* vs Dijkstra vs RRT for robotics path planning—when do you use each? Working through Dr. Nair\'s module but want to understand real-world trade-offs better.',
      timestamp: '8 hours ago',
      likes: 178,
      replies: 56,
      community: "Priya's Town Hall"
    },
    {
      id: 344,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 5,
      author: 'DiagnosticsDeep',
      authorAvatar: 'https://i.pravatar.cc/40?img=22',
      authorHandle: '@diagdeep',
      content: 'Paper reading group! We\'re discussing "Attention Is All You Need" next Thursday. Priya recommended it for understanding transformer architectures in medical imaging. Join us! 📚',
      timestamp: '1 day ago',
      likes: 289,
      replies: 23,
      community: "Priya's Town Hall"
    },

    // Prof. Elena Petrova's Town Hall - Community Posts
    {
      id: 351,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 6,
      author: 'PythonPadawan',
      authorAvatar: 'https://i.pravatar.cc/40?img=62',
      authorHandle: '@pythonpadawan',
      content: 'Day 30 of learning Python! Today I finally understood list comprehensions. It\'s like magic—3 lines became 1. Small win but I\'m celebrating! 🎉',
      timestamp: '2 hours ago',
      likes: 567,
      replies: 78,
      community: "Elena's Town Hall"
    },
    {
      id: 352,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 6,
      author: 'AutomationAndy',
      authorAvatar: 'https://i.pravatar.cc/40?img=18',
      authorHandle: '@automationandy',
      content: 'Used Python to automate my boring Excel reports at work. Saved 4 hours/week! Boss thinks I\'m a wizard. Thank you Elena and this amazing community for the confidence to try!',
      timestamp: '4 hours ago',
      likes: 890,
      replies: 56,
      community: "Elena's Town Hall"
    },
    {
      id: 353,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 6,
      author: 'DebugDenise',
      authorAvatar: 'https://i.pravatar.cc/40?img=28',
      authorHandle: '@debugdenise',
      content: 'Help! Getting "IndentationError" but my code looks fine. I\'ve been staring at it for an hour. Can someone take a look? Screenshot in thread. Python is testing my patience today 😤',
      timestamp: '7 hours ago',
      likes: 145,
      replies: 34,
      community: "Elena's Town Hall"
    },
    {
      id: 354,
      courseId: null,
      isCreatorTownHall: true,
      instructorId: 6,
      author: 'MLMiguel',
      authorAvatar: 'https://i.pravatar.cc/40?img=16',
      authorHandle: '@mlmiguel',
      content: 'From Elena\'s bootcamp to my first ML job in 6 months! Starting as Junior ML Engineer next week. Proof that career changers can make it. Don\'t give up! 🚀',
      timestamp: '10 hours ago',
      likes: 1230,
      replies: 89,
      community: "Elena's Town Hall"
    }
  ];
