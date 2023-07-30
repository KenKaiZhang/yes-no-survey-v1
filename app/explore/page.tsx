"use client";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/explore.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Collection from "./components/Collection";
import SearchResults from "./components/SearchResults";
import { MessageData, initialMessage } from "../hooks/MessageContext";

const Explore = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [entered, setEntered] = useState<string | undefined>();
  const { message, setMessage } = useContext(MessageData);

  useEffect(() => {
    setMessage(initialMessage);
  }, [message]);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e: any) => {
    if (e.key === "Enter") setEntered(search ? search : undefined);
  };

  return (
    <div className={styles.page} onClick={() => setEntered(undefined)}>
      <div className={styles.searchBar}>
        <div className={`${styles.searchIcon} ${search ? styles.focus : ""}`}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          className={`${styles.searchInput} ${search ? styles.focus : ""}`}
          type="text"
          placeholder="Search survey..."
          onKeyDown={handleSubmit}
          onChange={handleSearch}
        />
        {entered && <SearchResults search={entered} />}
      </div>
      <div className={`${styles.content}  ${entered ? styles.blurred : ""}`}>
        <Collection title="Featured" feature="test" list={true} size={6} />
        <Collection title="Explore" feature="test" list={false} size={10} />
      </div>
    </div>
  );
};

export default Explore;
