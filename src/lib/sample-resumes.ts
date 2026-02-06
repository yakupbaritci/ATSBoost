export const SAMPLE_RESUMES = [
    {
        id: 'sample-software-engineer',
        title: 'Senior Software Engineer',
        category: 'Programming',
        description: 'Experienced full-stack developer with a focus on scalable web applications and cloud infrastructure.',
        content: {
            contact: {
                fullName: 'Alex Chen',
                email: 'alex.chen@example.com',
                phone: '+1 (555) 123-4567',
                location: 'San Francisco, CA',
                linkedin: 'linkedin.com/in/alexc-demo',
                portfolio: 'github.com/alexc-code'
            },
            summary: 'Senior Software Engineer with 6+ years of experience in full-stack development. Proven track record of leading teams and delivering scalable solutions using React, Node.js, and AWS. Passionate about code quality, performance optimization, and developer experience.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Senior Software Engineer',
                    company: 'TechFlow Solutions',
                    location: 'San Francisco, CA',
                    startDate: '2021-03',
                    endDate: 'Present',
                    description: '• Architected and led the development of a high-traffic e-commerce platform serving 1M+ monthly users.\n• Improved application performance by 40% through code splitting, caching strategies, and database indexing.\n• Mentored junior developers and conducted code reviews to maintain high code quality standards.\n• Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 60%.'
                },
                {
                    id: 'exp2',
                    title: 'Software Developer',
                    company: 'Innovate Corp',
                    location: 'Austin, TX',
                    startDate: '2018-06',
                    endDate: '2021-02',
                    description: '• Developed and maintained RESTful APIs using Node.js and Express for a SaaS product.\n• Collaborated with product managers and designers to translate requirements into technical specifications.\n• Integrated third-party payment gateways (Stripe) and messaging services (Twilio).\n• Refactored legacy codebase to modern React hooks, improving maintainability.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of California, Berkeley',
                    degree: 'B.S. Computer Science',
                    location: 'Berkeley, CA',
                    startDate: '2014-09',
                    endDate: '2018-05',
                    description: 'Graduated with Honors. Member of the Algorithms & AI Club.'
                }
            ],
            skills: [
                'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Node.js',
                'PostgreSQL', 'AWS (Lambda, S3, EC2)', 'Docker', 'Kubernetes', 'CI/CD'
            ],
            languages: [
                { language: 'English', proficiency: 'Native' },
                { language: 'Mandarin', proficiency: 'Professional Working' }
            ],
            projects: [
                {
                    title: 'CloudScale Dashboard',
                    description: 'Real-time server monitoring dashboard built with Next.js and WebSockets.'
                }
            ]
        }
    },
    {
        id: 'sample-marketing-manager',
        title: 'Digital Marketing Manager',
        category: 'Marketing',
        description: 'Result-oriented marketer specializing in SEO, content strategy, and paid advertising campaigns.',
        content: {
            contact: {
                fullName: 'Sarah Johnson',
                email: 'sarah.mktg@example.com',
                phone: '+1 (555) 987-6543',
                location: 'New York, NY',
                linkedin: 'linkedin.com/in/sarahj-mktg'
            },
            summary: 'Creative Digital Marketing Manager with 5 years of experience driving brand growth and revenue through multi-channel marketing strategies. Expert in SEO/SEM, social media management, and data analytics. Skilled in managing budgets and leading cross-functional teams.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Marketing Manager',
                    company: 'GrowthUp Agency',
                    location: 'New York, NY',
                    startDate: '2020-01',
                    endDate: 'Present',
                    description: '• Managed a $50k monthly ad spend across Google Ads and Facebook, achieving a 3.5x ROAS.\n• Developed and executed a content marketing strategy that increased organic traffic by 150% in 12 months.\n• Led a team of 4 specialists in SEO, content, and design to deliver integrated campaigns.\n• Analyzed campaign performance using Google Analytics and HubSpot to optimize conversion rates.'
                },
                {
                    id: 'exp2',
                    title: 'Digital Marketing Specialist',
                    company: 'Creative Studio',
                    location: 'Brooklyn, NY',
                    startDate: '2017-06',
                    endDate: '2019-12',
                    description: '• Executed email marketing campaigns with a 25% open rate and 3% click-through rate.\n• Managed social media profiles for 5 diverse clients, growing follower base by 40%.\n• Conducted keyword research and on-page SEO optimization for client websites.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'New York University',
                    degree: 'B.A. Marketing & Communications',
                    location: 'New York, NY',
                    startDate: '2013-09',
                    endDate: '2017-05',
                    description: 'Minor in Psychology.'
                }
            ],
            skills: [
                'SEO/SEM', 'Google Analytics', 'Google Ads', 'Facebook Ads Manager',
                'HubSpot', 'Content Strategy', 'Email Marketing (Mailchimp)', 'Copywriting'
            ],
            languages: [
                { language: 'English', proficiency: 'Native' },
                { language: 'Spanish', proficiency: 'Conversational' }
            ]
        }
    },
    {
        id: 'sample-project-manager',
        title: 'IT Project Manager',
        category: 'Business',
        description: 'Agile Project Manager with expertise in software delivery, stakeholder management, and team leadership.',
        content: {
            contact: {
                fullName: 'Michael Ross',
                email: 'm.ross@example.com',
                phone: '+1 (555) 222-3333',
                location: 'Chicago, IL',
                linkedin: 'linkedin.com/in/mross-pm'
            },
            summary: 'Certified PMP and Scrum Master with 7+ years of experience leading complex IT projects. Proven ability to bridge the gap between technical teams and business stakeholders. Dedicated to delivering projects on time, within scope, and under budget using Agile methodologies.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Senior Project Manager',
                    company: 'FinTech Solutions',
                    location: 'Chicago, IL',
                    startDate: '2019-05',
                    endDate: 'Present',
                    description: '• Successfully delivered a enterprise-wide cloud migration project 2 weeks ahead of schedule.\n• Facilitated Sprint Planning, Daily Stand-ups, and Retrospectives for 3 Agile teams.\n• Managed stakeholder expectations and communicated project status effectively to C-level executives.\n• Identified risks and implemented mitigation strategies to ensure project continuity.'
                },
                {
                    id: 'exp2',
                    title: 'Project Coordinator',
                    company: 'Global Systems Inc.',
                    location: 'Chicago, IL',
                    startDate: '2016-03',
                    endDate: '2019-04',
                    description: '• Assisted in the management of project budgets, schedules, and resource allocation.\n• Maintained project documentation and ensured compliance with PMO standards.\n• Coordinated cross-departmental meetings to resolve project blockers.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Illinois',
                    degree: 'B.S. Business Administration',
                    location: 'Champaign, IL',
                    startDate: '2012-08',
                    endDate: '2016-05',
                    description: ''
                }
            ],
            skills: [
                'Project Management (PMP)', 'Agile & Scrum', 'JIRA', 'Confluence',
                'Risk Management', 'Stakeholder Management', 'Budgeting', 'Microsoft Project'
            ],
            certifications: [
                { title: 'Project Management Professional (PMP)', date: '2019' },
                { title: 'Certified ScrumMaster (CSM)', date: '2018' }
            ]
        }
    },
    {
        id: 'sample-data-analyst',
        title: 'Data Analyst',
        category: 'Data',
        description: 'Analytical thinker experienced in data visualization, SQL querying, and providing actionable business insights.',
        content: {
            contact: {
                fullName: 'Emily Zhang',
                email: 'emily.z@example.com',
                phone: '+1 (555) 777-8888',
                location: 'Seattle, WA',
                linkedin: 'linkedin.com/in/emilyz-data',
                portfolio: 'tableau.com/profile/emilyz'
            },
            summary: 'Detail-oriented Data Analyst with a strong foundation in statistics and data modeling. Proficient in SQL, Python, and Tableau. Experienced in transforming raw data into meaningful visualizations that drive strategic business decisions.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Data Analyst',
                    company: 'Retail Insights Co.',
                    location: 'Seattle, WA',
                    startDate: '2021-06',
                    endDate: 'Present',
                    description: '• Designed and maintained interactive Tableau dashboards to track sales KPIs and customer trends.\n• Utilized SQL to query large datasets (BigQuery) and extract relevant information for reporting.\n• Conducted A/B testing analysis to optimize website user experience and conversion rates.\n• Automated weekly reporting processes using Python scripts, saving 10 hours of manual work per week.'
                },
                {
                    id: 'exp2',
                    title: 'Junior Analyst',
                    company: 'Market Research Ltd.',
                    location: 'Seattle, WA',
                    startDate: '2019-08',
                    endDate: '2021-05',
                    description: '• Cleaned and preprocessed survey data for analysis using Excel and Python (Pandas).\n• Assisted in the preparation of client presentations and market research reports.\n• Performed exploratory data analysis to identify key market opportunities.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Washington',
                    degree: 'M.S. Information Management',
                    location: 'Seattle, WA',
                    startDate: '2019-09',
                    endDate: '2021-06',
                    description: 'Specialization in Data Science.'
                }
            ],
            skills: [
                'SQL', 'Python (Pandas, NumPy)', 'Tableau', 'Power BI',
                'Excel (Advanced)', 'Statistical Analysis', 'A/B Testing', 'Data Visualization'
            ]
        }
    },
    {
        id: 'sample-graphic-designer',
        title: 'Creative Graphic Designer',
        category: 'Design',
        description: 'Visual storyteller with expertise in branding, UI design, and digital media production.',
        content: {
            contact: {
                fullName: 'Leo Martinez',
                email: 'leo.art@example.com',
                phone: '+1 (555) 444-9999',
                location: 'Los Angeles, CA',
                linkedin: 'linkedin.com/in/leom-design',
                portfolio: 'behance.net/leomartinez'
            },
            summary: 'Passionate Graphic Designer with 4 years of experience creating impactful visual identities and digital assets. Proficient in Adobe Creative Suite and Figma. Adept at collaborating with marketing teams to produce engaging content for social media, web, and print.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Graphic Designer',
                    company: 'Vivid Media Group',
                    location: 'Los Angeles, CA',
                    startDate: '2019-04',
                    endDate: 'Present',
                    description: '• Designed logos, brochures, and social media graphics for over 30 diverse clients.\n• Collaborated with UX/UI designers to create consistent visual elements for web applications.\n• Managed multiple projects simultaneously while adhering to strict deadlines and brand guidelines.\n• Edited promotional videos and motion graphics using Adobe After Effects.'
                },
                {
                    id: 'exp2',
                    title: 'Junior Designer',
                    company: 'Print & Web Solutions',
                    location: 'San Diego, CA',
                    startDate: '2017-06',
                    endDate: '2019-03',
                    description: '• Assisted senior designers in concept development and layout design.\n• Prepared files for print production and ensured comprehensive quality control.\n• Retouched product photography for e-commerce listings.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'CalArts',
                    degree: 'B.F.A. Graphic Design',
                    location: 'Valencia, CA',
                    startDate: '2013-09',
                    endDate: '2017-05',
                    description: ''
                }
            ],
            skills: [
                'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Figma',
                'Branding', 'Typography', 'UI Design', 'Motion Graphics', 'Video Editing'
            ]
        }
    },
    {
        id: 'sample-finance-analyst',
        title: 'Financial Analyst',
        category: 'Finance',
        description: 'Finance professional skilled in financial modeling, forecasting, and investment analysis.',
        content: {
            contact: {
                fullName: 'Jennifer Wu',
                email: 'jen.wu@example.com',
                phone: '+1 (555) 666-1111',
                location: 'Boston, MA',
                linkedin: 'linkedin.com/in/jenwu-finance'
            },
            summary: 'Dedicated Financial Analyst with strong quantitative skills and experience in corporate finance. Expert in building complex financial models to support strategic planning and budgeting. CFA Level II Candidate committed to continuous learning and professional development.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Financial Analyst',
                    company: 'Summit Capital',
                    location: 'Boston, MA',
                    startDate: '2020-07',
                    endDate: 'Present',
                    description: '• Developed comprehensive financial models to evaluate potential investment opportunities.\n• Prepared monthly and quarterly financial reports for senior management review.\n• Analyzed variances between actual' +
                        ' financial results and budgeted expectations.\n• Conducted industry research to identify market trends and competitive benchmarks.'
                },
                {
                    id: 'exp2',
                    title: 'Finance Intern',
                    company: 'Beacon Bank',
                    location: 'Boston, MA',
                    startDate: '2019-06',
                    endDate: '2019-08',
                    description: '• Supported the credit analysis team in reviewing loan applications.\n• Assisted in the preparation of presentation materials for client meetings.\n• Updated financial databases and ensured data accuracy.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Boston University',
                    degree: 'B.S. Finance',
                    location: 'Boston, MA',
                    startDate: '2016-09',
                    endDate: '2020-05',
                    description: 'Graduated Magna Cum Laude.'
                }
            ],
            skills: [
                'Financial Modeling', 'Excel (VBA, Pivot Tables)', 'Bloomberg Terminal',
                'Valuation Analysis', 'Corporate Finance', 'Accounting Principles (GAAP)', 'PowerPoint'
            ],
            certifications: [
                { title: 'CFA Level I Passed', date: '2020' }
            ]
        }
    },
    {
        id: 'sample-cs-student',
        title: 'Computer Science Student',
        category: 'Student',
        description: 'Motivated CS student seeking internship opportunities in software development.',
        content: {
            contact: {
                fullName: 'David Park',
                email: 'david.park@university.edu',
                phone: '+1 (555) 111-2222',
                location: 'Boston, MA',
                linkedin: 'linkedin.com/in/davidpark-cs',
                portfolio: 'github.com/davidpark'
            },
            summary: 'Third-year Computer Science student with a passion for building innovative software solutions. Strong foundation in algorithms, data structures, and web development. Seeking summer internship to apply classroom knowledge in real-world projects.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Software Development Intern',
                    company: 'StartupHub Inc.',
                    location: 'Boston, MA',
                    startDate: '2024-06',
                    endDate: '2024-08',
                    description: '• Built a customer feedback dashboard using React and Firebase.\n• Collaborated with senior developers to implement new features.\n• Participated in daily stand-ups and code reviews.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Massachusetts Institute of Technology',
                    degree: 'B.S. Computer Science',
                    location: 'Cambridge, MA',
                    startDate: '2022-09',
                    endDate: '2026-05',
                    description: 'GPA: 3.8/4.0. Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems.'
                }
            ],
            skills: ['Python', 'Java', 'JavaScript', 'React', 'Git', 'HTML/CSS', 'SQL'],
            projects: [
                { title: 'Task Manager App', description: 'Full-stack todo app with user authentication built with MERN stack.' },
                { title: 'Weather Dashboard', description: 'Real-time weather app using OpenWeather API and React.' }
            ]
        }
    },
    {
        id: 'sample-marketing-intern',
        title: 'Marketing Intern',
        category: 'Student',
        description: 'Enthusiastic marketing student with social media and content creation experience.',
        content: {
            contact: {
                fullName: 'Sophia Lee',
                email: 'sophia.lee@college.edu',
                phone: '+1 (555) 333-4444',
                location: 'Los Angeles, CA'
            },
            summary: 'Creative marketing student with hands-on experience in social media management and content creation. Proficient in Canva, Adobe Creative Suite, and Google Analytics. Eager to contribute fresh ideas to a dynamic marketing team.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Social Media Intern',
                    company: 'Local Coffee Shop',
                    location: 'Los Angeles, CA',
                    startDate: '2024-01',
                    endDate: 'Present',
                    description: '• Managed Instagram and Facebook accounts, growing followers by 30%.\n• Created engaging visual content using Canva.\n• Analyzed post performance and adjusted strategy accordingly.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Southern California',
                    degree: 'B.A. Marketing',
                    location: 'Los Angeles, CA',
                    startDate: '2022-08',
                    endDate: '2026-05',
                    description: 'Dean\'s List. Member of Marketing Club.'
                }
            ],
            skills: ['Social Media Marketing', 'Content Creation', 'Canva', 'Google Analytics', 'Copywriting']
        }
    },
    {
        id: 'sample-nurse',
        title: 'Registered Nurse',
        category: 'Medical',
        description: 'Compassionate RN with 3 years of experience in emergency and critical care.',
        content: {
            contact: {
                fullName: 'Maria Rodriguez',
                email: 'maria.rn@example.com',
                phone: '+1 (555) 777-6666',
                location: 'Houston, TX'
            },
            summary: 'Dedicated Registered Nurse with 3+ years of experience in fast-paced emergency departments. Skilled in patient assessment, IV therapy, and emergency response. Committed to providing compassionate, evidence-based care.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Emergency Department RN',
                    company: 'Houston Medical Center',
                    location: 'Houston, TX',
                    startDate: '2021-06',
                    endDate: 'Present',
                    description: '• Provide critical care to patients in high-acuity emergency settings.\n• Administer medications and treatments per physician orders.\n• Collaborate with interdisciplinary teams to ensure optimal patient outcomes.\n• Train and mentor new nursing staff.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Texas Health Science Center',
                    degree: 'B.S.N. Nursing',
                    location: 'Houston, TX',
                    startDate: '2017-08',
                    endDate: '2021-05',
                    description: ''
                }
            ],
            skills: ['Patient Assessment', 'IV Therapy', 'Emergency Care', 'Electronic Health Records (EHR)', 'CPR/BLS'],
            certifications: [
                { title: 'Registered Nurse (RN) License', date: '2021' },
                { title: 'ACLS Certification', date: '2022' }
            ]
        }
    },
    {
        id: 'sample-teacher',
        title: 'Elementary School Teacher',
        category: 'Education',
        description: 'Passionate educator with 5 years of experience teaching grades K-5.',
        content: {
            contact: {
                fullName: 'Amanda Green',
                email: 'amanda.green@school.edu',
                phone: '+1 (555) 888-9999',
                location: 'Portland, OR'
            },
            summary: 'Enthusiastic and dedicated elementary school teacher with 5 years of classroom experience. Skilled in differentiated instruction, classroom management, and fostering a positive learning environment. Committed to student success and lifelong learning.',
            experience: [
                {
                    id: 'exp1',
                    title: '3rd Grade Teacher',
                    company: 'Riverside Elementary School',
                    location: 'Portland, OR',
                    startDate: '2019-08',
                    endDate: 'Present',
                    description: '• Plan and deliver engaging lessons aligned with state standards.\n• Differentiate instruction to meet diverse learning needs.\n• Communicate regularly with parents about student progress.\n• Organize classroom activities and field trips to enhance learning.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Portland State University',
                    degree: 'B.A. Elementary Education',
                    location: 'Portland, OR',
                    startDate: '2015-09',
                    endDate: '2019-05',
                    description: ''
                }
            ],
            skills: ['Classroom Management', 'Lesson Planning', 'Differentiated Instruction', 'Google Classroom', 'Parent Communication'],
            certifications: [
                { title: 'Oregon Teaching License', date: '2019' }
            ]
        }
    },
    {
        id: 'sample-hr-specialist',
        title: 'HR Specialist',
        category: 'Business',
        description: 'HR professional with expertise in recruitment, onboarding, and employee relations.',
        content: {
            contact: {
                fullName: 'Jessica Brown',
                email: 'jessica.hr@example.com',
                phone: '+1 (555) 222-1111',
                location: 'Atlanta, GA'
            },
            summary: 'Results-driven HR Specialist with 4 years of experience in talent acquisition and employee engagement. Proficient in HRIS systems, recruitment strategies, and compliance. Passionate about creating positive workplace cultures.',
            experience: [
                {
                    id: 'exp1',
                    title: 'HR Specialist',
                    company: 'TechCorp Solutions',
                    location: 'Atlanta, GA',
                    startDate: '2020-03',
                    endDate: 'Present',
                    description: '• Manage full-cycle recruitment for technical and non-technical roles.\n• Conduct new hire onboarding and orientation sessions.\n• Maintain HRIS database and ensure data accuracy.\n• Assist with employee relations issues and conflict resolution.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Georgia State University',
                    degree: 'B.A. Human Resources Management',
                    location: 'Atlanta, GA',
                    startDate: '2016-08',
                    endDate: '2020-05',
                    description: ''
                }
            ],
            skills: ['Recruitment', 'Onboarding', 'HRIS (Workday, BambooHR)', 'Employee Relations', 'Compliance'],
            certifications: [
                { title: 'SHRM-CP', date: '2021' }
            ]
        }
    },
    {
        id: 'sample-sales-rep',
        title: 'Sales Representative',
        category: 'Business',
        description: 'High-performing sales professional with a track record of exceeding quotas.',
        content: {
            contact: {
                fullName: 'Ryan Mitchell',
                email: 'ryan.sales@example.com',
                phone: '+1 (555) 444-5555',
                location: 'Dallas, TX'
            },
            summary: 'Dynamic Sales Representative with 3+ years of experience in B2B sales. Proven ability to build relationships, close deals, and exceed sales targets. Skilled in CRM tools and consultative selling techniques.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Sales Representative',
                    company: 'CloudSoft Inc.',
                    location: 'Dallas, TX',
                    startDate: '2021-01',
                    endDate: 'Present',
                    description: '• Consistently exceeded monthly sales quotas by 20%.\n• Managed a pipeline of 50+ active leads using Salesforce.\n• Conducted product demos and presentations to prospective clients.\n• Negotiated contracts and closed deals worth $500k+ annually.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Texas at Dallas',
                    degree: 'B.B.A. Marketing',
                    location: 'Dallas, TX',
                    startDate: '2017-08',
                    endDate: '2021-05',
                    description: ''
                }
            ],
            skills: ['B2B Sales', 'Salesforce CRM', 'Lead Generation', 'Negotiation', 'Product Demos']
        }
    },
    {
        id: 'sample-ux-designer',
        title: 'UX/UI Designer',
        category: 'Design',
        description: 'User-centered designer passionate about creating intuitive digital experiences.',
        content: {
            contact: {
                fullName: 'Olivia Chen',
                email: 'olivia.ux@example.com',
                phone: '+1 (555) 666-7777',
                location: 'San Francisco, CA',
                portfolio: 'dribbble.com/oliviachen'
            },
            summary: 'Creative UX/UI Designer with 3 years of experience designing web and mobile applications. Proficient in Figma, Sketch, and user research methodologies. Dedicated to solving user problems through thoughtful design.',
            experience: [
                {
                    id: 'exp1',
                    title: 'UX/UI Designer',
                    company: 'DesignLab Studio',
                    location: 'San Francisco, CA',
                    startDate: '2021-07',
                    endDate: 'Present',
                    description: '• Designed user interfaces for 10+ web and mobile applications.\n• Conducted user research and usability testing to inform design decisions.\n• Created wireframes, prototypes, and high-fidelity mockups in Figma.\n• Collaborated with developers to ensure design implementation accuracy.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'California College of the Arts',
                    degree: 'B.F.A. Interaction Design',
                    location: 'San Francisco, CA',
                    startDate: '2017-09',
                    endDate: '2021-05',
                    description: ''
                }
            ],
            skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing']
        }
    },
    {
        id: 'sample-accountant',
        title: 'Staff Accountant',
        category: 'Finance',
        description: 'Detail-oriented accountant with expertise in bookkeeping and financial reporting.',
        content: {
            contact: {
                fullName: 'Thomas Anderson',
                email: 'thomas.acct@example.com',
                phone: '+1 (555) 999-8888',
                location: 'Denver, CO'
            },
            summary: 'Meticulous Staff Accountant with 4 years of experience in general ledger accounting, reconciliations, and financial reporting. Proficient in QuickBooks and Excel. CPA candidate committed to accuracy and compliance.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Staff Accountant',
                    company: 'Mountain Finance Group',
                    location: 'Denver, CO',
                    startDate: '2020-06',
                    endDate: 'Present',
                    description: '• Prepare monthly journal entries and account reconciliations.\n• Assist with month-end and year-end close processes.\n• Maintain general ledger and ensure accuracy of financial records.\n• Prepare financial statements and reports for management review.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Colorado',
                    degree: 'B.S. Accounting',
                    location: 'Boulder, CO',
                    startDate: '2016-08',
                    endDate: '2020-05',
                    description: ''
                }
            ],
            skills: ['General Ledger', 'Account Reconciliation', 'QuickBooks', 'Excel', 'Financial Reporting', 'GAAP'],
            certifications: [
                { title: 'CPA Candidate', date: '2024' }
            ]
        }
    },
    {
        id: 'sample-customer-service',
        title: 'Customer Service Representative',
        category: 'Business',
        description: 'Friendly and efficient customer service professional with strong communication skills.',
        content: {
            contact: {
                fullName: 'Emma Wilson',
                email: 'emma.cs@example.com',
                phone: '+1 (555) 123-9999',
                location: 'Phoenix, AZ'
            },
            summary: 'Customer-focused professional with 2+ years of experience in high-volume call center environments. Skilled in problem-solving, conflict resolution, and maintaining customer satisfaction. Proficient in CRM software and multitasking.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Customer Service Representative',
                    company: 'SupportNow Inc.',
                    location: 'Phoenix, AZ',
                    startDate: '2022-03',
                    endDate: 'Present',
                    description: '• Handle 50+ customer inquiries daily via phone, email, and chat.\n• Resolve customer complaints and issues with professionalism and empathy.\n• Maintain detailed records of customer interactions in CRM system.\n• Consistently achieve 95%+ customer satisfaction ratings.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Arizona State University',
                    degree: 'B.A. Communication',
                    location: 'Tempe, AZ',
                    startDate: '2018-08',
                    endDate: '2022-05',
                    description: ''
                }
            ],
            skills: ['Customer Service', 'Conflict Resolution', 'CRM Software', 'Communication', 'Multitasking']
        }
    },
    {
        id: 'sample-mechanical-engineer',
        title: 'Mechanical Engineer',
        category: 'Engineering',
        description: 'Innovative mechanical engineer with CAD expertise and product development experience.',
        content: {
            contact: {
                fullName: 'James Carter',
                email: 'james.eng@example.com',
                phone: '+1 (555) 777-3333',
                location: 'Detroit, MI'
            },
            summary: 'Results-oriented Mechanical Engineer with 5 years of experience in product design and development. Proficient in SolidWorks, AutoCAD, and FEA analysis. Strong background in manufacturing processes and quality control.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Mechanical Engineer',
                    company: 'AutoTech Manufacturing',
                    location: 'Detroit, MI',
                    startDate: '2019-06',
                    endDate: 'Present',
                    description: '• Design and develop mechanical components for automotive applications using SolidWorks.\n• Conduct FEA simulations to validate design integrity and performance.\n• Collaborate with cross-functional teams to bring products from concept to production.\n• Manage engineering change orders and technical documentation.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Michigan',
                    degree: 'B.S. Mechanical Engineering',
                    location: 'Ann Arbor, MI',
                    startDate: '2015-09',
                    endDate: '2019-05',
                    description: ''
                }
            ],
            skills: ['SolidWorks', 'AutoCAD', 'FEA Analysis', 'Product Development', 'Manufacturing Processes', 'GD&T'],
            certifications: [
                { title: 'Professional Engineer (PE)', date: '2021' }
            ]
        },
    // LEGAL CATEGORY
    {
        id: 'sample-attorney',
        title: 'Corporate Attorney',
        category: 'Legal',
        description: 'Experienced attorney specializing in corporate law and mergers & acquisitions.',
        content: {
            contact: {
                fullName: 'James Sterling',
                email: 'j.sterling@lawfirm.com',
                phone: '+1 (555) 999-0000',
                location: 'New York, NY',
            },
            summary: 'Results-oriented Corporate Attorney with 8+ years of experience advising Fortune 500 companies on complex legal matters. Expertise in contract negotiation, M&A due diligence, and regulatory compliance. Proven track record of mitigating legal risks and facilitating strategic business growth.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Senior Associate',
                    company: 'Sterling & Partners',
                    location: 'New York, NY',
                    startDate: '2019-05',
                    endDate: 'Present',
                    description: '• Advise public and private clients on domestic and cross-border mergers and acquisitions exceeding $500M in value.\n• Draft and negotiate complex commercial contracts, including licensing agreements and joint ventures.\n• Provide legal counsel on corporate governance, securities regulation, and periodic reporting obligations.\n• Supervise and mentor junior associates and paralegals.'
                },
                {
                    id: 'exp2',
                    title: 'Associate Attorney',
                    company: 'Global Law LLP',
                    location: 'Boston, MA',
                    startDate: '2015-09',
                    endDate: '2019-04',
                    description: '• Conducted legal research and due diligence for corporate transactions.\n• Drafted memoranda and legal opinions on various corporate law issues.\n• Assisted in the preparation of filings with the SEC and other regulatory bodies.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Harvard Law School',
                    degree: 'Juris Doctor (J.D.)',
                    location: 'Cambridge, MA',
                    startDate: '2012-08',
                    endDate: '2015-05',
                    description: 'Cum Laude. Editor, Harvard Law Review.'
                }
            ],
            skills: ['Corporate Law', 'Mergers & Acquisitions', 'Contract Negotiation', 'Due Diligence', 'Securities Regulation', 'Legal Research'],
            certifications: [
                { title: 'New York State Bar', date: '2015' }
            ]
        }
    },
    {
        id: 'sample-paralegal',
        title: 'Litigation Paralegal',
        category: 'Legal',
        description: 'Detail-oriented paralegal with expertise in legal research and document management.',
        content: {
            contact: {
                fullName: 'Sarah Jenkins',
                email: 's.jenkins@example.com',
                phone: '+1 (555) 333-2222',
                location: 'Chicago, IL',
            },
            summary: 'Organized and proactive Litigation Paralegal with 5 years of experience supporting trial attorneys. Skilled in e-discovery, case management, and drafting legal pleadings. Proficient in Relativity and Westlaw.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Paralegal',
                    company: 'Justice Law Group',
                    location: 'Chicago, IL',
                    startDate: '2020-02',
                    endDate: 'Present',
                    description: '• Manage large-scale document reviews and production for complex commercial litigation cases.\n• Draft pleadings, discovery requests, and responses for attorney review.\n• Coordinate depositions, witness interviews, and trial logistics.\n• Organize and maintain case files using Relativity e-discovery platform.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Loyola University Chicago',
                    degree: 'B.A. Political Science',
                    location: 'Chicago, IL',
                    startDate: '2015-08',
                    endDate: '2019-05',
                    description: 'Certificate in Paralegal Studies.'
                }
            ],
            skills: ['Legal Research (Westlaw/Lexis)', 'E-Discovery', 'Case Management', 'Drafting Pleadings', 'Relativity', 'Notary Public']
        }
    },
    {
        id: 'sample-compliance-officer',
        title: 'Compliance Officer',
        category: 'Legal',
        description: 'Dedicated professional ensuring organizational adherence to laws and regulations.',
        content: {
            contact: {
                fullName: 'Robert Chen',
                email: 'r.chen@compliance.com',
                phone: '+1 (555) 777-1111',
                location: 'San Francisco, CA'
            },
            summary: 'Experienced Compliance Officer with a strong background in financial services regulation. Expert in developing and implementing compliance programs, conducting risk assessments, and training employees. Certified Regulatory Compliance Manager (CRCM).',
            experience: [
                {
                    id: 'exp1',
                    title: 'Compliance Manager',
                    company: 'FinSure Bank',
                    location: 'San Francisco, CA',
                    startDate: '2018-06',
                    endDate: 'Present',
                    description: '• Develop and maintain the bank\'s compliance management system (CMS).\n• Monitor changes in banking laws and regulations to ensure ongoing compliance.\n• Conduct internal audits and risk assessments to identify potential vulnerabilities.\n• Prepare reports for the Board of Directors and regulatory agencies.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of California, Berkeley',
                    degree: 'B.S. Business Administration',
                    location: 'Berkeley, CA',
                    startDate: '2012-08',
                    endDate: '2016-05',
                    description: ''
                }
            ],
            skills: ['Regulatory Compliance', 'Risk Assessment', 'Internal Auditing', 'Policy Development', 'Anti-Money Laundering (AML)', 'KYC'],
            certifications: [
                { title: 'Certified Regulatory Compliance Manager (CRCM)', date: '2019' }
            ]
        }
    },
    {
        id: 'sample-legal-assistant',
        title: 'Legal Assistant',
        category: 'Legal',
        description: 'Efficient legal assistant providing comprehensive administrative support.',
        content: {
            contact: {
                fullName: 'Emily Davis',
                email: 'e.davis@example.com',
                phone: '+1 (555) 444-8888',
                location: 'Miami, FL'
            },
            summary: 'Highly organized Legal Assistant with 3 years of experience in a fast-paced law firm. Proficient in legal calendaring, client communication, and document formatting. Committed to ensuring efficient office operations.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Legal Assistant',
                    company: 'Coastal Law Firm',
                    location: 'Miami, FL',
                    startDate: '2021-01',
                    endDate: 'Present',
                    description: '• Provide administrative support to three partners and two associates.\n• Schedule court dates, depositions, and client meetings.\n• Transcribe dictation and proofread legal documents for errors.\n• Maintain physical and electronic filing systems.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Miami Dade College',
                    degree: 'A.S. Paralegal Studies',
                    location: 'Miami, FL',
                    startDate: '2018-08',
                    endDate: '2020-05',
                    description: ''
                }
            ],
            skills: ['Administrative Support', 'Legal Calendaring', 'Document Formatting', 'Client Relations', 'Microsoft Office Suite', 'Transcription']
        }
    },

    // HOSPITALITY CATEGORY
    {
        id: 'sample-hotel-manager',
        title: 'Hotel General Manager',
        category: 'Hospitality',
        description: 'Seasoned hospitality leader with a focus on guest satisfaction and revenue management.',
        content: {
            contact: {
                fullName: 'Michael Rossi',
                email: 'm.rossi@hotel.com',
                phone: '+1 (555) 222-9999',
                location: 'Las Vegas, NV'
            },
            summary: 'Award-winning Hotel General Manager with 10+ years of experience managing luxury properties. Expert in operations management, staff leadership, and strategic planning. proven ability to increase occupancy rates and drive revenue growth.',
            experience: [
                {
                    id: 'exp1',
                    title: 'General Manager',
                    company: 'Grand Palazzo Hotel',
                    location: 'Las Vegas, NV',
                    startDate: '2019-03',
                    endDate: 'Present',
                    description: '• Oversee all daily operations of a 500-room luxury hotel and resort.\n• Manage a team of 200+ employees across various departments.\n• Implemented new revenue management strategies that increased RevPAR by 15%.\n• Maintained a 5-star guest satisfaction rating on TripAdvisor.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Nevada, Las Vegas',
                    degree: 'B.S. Hospitality Management',
                    location: 'Las Vegas, NV',
                    startDate: '2010-08',
                    endDate: '2014-05',
                    description: ''
                }
            ],
            skills: ['Hotel Operations', 'Revenue Management', 'Staff Leadership', 'Budgeting & P&L', 'Guest Relations', 'Strategic Planning']
        }
    },
    {
        id: 'sample-executive-chef',
        title: 'Executive Chef',
        category: 'Hospitality',
        description: 'Creative culinary expert with experience in high-end dining establishments.',
        content: {
            contact: {
                fullName: 'Pierre Dubois',
                email: 'pierre.chef@example.com',
                phone: '+1 (555) 666-5555',
                location: 'San Francisco, CA'
            },
            summary: 'Passionate Executive Chef with 12 years of culinary experience. Specialized in French and Mediterranean cuisine. Proven ability to design innovative menus, manage kitchen costs, and lead a high-performing culinary team.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Executive Chef',
                    company: 'Bistro Lumiere',
                    location: 'San Francisco, CA',
                    startDate: '2018-07',
                    endDate: 'Present',
                    description: '• Design seasonal menus featuring locally sourced ingredients.\n• Manage food, labor, and operational costs to ensure profitability.\n• Train and mentor sous chefs and line cooks on culinary techniques and safety standards.\n• Maintain strict health and sanitation guidelines.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Culinary Institute of America',
                    degree: 'A.O.S. Culinary Arts',
                    location: 'Hyde Park, NY',
                    startDate: '2008-09',
                    endDate: '2010-05',
                    description: ''
                }
            ],
            skills: ['Menu Development', 'Culinary Techniques', 'Kitchen Management', 'Cost Control', 'Food Safety', 'Team Leadership']
        }
    },
    {
        id: 'sample-event-planner',
        title: 'Event Planner',
        category: 'Hospitality',
        description: 'Creative event planner coordinating corporate and social events.',
        content: {
            contact: {
                fullName: 'Anna White',
                email: 'anna.events@example.com',
                phone: '+1 (555) 111-8888',
                location: 'Austin, TX'
            },
            summary: 'Detail-oriented Event Planner with 5 years of experience executing memorable events. Skilled in vendor negotiation, logistics management, and budget tracking. Passionate about bringing client visions to life.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Senior Event Coordinator',
                    company: 'Austin Events Co.',
                    location: 'Austin, TX',
                    startDate: '2020-01',
                    endDate: 'Present',
                    description: '• Plan and execute corporate conferences, weddings, and galas for up to 500 guests.\n• Manage event budgets ranging from $10k to $100k.\n• Coordinate with vendors, including venues, caterers, and AV technicians.\n• oversee on-site event logistics to ensure smooth operations.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Texas at Austin',
                    degree: 'B.S. Public Relations',
                    location: 'Austin, TX',
                    startDate: '2015-08',
                    endDate: '2019-05',
                    description: ''
                }
            ],
            skills: ['Event Planning', 'Vendor Management', 'Budgeting', 'Project Management', 'Communication', 'Problem Solving'],
            certifications: [
                { title: 'Certified Meeting Professional (CMP)', date: '2022' }
            ]
        }
    },
    {
        id: 'sample-concierge',
        title: 'Hotel Concierge',
        category: 'Hospitality',
        description: 'Dedicated concierge providing exceptional guest service and local recommendations.',
        content: {
            contact: {
                fullName: 'David Kim',
                email: 'david.kim@hotel.com',
                phone: '+1 (555) 999-3333',
                location: 'New York, NY'
            },
            summary: 'Professional Concierge with a deep knowledge of New York City attractions and dining. Committed to exceeding guest expectations by providing personalized recommendations and securing exclusive reservations. Member of Les Clefs d\'Or.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Concierge',
                    company: 'The Plaza Hotel',
                    location: 'New York, NY',
                    startDate: '2019-05',
                    endDate: 'Present',
                    description: '• Assist guests with restaurant reservations, theater tickets, and transportation arrangements.\n• Provide expert recommendations on local sightseeing, shopping, and nightlife.\n• Handle special requests and resolve guest complaints with discretion and efficiency.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Cornell University',
                    degree: 'Certificate in Hospitality Management',
                    location: 'Online',
                    startDate: '2018',
                    endDate: '2018',
                    description: ''
                }
            ],
            skills: ['Guest Service', 'Local Knowledge', 'Problem Solving', 'Communication', 'Multi-tasking', 'Reservation Systems']
        }
    },
    // ADMINISTRATIVE CATEGORY
    {
        id: 'sample-admin-assistant',
        title: 'Administrative Assistant',
        category: 'Administrative',
        description: 'Organized administrative professional with strong communication and multitasking skills.',
        content: {
            contact: {
                fullName: 'Lisa Taylor',
                email: 'lisa.taylor@example.com',
                phone: '+1 (555) 777-2222',
                location: 'Denver, CO'
            },
            summary: 'Efficient Administrative Assistant with 6+ years of experience supporting executive teams. Proficient in scheduling, travel coordination, and expense reporting. Skilled in Microsoft Office Suite and Salesforce. Dedicatd to streamlining office procedures.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Administrative Assistant',
                    company: 'Summit Consulting',
                    location: 'Denver, CO',
                    startDate: '2019-04',
                    endDate: 'Present',
                    description: '• Manage calendars and schedule meetings for three senior executives.\n• Coordinate domestic and international travel arrangements.\n• Prepare expense reports and process invoices for payment.\n• Maintain office supplies inventory and place orders as needed.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Community College of Denver',
                    degree: 'A.A. Business Administration',
                    location: 'Denver, CO',
                    startDate: '2016-08',
                    endDate: '2018-05',
                    description: ''
                }
            ],
            skills: ['Calendar Management', 'Travel Coordination', 'Expense Reporting', 'Microsoft Office', 'Customer Service', 'Data Entry']
        }
    },
    {
        id: 'sample-office-manager',
        title: 'Office Manager',
        category: 'Administrative',
        description: 'Proactive Office Manager ensuring smooth daily operations of a busy office.',
        content: {
            contact: {
                fullName: 'Karen Wilson',
                email: 'karen.wilson@example.com',
                phone: '+1 (555) 333-9999',
                location: 'Seattle, WA'
            },
            summary: 'Reliable Office Manager with 8 years of experience managing facilities and administrative staff. Expert in vendor management, budget oversight, and HR support. Proven ability to create a positive and productive work environment.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Office Manager',
                    company: 'TechStart Inc.',
                    location: 'Seattle, WA',
                    startDate: '2018-02',
                    endDate: 'Present',
                    description: '• Oversee daily office operations for a team of 50+ employees.\n• Negotiate contracts with vendors for office services and equipment.\n• Plan and organize company events and team-building activities.\n• Assist HR with onboarding new hires and maintaining employee records.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Washington',
                    degree: 'B.A. Communication',
                    location: 'Seattle, WA',
                    startDate: '2012-09',
                    endDate: '2016-06',
                    description: ''
                }
            ],
            skills: ['Office Management', 'Vendor Negotiation', 'Event Planning', 'HR Support', 'Budgeting', 'Communication']
        }
    },
    {
        id: 'sample-receptionist',
        title: 'Front Desk Receptionist',
        category: 'Administrative',
        description: 'Friendly receptionist providing excellent customer service and administrative support.',
        content: {
            contact: {
                fullName: 'Ashley Robinson',
                email: 'ashley.r@example.com',
                phone: '+1 (555) 111-5555',
                location: 'Phoenix, AZ'
            },
            summary: 'Welcoming Receptionist with 4 years of experience in high-volume office environments. Skilled in managing multi-line phone systems, greeting visitors, and handling mail distribution. Committed to making a positive first impression.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Receptionist',
                    company: 'Desert Medical Group',
                    location: 'Phoenix, AZ',
                    startDate: '2020-07',
                    endDate: 'Present',
                    description: '• Greet and check in patients upon arrival.\n• Answer and route incoming calls to appropriate departments.\n• Schedule appointments and verify insurance information.\n• Maintain a clean and organized reception area.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Phoenix College',
                    degree: 'Certificate in Office Administration',
                    location: 'Phoenix, AZ',
                    startDate: '2019',
                    endDate: '2019',
                    description: ''
                }
            ],
            skills: ['Customer Service', 'Phone Etiquette', 'Scheduling', 'Data Entry', 'Microsoft Word', 'Filing']
        }
    },
    {
        id: 'sample-data-entry',
        title: 'Data Entry Clerk',
        category: 'Administrative',
        description: 'Fast and accurate data entry specialist with strong attention to detail.',
        content: {
            contact: {
                fullName: 'Mark Johnson',
                email: 'mark.j@example.com',
                phone: '+1 (555) 888-2222',
                location: 'Columbus, OH'
            },
            summary: 'Detail-oriented Data Entry Clerk with a typing speed of 80 WPM. Experienced in entering and verifying complex data sets with high accuracy. Proficient in database management software and Excel.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Data Entry Specialist',
                    company: 'Logistics Solutions',
                    location: 'Columbus, OH',
                    startDate: '2021-03',
                    endDate: 'Present',
                    description: '• Enter customer orders and shipping information into the company database.\n• Verify data for accuracy and correct errors as needed.\n• Generate reports on data entry activities for management.\n• Maintain confidentiality of sensitive information.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Ohio State University',
                    degree: 'B.S. Information Systems',
                    location: 'Columbus, OH',
                    startDate: '2017-08',
                    endDate: '2021-05',
                    description: ''
                }
            ],
            skills: ['Data Entry', 'Typing (80 WPM)', 'Database Management', 'Microsoft Excel', 'Attention to Detail', 'Time Management']
        }
    },

    // CONSTRUCTION CATEGORY
    {
        id: 'sample-electrician',
        title: 'Journeyman Electrician',
        category: 'Construction',
        description: 'Skilled electrician with experience in residential and commercial electrical systems.',
        content: {
            contact: {
                fullName: 'John Smith',
                email: 'john.smith@electric.com',
                phone: '+1 (555) 444-1111',
                location: 'Houston, TX'
            },
            summary: 'Licensed Journeyman Electrician with 7 years of experience installing, maintaining, and repairing electrical wiring and equipment. Proficient in reading blueprints and troubleshooting complex electrical issues. Committed to safety and code compliance.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Electrician',
                    company: 'Power Pros Electric',
                    location: 'Houston, TX',
                    startDate: '2018-05',
                    endDate: 'Present',
                    description: '• Install and repair electrical systems in residential and commercial buildings.\n• Troubleshoot electrical failures and replace defective components.\n• Ensure all work complies with the National Electrical Code (NEC).\n• Mentor apprentices and supervise their work.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Houston Trade School',
                    degree: 'Electrical Technology Diploma',
                    location: 'Houston, TX',
                    startDate: '2014-09',
                    endDate: '2016-05',
                    description: ''
                }
            ],
            skills: ['Electrical Installation', 'Troubleshooting', 'Blueprint Reading', 'NEC Code', 'Safety Procedures', 'Wiring']
        }
    },
    {
        id: 'sample-construction-manager',
        title: 'Construction Manager',
        category: 'Construction',
        description: 'Experienced manager overseeing construction projects from conception to completion.',
        content: {
            contact: {
                fullName: 'Robert Brown',
                email: 'robert.brown@construct.com',
                phone: '+1 (555) 222-7777',
                location: 'Chicago, IL'
            },
            summary: 'Result-driven Construction Manager with 10+ years of experience managing large-scale commercial and residential projects. Expert in project scheduling, budget estimation, and quality control. Proven ability to lead diverse teams and deliver projects on time and within budget.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Construction Project Manager',
                    company: 'BuildRight Construction',
                    location: 'Chicago, IL',
                    startDate: '2017-04',
                    endDate: 'Present',
                    description: '• Manage multiple construction projects simultaneously with budgets up to $5M.\n• Coordinate with architects, engineers, and subcontractors to ensure project goals are met.\n• Monitor project progress and adjust schedules to mitigate delays.\n• Enforce safety regulations and maintain a safe job site.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'University of Illinois at Urbana-Champaign',
                    degree: 'B.S. Civil Engineering',
                    location: 'Champaign, IL',
                    startDate: '2010-08',
                    endDate: '2014-05',
                    description: ''
                }
            ],
            skills: ['Project Management', 'Budgeting & Estimating', 'Scheduling (Primavera/MS Project)', 'Contract Negotiation', 'Site Safety (OSHA)', 'Leadership'],
            certifications: [
                { title: 'Project Management Professional (PMP)', date: '2020' },
                { title: 'OSHA 30-Hour Construction', date: '2018' }
            ]
        }
    },
    {
        id: 'sample-plumber',
        title: 'Master Plumber',
        category: 'Construction',
        description: 'Expert plumber specializing in plumbing system installation and repair.',
        content: {
            contact: {
                fullName: 'William Davis',
                email: 'william.davis@plumbing.com',
                phone: '+1 (555) 666-9999',
                location: 'Boston, MA'
            },
            summary: 'Licensed Master Plumber with 12 years of hands-on experience in residential and commercial plumbing. Skilled in pipefitting, fixture installation, and water heater repair. Dedicated to providing high-quality workmanship and excellent customer service.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Senior Plumber',
                    company: 'Reliable Plumbing Services',
                    location: 'Boston, MA',
                    startDate: '2016-10',
                    endDate: 'Present',
                    description: '• Install and maintain plumbing systems, including water supply and drainage lines.\n• Diagnose and repair leaks, clogs, and pipe bursts.\n• Install and service water heaters, boilers, and softeners.\n• Provide emergency plumbing services to residential and commercial clients.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Boston Technical Institute',
                    degree: 'Plumbing Apprenticeship Program',
                    location: 'Boston, MA',
                    startDate: '2010-09',
                    endDate: '2014-05',
                    description: ''
                }
            ],
            skills: ['Pipefitting', 'Fixture Installation', 'Leak Detection', 'Water Systems', 'Blueprints', 'Soldering']
        }
    },
    {
        id: 'sample-carpenter',
        title: 'Lead Carpenter',
        category: 'Construction',
        description: 'Skilled carpenter with expertise in framing, finish carpentry, and cabinetry.',
        content: {
            contact: {
                fullName: 'Thomas Wilson',
                email: 'thomas.carpenter@example.com',
                phone: '+1 (555) 999-5555',
                location: 'Seattle, WA'
            },
            summary: 'Detail-oriented Lead Carpenter with 8 years of experience in residential construction and remodeling. Proficient in rough framing, finish carpentry, and custom cabinetry. Committed to delivering superior craftsmanship and meeting project deadlines.',
            experience: [
                {
                    id: 'exp1',
                    title: 'Lead Carpenter',
                    company: 'Craftsman Remodeling',
                    location: 'Seattle, WA',
                    startDate: '2019-06',
                    endDate: 'Present',
                    description: '• Lead a crew of 4 carpenters on residential remodeling projects.\n• Perform layout, framing, and installation of doors, windows, and trim.\n• Build custom cabinets and built-ins according to design specifications.\n• Ensure high-quality finishes and customer satisfaction.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    school: 'Seattle Central College',
                    degree: 'Carpentry Certificate',
                    location: 'Seattle, WA',
                    startDate: '2014-09',
                    endDate: '2015-06',
                    description: ''
                }
            ],
            skills: ['Framing', 'Finish Carpentry', 'Cabinetry', 'Blueprint Reading', 'Power Tools', 'Team Leadership']
        }
    },

