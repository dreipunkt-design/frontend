import { getMediaURL } from "../../lib/api"

const StrapiImage = ({ image, reveal }) => {
    if (image) {
        // SrcSet Aufbereiten
        let imageSet = new Array();
        imageSet.push(getMediaURL() + image.attributes.url);

        if (image.attributes.formats !== null) {
            if (image.attributes.formats.hasOwnProperty('large'))
                imageSet.push(getMediaURL() + image.attributes.formats.large.url);
            if (image.attributes.formats.hasOwnProperty('medium'))
                imageSet.push(getMediaURL() + image.attributes.formats.medium.url);
            if (image.attributes.formats.hasOwnProperty('small'))
                imageSet.push(getMediaURL() + image.attributes.formats.small.url);
            let minWidthMax = imageSet.length * 250;
            let sources = new Array();
            imageSet.map((image) => {
                sources.push({
                    minWidth: minWidthMax,
                    srcSet: image
                });
                minWidthMax = minWidthMax - 250;
            });
        }

        return (
            <picture>
                {(image.attributes.formats !== null) ?
                    sources.map((source) => {
                        if (source.minWidth == 250)
                            return (
                                <img className={reveal} key={`image-${image.id}`} src={source.srcSet} alt={image.attributes.alternativeText} />
                            );
                        else
                            return (
                                <source key={`source-${image.id}-${source.minWidth}`} media={`(min-width: ${source.minWidth}px)`} srcSet={source.srcSet} />
                            )
                    })
                    :
                    <img className={reveal} src={getMediaURL() + image.attributes.url} alt={image.attributes.alternativeText} />
                }
            </picture>
        )
    }
    else return (<></>);
}

export default StrapiImage