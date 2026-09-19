import { Suspense, lazy, useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Database,
  Download,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Phone,
  Sparkles,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGLTF } from '@react-three/drei';
import { resume } from '@/data/resume';
import type { SymbolKind } from '@/components/CountrySymbol';
import ContactForm from '@/components/ContactForm';
import ParticleSystem from '@/components/ParticleSystem';
import CountryTransition from '@/components/CountryTransition';
import ScrollSection from '@/components/ScrollSection';
import { useScrollController } from '@/hooks/useScrollController';
import { themes } from '@/data/themes';
import { SectionReveal } from './components/SectionReveal';
import { CountryModel } from './components/CountryModel';
import { FallingMapleLeaves } from './components/FallingMapleLeaves';



const CountrySymbol = lazy(() => import('@/components/CountrySymbol'));

type Project = (typeof resume.projects)[number];

const navItems = [
  { id: 'origin', label: 'Origin', country: 'India' },
  { id: 'about', label: 'About', country: 'Japan' },
  { id: 'skills', label: 'Skills', country: 'China' },
  { id: 'journey', label: 'Journey', country: 'Germany / CH' },
  { id: 'work', label: 'Work', country: 'Canada' },
  { id: 'connect', label: 'Connect', country: 'World' },
];

const sectionSymbols: {
  section: string;
  kind: SymbolKind;
  label: string;
  palette: string;
  large?: boolean;
}[] = [
  { section: 'origin', kind: 'india', label: 'Taj Mahal · India', palette: '#FF9933' },
  { section: 'about', kind: 'japan', label: 'Torii Gate · Japan', palette: '#BC002D' },
  { section: 'skills', kind: 'china', label: 'Great Wall · China', palette: '#DE2910' },
  { section: 'journey', kind: 'germany', label: 'Schwerin Castle · Germany', palette: '#FFCE00' },
  { section: 'work', kind: 'canada', label: 'Maple Leaf · Canada', palette: '#FF0000' },
  { section: 'beyond', kind: 'swissBeyond', label: 'Matterhorn · Switzerland', palette: '#D52B1E' },
  { section: 'connect', kind: 'world', label: 'Globe · World', palette: '#4A90D9' },
];

