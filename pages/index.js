import { useEffect } from "react"
import { usePresence } from "framer-motion";
import { fetchAPI } from "../lib/api"
import { getMediaURL } from "../lib/api"
import HeadInformation from "../components/HeadInformation"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import InformationBoxText from "../components/InformationBoxText"
import TeaserBox from "../components/TeaserBox"
import { useGlobalDispatchContext } from "../context/appContext"
import ServicesTeaser from "../components/ServicesTeaser/ServicesTeaser";
import ProjectImageFullscreen from "../components/ProjectDetails/ProjectImageFullscreen"
import NewsBox from "../components/NewsBox"

export default function Home({ projects, news, page }) {
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
  }, [isPresent]);

  useEffect(() => {
    // Page gerendert -> Layout init (scroller, anim) -> Components init (anim)
    dispatch({ type: "PAGE_RENDERED_TYPE", pageRendered: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeadInformation title={page.attributes.title} seo={page.attributes.seo} />
      <Layout>
        <Hero
          url={getMediaURL() + page.attributes.hero.media.data.attributes.url}
          title={page.attributes.hero.title}
          text={page.attributes.hero.text}
        />
        <InformationBoxText information={page.attributes.about_quote} />
        <TeaserBox projects={projects} teasers={page.attributes.projects} />
        <InformationBoxText information={page.attributes.service_quote} />
        <ServicesTeaser services={page.attributes.services} />
        <ProjectImageFullscreen detail={page.attributes.agentur} />
        <NewsBox news={news} />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const [projectsRes, newsRes, pageRes] = await Promise.all([
    fetchAPI("/projects", { populate: "*" }),
    fetchAPI("/news", { populate: "*" }),
    fetchAPI("/page-home", {
      populate: {
        populate: "*",
        seo: { populate: "*" },
        hero: { populate: "*" },
        projects: { populate: "*" },
        about_quote: { populate: "*" },
        service_quote: { populate: "*" },
        services: { populate: "*" },
        agentur: { populate: "*" }
      },
    }),
  ])

  return {
    props: {
      projects: projectsRes.data,
      news: newsRes.data,
      page: pageRes.data
    },
    revalidate: 1,
  }
}
