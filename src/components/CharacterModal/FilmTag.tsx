import { Tag } from "antd";
import { useGetFilmByIdQuery } from "../../services/swapiApi";
import { extractIdFromUrl } from "../../utils/helpers";

interface FilmTagProps {
  filmUrl: string;
}


export const FilmTag: React.FC<FilmTagProps> = ({ filmUrl }) => {
  const id = extractIdFromUrl(filmUrl);
  const { data, isLoading } = useGetFilmByIdQuery(id, { skip: !id });

  const title = data?.result.properties.title;
  const episode = data?.result.properties.episode_id;

  return (
    <Tag color="gold" style={{ marginBottom: 6 }}>
      {isLoading || !title
        ? "Загрузка..."
        : `Эпизод ${episode}: ${title}`}
    </Tag>
  );
};
