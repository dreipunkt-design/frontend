import InformationBoxTextStandard from "./InformationBoxTextStandard";
import InformationBoxTextScrub from "./InformationBoxTextScrub";

const InformationBoxText = ({ information }) => {
  if (information.mode === 'Scrub')
    return (
      <InformationBoxTextScrub information={information} />
    );
  else
    return (
      <InformationBoxTextStandard information={information} />
    );
}

export default InformationBoxText
