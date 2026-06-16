import { Input, Select, Space, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { GENDER_FILTER_OPTIONS } from "../../utils/helpers";

interface SearchFilterProps {
  searchValue: string;
  genderFilter: string;
  isSearching?: boolean;
  onSearchChange: (value: string) => void;
  onGenderChange: (value: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchValue,
  genderFilter,
  isSearching,
  onSearchChange,
  onGenderChange,
}) => {
  return (
    <Space wrap style={{ width: "100%", justifyContent: "center", marginBottom: 32 }}>
      <Input
        prefix={<SearchOutlined style={{ color: "#FFE81F" }} />}
        suffix={isSearching ? <Spin size="small" /> : <span style={{ width: 14 }} />}
        placeholder="Поиск по имени..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        allowClear
        style={{
          width: 320,
          height: 40,
          background: "rgba(198, 190, 35, 0.05)",
          border: "1px solid rgba(197, 30, 155, 0.3)",
          borderRadius: 10,
          color: "#fff",
        }}
        className="sw-search-input"
      />
      <Select
        value={genderFilter}
        onChange={onGenderChange}
        options={GENDER_FILTER_OPTIONS}
        style={{ width: 160 }}
        className="sw-select"
      />
    </Space>
  );
};