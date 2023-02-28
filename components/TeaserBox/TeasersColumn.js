import TeaserThumb from "./TeaserThumb"

const TeasersColumn = ({ projects, teasers, column }) => {
  return (
    <>
      {teasers && teasers.map((teaser) => {
        let found = projects.find(project => project.attributes.slug === teaser.project_slug);
        return (
          <TeaserThumb key={found.id} project={found} column={column} />
        )
      })}
    </>
  )
}

export default TeasersColumn
