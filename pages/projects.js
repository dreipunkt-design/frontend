import { useEffect } from "react";
import { fetchAPI } from "../lib/api"
import HeadInformation from "../components/HeadInformation"
import Layout from "../components/Layout"
import TeaserBox from "../components/TeaserBox"
import { useGlobalDispatchContext } from "../context/appContext"

export default function Projects({ page }) {
    const dispatch = useGlobalDispatchContext();

    useEffect(() => {
        dispatch({ type: 'NAVIGATION_TYPE', darkNavigation: false })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <HeadInformation title={page.attributes.title} seo={page.attributes.seo} />
            <Layout>
                <TeaserBox teasers={page.attributes.projects} />
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const [pageRes] = await Promise.all([
        fetchAPI("/page-work", {
            populate: "deep"
        })
    ]);
    return {
        props: {
            page: pageRes.data
        },
        revalidate: 1,
    }
}
