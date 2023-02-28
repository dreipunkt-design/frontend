import Head from "next/head"

const HeadInformation = ({ title, seo }) => {
    return (
        <Head>
            {title && (
                <>
                    <title>{title}</title>
                </>
            )}
            {seo.metaTitle && (
                <>
                    <meta property="og:title" content={seo.metaTitle} />
                </>
            )}
            {seo.metaDescription && (
                <>
                    <meta name="description" content={seo.metaDescription} />
                    <meta property="og:description" content={seo.metaDescription} />
                </>
            )}
            <style>
                {`html { background-color: #e6e6e4; }`}
            </style>
        </Head>
    )
}

export default HeadInformation
