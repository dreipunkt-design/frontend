import { fetchAPI } from "../../lib/api"
import Layout from "../../components/Layout"
import HeadInformation from "../../components/HeadInformation"
import ProjectHero from "../../components/ProjectHero/ProjectHero"
import ProjectInformation from "../../components/ProjectInformation"
import ProjectDetails from "../../components/ProjectDetails"
import ProjectsBoxNext from "../../components/ProjectBoxNext"

const Project = ({ project, nextProject, page }) => {
  console.log(nextProject);
  console.log(page.attributes.details);
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
  const [projectsRes, pageRes] = await Promise.all([
    fetchAPI("/projects", { populate: "*", sort: "sort:desc" }),
    fetchAPI("/project-" + params.slug, {
      populate: "deep" /*{
        populate: "*",
        seo: { populate: "*" },
        details: { populate: "*" },
      },*/
    }),
  ]);

  let currentProject = null,
    ixCurrentProject = null,
    ixNextProject = null,
    nextProject,
    ix = 0;
  for (ix = 0; ix < projectsRes.data.length; ix++) {
    if (projectsRes.data[ix].attributes.slug === params.slug) {
      currentProject = projectsRes.data[ix];
      ixCurrentProject = ix;
      break;
    }
  }
  ixNextProject = ixCurrentProject + 1;
  if (ixNextProject >= projectsRes.data.length) ixNextProject = 0;
  nextProject = projectsRes.data[ixNextProject];

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