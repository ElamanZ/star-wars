import { Row, Col, Card, Skeleton, Alert, Empty, Spin } from "antd";
import { useGetPeopleQuery } from "../../services/swapiApi";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { GenderFilteredCard } from "./GenderFilteredCard";

interface CharacterListProps {
  page: number;
  searchName: string;
  genderFilter: string;
  isSearching?: boolean;
  onCardClick: (uid: string) => void;
}

const SkeletonCards = () => (
  <>
    {Array.from({ length: 10 }).map((_, i) => (
      <Col key={i} xs={24} sm={12} md={8} lg={6} xl={4}>
        <Card
          style={{
            background: "rgba(10,15,30,0.95)",
            border: "1px solid rgba(255,232,31,0.1)",
            borderRadius: 12,
            overflow: "hidden",
          }}
          cover={<Skeleton.Image active style={{ width: "100%", height: 220 }} />}
        >
          <Skeleton active paragraph={{ rows: 3 }} />
        </Card>
      </Col>
    ))}
  </>
);

export const CharacterList: React.FC<CharacterListProps> = ({
  page, searchName, genderFilter, isSearching, onCardClick,
}) => {
  const { data, isLoading, isFetching, isError } = useGetPeopleQuery({
    page,
    limit: 10,
    name: searchName || undefined,
  });

  const showSpinner = isSearching || isFetching;

  if (isError) {
    return (
      <Alert
        type="error"
        message="Ошибка загрузки"
        description="Не удалось загрузить список персонажей. Попробуйте обновить страницу."
        showIcon
        style={{
          background: "rgba(11, 11, 11, 0.1)",
          border: "1px solid rgba(32, 27, 27, 0.3)",
          borderRadius: 10,
        }}
      />
    );
  }

  if (!isLoading && !isFetching && (!data?.results || data.results.length === 0)) {
    return (
      <Empty
        description={<span style={{ color: "rgba(255,255,255,0.4)" }}>Персонажи не найдены</span>}
        style={{ padding: "60px 0" }}
      />
    );
  }

  return (
    <Spin spinning={showSpinner} size="large" tip="Поиск по галактике">
      <Row gutter={[20, 20]} style={{ minHeight: 240 }}>
        {isLoading || isFetching ? (
          <SkeletonCards />
        ) : (
          data?.results.map((character) =>
            genderFilter === "all" ? (
              <Col key={character.uid} xs={24} sm={12} md={8} lg={6} xl={4}>
                <CharacterCard uid={character.uid} name={character.name} onClick={onCardClick} />
              </Col>
            ) : (
              <GenderFilteredCard
                key={character.uid}
                uid={character.uid}
                name={character.name}
                genderFilter={genderFilter}
                onCardClick={onCardClick}
              />
            )
          )
        )}
      </Row>
    </Spin>
  );
};