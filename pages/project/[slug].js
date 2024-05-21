import { fetchAPI } from "../../lib/api"
import Layout from "../../components/Layout"
import HeadInformation from "../../components/HeadInformation"
import ProjectHero from "../../components/ProjectHero/ProjectHero"
import ProjectInformation from "../../components/ProjectInformation"
import ProjectDetails from "../../components/ProjectDetails"
import ProjectsBoxNext from "../../components/ProjectBoxNext"

const Project = ({ project, nextProject, page }) => {
  return (
    <>
      <HeadInformation title={page.attributes.title} seo={page.attributes.seo} />
      <Layout withOutFooter>
        <ProjectHero image={project.attributes.mainimage} imagePhone={project.attributes.mainimagePhone} />
        <ProjectInformation project={project} />
        <ProjectDetails details={page.attributes.details} />
        <ProjectsBoxNext project={nextProject} />
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
  const [projectsRes, pageRes, pageWork] = await Promise.all([
    fetchAPI("/projects", { populate: "*", sort: "sort:desc" }),
    fetchAPI("/project-" + params.slug, {
      populate: "deep"
    }),
    fetchAPI("/page-work", {
      populate: "deep"
    })
  ]);

  const projectsPageWork = pageWork.data.attributes.projects;
  let ix = 0, jx = 0,
    projectsData = new Array();
  for (ix = 0; ix < projectsPageWork.length; ix++) {
    if (projectsPageWork[ix].__component == "teasers.teasers-single-column") {
      for (jx = 0; jx < projectsPageWork[ix].center.length; jx++)
        projectsData.push(projectsPageWork[ix].center[jx].project.data);
    }
    else {
      const lr = (projectsPageWork[ix].right.length > projectsPageWork[ix].left.length) ? 1 : 0;
      let rx = 0,
        lx = 0;
      for (jx = 0; jx < projectsPageWork[ix].right.length + projectsPageWork[ix].left.length; jx++) {
        if (lx < projectsPageWork[ix].left.length && rx < projectsPageWork[ix].right.length) {
          if (jx % 2 === lr) {
            projectsData.push(projectsPageWork[ix].left[lx].project.data);
            lx++;
          }
          else {
            projectsData.push(projectsPageWork[ix].right[rx].project.data);
            rx++;
          }
        }
        else {
          if (lx < projectsPageWork[ix].left.length) {
            projectsData.push(projectsPageWork[ix].left[lx].project.data);
            lx++;
          }
          if (rx < projectsPageWork[ix].right.length) {
            projectsData.push(projectsPageWork[ix].right[rx].project.data);
            rx++;
          }
        }
      }
    }
  }

  let projects = {
    data: projectsData
  }

  if (!projectsData.length) {
    projects = projectsRes;
  }

  let currentProject = null,
    ixCurrentProject = null,
    ixNextProject = null,
    nextProject;
  for (ix = 0; ix < projects.data.length; ix++) {
    if (projects.data[ix].attributes.slug === params.slug) {
      currentProject = projects.data[ix];
      ixCurrentProject = ix;
      break;
    }
  }
  if (currentProject === null) {
    projects = projectsRes;
    for (ix = 0; ix < projects.data.length; ix++) {
      if (projects.data[ix].attributes.slug === params.slug) {
        currentProject = projects.data[ix];
        ixCurrentProject = ix;
        break;
      }
    }
  }
  ixNextProject = ixCurrentProject + 1;
  if (ixNextProject >= projects.data.length) ixNextProject = 0;
  nextProject = projects.data[ixNextProject];

  return {
    props: {
      project: currentProject,
      nextProject: nextProject,
      page: pageRes.data
    },
    revalidate: 1,
  }
}

export default Project