// FILLING PROGRAMMING (Need 3)
{
    id: 'sample-devops',
        title: 'DevOps Engineer',
            category: 'Programming',
                description: 'DevOps Engineer specializing in cloud infrastructure and CI/CD pipelines.',
                    content: {
        contact: { fullName: 'Alex Cloud', email: 'alex.cloud@dev.com', phone: '555-0101', location: 'Seattle, WA' },
        summary: 'Senior DevOps Engineer with 6 years of experience in AWS and Azure environments. Expert in Kubernetes, Docker, and Terraform.',
            experience: [{ id: '1', title: 'Senior DevOps Engineer', company: 'CloudScale', location: 'Remote', startDate: '2020-01', endDate: 'Present', description: '• Managed AWS infrastructure using Terraform.\n• Implemented CI/CD pipelines with Jenkins and GitLab CI.' }],
                education: [{ id: '1', school: 'MIT', degree: 'B.S. Computer Science', location: 'Cambridge, MA', startDate: '2012', endDate: '2016', description: '' }],
                    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Python', 'CI/CD']
    }
},
{
    id: 'sample-mobile-dev',
        title: 'iOS Developer',
            category: 'Programming',
                description: 'Mobile developer focused on building high-performance iOS applications.',
                    content: {
        contact: { fullName: 'Sarah Swift', email: 's.swift@ios.com', phone: '555-0102', location: 'San Francisco, CA' },
        summary: 'Passionate iOS Developer with 4 years of experience building native apps using Swift and SwiftUI. Published 5+ apps on the App Store.',
            experience: [{ id: '1', title: 'iOS Developer', company: 'Appify', location: 'San Francisco, CA', startDate: '2019-06', endDate: 'Present', description: '• Developed and maintained flagship e-commerce app.\n• Collaborated with design team to implement pixel-perfect UI.' }],
                education: [{ id: '1', school: 'Tech University', degree: 'B.S. Software Engineering', location: 'Online', startDate: '2015', endDate: '2019', description: '' }],
                    skills: ['Swift', 'SwiftUI', 'UIKit', 'CoreData', 'XCode', 'Git']
    }
},
{
    id: 'sample-fullstack-node',
        title: 'Full Stack Engineer',
            category: 'Programming',
                description: 'Full stack developer with expertise in the MERN stack.',
                    content: {
        contact: { fullName: 'Ryan Stack', email: 'r.stack@web.com', phone: '555-0103', location: 'Austin, TX' },
        summary: 'Full Stack Engineer with diverse experience in building scalable web applications. Proficient in React, Node.js, and MongoDB.',
            experience: [{ id: '1', title: 'Full Stack Developer', company: 'WebSolutions', location: 'Austin, TX', startDate: '2021-01', endDate: 'Present', description: '• Built RESTful APIs using Node.js and Express.\n• Designed interactive front-end components using React.' }],
                education: [{ id: '1', school: 'Bootcamp X', degree: 'Full Stack Certificate', location: 'Austin, TX', startDate: '2020', endDate: '2020', description: '' }],
                    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'AWS']
    }
},

