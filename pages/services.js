import { useEffect } from "react"
import { usePresence } from "framer-motion";
import { fetchAPI } from "../lib/api"
import HeadInformation from "../components/HeadInformation"
import Layout from "../components/Layout"
import { useGlobalDispatchContext } from "../context/appContext"
import ProjectsBox from "../components/ProjectsOverview/ProjectsBox"

export default function Services({ page }) {
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
        dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <HeadInformation title={page.attributes.title} seo={page.attributes.seo} />
            <Layout>
                <div>DAS IST DIE SEITE LEISTUNGEN</div>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const [/*projectsRes,*/ pageRes] = await Promise.all([
        //fetchAPI("/projects", { populate: "*", sort: "sort" }),
        fetchAPI("/page-services", {
            populate: {
                populate: "*",
                seo: { populate: "*" }
            },
        }),
    ]);
    return {
        props: {
            //projects: projectsRes.data,
            page: pageRes.data
        },
        revalidate: 1,
    }
}
