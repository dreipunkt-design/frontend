import ProjectStatementBox from "./ProjectStatementBox"
import ProjectImageFullscreen from "./ProjectImageFullscreen"
import ProjectImageSingleColumn from "./ProjectImageSingleColumn"
import ProjectImageTwoColumns from "./ProjectImageTwoColumns"
import ProjectInformationBox from "./ProjectInformationBox"
import ProjectImageFullWidth from "./ProjectImageFullWidth"
import useWindowSize from "../../hooks/useWindowSize"

const ProjectDetails = ({ details }) => {
    const windowSize = useWindowSize();
    return (
        <>
            {details && details.map((detail) => {

                if (detail.__component == "project.statement") {
                    return (
                        <ProjectStatementBox key={`${detail.__component}-${detail.id}`} detail={detail} />
                    )
                }
                if (detail.__component == "project.media-full-width") {
                    return (
                        <ProjectImageFullWidth key={`${detail.__component}-${detail.id}`} detail={detail} />
                    )
                }
                if (detail.__component == "project.image-fullscreen") {
                    return (
                        <ProjectImageFullscreen key={`${detail.__component}-${detail.id}`} detail={detail} />
                    )
                }
                if (detail.__component == "project.images-single-columns") {
                    return (
                        <ProjectImageSingleColumn key={`${detail.__component}-${detail.id}`} detail={detail} />
                    )
                }
                if (detail.__component == "project.images-two-columns") {
                    if (windowSize.width > process.env.breakpoints.tablet)
                        return (
                            <ProjectImageTwoColumns key={`${detail.__component}-${detail.id}`} detail={detail} />
                        )
                    else {
                        const center = detail.left.data.concat(detail.right.data);
                        detail.center = {
                            data: center
                        };
                        return (
                            <ProjectImageSingleColumn key={`${detail.__component}-${detail.id}`} detail={detail} />
                        )
                    }
                }
                if (detail.__component == "project.project-information") {
                    return (
                        <ProjectInformationBox key={`${detail.__component}-${detail.id}`} detail={detail} />
                    )
                }
            })}
        </>
    )
}

export default ProjectDetails;