// FILLING MARKETING (Need 3)
{
    id: 'sample-seo-specialist',
        title: 'SEO Specialist',
            category: 'Marketing',
                description: 'Data-driven SEO Specialist focused on organic growth.',
                    content: {
        contact: { fullName: 'Jessica Search', email: 'j.search@seo.com', phone: '555-0201', location: 'New York, NY' },
        summary: 'SEO Specialist with a proven track record of increasing organic traffic by over 200%. Expert in technical SEO, keyword research, and link building.',
            experience: [{ id: '1', title: 'SEO Manager', company: 'GrowthAgency', location: 'New York, NY', startDate: '2018-09', endDate: 'Present', description: '• Conducted site audits and implemented technical fixes.\n• Developed content strategies based on keyword research.' }],
                education: [{ id: '1', school: 'NYU', degree: 'B.A. Marketing', location: 'New York, NY', startDate: '2014', endDate: '2018', description: '' }],
                    skills: ['SEO', 'Google Analytics', 'Ahrefs', 'SEMrush', 'HTML/CSS', 'Content Strategy']
    }
},
{
    id: 'sample-content-manager',
        title: 'Content Marketing Manager',
            category: 'Marketing',
                description: 'Strategic content manager experienced in storytelling and brand voice.',
                    content: {
        contact: { fullName: 'David Write', email: 'd.write@content.com', phone: '555-0202', location: 'Chicago, IL' },
        summary: 'Creative Content Manager with 7 years of experience leading content teams. Skilled in blog management, copy editing, and social media distribution.',
            experience: [{ id: '1', title: 'Content Lead', company: 'BrandFocus', location: 'Chicago, IL', startDate: '2017-05', endDate: 'Present', description: '• Managed a team of 5 writers and editors.\n• Oversaw the editorial calendar and content production.' }],
                education: [{ id: '1', school: 'Northwestern', degree: 'B.A. Journalism', location: 'Evanston, IL', startDate: '2012', endDate: '2016', description: '' }],
                    skills: ['Content Marketing', 'Copywriting', 'Editing', 'CMS (WordPress)', 'Social Media', 'Email Marketing']
    }
},
{
    id: 'sample-social-strategist',
        title: 'Social Media Strategist',
            category: 'Marketing',
                description: 'Social media expert with a knack for viral trends and community building.',
                    content: {
        contact: { fullName: 'Emily Social', email: 'e.social@media.com', phone: '555-0203', location: 'Los Angeles, CA' },
        summary: 'Social Media Strategist who has grown brand followings by 500k+. Expert in TikTok, Instagram, and LinkedIn strategies.',
            experience: [{ id: '1', title: 'Social Media Manager', company: 'ViralCo', location: 'Los Angeles, CA', startDate: '2020-03', endDate: 'Present', description: '• Created viral TikTok campaigns reaching 10M+ views.\n• Engaged with community to build brand loyalty.' }],
                education: [{ id: '1', school: 'USC', degree: 'B.A. Communications', location: 'Los Angeles, CA', startDate: '2016', endDate: '2020', description: '' }],
                    skills: ['Social Media Strategy', 'Community Management', 'Content Creation', 'Canva', 'Analytics', 'Influencer Marketing']
    }
},

