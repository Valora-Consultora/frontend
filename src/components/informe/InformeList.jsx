import { Summarize } from "@mui/icons-material"
import EmptyList from "../utils/EmptyList"
import { InformeCard } from "./InformeCard"

const InformeList = ({informes, onCardSelect, emptyListMessage}) => {
  console.log('informes', informes);
  if (informes && informes.length > 0) {
    return informes.map((informe) => (
      <InformeCard key={informe.id} informe={informe} handleCardSelect={onCardSelect} />
    ))
  } else {
    return <EmptyList 
      message={emptyListMessage ?? "Aún no hay informes."}
      Icon={Summarize}
    />
  }
}

export default InformeList;
