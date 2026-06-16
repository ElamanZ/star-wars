import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPeopleQuery } from "../../services/swapiApi";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchFilter } from "../SearchFilter/SearchFilter";
import { CharacterList } from "../CharacterList/CharacterList";
import { CharacterModal } from "../CharacterModal/CharacterModal";
import { Pagination } from "../Pagination/Pagination";
import { Hyperspace } from "../Hyperspace/Hyperspace";
import styles from "./PeoplePage.module.css";
import img from "../../assets/star-wars.png";

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? ""
  );
  const [genderFilter, setGenderFilter] = useState(
    searchParams.get("gender") ?? "all"
  );

  const [page, setPage] = useState(
    Number(searchParams.get("page") ?? "1")
  );

  const [selectedCharacterId, setSelectedCharacterId] = useState<
    string | null
  >(searchParams.get("character"));

  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (debouncedSearch) params.search = debouncedSearch;
    if (genderFilter !== "all") params.gender = genderFilter;
    if (page > 1) params.page = String(page);
    if (selectedCharacterId) params.character = selectedCharacterId;

    setSearchParams(params, { replace: true });
  }, [
    debouncedSearch,
    genderFilter,
    page,
    selectedCharacterId,
    setSearchParams,
  ]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, genderFilter]);

  const { data, isFetching } = useGetPeopleQuery({
    page,
    limit: 10,
    name: debouncedSearch || undefined,
  });

  const isSearching =
    searchInput.trim() !== "" &&
    (searchInput !== debouncedSearch || isFetching);

  const totalPages = data?.total_pages ?? 1;

  const handleNext = () => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className={styles.page}>
      <Hyperspace className={styles.bgCanvas} />

      <header className={styles.header}>
        <div className={styles.crawlLine} aria-hidden />
        <img
          src={img}
          alt="Star Wars"
          className={styles.titleImg}
        />
        <div className={styles.crawlLine} aria-hidden />
      </header>

      <main className={styles.main}>
        <SearchFilter
          searchValue={searchInput}
          genderFilter={genderFilter}
          isSearching={isSearching}
          onSearchChange={setSearchInput}
          onGenderChange={setGenderFilter}
        />

        <CharacterList
          page={page}
          searchName={debouncedSearch}
          genderFilter={genderFilter}
          isSearching={isSearching}
          onCardClick={(uid) => setSelectedCharacterId(uid)}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          hasNext={page < totalPages}
          hasPrev={page > 1}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </main>

      <CharacterModal
        uid={selectedCharacterId}
        onClose={() => setSelectedCharacterId(null)}
      />
    </div>
  );
};