import { useEffect } from "react"
import { usePresence, motion } from "framer-motion";
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/Layout"
import HeadInformation from "../../components/HeadInformation"
import ProjectHero from "../../components/ProjectHero/ProjectHero"
import ProjectInformation from "../../components/ProjectInformation"
import ProjectDetails from "../../components/ProjectDetails"
import ProjectsBox from "../../components/ProjectsOverview/ProjectsBox";
import { useGlobalDispatchContext } from "../../context/appContext"
import TextArrowLink from "../../components/Links/TextArrowLink"
import styles from "../../styles/project.module.scss"

const transition_opacity = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Project = ({ project, preview, page }) => {
  const dispatch = useGlobalDispatchContext();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      // Context zurücksetzen für neue Seite
      dispatch({ type: "PAGE_RENDERED_TYPE", pageRendered: false });
      dispatch({ type: "LAYOUT_RENDERED_TYPE", layoutRendered: false });
      safeToRemove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent])

  useEffect(() => {
    // Page gerendert -> Layout init (scroller, anim) -> Components init (anim)
    dispatch({ type: "PAGE_RENDERED_TYPE", pageRendered: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeadInformation title={page.attributes.title} seo={page.attributes.seo} />
      <Layout>
        <ProjectHero image={project.attributes.mainimage} imagePhone={project.attributes.mainimagePhone} />
        <ProjectInformation project={project} />
        <ProjectDetails details={page.attributes.details} />
        <ProjectsBox projects={preview} preview />
        <motion.div className={`${styles.overviewLinkContainer} content-padding`}
          exit={{ opacity: 0 }}
          transition={transition_opacity}
        >
          <TextArrowLink url='/projects' title='ÜBERSICHT' />
        </motion.div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const projectRes = await fetchAPI("/projects", { fields: ["slug"] })
  return {
    paths: projectRes.data.map((project) => ({
      params: {
        slug: project.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const [projectsRes, pageRes] = await Promise.all([
    fetchAPI("/projects", { populate: "*", sort: "sort" }),
    fetchAPI("/project-" + params.slug, {
      populate: {
        populate: "*",
        seo: { populate: "*" },
        details: { populate: "*" },
      },
    }),
  ]);

  let currentProject = null;
  let ixCurrentProject = null;
  let ixPrevProject = 0;
  let ixNextProject = null;
  let ix = 0;
  let previewProjects = [];
  for (ix = 0; ix < projectsRes.data.length; ix++) {
    if (projectsRes.data[ix].attributes.slug === params.slug) {
      currentProject = projectsRes.data[ix];
      ixCurrentProject = ix;
      break;
    }
    ixPrevProject = ix;
  }
  if (ixPrevProject === ixCurrentProject) ixPrevProject = projectsRes.data.length - 1;
  ixNextProject = ixCurrentProject + 1;
  if (ixNextProject >= projectsRes.data.length) ixNextProject = 0;
  previewProjects.push(projectsRes.data[ixPrevProject]);
  previewProjects.push(projectsRes.data[ixNextProject]);

  return {
    props: {
      project: currentProject,
      preview: previewProjects,
      page: pageRes.data
    },
    revalidate: 1,
  }
}

export default Project
