# Around the World: 3D Portfolio

An interactive portfolio where scrolling feels like travelling. Each section of my resume is a country with its own colour theme, 3D landmark, and flag-coloured transition, finished with a passport stamp.

**Live site:** [world-tour-portfolio.vercel.app](https://world-tour-portfolio.vercel.app/)

## The journey

| Stop | Country | What it covers |
|---|---|---|
| 01 | India | Origin and introduction |
| 02 | Japan | About me |
| 03 | China | Skills |
| 04 | Germany and Switzerland | Education and experience |
| 05 | Canada | Projects, with case-study pop-ups |
| 06 | Switzerland | Beyond the CV |
| 07 | World | Contact |

## Features

- **3D landmarks** for every stop, built with React Three Fiber, with gentle floating, rotation, and hover effects
- **Country transitions:** a flag-coloured curtain sweeps across the screen, then a plane and a passport stamp mark the new country
- **Theme per section:** colours, background, and particles change as you scroll
- **Smooth scrolling** with Lenis
- **Project case studies:** each project opens in a scrollable modal with the problem, the solution, the tech stack, and a link to the code
- **Responsive:** separate layout rules for laptops and phones, including smaller 3D models on narrow screens
- **Accessible motion:** with "reduce motion" turned on, models stay still and transitions are skipped
- **Downloadable resume** in PDF format

## Tech stack

- **React 18**, **TypeScript**, **Vite**
- **three.js**, **React Three Fiber**, **drei** for 3D
- **Framer Motion** and **GSAP** for animation
- **Lenis** for smooth scrolling
- Custom CSS, **lucide-react** icons
- Deployed on **Vercel**

## Performance notes

Several 3D models on one page can be heavy, especially on phones. These steps keep it smooth:

- Models are compressed with **Draco**, and the decoder is hosted on the site itself (`public/draco`) instead of a third-party server
- The first model and the decoder are **preloaded** from `index.html`, and the other models load one after another in the background
- Each 3D canvas is **created only when its section is near the screen** and removed when it is far away, so only one or two run at a time
- Page animations use only `transform` and `opacity`, which browsers can draw cheaply

## Getting started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
git clone https://github.com/Rufi-1/world-tour-portfolio.git
cd world-tour-portfolio
npm install
npm run dev
```

Then open the local address that Vite prints (usually `http://localhost:5173`).

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Check the TypeScript types |
| `npm run lint` | Run ESLint |

## Project structure

```text
public/
  models/        3D models (.glb)
  draco/         Draco decoder files, hosted locally
src/
  App.tsx                      Page sections and project modal
  components/
    CountryModel.tsx           3D model wrapper
    CountryTransition.tsx      Flag curtain, plane, and passport stamp
  hooks/
    useScrollController.ts     Scroll tracking and theme switching
  data/
    resume.ts                  All resume content
    themes.ts                  Colour theme for each country
  index.css                    All styles
```

## Customising

- **Content:** edit `src/data/resume.ts` for the intro, skills, experience, projects, and education
- **Colours:** edit `src/data/themes.ts`
- **Resume PDF:** replace `public/Rufi_Aiman_Resume_Current.pdf`

## 3D model credits

| Model | Author | Source | License |
|---|---|---|---|
| India (Taj Mahal) | | | |
| Japan (Torii gate and pagoda) | | | |
| China (Great Wall) | | | |
| Germany (Brandenburg Gate) | | | |
| Canada (Toronto skyline) | | | |
| Switzerland | | | |
| Space (galaxy) | | | |

## About me

I'm **Rufi Aiman**, a BCA graduate from Mysuru, Karnataka, building multilingual AI applications, data analytics tools, and full-stack web projects with Python, Django, and React. I'm currently training in Full Stack Development and Data Science, and I'm open to full-time roles.

- GitHub: [github.com/Rufi-1](https://github.com/Rufi-1)
- LinkedIn: [linkedin.com/in/rufi-aiman-6a7bba319](https://linkedin.com/in/rufi-aiman-6a7bba319)
- Email: rufiaiman7790@gmail.com
