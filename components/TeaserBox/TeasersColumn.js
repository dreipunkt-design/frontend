import TeaserThumb from "./TeaserThumb"

const TeasersColumn = ({ teasers, column }) => {
  return (
    <>
      {teasers && teasers.map((teaser) => {
        return (
          <TeaserThumb key={teaser.id} project={teaser.project.data} column={column} />
        )
      })}
    </>
  )
}

export default TeasersColumn
