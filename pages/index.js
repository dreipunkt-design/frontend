import { fetchAPI } from "../lib/api"
import { getMediaURL } from "../lib/api"
import HeadInformation from "../components/HeadInformation"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import InformationBoxText from "../components/InformationBoxText"
import TeaserBox from "../components/TeaserBox"
import ServicesTeaser from "../components/ServicesTeaser/ServicesTeaser";
import ProjectImageFullscreen from "../components/ProjectDetails/ProjectImageFullscreen"
import NewsBox from "../components/NewsBox"

export default function Home({ news, page }) {
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
        <TeaserBox teasers={page.attributes.projects} />
        <InformationBoxText information={page.attributes.service_quote} />
        <ServicesTeaser services={page.attributes.services} />
        <ProjectImageFullscreen detail={page.attributes.agentur} />
        <NewsBox news={news} />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const [newsRes, pageRes] = await Promise.all([
    fetchAPI("/news", { populate: "*" }),
    fetchAPI("/page-home", {
      populate: "deep"
    }),
  ])

  return {
    props: {
      news: newsRes.data,
      page: pageRes.data
    },
    revalidate: 1,
  }
}
