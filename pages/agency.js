import { useEffect } from "react"
import { usePresence } from "framer-motion";
import { fetchAPI } from "../lib/api"
import HeadInformation from "../components/HeadInformation"
import Layout from "../components/Layout"
import { useGlobalDispatchContext } from "../context/appContext"

import InformationBoxHero from "../components/InformationBoxHero/InformationBoxHero";
import ProjectImageFullscreen from "../components/ProjectDetails/ProjectImageFullscreen";
import InformationBoxImage from "../components/InformationBoxImage/InformationBoxImage";
import ServicesBox from "../components/ServicesBox";
import ClientsBox from "../components/ClientsBox";

export default function Profile({ page }) {
    const dispatch = useGlobalDispatchContext();
    const [isPresent, safeToRemove] = usePresence();

    console.log(page);

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
                <InformationBoxHero information={page.attributes.hero} />
                <ProjectImageFullscreen detail={page.attributes.image} />
                {page.attributes.information && page.attributes.information.map((boxdata) => {
                    return (
                        <InformationBoxImage key={boxdata.id} boxdata={boxdata} />
                    )
                })}
                <ServicesBox services={page.attributes.services} />
                <ClientsBox clients={page.attributes.clients} />
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const [pageRes] = await Promise.all([
        fetchAPI("/page-agency", {
            populate: {
                populate: "*",
                seo: { populate: "*" },
                hero: { populate: "*" },
                image: { populate: "*" },
                information: { populate: "*" },
                services: { populate: "*" },
                clients: { populate: "*" }
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
