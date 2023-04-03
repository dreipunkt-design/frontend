import { useEffect } from "react"
import { usePresence } from "framer-motion";
import { fetchAPI } from "../lib/api"
import HeadInformation from "../components/HeadInformation"
import Layout from "../components/Layout"
import { useGlobalDispatchContext } from "../context/appContext"
import ProjectsBox from "../components/ProjectsOverview/ProjectsBox"

export default function Projects({ projects, page }) {
    const dispatch = useGlobalDispatchContext();

    return (
        <>
            <HeadInformation title={page.attributes.title} seo={page.attributes.seo} />
            <Layout>
                <ProjectsBox projects={projects} />
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const [projectsRes, pageRes] = await Promise.all([
        fetchAPI("/projects", { populate: "*", sort: "sort:desc" }),
        fetchAPI("/page-work", {
            populate: {
                populate: "*",
                seo: { populate: "*" }
            },
        }),
    ]);
    return {
        props: {
            projects: projectsRes.data,
            page: pageRes.data
        },
        revalidate: 1,
    }
}