// FILLING DATA (Need 3)
{
    id: 'sample-data-scientist',
        title: 'Senior Data Scientist',
            category: 'Data',
                description: 'Data Scientist specializing in machine learning and predictive modeling.',
                    content: {
        contact: { fullName: 'Dr. Alan Turing', email: 'a.turing@data.com', phone: '555-0301', location: 'Palo Alto, CA' },
        summary: 'PhD Data Scientist with expertise in NLP and Computer Vision. Experienced in deploying ML models to production environments.',
            experience: [{ id: '1', title: 'Data Scientist', company: 'TechAI', location: 'Palo Alto, CA', startDate: '2019-08', endDate: 'Present', description: '• Developed recommendation algorithms improving user retention by 20%.\n• Built predictive maintenance models for IoT devices.' }],
                education: [{ id: '1', school: 'Stanford', degree: 'PhD Computer Science', location: 'Stanford, CA', startDate: '2015', endDate: '2019', description: '' }],
                    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Machine Learning', 'NLP']
    }
},
{
    id: 'sample-data-engineer',
        title: 'Data Engineer',
            category: 'Data',
                description: 'Data Engineer focused on building robust ETL pipelines and data warehouses.',
                    content: {
        contact: { fullName: 'Brian Pipe', email: 'b.pipe@data.com', phone: '555-0302', location: 'Denver, CO' },
        summary: 'Experienced Data Engineer skilled in Big Data technologies like Spark and Hadoop. Proficient in designing scalable data architectures.',
            experience: [{ id: '1', title: 'Data Engineer', company: 'DataFlow', location: 'Denver, CO', startDate: '2018-02', endDate: 'Present', description: '• Designed and maintained ETL pipelines processing TBs of data daily.\n• Optimised SQL queries for performance.' }],
                education: [{ id: '1', school: 'CU Boulder', degree: 'M.S. Data Science', location: 'Boulder, CO', startDate: '2016', endDate: '2018', description: '' }],
                    skills: ['SQL', 'Python', 'Apache Spark', 'AWS Glue', 'Snowflake', 'Airflow']
    }
},
{
    id: 'sample-bi-analyst',
        title: 'Business Intelligence Analyst',
            category: 'Data',
                description: 'BI Analyst expert in visualizing data to drive business decisions.',
                    content: {
        contact: { fullName: 'Carla Dash', email: 'c.dash@bi.com', phone: '555-0303', location: 'Miami, FL' },
        summary: 'Insightful BI Analyst with 5 years of experience in Tableau and PowerBI. Proven ability to translate complex data into actionable business insights.',
            experience: [{ id: '1', title: 'BI Analyst', company: 'MarketWatch', location: 'Miami, FL', startDate: '2019-05', endDate: 'Present', description: '• Created interactive dashboards for executive leadership.\n• Analyzed sales data to identify growth opportunities.' }],
                education: [{ id: '1', school: 'University of Florida', degree: 'B.S. Business Analytics', location: 'Gainesville, FL', startDate: '2015', endDate: '2019', description: '' }],
                    skills: ['Tableau', 'PowerBI', 'SQL', 'Data Visualization', 'Excel', 'Statistics']
    }
},