function SymbolFallback({
  label,
  palette,
  large,
}: {
  label: string;
  palette: string;
  large?: boolean;
}) {
  return (
    <div
      className={`country-symbol ${large ? 'large' : ''}`}
      style={{ '--symbol-color': palette } as React.CSSProperties}
    >
      <div className="symbol-canvas symbol-loading" />
      <span className="symbol-label">{label}</span>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('origin');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showTop, setShowTop] = useState(false);

  const { activeTheme } = useScrollController(!isLoading);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);

    const allSections = [...navItems, { id: 'beyond' }]
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.15, 0.5] }
    );

    allSections.forEach((section) => observer.observe(section));

    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="app-shell themed">
      {isLoading && <LoadingScreen />}
      <div className="grain" aria-hidden="true" />
      <div className="flight-progress" aria-hidden="true">
        <span />
      </div>
      <CountryTransition activeTheme={activeTheme.key} />

      <header className="site-header">
        <a
          className="brand"
          href="#origin"
          onClick={() => scrollTo('origin')}
          aria-label="Rufi Aiman home"
        >
          <span className="brand-mark">RA</span>
          <span>
            RUFI <i>AIMAN</i>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
              <small>{item.country}</small>
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="menu-button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}>
              <span>{item.label}</span>
              <small>{item.country}</small>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      )}

      <main>
        {/* 01 — INDIA (Taj Mahal on the right side) */}
        <ScrollSection
          id="origin"
          className="hero section-shell country-themed"
          style={
            {
              '--section-bg': themes.india.sectionBg,
              position: 'relative',
              overflow: 'hidden',
            } as React.CSSProperties
          }
        >
          <CountryModel
            url="/models/india.glb"
            variant="side"
            size={1.5}
            active={activeTheme.key === 'india'}
          />
          <div className="section-particles">
            <ParticleSystem theme={themes.india} active={activeTheme.key === 'india'} />
          </div>
          <div className="hero-copy reveal" style={{ position: 'relative', zIndex: 2 }}>
            <p className="eyebrow">
              <span className="eyebrow-line" /> 01 / INDIA — ORIGIN
            </p>
            <h1>
              I find the <em>signal</em>
              <br />
              inside the noise.
            </h1>
            <p className="hero-intro">{resume.objective}</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollTo('work')}>
                Explore my work <ArrowDown size={16} />
              </button>
              <a className="text-link" href={`mailto:${resume.email}`}>
                Start a conversation <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <i className="status-dot" /> Open to opportunities
              </span>
              <span>
                Mysuru, IN <Globe2 size={13} />
              </span>
            </div>
          </div>

          <div className="scroll-cue">
            <MousePointer2 size={15} /> <span>Scroll to travel</span>
            <div className="scroll-line" />
          </div>
        </ScrollSection>

        {/* 02 — JAPAN */}
        <ScrollSection
          id="about"
          className="country-section japan-section section-shell country-themed"
          style={{ '--section-bg': themes.japan.sectionBg } as React.CSSProperties}
        >
          <div className="section-particles">
            <ParticleSystem theme={themes.japan} active={activeTheme.key === 'japan'} />
          </div>
          <div className="section-number">02</div>
          <div className="section-heading">
            <p className="eyebrow">JAPAN — PERSPECTIVE</p>
            <h2>
              Quietly curious.
              <br />
              <span>Deliberately useful.</span>
            </h2>
          </div>

          <div style={{ position: 'relative', zIndex: 2, margin: '3rem 0' }}>
            <CountryModel
              url="/models/japan.glb"
              label="Torii Gate · Japan"
              size={1.5}
              height={650}
              active={activeTheme.key === 'japan'}
            />
          </div>

          <SectionReveal>
            <div className="about-layout">
              <div className="stamp-card">
                <div className="stamp-ring">
                  観察
                  <br />
                  <small>OBSERVE</small>
                </div>
                <p>&ldquo;The best analysis makes complexity feel human.&rdquo;</p>
                <span>— Rufi Aiman / notes</span>
              </div>
              <div className="about-copy">
                <p className="large-copy">
                  I enjoy the space between a question and its answer — cleaning the details,
                  testing assumptions, and finding the story a dataset was trying to tell.
                </p>
                <p>
                  I am currently completing my BCA at Maharani's Science College for Women. My
                  internship at Spatialhawk gave me an appreciation for dependable data work: the
                  unglamorous preparation that makes every confident decision possible.
                </p>
                <div className="stat-row">
                  <div>
                    <strong>8.73</strong>
                    <span>CGPA</span>
                  </div>
                  <div>
                    <strong>05</strong>
                    <span>languages in one project</span>
                  </div>
                  <div>
                    <strong>&infin;</strong>
                    <span>questions to ask</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </ScrollSection>

        {/* 03 — CHINA */}
        <ScrollSection
          id="skills"
          className="country-section china-section section-shell country-themed"
          style={{ '--section-bg': themes.china.sectionBg } as React.CSSProperties}
        >
          <div className="section-particles">
            <ParticleSystem theme={themes.china} active={activeTheme.key === 'china'} />
          </div>
          <div className="section-number">03</div>
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">CHINA — TOOLKIT</p>
              <h2>
                A stack built for
                <br />
                <span>finding patterns.</span>
              </h2>
            </div>
            <p className="heading-aside">
              From first clean to final insight, I like to understand every layer of the journey.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 2, margin: '3rem 0' }}>
            <CountryModel
              url="/models/china.glb"
              label="Great Wall · China"
              size={2.4}
              height={650}
              active={activeTheme.key === 'china'}
            />
          </div>

          <SectionReveal>
            <div className="skills-grid">
              {resume.skills.map((skill, index) => (
                <div className="skill-row" key={skill.label}>
                  <span className="skill-index">0{index + 1}</span>
                  <h3>{skill.label}</h3>
                  <p>{skill.value}</p>
                  <ChevronRight size={17} />
                </div>
              ))}
            </div>
          </SectionReveal>
        </ScrollSection>

        {/* 04 — GERMANY (inline, in flow) */}
        <ScrollSection
          id="journey"
          className="journey-section section-shell country-themed"
          style={{ '--section-bg': themes.germany.sectionBg } as React.CSSProperties}
        >
          <div className="section-particles">
            <ParticleSystem theme={themes.germany} active={activeTheme.key === 'germany'} />
          </div>
          <div className="section-number">04</div>
          <div className="section-heading">
            <p className="eyebrow">GERMANY / SWITZERLAND — JOURNEY</p>
            <h2>
              Precision in the
              <br />
              <span>details.</span>
            </h2>
          </div>

          <div style={{ position: 'relative', zIndex: 2, margin: '3rem 0' }}>
            <CountryModel
              url="/models/germany.glb"
              label="Schwerin Castle · Germany"
              size={1.8}
              height={650}
              active={activeTheme.key === 'germany'}
            />
          </div>

          <SectionReveal>
            <div className="journey-grid">
              <div className="timeline-card">
                <div className="timeline-top">
                  <span>EDUCATION</span>
                  <Database size={18} />
                </div>
                {resume.education.map((item) => (
                  <div className="timeline-item" key={item.year}>
                    <span>{item.year}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.place}</p>
                      <b>{item.score}</b>
                    </div>
                  </div>
                ))}
              </div>
              <div className="experience-card">
                <div className="timeline-top">
                  <span>EXPERIENCE / 01</span>
                  <BriefcaseBusiness size={18} />
                </div>
                <div className="experience-title">
                  <p>{resume.experience.dates}</p>
                  <h3>{resume.experience.title}</h3>
                  <span>
                    {resume.experience.company} · {resume.experience.location}
                  </span>
                </div>
                <ul>
                  {resume.experience.points.map((point) => (
                    <li key={point}>
                      <Check size={15} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="learning-strip">
              <span>CERTIFIED / LEARNING NEXT</span>
              <div>
                {resume.certifications.map((item) => (
                  <p key={item}>{item}</p>
                ))}
                {resume.learning.map((item) => (
                  <p key={item}>
                    <Sparkles size={13} /> {item}
                  </p>
                ))}
              </div>
            </div>
          </SectionReveal>
        </ScrollSection>

        {/* 05 — CANADA */}
        <ScrollSection
          id="work"
          className="country-section canada-section section-shell country-themed"
          style={
            {
              '--section-bg': themes.canada.sectionBg,
              position: 'relative',
              overflow: 'hidden',
            } as React.CSSProperties
          }
        >
          <FallingMapleLeaves active={activeTheme.key === 'canada'} />

          <div className="section-particles">
            <ParticleSystem theme={themes.canada} active={activeTheme.key === 'canada'} />
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-number">05</div>
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">CANADA — SELECTED WORK</p>
                <h2>
                  Projects with
                  <br />
                  <span>people in mind.</span>
                </h2>
              </div>
              <p className="heading-aside">
                Technology only matters when it makes something clearer, kinder, or more possible.
              </p>
            </div>

            <SectionReveal>
              <div className="projects-list">
                {resume.projects.map((project) => (
                  <button
                    className={`project-card ${project.accent}`}
                    key={project.title}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="project-number">{project.index}</div>
                    <div className="project-content">
                      <p className="eyebrow">{project.eyebrow}</p>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tag-list">
                        {project.stack.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="project-arrow">
                      <ArrowUpRight />
                    </div>
                  </button>
                ))}
              </div>
            </SectionReveal>
          </div>
        </ScrollSection>

        {/* 06 — SWITZERLAND */}
        <ScrollSection
          id="beyond"
          className="closing-section section-shell country-themed"
          style={
            {
              '--section-bg': themes.swissBeyond.sectionBg,
              position: 'relative',
              overflow: 'hidden',
            } as React.CSSProperties
          }
        >
          <CountryModel
            url="/models/switzerland.glb"
            variant="side"
            size={1.5}
            active={activeTheme.key === 'swissBeyond'}
          />
          <div className="section-particles">
            <ParticleSystem
              theme={themes.swissBeyond}
              active={activeTheme.key === 'swissBeyond'}
            />
          </div>
          <div className="closing-decoration">
            <div className="map-line line-a" />
            <div className="map-line line-b" />
            <div className="map-dot dot-a" />
            <div className="map-dot dot-b" />
            <div className="map-dot dot-c" />
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-number">06</div>
            <p className="eyebrow">SWITZERLAND — BEYOND THE CV</p>
            <h2>
              Always learning.
              <br />
              <span>Always in motion.</span>
            </h2>
            <SectionReveal>
              <div className="closing-columns">
                <div>
                  <p className="large-copy">
                    Workshops, hackathons, and self-directed learning keep my map growing.
                  </p>
                  <div className="soft-skills">
                    <p className="soft-skills-label">SOFT SKILLS</p>
                    {resume.softSkills.map((skill) => (
                      <span key={skill} className="soft-skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="achievement-list">
                  {resume.achievements.map((item, index) => (
                    <div key={item}>
                      <span>0{index + 1}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </ScrollSection>

        {/* 07 — WORLD (space as background) */}
        <ScrollSection
          id="connect"
          className="contact-section section-shell country-themed"
          style={
            {
              '--section-bg': themes.world.sectionBg,
              position: 'relative',
              overflow: 'hidden',
            } as React.CSSProperties
          }
        >
          <CountryModel
            url="/models/space.glb"
            variant="background"
            size={3.8}
            vertical
            active={activeTheme.key === 'world'}
          />
          <div className="section-particles">
            <ParticleSystem theme={themes.world} active={activeTheme.key === 'world'} />
          </div>
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <div className="section-number">07</div>
            <div className="contact-copy">
              <p className="eyebrow">WORLD — NEXT DESTINATION</p>
              <h2>
                Have a question
                <br />
                or a <span>good problem?</span>
              </h2>
              <p>
                I'm always open to thoughtful conversations about data, AI, and opportunities to
                build useful things.
              </p>
              <ContactForm />
              <div className="contact-links">
                <a href={`mailto:${resume.email}`}>
                  <Mail size={15} /> {resume.email}
                </a>
                <a href={`tel:${resume.phone}`}>
                  <Phone size={15} /> {resume.phone}
                </a>
                <a href={resume.github} target="_blank" rel="noreferrer">
                  <Github size={15} /> {resume.github.replace('https://', '')}
                </a>
                <a href={resume.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={15} /> LinkedIn
                </a>
                <span>
                  <MapPin size={15} /> {resume.location}
                </span>
              </div>
              <a
                className="primary-button resume-download"
                href="/Rufi_Aiman_Resume_Current.pdf"
                download
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </div>
        </ScrollSection>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="brand" href="#origin">
            <span className="brand-mark">RA</span>
            <span>
              RUFI <i>AIMAN</i>
            </span>
          </a>
          <p>
            Made with intent, from India
            <br />
            for a world of possibilities.
          </p>
          <div className="social-links">
            <a href={resume.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={resume.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${resume.email}`} aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Rufi Aiman</span>
          <a href={`tel:${resume.phone}`}>{resume.phone}</a>
          <span>Mysuru, Karnataka, India</span>
          <a className="resume-link" href="/Rufi_Aiman_Resume_Current.pdf" download>
            <Download size={14} /> Resume / PDF
          </a>
        </div>
      </footer>

      {showTop && (
        <button
          className="back-top"
          onClick={() => scrollTo('origin')}
          aria-label="Back to top"
        >
          <ArrowUp size={17} />
        </button>
      )}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <motion.div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close project details">
          <X size={19} />
        </button>
        <p className="eyebrow">{project.index} / CASE STUDY</p>
        <h2 id="project-title">{project.title}</h2>
        {project.problem && (
          <div className="modal-problem">
            <span className="modal-section-label">THE PROBLEM</span>
            <p>{project.problem}</p>
          </div>
        )}
        {project.solutions && (
          <div className="modal-solutions">
            <span className="modal-section-label">WHAT I BUILT</span>
            <ul>
              {project.solutions.map((solution) => (
                <li key={solution}>
                  <Check size={15} /> {solution}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="tag-list">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '8px',
            alignItems: 'center',
          }}
        >
          {'repo' in project && project.repo && (
            <a
              className="primary-button"
              href={project.repo as string}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Github size={16} /> View on GitHub
            </a>
          )}
          <a
            className="text-link"
            href={`mailto:${resume.email}?subject=${encodeURIComponent(
              `About ${project.title}`
            )}`}
          >
            Ask me about this project <ArrowUpRight size={15} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      style={{ pointerEvents: 'none' }}
    >
      <div className="loading-passport">
        <span>WORLD TOUR</span>
        <strong>RA</strong>
        <small>BOARDING / 001</small>
      </div>
      <p>
        Preparing the journey<span>...</span>
      </p>
    </motion.div>
  );
}

export default App;