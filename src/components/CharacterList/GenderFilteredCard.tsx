import { Col } from "antd";
import { useGetPersonByIdQuery } from "../../services/swapiApi";
import { CharacterCard } from "../CharacterCard/CharacterCard";

interface GenderFilteredCardProps {
  uid: string;
  name: string;
  genderFilter: string;
  onCardClick: (uid: string) => void;
}

export const GenderFilteredCard: React.FC<GenderFilteredCardProps> = ({
  uid, name, genderFilter, onCardClick,
}) => {
  const { data } = useGetPersonByIdQuery(uid);
  const gender = data?.result.properties.gender ?? "";

  if (genderFilter !== "all" && gender && gender !== genderFilter) {
    return null;
  }

  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
      <CharacterCard uid={uid} name={name} onClick={onCardClick} />
    </Col>
  );
};
