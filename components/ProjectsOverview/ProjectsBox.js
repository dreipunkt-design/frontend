import styles from "./ProjectsBox.module.scss"
import ProjectThumb from "./ProjectThumb"

const ProjectsBox = ({ projects, preview }) => {
    // Preview Mode zum Anzeigen des prev und next-Projekts im Projektdetail
    // In diesem Fall sind in Projects nur zwei Projekte enthalten.
    return (
        <section>
            <div className={`${styles.projectsContainer}`}>
                <div className={`${styles.projectsGrid}`}>
                    {(typeof preview === 'undefined') ?
                        projects && projects.map((project) => {
                            return (
                                <ProjectThumb key={project.id} project={project} />
                            )
                        }) :
                        <>
                            <ProjectThumb key={projects[0].id} project={projects[0]} previewPrev />
                            <ProjectThumb key={projects[1].id} project={projects[1]} previewNext />
                        </>
                    }
                </div>
            </div>
        </section>
    )
}

export default ProjectsBox
