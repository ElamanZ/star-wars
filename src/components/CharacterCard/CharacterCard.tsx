import { Card, Tag, Typography, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  getCharacterImageUrl,
  FALLBACK_AVATAR,
  formatGender,
  extractIdFromUrl,
  EYE_COLOR_MAP,
} from "../../utils/helpers";
import { useGetPersonByIdQuery, useGetSpeciesByIdQuery } from "../../services/swapiApi";
import styles from "./CharacterCard.module.css";


const { Text, Title } = Typography;

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

  const eyeColor = EYE_COLOR_MAP[(person?.eye_color ?? "").toLowerCase()] ?? "#888";

  return (
    <Card
      className={styles.card}
      hoverable
      onClick={() => onClick(uid)}
      cover={
        isLoading ? (
          <Skeleton.Image active className={styles.skeletonImg} />
        ) : (
          <div className={styles.imgWrapper}>
            <img
              src={getCharacterImageUrl(uid)}
              alt={name}
              className={styles.avatar}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_AVATAR; }}
            />
            <div className={styles.imgOverlay} />
          </div>
        )
      }
    >
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <div className={styles.body}>
          <Title level={5} className={styles.name}>{name}</Title>
          <div className={styles.meta}>
            <div className={styles.row}>
              <Text className={styles.label}>Пол</Text>
              <Tag
                color={person?.gender === "male" ? "blue" : person?.gender === "female" ? "magenta" : "default"}
                className={styles.tag}
              >
                {formatGender(person?.gender ?? "n/a")}
              </Tag>
            </div>
            <div className={styles.row}>
              <Text className={styles.label}>Рождение</Text>
              <Text className={styles.value}>{person?.birth_year ?? "—"}</Text>
            </div>
            <div className={styles.row}>
              <Text className={styles.label}>Раса</Text>
              <Text className={styles.value}>{speciesName || "—"}</Text>
            </div>
            {person?.eye_color && (
              <div className={styles.row}>
                <Text className={styles.label}>Глаза</Text>
                <span className={styles.eyeRow}>
                  <span className={styles.eyeDot} style={{ background: eyeColor }} />
                  <Text className={styles.value}>{person.eye_color}</Text>
                </span>
              </div>
            )}
          </div>
          <div className={styles.viewBtn}>
            <UserOutlined style={{ marginRight: 7 }} />
            Подробнее
          </div>
        </div>
      )}
    </Card>
  );
};