// FILLING DESIGN (Need 2)
{
    id: 'sample-product-designer',
        title: 'Product Designer',
            category: 'Design',
                description: 'Product Designer with a focus on UX and interaction design.',
                    content: {
        contact: { fullName: 'Daniel Pixel', email: 'd.pixel@design.com', phone: '555-0401', location: 'San Francisco, CA' },
        summary: 'End-to-end Product Designer passionate about solving user problems. Experienced in user research, wireframing, and prototyping.',
            experience: [{ id: '1', title: 'Product Designer', company: 'StartupX', location: 'San Francisco, CA', startDate: '2020-01', endDate: 'Present', description: '• Led the redesign of the mobile app onboarding flow.\n• Conducted user interviews to gather feedback.' }],
                education: [{ id: '1', school: 'RISD', degree: 'B.F.A. Industrial Design', location: 'Providence, RI', startDate: '2016', endDate: '2020', description: '' }],
                    skills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Interaction Design', 'HTML/CSS']
    }
},
{
    id: 'sample-graphic-designer',
        title: 'Senior Graphic Designer',
            category: 'Design',
                description: 'Visual designer specializing in branding and marketing collateral.',
                    content: {
        contact: { fullName: 'Eva Color', email: 'e.color@design.com', phone: '555-0402', location: 'Portland, OR' },
        summary: 'Creative Graphic Designer with 8 years of agency experience. Expert in Adobe Creative Suite and typography.',
            experience: [{ id: '1', title: 'Senior Designer', company: 'CreativeAgency', location: 'Portland, OR', startDate: '2017-04', endDate: 'Present', description: '• Developed brand identities for 20+ clients.\n• Designed marketing materials for print and digital campaigns.' }],
                education: [{ id: '1', school: 'PNCA', degree: 'B.F.A. Graphic Design', location: 'Portland, OR', startDate: '2013', endDate: '2017', description: '' }],
                    skills: ['Photoshop', 'Illustrator', 'InDesign', 'Branding', 'Typography', 'Print Design']
    }
},

