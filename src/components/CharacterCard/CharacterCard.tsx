import { Skeleton } from "antd";
import {
  getCharacterImageUrl,
  FALLBACK_AVATAR,
  formatGender,
  extractIdFromUrl,
  EYE_COLOR_MAP,
} from "../../utils/helpers";
import { useGetPersonByIdQuery, useGetSpeciesByIdQuery } from "../../services/swapiApi";
import styles from "./CharacterCard.module.css";

interface CharacterCardProps {
  uid: string;
  name: string;
  onClick: (uid: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ uid, name, onClick }) => {
  const { data, isLoading } = useGetPersonByIdQuery(uid);
  const person = data?.result.properties;

  const speciesUrl = person?.species?.[0];
  const speciesId = speciesUrl ? extractIdFromUrl(speciesUrl) : "";
  const { data: speciesData } = useGetSpeciesByIdQuery(speciesId, { skip: !speciesId });
  const speciesName = speciesData?.result.properties.name ?? (person ? "Human" : "");

  if (isLoading) {
    return (
      <div className={styles.card}>
        <Skeleton.Image active className={styles.skeletonImg} />
        <Skeleton active paragraph={{ rows: 2 }} style={{ padding: "16px" }} />
      </div>
    );
  }

  const gender = person?.gender ?? "n/a";
  const birthYear = person?.birth_year ?? "—";

  return (
    <div className={styles.card} onClick={() => onClick(uid)}>
      <img
        src={getCharacterImageUrl(uid)}
        alt={name}
        className={styles.avatar}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = FALLBACK_AVATAR;
        }}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.meta}>
          {formatGender(gender)} &nbsp;·&nbsp; {birthYear}
          {speciesName ? ` · ${speciesName}` : ""}
        </p>
      </div>
    </div>
  );
};