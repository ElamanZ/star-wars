import { Modal, Typography, Descriptions, Tag, Skeleton, Divider, Space, Button } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { useGetPersonByIdQuery, useGetSpeciesByIdQuery } from "../../services/swapiApi";
import {
  getCharacterImageUrl,
  FALLBACK_AVATAR,
  formatGender,
  extractIdFromUrl,
  EYE_COLOR_MAP,
} from "../../utils/helpers" ;
import { FilmTag } from "./FilmTag";


import styles from "./CharacterModal.module.css";

const { Title, Text } = Typography;

interface CharacterModalProps {
  uid: string | null;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ uid, onClose }) => {
  const { data, isLoading, isError } = useGetPersonByIdQuery(uid ?? "", { skip: !uid });
  const person = data?.result.properties;

  const speciesUrl = person?.species?.[0];
  const speciesId = speciesUrl ? extractIdFromUrl(speciesUrl) : "";
  const { data: speciesData } = useGetSpeciesByIdQuery(speciesId, { skip: !speciesId });
  const speciesName = speciesData?.result.properties.name ?? "Human";

  const eyeColor = EYE_COLOR_MAP[(person?.eye_color ?? "").toLowerCase()] ?? "#888";

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("character", uid ?? "");
    navigator.clipboard.writeText(url.toString());
  };

  return (
    <Modal open={!!uid} onCancel={onClose} footer={null} width={500} className={styles.modal} destroyOnClose>
      {isLoading && <Skeleton active paragraph={{ rows: 8 }} />}
      {isError && <div className={styles.error}>Не удалось загрузить данные персонажа.</div>}
      {person && (
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.imgWrapper}>
              <img
                src={getCharacterImageUrl(uid ?? "")}
                alt={person.name}
                className={styles.avatar}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_AVATAR; }}
              />
            </div>
            <div className={styles.headerInfo}>
              <Title level={3} className={styles.name}>{person.name}</Title>
              <Space wrap>
                <Tag color={person.gender === "male" ? "blue" : person.gender === "female" ? "magenta" : "default"}>
                  {formatGender(person.gender)}
                </Tag>
                <Tag color="purple">{speciesName}</Tag>
                <Tag color="cyan">{person.birth_year}</Tag>
              </Space>
              <Button size="small" icon={<LinkOutlined />} className={styles.linkBtn} onClick={handleCopyLink}>
                Скопировать ссылку
              </Button>
            </div>
          </div>
          <Divider className={styles.divider} />
          <Descriptions
            column={2}
            size="small"
            labelStyle={{ color: "rgba(255,255,255,0.45)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.6px" }}
            contentStyle={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Exo 2', sans-serif" }}
            className={styles.descriptions}
          >
            <Descriptions.Item label="Рост">
              {person.height !== "unknown" ? `${person.height} см` : "Неизвестно"}
            </Descriptions.Item>
            <Descriptions.Item label="Вес">
              {person.mass !== "unknown" ? `${person.mass} кг` : "Неизвестно"}
            </Descriptions.Item>
            <Descriptions.Item label="Цвет глаз">
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: eyeColor, border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0 }} />
                {person.eye_color}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Цвет волос">{person.hair_color}</Descriptions.Item>
            <Descriptions.Item label="Раса">{speciesName}</Descriptions.Item>
          </Descriptions>

          {person.films && person.films.length > 0 && (
            <>
              <Divider className={styles.divider}>
                <Text className={styles.dividerLabel}>Фильмы</Text>
              </Divider>
              <div className={styles.films}>
                {person.films.map((filmUrl) => <FilmTag key={filmUrl} filmUrl={filmUrl} />)}
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
};