// FILLING FINANCE (Need 2)
{
    id: 'sample-investment-banker',
        title: 'Investment Banking Analyst',
            category: 'Finance',
                description: 'Finance professional specializing in M&A and financial modeling.',
                    content: {
        contact: { fullName: 'Frank Money', email: 'f.money@bank.com', phone: '555-0501', location: 'New York, NY' },
        summary: 'Analytical Investment Banker with 3 years of experience in M&A transactions. Skilled in LBO modeling, valuation, and due diligence.',
            experience: [{ id: '1', title: 'IB Analyst', company: 'WallStreet Bank', location: 'New York, NY', startDate: '2021-07', endDate: 'Present', description: '• Built complex financial models for M&A deals valued over $1B.\n• Prepared pitch decks and presentations for clients.' }],
                education: [{ id: '1', school: 'Wharton', degree: 'B.S. Economics', location: 'Philadelphia, PA', startDate: '2017', endDate: '2021', description: '' }],
                    skills: ['Financial Modeling', 'Valuation', 'M&A', 'Excel', 'PowerPoint', 'Accounting']
    }
},
{
    id: 'sample-financial-analyst',
        title: 'Financial Analyst',
            category: 'Finance',
                description: 'Corporate financial analyst focused on FP&A and budgeting.',
                    content: {
        contact: { fullName: 'Grace Budget', email: 'g.budget@finance.com', phone: '555-0502', location: 'Charlotte, NC' },
        summary: 'Detail-oriented Financial Analyst with experience in corporate finance. Proficient in forecasting, variance analysis, and reporting.',
            experience: [{ id: '1', title: 'Financial Analyst', company: 'BigCorp', location: 'Charlotte, NC', startDate: '2019-06', endDate: 'Present', description: '• Assisted in the preparation of the annual budget.\n• Analyzed monthly financial results and explained variances.' }],
                education: [{ id: '1', school: 'UNC Chapel Hill', degree: 'B.S. Business Admin', location: 'Chapel Hill, NC', startDate: '2015', endDate: '2019', description: '' }],
                    skills: ['FP&A', 'Budgeting', 'Forecasting', 'Excel', 'SAP', 'Financial Reporting']
    }
},

