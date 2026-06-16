import { Button, Space, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./Pagination.module.css";

const { Text } = Typography;         

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
}) => {
  return (
    <Space className={styles.wrapper}>
      <Button
        icon={<LeftOutlined />}
        onClick={onPrev}
        disabled={!hasPrev}
        className={styles.btn}
      >
        Назад
      </Button>
      <Text className={styles.pageInfo}>{page} / {totalPages}</Text>
      <Button
        icon={<RightOutlined />}
        iconPosition="end"
        onClick={onNext}
        disabled={!hasNext}
        className={styles.btn}
      >
        Вперёд
      </Button>
    </Space>
  );
};