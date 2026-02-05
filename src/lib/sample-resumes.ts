
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
    }
];