// FILLING STUDENT (Need 2)
{
    id: 'sample-research-assistant',
        title: 'Graduate Research Assistant',
            category: 'Student',
                description: 'Graduate student with experience in academic research and publication.',
                    content: {
        contact: { fullName: 'Harry Scholar', email: 'h.scholar@school.edu', phone: '555-0601', location: 'Cambridge, MA' },
        summary: 'Dedicated PhD Candidate in Biology with strong research skills. Experience in laboratory techniques and data analysis. seeking postdoctoral opportunities.',
            experience: [{ id: '1', title: 'Research Assistant', company: 'University Lab', location: 'Cambridge, MA', startDate: '2020-09', endDate: 'Present', description: '• Conducted experiments on cell signaling pathways.\n• Published 2 papers in peer-reviewed journals.' }],
                education: [{ id: '1', school: 'Harvard', degree: 'PhD Biology', location: 'Cambridge, MA', startDate: '2020', endDate: 'Present', description: '' }],
                    skills: ['Laboratory Research', 'Data Analysis', 'Scientific Writing', 'PCR', 'Microscopy', 'Grant Writing']
    }
},
{
    id: 'sample-mba-student',
        title: 'MBA Candidate',
            category: 'Student',
                description: 'MBA student with a background in consulting and strategy.',
                    content: {
        contact: { fullName: 'Ivan Strategy', email: 'i.strategy@mba.edu', phone: '555-0602', location: 'Philadelphia, PA' },
        summary: 'MBA Candidate at Wharton with 4 years of pre-MBA consulting experience. Focusing on strategic management and entrepreneurship.',
            experience: [{ id: '1', title: 'Associate Consultant', company: 'ConsultingFirm', location: 'Boston, MA', startDate: '2018-07', endDate: '2022-06', description: '• Led workstreams for Fortune 500 clients.\n• Conducted market research and competitive analysis.' }],
                education: [{ id: '1', school: 'Wharton', degree: 'Master of Business Administration', location: 'Philadelphia, PA', startDate: '2022', endDate: 'Present', description: '' }],
                    skills: ['Strategy', 'Consulting', 'Market Research', 'Financial Modeling', 'Leadership', 'Project Management']
    }
},

// FILLING MEDICAL (Need 3)
{
    id: 'sample-pharmacist',
        title: 'Clinical Pharmacist',
            category: 'Medical',
                description: 'Licensed pharmacist with experience in hospital and retail settings.',
                    content: {
        contact: { fullName: 'Karen Pharma', email: 'k.pharma@med.com', phone: '555-0701', location: 'Houston, TX' },
        summary: 'Doctor of Pharmacy with 5 years of clinical experience. Expert in medication therapy management and patient counseling.',
            experience: [{ id: '1', title: 'Pharmacist', company: 'City Hospital', location: 'Houston, TX', startDate: '2019-06', endDate: 'Present', description: '• Verify medication orders and dispense pharmaceuticals.\n• Round with medical team to optimize drug therapy.' }],
                education: [{ id: '1', school: 'University of Houston', degree: 'PharmD', location: 'Houston, TX', startDate: '2015', endDate: '2019', description: '' }],
                    skills: ['Pharmacology', 'Patient Counseling', 'Medication Safety', 'Clinical Pharmacy', 'EMR', 'Sterile Compounding']
    }
},
{
    id: 'sample-physical-therapist',
        title: 'Physical Therapist',
            category: 'Medical',
                description: 'Physical therapist specializing in orthopedics and sports medicine.',
                    content: {
        contact: { fullName: 'Leo Therapy', email: 'l.therapy@med.com', phone: '555-0702', location: 'San Diego, CA' },
        summary: 'Compassionate Physical Therapist with 6 years of experience helping patients recover from injuries. Board Certified Specialist in Orthopedics.',
            experience: [{ id: '1', title: 'Physical Therapist', company: 'SportsRehab', location: 'San Diego, CA', startDate: '2018-05', endDate: 'Present', description: '• Design individualized treatment plans for post-op patients.\n• Perform manual therapy and therapeutic exercises.' }],
                education: [{ id: '1', school: 'USC', degree: 'DPT (Doctor of Physical Therapy)', location: 'Los Angeles, CA', startDate: '2015', endDate: '2018', description: '' }],
                    skills: ['Orthopedics', 'Manual Therapy', 'Rehabilitation', 'Patient Education', 'Sports Medicine', 'Documentation']
    }
},
{
    id: 'sample-medical-assistant',
        title: 'Certified Medical Assistant',
            category: 'Medical',
                description: 'Medical assistant providing clinical and administrative support.',
                    content: {
        contact: { fullName: 'Mia Aid', email: 'm.aid@med.com', phone: '555-0703', location: 'Atlanta, GA' },
        summary: 'Certified Medical Assistant with 3 years of experience in a busy family practice. Skilled in phlebotomy, taking vitals, and EMR recording.',
            experience: [{ id: '1', title: 'Medical Assistant', company: 'Family Practice', location: 'Atlanta, GA', startDate: '2021-02', endDate: 'Present', description: '• Escort patients to exam rooms and take vital signs.\n• Assist physicians with minor procedures.' }],
                education: [{ id: '1', school: 'Atlanta Tech', degree: 'Medical Assistant Diploma', location: 'Atlanta, GA', startDate: '2020', endDate: '2020', description: '' }],
                    skills: ['Phlebotomy', 'Vitals', 'EMR (Epic)', 'Patient Care', 'HIPAA', 'Injections']
    }
},

// FILLING EDUCATION (Need 3)
{
    id: 'sample-professor',
        title: 'Assistant Professor',
            category: 'Education',
                description: 'University professor with a focus on teaching and research.',
                    content: {
        contact: { fullName: 'Dr. Noah Teach', email: 'n.teach@edu.com', phone: '555-0801', location: 'Boston, MA' },
        summary: 'Assistant Professor of History with a strong publication record. Committed to dynamic teaching methods and student mentorship.',
            experience: [{ id: '1', title: 'Assistant Professor', company: 'Boston University', location: 'Boston, MA', startDate: '2019-09', endDate: 'Present', description: '• Teach undergraduate and graduate courses in Modern History.\n• Supervise thesis students and conduct departmental service.' }],
                education: [{ id: '1', school: 'Yale', degree: 'PhD History', location: 'New Haven, CT', startDate: '2013', endDate: '2019', description: '' }],
                    skills: ['Curriculum Development', 'Public Speaking', 'Research', 'Academic Advising', 'Grant Writing', 'Higher Education']
    }
},
{
    id: 'sample-academic-advisor',
        title: 'Academic Advisor',
            category: 'Education',
                description: 'Advisor helping students navigate degree requirements and career goals.',
                    content: {
        contact: { fullName: 'Olivia Guide', email: 'o.guide@edu.com', phone: '555-0802', location: 'Ann Arbor, MI' },
        summary: 'Student-centered Academic Advisor with 5 years of experience in higher education. passionate about student retention and success.',
            experience: [{ id: '1', title: 'Academic Advisor', company: 'University of Michigan', location: 'Ann Arbor, MI', startDate: '2019-01', endDate: 'Present', description: '• Advise caseload of 300+ undergraduates on course selection.\n• Develop academic success plans for at-risk students.' }],
                education: [{ id: '1', school: 'Michigan State', degree: 'M.Ed. Higher Education', location: 'East Lansing, MI', startDate: '2016', endDate: '2018', description: '' }],
                    skills: ['Academic Advising', 'Student Affairs', 'Degree Audit', 'Counseling', 'Problem Solving', 'Communication']
    }
},
{
    id: 'sample-special-ed',
        title: 'Special Education Teacher',
            category: 'Education',
                description: 'Teacher specializing in supporting students with diverse learning needs.',
                    content: {
        contact: { fullName: 'Paul Support', email: 'p.support@school.edu', phone: '555-0803', location: 'Fairfax, VA' },
        summary: 'Dedicated Special Education Teacher with experience in IEP development and inclusion strategies. Committed to creating a supportive learning environment.',
            experience: [{ id: '1', title: 'Special Ed Teacher', company: 'Fairfax Schools', location: 'Fairfax, VA', startDate: '2018-08', endDate: 'Present', description: '• Manage caseload of 15 students with various learning disabilities.\n• Collaborate with general education teachers to modify curriculum.' }],
                education: [{ id: '1', school: 'UVA', degree: 'M.Ed. Special Education', location: 'Charlottesville, VA', startDate: '2016', endDate: '2018', description: '' }],
                    skills: ['IEP Development', 'Behavior Management', 'Differentiated Instruction', 'Collaboration', 'Special Education Law', 'Patience']
    }
},

// FILLING ENGINEERING (Need 3)
{
    id: 'sample-civil-engineer',
        title: 'Civil Engineer',
            category: 'Engineering',
                description: 'Civil engineer with experience in infrastructure and transportation projects.',
                    content: {
        contact: { fullName: 'Quinn Road', email: 'q.road@eng.com', phone: '555-0901', location: 'Atlanta, GA' },
        summary: 'Professional Engineer (PE) with 6 years of experience in civil site design and roadway engineering. Proficient in AutoCAD Civil 3D.',
            experience: [{ id: '1', title: 'Civil Engineer', company: 'EngFirm', location: 'Atlanta, GA', startDate: '2018-06', endDate: 'Present', description: '• Designed drainage systems and roadway alignments for municipal projects.\n• Prepared construction plans and specifications.' }],
                education: [{ id: '1', school: 'Georgia Tech', degree: 'B.S. Civil Engineering', location: 'Atlanta, GA', startDate: '2014', endDate: '2018', description: '' }],
                    skills: ['AutoCAD Civil 3D', 'Site Design', 'Hydrology', 'Transportation Engineering', 'Project Management', 'MicroStation']
    }
},
{
    id: 'sample-electrical-engineer',
        title: 'Electrical Engineer',
            category: 'Engineering',
                description: 'Electrical engineer focusing on power systems and circuit design.',
                    content: {
        contact: { fullName: 'Rachel Circuit', email: 'r.circuit@eng.com', phone: '555-0902', location: 'San Jose, CA' },
        summary: 'Electrical Engineer with experience in PCB design and embedded systems. Skilled in Altium Designer and circuit simulation.',
            experience: [{ id: '1', title: 'Hardware Engineer', company: 'TechDevices', location: 'San Jose, CA', startDate: '2019-06', endDate: 'Present', description: '• Designed and tested multi-layer PCBs for consumer electronics.\n• Collaborated with firmware team on system integration.' }],
                education: [{ id: '1', school: 'Cal Poly', degree: 'B.S. Electrical Engineering', location: 'San Luis Obispo, CA', startDate: '2015', endDate: '2019', description: '' }],
                    skills: ['PCB Design', 'Altium Designer', 'Circuit Analysis', 'Embedded Systems', 'Testing', 'Oscilloscopes']
    }
},
{
    id: 'sample-qa-engineer',
        title: 'QA Engineer',
            category: 'Engineering',
                description: 'Quality Assurance engineer specializing in software testing automation.',
                    content: {
        contact: { fullName: 'Sam Test', email: 's.test@eng.com', phone: '555-0903', location: 'Austin, TX' },
        summary: 'QA Engineer with 4 years of experience in automated testing using Selenium and Python. Passionate about delivering high-quality software.',
            experience: [{ id: '1', title: 'QA Automation Engineer', company: 'SoftCorp', location: 'Austin, TX', startDate: '2020-03', endDate: 'Present', description: '• Developed and maintained automated test scripts.\n• Identified and reported bugs using JIRA.' }],
                education: [{ id: '1', school: 'UT Austin', degree: 'B.S. Computer Science', location: 'Austin, TX', startDate: '2016', endDate: '2020', description: '' }],
                    skills: ['Selenium', 'Python', 'Test Automation', 'JIRA', 'Agile', 'SQL']
    }
}

];